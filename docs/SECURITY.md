# Sécurité : configuration et ajout des scans

Ce guide décrit les contrôles présents dans le dépôt et les étapes pour ajouter
Aikido, SonarQube et Semgrep. Les exemples ci-dessous sont des configurations à
ajouter : ils ne modifient pas les workflows existants.

## État vérifiable dans le dépôt

| Outil | État local | Périmètre et rôle |
| --- | --- | --- |
| Dependabot | Actif via [`.github/dependabot.yml`](../.github/dependabot.yml) | Mises à jour hebdomadaires des dépendances npm, des actions GitHub et de l'image de base Docker |
| Trivy | Actif dans le job `build-docker` de [`ci.yml`](../.github/workflows/ci.yml) | Vulnérabilités de l'image Docker ; bloque la CI et la release |
| Aikido | Aucun job ou fichier dédié | Intégration GitHub et PR gating à vérifier dans Aikido |
| SonarQube | Aucun job ni `sonar-project.properties` | Qualité et sécurité du code ; analyse et Quality Gate à configurer |
| Semgrep | Aucun job ni fichier de règles dédié | Analyse statique du code ; règles et politique de blocage à configurer |

Une connexion IDE SonarQube for IDE, anciennement SonarLint, ne prouve pas
l'exécution d'une analyse CI. Les paramètres locaux de l'éditeur ne constituent
pas la configuration du scanner. Une intégration SaaS peut également être
active sans fichier dans le dépôt : vérifier le tableau de bord et les checks
d'une PR avant de conclure qu'elle est inactive.

La production reste Docker Compose et Traefik sur Scaleway, avec une seconde
cible Azure Container Apps pour le lab. Kubernetes/k3s reste prévu. Aucun
scanner supplémentaire n'a besoin d'être installé sur le VPS pour analyser le
dépôt dans GitHub Actions.

## Dependabot : renouvellement des dépendances

Dependabot vérifie chaque lundi à 09:00, heure de Paris, les dépendances npm,
les actions GitHub et l'image de base du Dockerfile. Les mises à jour mineures
et correctives sont regroupées par écosystème, tandis que les mises à jour
majeures restent dans des pull requests distinctes.

Le tag de l'image Node est écrit directement dans le premier `FROM` du
Dockerfile, car Dependabot ne met pas à jour les images référencées via un
`ARG`. Tous les stages dérivent de ce stage `base`. Une pull request Dependabot
reste soumise aux mêmes contrôles CI qu'une autre contribution ; elle ne
publie ni ne déploie directement une image.

## Trivy : contrôle actuel de l'image

La CI suit l'ordre `frontend` → `build-docker` → `docker-smoke`. Le job
`build-docker` construit `portfolio:${{ github.sha }}`, puis utilise
`aquasecurity/trivy-action@v0.36.0` dans le même runner.

| Paramètre du workflow | Valeur | Effet |
| --- | --- | --- |
| `image-ref` | `portfolio:${{ github.sha }}` | Image locale du commit validé, sans publication GHCR |
| `severity` | `CRITICAL,HIGH` | Gravités retenues |
| `ignore-unfixed` | `true` | Écarte les vulnérabilités sans correctif connu |
| `exit-code` | `1` | Fait échouer le scan si des résultats retenus existent |
| `format` / `output` | `sarif` / `trivy-results.sarif` | Rapport pour GitHub Code scanning |
| `limit-severities-for-sarif` | `true` | Applique aussi le filtre de gravité au SARIF |

Ces options sont décrites dans la [documentation de l'action Trivy à la version
utilisée](https://github.com/aquasecurity/trivy-action/tree/v0.36.0). Un scan vert
avec cette politique ne signifie pas que l'image est exempte de vulnérabilités :
les gravités inférieures et les résultats sans correctif sont exclus.

Si le fichier SARIF existe, même après un échec du scan, la CI tente de :

- conserver l'artifact `trivy-results` pendant 14 jours ;
- l'importer dans GitHub **Security and quality → Code scanning**, catégorie
  `trivy-portfolio`.

Le job dispose de `actions: read`, `contents: read` et `security-events: write`.
Le job appelant `validate` de [`release.yml`](../.github/workflows/release.yml)
autorise ces permissions. Aucun token Trivy ni accès GHCR n'est nécessaire.
Un échec de l'import SARIF peut également faire échouer le job : distinguer ce
problème d'un résultat de vulnérabilité dans les logs.

### Reproduire en local

Avec Docker et Trivy installés, depuis la racine du dépôt :

```bash
docker build --tag portfolio:scan-local .
trivy image --severity HIGH,CRITICAL --ignore-unfixed --exit-code 1 portfolio:scan-local
```

Pour générer un rapport avec le même filtrage :

```bash
trivy image --severity HIGH,CRITICAL --ignore-unfixed --exit-code 1 \
  --format sarif --output /tmp/portfolio-trivy-results.sarif \
  --limit-severities-for-sarif portfolio:scan-local
```

Pour comparer avec la CI, relever la version du binaire dans ses logs et utiliser
la même version localement. La base de vulnérabilités et les paquets Alpine
peuvent évoluer entre deux builds ; un ancien rapport ne valide pas une nouvelle
image. Corriger la dépendance ou l'image de base concernée, reconstruire, puis
relancer le scan. Le workflow actuel ne déclare aucune politique d'exceptions.

## Aikido : intégration GitHub et PR gating

Procédure proposée via l'intégration native :

1. Connecter GitHub au workspace Aikido et sélectionner `teopartesi/portfolio`.
2. Vérifier le premier scan de `main` et les types d'analyse activés.
3. Dans **Integrations → PR Quality Gating**, configurer le dépôt, les types de
   scans et le seuil de blocage, par exemple les nouvelles alertes High/Critical.
4. Ouvrir une PR et vérifier le résultat Aikido avant de rendre son check
   obligatoire dans les règles de protection GitHub.

Cette intégration native est gérée côté Aikido. Un ajout par CLI ou API est une
autre option et nécessite sa propre configuration. Le PR gating et le release
gating sont distincts ; ce dernier utilise la CLI Aikido. Voir le [guide officiel
du gating Aikido](https://help.aikido.dev/pr-and-release-gating/aikido-ci-gating-functionality).

## SonarQube : analyse du code et Quality Gate

Choisir d'abord **SonarQube Cloud** ou **SonarQube Server**. Importer ou lier le
dépôt au projet, puis récupérer la clé du projet. Pour Cloud, récupérer aussi
la clé de l'organisation et suivre l'assistant d'analyse CI ; si une analyse
automatique est active, choisir explicitement la méthode avant d'ajouter la CI.

Créer le secret GitHub Actions `SONAR_TOKEN`. Pour Server, ajouter la variable
`SONAR_HOST_URL` contenant l'URL accessible depuis le runner. Ne pas installer
un serveur SonarQube sur le VPS comme simple étape de ce guide.

Exemple de `sonar-project.properties` à créer à la racine :

```properties
sonar.projectKey=<cle-du-projet>
sonar.sources=app,components,lib
sonar.exclusions=**/node_modules/**,**/.next/**,**/coverage/**
# SonarQube Cloud uniquement :
sonar.organization=<cle-de-l-organisation>
```

Ce périmètre initial couvre le code de l'application ; l'élargir si d'autres
répertoires doivent être analysés. Aucun rapport de couverture applicative n'est
actuellement produit par les scripts npm : ne pas déclarer de chemin LCOV fictif.

Extrait d'un job à ajouter dans `ci.yml`, pour Cloud et les PR internes :

```yaml
  sonarqube:
    name: SonarQube
    runs-on: ubuntu-latest
    if: github.event_name != 'pull_request' || github.event.pull_request.head.repo.full_name == github.repository
    permissions:
      contents: read
    steps:
      - uses: actions/checkout@v6
        with:
          fetch-depth: 0
          persist-credentials: false
      - uses: SonarSource/sonarqube-scan-action@v7
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
        with:
          args: -Dsonar.qualitygate.wait=true
```

Pour Server, ajouter `SONAR_HOST_URL: ${{ vars.SONAR_HOST_URL }}` dans `env`
et retirer `sonar.organization`. Vérifier les fonctionnalités PR/branches de
l'édition et du plan utilisés. L'attente du Quality Gate fait échouer le job
si le gate échoue ; un simple envoi d'analyse ne fournit pas cette garantie.
Voir les guides officiels [Cloud avec GitHub Actions](https://docs.sonarsource.com/sonarqube-cloud/advanced-setup/ci-based-analysis/github-actions-for-sonarcloud/)
et [Server avec GitHub Actions](https://docs.sonarsource.com/sonarqube-server/2025.4/devops-platform-integration/github-integration/adding-analysis-to-github-actions-workflow).

## Semgrep : règles et analyse CI

Pour Semgrep AppSec Platform, connecter le dépôt, sélectionner les règles
TypeScript/JavaScript adaptées au projet, puis créer le secret GitHub Actions
`SEMGREP_APP_TOKEN`. `semgrep ci` applique la configuration de la plateforme ;
définir les règles bloquantes et vérifier le comportement sur une PR.

Extrait de job à ajouter dans `ci.yml` après avoir remplacé le marqueur de version :

```yaml
  semgrep:
    name: Semgrep
    runs-on: ubuntu-latest
    if: github.event_name != 'pull_request' || github.event.pull_request.head.repo.full_name == github.repository
    permissions:
      contents: read
    container:
      image: semgrep/semgrep:<version-validee>
    steps:
      - uses: actions/checkout@v6
        with:
          fetch-depth: 0
          persist-credentials: false
      - run: semgrep ci
        env:
          SEMGREP_APP_TOKEN: ${{ secrets.SEMGREP_APP_TOKEN }}
```

Choisir une version publiée ou un digest validé avant de copier cet extrait.
Pour un premier scan local avec Semgrep installé, sans compte plateforme :

```bash
semgrep scan --config auto app components lib
```

Ce scan local ne remplace pas la politique de blocage de la plateforme. Les
deux modes sont décrits dans les [exemples CI officiels Semgrep](https://semgrep.dev/docs/semgrep-ci/sample-ci-configs).

## Secrets, fusion et release

Ajouter les secrets dans GitHub **Settings → Secrets and variables → Actions**.
Les jobs CI proposés n'utilisent pas d'environnement GitHub : des secrets placés
uniquement dans `portfolio-prod` ou `azure-lab` ne leur seront pas accessibles.
Les PR de forks n'ont pas accès aux secrets ; les exemples SonarQube et Semgrep
les excluent. Prévoir leur traitement séparément avant d'exiger ces checks pour
toutes les contributions. Ne pas utiliser `pull_request_target` pour exécuter du
code de PR avec accès aux secrets.

La CI étant réutilisable, si des jobs utilisant ces secrets sont ajoutés,
déclarer `SONAR_TOKEN` et `SEMGREP_APP_TOKEN` sous `on.workflow_call.secrets`
dans `ci.yml`, puis les transmettre depuis `release.yml` → `validate` avec
`secrets: inherit` ou un mapping explicite. Actuellement `validate` ne transmet
pas ces secrets. Aucun secret supplémentaire n'est requis pour Trivy.

Un check externe obligatoire peut empêcher la fusion d'une PR, mais n'est pas
automatiquement attendu par la release manuelle. Des jobs bloquants intégrés à
`ci.yml` sont attendus par `validate`. Pour Aikido natif, ajouter un contrôle
de release explicite si le résultat doit aussi empêcher le versionnage et le
déploiement. Ne pas masquer les échecs avec `continue-on-error` lorsqu'un scan
est censé bloquer.

## Validation et maintenance

Lors de l'ajout effectif d'un outil :

1. Vérifier une PR interne et un scan de `main` : commit analysé, périmètre,
   résultats et check GitHub doivent correspondre.
2. Vérifier sur une branche de test qu'un résultat bloquant fait échouer le job,
   puis corriger le cas de test. Confirmer aussi le traitement des forks.
3. Contrôler la transmission des secrets à la CI réutilisable. La release réelle
   publie et déploie : ne pas la lancer uniquement pour tester la configuration.
4. Rendre les checks obligatoires après ces vérifications, puis actualiser ce
   guide et [ROADMAP.md](./ROADMAP.md) avec le statut réellement constaté.

Traiter les doublons entre outils par vulnérabilité, fichier ou dépendance.
Toute exception doit avoir une justification, un responsable et une date de
réexamen. Éviter les exclusions globales qui masquent une classe entière de
résultats. Lors de la rotation d'un token, mettre à jour le secret GitHub sans
le copier dans un fichier ou dans les logs.

En cas de problème d'intégration, revenir au commit précédent du workflow et
ajuster les checks requis pour éviter de laisser un check absent obligatoire.
Ce retour retire le contrôle concerné ; il ne corrige pas une vulnérabilité et
ne modifie pas l'image déjà déployée. Le rollback applicatif est décrit dans
[DEPLOYMENT.md](./DEPLOYMENT.md#rollback).
