# 🚀 Deployment Guide

Ce document décrit la stratégie de déploiement du portfolio.

Le pipeline de release déploie la même image GHCR versionnée vers deux cibles :

- le VPS Scaleway avec Docker Compose + Traefik, qui sert `teopartesi.fr` ;
- Azure Container Apps, dans le lab associé à l'environnement GitHub `azure-lab`.

Kubernetes/k3s reste une cible d'apprentissage en préparation, hors du pipeline actif.

---

## Architecture

| Cible | Accès à l'application | Exécution |
|-------|------------------------|-----------|
| VPS Scaleway (production) | `teopartesi.fr`, DNS vers `51.159.24.182`, HTTPS Traefik | Docker Compose, réseau `proxy`, Next.js sur le port interne `3000` |
| Azure Container Apps (lab) | FQDN de la Container App, ingress HTTP/HTTPS Azure avec port cible `3000` | Révision de `ca-portfolio-lab-hello` utilisant l'image GHCR |
| Kubernetes/k3s (prévu) | Ingress Kubernetes à configurer | Manifests `k8s/`, pas de déploiement automatique actuel |

Voir [INFRASTRUCTURE.md](./INFRASTRUCTURE.md) pour les responsabilités de chaque plateforme.

---

## Infrastructure cible

### VPS

- Provider : Scaleway
- OS : Ubuntu 24.04 LTS
- Docker Engine
- Docker Compose
- k3s prévu pour le déploiement Kubernetes

### Reverse Proxy du VPS

- Traefik v3.7
- HTTPS automatique avec Let's Encrypt
- Redirection HTTP → HTTPS

### Azure Container Apps

| Paramètre | Valeur utilisée par `deploy.yml` |
|-----------|---------------------------------|
| Environnement GitHub Actions | `azure-lab` |
| Groupe de ressources Azure | `rg-portfolio-cloud-lab` |
| Container App | `ca-portfolio-lab-hello` |
| Image | `ghcr.io/teopartesi/portfolio:<version>` |

La Container App et son environnement Azure doivent déjà exister. L'ingress doit
cibler le port `3000` défini dans le Dockerfile. Le workflow met uniquement à jour
l'image : il ne crée ni les ressources, ni l'ingress, ni les règles de mise à
l'échelle. `azure-lab` désigne l'environnement **GitHub**, pas le nom de
l'environnement managé Container Apps. Azure n'utilise ni le fichier Compose,
ni Traefik, ni le réseau Docker `proxy` du VPS.

---

## Structure des dossiers du VPS

```text
/opt/docker
├── apps
│   └── portfolio
│       ├── Dockerfile
│       └── ...
│
├── compose
│   ├── traefik
│   │   └── compose.yml
│   └── portfolio
│       └── compose.yml
│
└── volumes
    └── traefik
        └── acme.json
```

---

## Déploiement

### Docker Compose

Le déploiement VPS ne reconstruit plus l'application depuis un clone Git.
La VM récupère l'image publiée sur GHCR et lance `compose.prod.yaml`.
En production, le tag déployé est la version Semantic Release sans préfixe `v`,
par exemple `1.2.0`. Conserver ce tag comme référence immuable : ne pas le
réattribuer à une autre image. Le tag `latest` reste utile pour des tests manuels.

#### Lancer Traefik

```bash
cd /opt/docker/compose/traefik
docker compose up -d
```

#### Lancer le Portfolio

```bash
cd /opt/docker/compose/portfolio
docker compose pull
docker compose up -d
```

---

### Kubernetes (prévu)

Les manifests Kubernetes sont dans :

```text
k8s/
```

Ils créent :

- un namespace `portfolio` ;
- un Deployment ;
- un Service ;
- un Ingress.

Application manuelle :

```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/
```

Vérification :

```bash
kubectl get all -n portfolio
kubectl get ingress -n portfolio
```

Le déploiement automatisé depuis GitHub Actions est prévu via `kubectl apply` et
le tag d'image GHCR correspondant à la version Semantic Release.

---

## Pipeline CI/CD actif

### Release, GHCR et deux cibles de déploiement

Les responsabilités GitHub Actions sont séparées dans trois workflows :

- `ci.yml` lance le lint, les tests de configuration Semantic Release, le build
  Next.js et le smoke test Docker sur les pull requests et les pushs vers
  `main` ;
- `release.yml` orchestre manuellement la validation, le versionnage puis le
  déploiement depuis `main` ;
- `deploy.yml` est appelé par le workflow de release pour publier l'image sur
  GHCR, puis mettre à jour le VPS et Azure Container Apps.

Le workflow manuel `azure-lab-check.yml` (**Azure Lab - Test OIDC**) permet en
complément de tester la connexion Azure et de lire la configuration de la
Container App. Il ne déploie aucune image et ne fait pas partie de la chaîne de release.

Un push sur `main` ne déploie donc plus directement en production. Pour publier
une version :

1. ouvrir l'onglet **Actions** du dépôt GitHub ;
2. sélectionner **Release** (`release.yml`) ;
3. cliquer sur **Run workflow** et sélectionner la branche `main` ;
4. attendre la validation du lint, des tests de configuration Semantic Release,
   du build et du smoke test Docker ;
5. laisser `semantic-release` analyser les commits Gitmoji et Conventional
   Commits depuis le dernier tag, mettre à jour `CHANGELOG.md`, créer le commit
   de release, le nouveau tag et la GitHub Release ;
6. laisser le workflow réutilisable publier l'image avec les tags `latest` et
   `<version>`, puis déployer cette version sur les deux cibles.

`release.yml` transmet `release_ref` (tag Git `v<version>`) et `image_tag`
(`<version>`) au workflow réutilisable, avec `secrets: inherit`.

| Job de `deploy.yml` | Runner | Dépendance | Action |
|--------------------|--------|------------|--------|
| `publish` | `ubuntu-latest` | Début du workflow appelé | Construit au tag de release et publie sur GHCR |
| `deploy-vps` | `[self-hosted, Linux, x64, portfolio-prod]` | `publish` | Met à jour la stack Compose sur le VPS |
| `deploy-azure` | `ubuntu-latest` | `publish` | Se connecte par OIDC et lance `az containerapp update --image` dans `azure-lab` |

Les deux déploiements peuvent s'exécuter en parallèle : Azure n'attend pas le
succès du VPS. Un échec sur une cible n'annule pas le déploiement de l'autre.

Le tag Git et la GitHub Release conservent le préfixe `v` (`v1.2.0`), tandis que
le tag Docker ne le contient pas (`1.2.0`). Le workflow de déploiement checkout
le tag Git créé afin que l'image, le fichier Compose et `CHANGELOG.md`
correspondent exactement au même commit de release.

Le workflow refuse explicitement une branche autre que `main`. Si aucun commit
ne justifie une nouvelle version, `semantic-release` ne crée pas de tag et le
déploiement est ignoré. Il ne publie aucun paquet npm.

### Convention des commits de release

Semantic Release accepte les messages au format Gitmoji officiel, en Unicode ou
en shortcode, ainsi que les Conventional Commits déjà utilisés dans le dépôt :

```text
💄 Add or update the navigation styles
🐛 (link): Fix the portfolio URL
:sparkles: Add a project section
feat: add a contact form
fix(nav): repair the mobile menu
```

Le premier type du message fait foi. `feat: ➕ Add a dependency` est donc une
fonctionnalité Conventional Commit, tandis que `➕ Add a dependency` suit la
règle Gitmoji. Le niveau de version provient du champ `semver` de la liste
officielle Gitmoji lorsqu'il est renseigné. Lorsqu'il est absent, le preset
`semantic-release-gitmoji-config` applique volontairement une version corrective
afin que chaque intention Gitmoji puisse déclencher une release :

| Intention | Version |
|-----------|---------|
| `💥` ou un breaking change (`!`, `BREAKING CHANGE(S)`) | majeure |
| `✨` | mineure |
| `🐛`, `💄`, `➕` et les autres Gitmojis marqués `patch` | corrective |
| `📝`, `♻️` et les Gitmojis sans niveau SemVer | corrective |

Lorsqu'une version est créée, les notes regroupent tous les Gitmojis reconnus
par intention. Les sélecteurs de variation Unicode sont normalisés : `⚡` et
`⚡️` ont le même comportement. La
liste et les niveaux de référence sont ceux du package officiel
[`gitmojis`](https://www.npmjs.com/package/gitmojis).

Les mêmes notes sont ajoutées en tête de `CHANGELOG.md`. Semantic Release crée
ensuite sur `main` un commit `chore(release): <version> [skip ci]` contenant
uniquement ce fichier, puis place le tag `v<version>` sur ce commit. Le marqueur
`[skip ci]` évite de relancer le workflow CI pour ce commit généré. Les règles de
protection de `main` doivent autoriser le `GITHUB_TOKEN` du workflow de release
à pousser ce commit ; sinon la release s'arrête avant la création du tag.

La GitHub Release est créée avant le déploiement, conformément au flux de
promotion choisi. Si la publication de l'image ou un déploiement échoue, la
release reste visible. Corriger la cause puis relancer le job échoué avec la
même version, ou appliquer le [rollback manuel](#rollback). Éviter de relancer
une version défaillante après son rollback : cela la redéploierait.

### Permissions GitHub Actions

Aucun Personal Access Token n'est utilisé par les workflows actuels. Les jobs
GitHub/GHCR utilisent le `GITHUB_TOKEN` temporaire ; le job Azure demande un
jeton OIDC. Les permissions déclarées sont :

- CI : `contents: read` ;
- Semantic Release : `contents: write` pour pousser `CHANGELOG.md` et le tag,
  `issues: write` et `pull-requests: write` ;
- publication GHCR : `contents: read` et `packages: write` ;
- déploiement VPS : `contents: read` et `packages: read` ;
- déploiement Azure : `id-token: write`.

Le job appelant `deploy` dans `release.yml` autorise `contents: read`,
`packages: write` et `id-token: write`. Le workflow réutilisable ne peut pas
augmenter ces permissions ; chacun de ses jobs les réduit à ses besoins.

Les droits sur les issues et les pull requests permettent au plugin GitHub de
Semantic Release de publier ses commentaires de succès ou d'échec. Le dépôt
peut conserver les permissions par défaut du `GITHUB_TOKEN` en lecture seule :
les élévations nécessaires sont limitées aux jobs concernés.

### Authentification du VPS et du registre GHCR

Le runner `portfolio-prod` travaille directement sur la VM et se connecte à
GHCR avec `docker/login-action@v3` et le `GITHUB_TOKEN` à chaque déploiement.
Le pipeline actuel n'utilise pas les anciens secrets `VPS_HOST`, `VPS_USER`,
`VPS_SSH_KEY`, `VPS_PORT`, `VPS_DEPLOY_PATH`, `GHCR_USERNAME` ou `GHCR_TOKEN`.
Le dossier `/opt/docker/compose/portfolio` est défini dans `deploy.yml`.

Azure récupère la même image `ghcr.io/teopartesi/portfolio:<version>`, avec le
tag Semantic Release sans `v`. Aucun identifiant GHCR n'est transmis à Azure
par ce pipeline : l'image doit être publique, ou la Container App doit disposer
au préalable d'une authentification de registre adaptée à une image privée
(par exemple un identifiant GitHub avec `read:packages`). Le jeton OIDC Azure
autorise les opérations Azure, pas le téléchargement d'une image GHCR privée.

Conserver les tags des versions connues comme stables pour le rollback.
`latest` est publié pour les essais manuels ; changer ce tag sur GHCR ne
déclenche pas à lui seul un redéploiement Azure.

### Environnement `azure-lab` et OIDC

Dans **Settings → Environments → azure-lab**, renseigner les secrets lus par
`azure/login@v3` :

| Secret | Rôle |
|--------|------|
| `AZURE_CLIENT_ID` | Identifiant de l'application/identité Entra autorisée à déployer |
| `AZURE_TENANT_ID` | Identifiant du tenant Entra |
| `AZURE_SUBSCRIPTION_ID` | Identifiant de l'abonnement contenant le lab |

Le job `deploy-azure` déclare lui-même `environment: azure-lab` et reçoit les
secrets de cet environnement. OIDC échange un jeton GitHub contre un accès
Azure temporaire ; aucun `AZURE_CLIENT_SECRET` n'est nécessaire.

L'identité Entra doit posséder une fédération avec GitHub et les droits Azure
RBAC de lecture/mise à jour de la Container App, limités au périmètre du lab.
La fédération doit correspondre exactement à l'émetteur
`https://token.actions.githubusercontent.com`, à l'audience
`api://AzureADTokenExchange` et au sujet du job. Avec le format de sujet
historique de GitHub, celui-ci est
`repo:teopartesi/portfolio:environment:azure-lab`. Si le dépôt utilise un sujet
personnalisé ou le format avec identifiants immuables, adapter la fédération au
`sub` réellement émis. Un sujet limité à `ref:refs/heads/main` ne correspond
pas au sujet standard d'un job qui déclare un environnement.

Configurer les règles de déploiement de `azure-lab` pour autoriser `main`,
branche de lancement de la release. Le checkout du tag de release ne change
pas cette branche d'exécution. Les éventuelles validations de l'environnement
s'appliquent avant le démarrage du job Azure.

### Révision Azure et limites du pipeline

Le job installe/met à jour l'extension CLI `containerapp`, puis exécute
`az containerapp update` avec le nom, le groupe de ressources et l'image
ci-dessus. Un changement d'image crée une révision ; son nom est généré par
Azure, car aucun suffixe n'est fixé par le workflow.

L'étape **Show Azure deployment** affiche :

- `image` : image du modèle courant (`properties.template.containers[0].image`) ;
- `revision` : dernière révision créée (`properties.latestRevisionName`) ;
- `revisionPrete` : dernière révision prête (`properties.latestReadyRevisionName`).

Ces deux noms de révision peuvent différer pendant le déploiement ou en cas
d'échec. Le workflow affiche ces valeurs sans imposer leur égalité, sans test
HTTP sur le site Azure et sans rollback automatique.

Le mode des révisions et les poids de trafic restent ceux de la Container App :
le workflow ne les configure pas. En mode `Single`, Azure bascule lorsque la
nouvelle révision est prête et garde l'ancienne si la nouvelle ne le devient
pas. En mode `Multiple`, vérifier les règles de trafic ; créer une révision
ne garantit pas qu'elle reçoit les requêtes. La procédure ci-dessous permet
de contrôler l'état et de choisir le rollback approprié.

### Kubernetes (prévu)

Une fois l'automatisation en place, GitHub Actions construira et publiera
l'image Docker, puis mettra à jour le Deployment Kubernetes avec le tag de
version.

---

## Vérifications

### Conteneurs du VPS

```bash
docker ps
```

### Logs du Portfolio

```bash
docker logs portfolio
```

### Logs Traefik

```bash
docker logs traefik
```

---

### Azure : image, révisions et accès HTTP

Depuis Azure Cloud Shell ou un terminal Azure CLI connecté avec les droits sur
le lab, sélectionner l'abonnement concerné puis consulter l'état. Remplacer
le paramètre d'abonnement avant exécution.

```bash
az account set --subscription "<ID_ABONNEMENT_LAB>"
az extension add --name containerapp --upgrade --only-show-errors

AZURE_RESOURCE_GROUP=rg-portfolio-cloud-lab
AZURE_CONTAINER_APP=ca-portfolio-lab-hello

az containerapp show \
  --name "$AZURE_CONTAINER_APP" \
  --resource-group "$AZURE_RESOURCE_GROUP" \
  --query '{image:properties.template.containers[0].image, revision:properties.latestRevisionName, revisionPrete:properties.latestReadyRevisionName, mode:properties.configuration.activeRevisionsMode, fqdn:properties.configuration.ingress.fqdn, port:properties.configuration.ingress.targetPort, trafic:properties.configuration.ingress.traffic}' \
  --output json

az containerapp revision list \
  --name "$AZURE_CONTAINER_APP" \
  --resource-group "$AZURE_RESOURCE_GROUP" \
  --all \
  --query '[].{revision:name, active:properties.active, image:properties.template.containers[0].image, provisioning:properties.provisioningState, sante:properties.healthState, trafic:properties.trafficWeight}' \
  --output table

AZURE_FQDN=$(az containerapp show \
  --name "$AZURE_CONTAINER_APP" \
  --resource-group "$AZURE_RESOURCE_GROUP" \
  --query properties.configuration.ingress.fqdn --output tsv)
curl --fail --show-error --location --max-time 120 "https://${AZURE_FQDN}/" --output /dev/null
```

Vérifier l'image de la révision qui reçoit le trafic, sa disponibilité et le
rendu du portfolio dans le navigateur. Un code HTTP 200 ne suffit pas à
identifier la version servie. Conserver le tag d'image et le nom de la dernière
révision validée avant une nouvelle release.

## Rollback

Le rollback est manuel et propre à chaque cible. Utiliser une version GHCR
déjà publiée et validée, jamais `latest`, et attendre la fin de tout déploiement
en cours avant d'intervenir. Les exemples utilisent `1.5.0` à titre indicatif :
remplacer cette valeur par la version stable retenue.

### Azure Container Apps

Reprendre la session et les variables de la section de vérification Azure.
Consulter le mode des révisions et la liste complète (`--all`) avant de choisir
l'une des procédures suivantes.

**Mode `Single` : redéployer le tag stable.**

```bash
ROLLBACK_VERSION=1.5.0
az containerapp update \
  --name "$AZURE_CONTAINER_APP" \
  --resource-group "$AZURE_RESOURCE_GROUP" \
  --image "ghcr.io/teopartesi/portfolio:${ROLLBACK_VERSION}" \
  --output none
```

Le changement d'image produit une nouvelle révision avec l'ancienne image,
sans reconstruire ni republier celle-ci. Attendre qu'elle soit prête, puis
reprendre les vérifications Azure et HTTP ci-dessus.

**Mode `Multiple` : remettre le trafic sur une révision stable conservée.**

Choisir son nom exact dans la liste, vérifier son image, puis l'activer si elle
est inactive :

```bash
GOOD_REVISION="<NOM_REVISION_STABLE>"
az containerapp revision activate \
  --name "$AZURE_CONTAINER_APP" \
  --resource-group "$AZURE_RESOURCE_GROUP" \
  --revision "$GOOD_REVISION"
```

Contrôler sa disponibilité dans la liste des révisions avant de lui attribuer
100 % du trafic de l'ingress :

```bash
az containerapp ingress traffic set \
  --name "$AZURE_CONTAINER_APP" \
  --resource-group "$AZURE_RESOURCE_GROUP" \
  --revision-weight "${GOOD_REVISION}=100"
```

Si la révision a été supprimée, redéployer le tag stable comme ci-dessus, puis
utiliser le nom de la nouvelle révision prête pour la bascule de trafic.
Revérifier les poids et l'accès HTTP. En mode `Multiple`, un poids fixé à un
nom de révision reste fixé après les releases suivantes : prévoir la prochaine
bascule, puisque le pipeline ne modifie pas ces poids. Les éventuelles URL de
labels se gèrent séparément du trafic de l'ingress principal.

Un retour d'image/révision ne restaure pas la configuration globale de l'app
(ingress, secrets, identifiants de registre). Conserver aussi les anciennes
images GHCR, car une révision conservée peut devoir les télécharger à nouveau.

### VPS Scaleway

Sur le VPS, modifier seulement `IMAGE_TAG` dans
`/opt/docker/compose/portfolio/.env` pour y mettre la version stable sans `v`,
puis exécuter :

```bash
cd /opt/docker/compose/portfolio
docker compose config --quiet
docker compose pull
docker compose up -d --remove-orphans
docker compose ps
curl --fail --show-error --location --max-time 120 https://teopartesi.fr/ --output /dev/null
```

Si le fichier Compose a aussi changé de façon incompatible, reprendre
`compose.prod.yaml` au tag Git de la version stable. Un rollback Azure ne
modifie pas le VPS et réciproquement. La prochaine release déploiera sa nouvelle
version sur les deux cibles.

---

## HTTPS

Sur le VPS, le certificat SSL est généré automatiquement par Let's Encrypt dès que :

- le domaine pointe vers la VPS ;
- les ports 80 et 443 sont accessibles.

Sur Azure, l'accès HTTPS utilise l'ingress de la Container App et son FQDN ;
la configuration Traefik/Let's Encrypt du VPS ne s'y applique pas.

La configuration Ingress Controller + TLS Kubernetes reste un travail prévu.

## Références

- [GitHub : OIDC avec Azure](https://docs.github.com/en/actions/how-tos/secure-your-work/security-harden-deployments/oidc-in-azure)
- [GitHub : sujets OIDC](https://docs.github.com/en/actions/reference/security/oidc)
- [Azure : révisions et modes de déploiement](https://learn.microsoft.com/en-us/azure/container-apps/revisions)
- [Azure : gestion des révisions](https://learn.microsoft.com/en-us/azure/container-apps/revisions-manage)
- [Azure CLI : révisions](https://learn.microsoft.com/en-us/cli/azure/containerapp/revision)
- [Azure CLI : répartition du trafic](https://learn.microsoft.com/en-us/cli/azure/containerapp/ingress/traffic)
