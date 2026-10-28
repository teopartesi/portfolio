# 🐳 Docker

Ce document décrit comment le portfolio est conteneurisé avec Docker et comment gérer son cycle de vie en production.

---

## Présentation

Le portfolio est exécuté dans un conteneur Docker afin de garantir un environnement proche entre le développement, la CI et la production.

Dans `ci.yml`, le job `build-docker` construit l'image locale
`portfolio:<commit SHA>` depuis le Dockerfile et la scanne avec Trivy. Après
son succès, `docker-smoke` reconstruit l'image et teste sa réponse HTTP : les
jobs GitHub Actions ne partagent pas leur daemon Docker. Le scan ne nécessite
ni publication préalable ni connexion à GHCR. Les seuils, rapports SARIF et
commandes de reproduction sont décrits dans [SECURITY.md](./SECURITY.md).

Sa publication sur GitHub Container Registry
(GHCR) intervient uniquement lorsqu'une release est déclenchée manuellement
depuis la branche `main`.

---

## Dockerfile

Le Dockerfile utilise une stratégie **multi-stage build**.

L'image de base `node:24.18.0-alpine` est épinglée directement dans le premier
`FROM`. Cette forme permet à Dependabot de détecter sa version : les images
référencées via un `ARG` ne sont pas mises à jour par l'écosystème Docker de
Dependabot. Les autres stages héritent tous de ce stage `base`.

### Étapes

1. Installation des dépendances
2. Build de l'application Next.js
3. Création d'une image légère de production

Cette approche permet de réduire la taille finale de l'image tout en améliorant les performances de déploiement.

L'application Next.js utilise `output: "standalone"` afin de produire une image de production plus légère.

Le stage final `runner` met à jour les paquets Alpine `libcrypto3` et
`libssl3` pour intégrer les correctifs OpenSSL disponibles. Il retire npm et
npx, car le conteneur démarre directement avec `node server.js`. npm reste
disponible dans les stages `deps` et `builder` pour installer et compiler
l'application. Cette séparation retire de l'image de production les
dépendances du gestionnaire de paquets inutilisées à l'exécution.

Next.js et Sharp sont épinglés à des versions corrigées dans `package.json`
et `package-lock.json`. Après une mise à jour, reconstruire l'image et
relancer Trivy : un rapport généré pour une ancienne image ne change pas.

### Mises à jour Dependabot

La configuration [`.github/dependabot.yml`](../.github/dependabot.yml) vérifie
l'image de base Docker chaque lundi à 09:00, heure de Paris. Les mises à jour
mineures et correctives sont regroupées ; une mise à jour majeure reste isolée
afin que son impact puisse être vérifié séparément.

Chaque pull request Docker repasse par la CI : construction de l'image, scan
Trivy et smoke test HTTP. Dependabot ne modifie que le premier `FROM` d'un
Dockerfile multi-stage ; il faut donc conserver l'image versionnée dans le stage
`base` partagé si la structure du Dockerfile évolue.

---

## Construction locale

```bash
docker build -t portfolio:local .
```

Avec Docker Compose :

```bash
docker compose build
```

---

## Démarrage

```bash
docker compose up -d
```

L'application est ensuite disponible sur :

```text
http://localhost:3000
```

---

## Production VPS

Le fichier `compose.prod.yaml` est destiné à la VM.
Il ne contient pas de `build`.
Il utilise directement l'image publiée sur GHCR :

```text
ghcr.io/teopartesi/portfolio:${IMAGE_TAG:-latest}
```

Exemple manuel sur la VM :

```bash
cd /opt/docker/compose/portfolio
docker compose pull
docker compose up -d
```

Si l'image GHCR est privée, la VM doit être authentifiée :

```bash
echo "$GHCR_TOKEN" | docker login ghcr.io -u "$GHCR_USERNAME" --password-stdin
```

Cette authentification se fait une seule fois sur la VM.
Docker la conserve dans `~/.docker/config.json`, ce qui évite de refaire un `docker login` à chaque déploiement.

---

## Reconstruction

Après une modification du code :

```bash
docker compose up --build -d
```

---

## Vérifications

### Conteneurs

```bash
docker ps
```

### Images

```bash
docker images
```

### Logs

```bash
docker logs portfolio
```

---

## Registry

Le workflow de déploiement publie l'image sur GHCR avec deux tags :

```text
ghcr.io/teopartesi/portfolio:<version>
ghcr.io/teopartesi/portfolio:latest
```

Le tag `<version>` correspond à la version Semantic Release sans préfixe `v`,
par exemple `1.2.0`. Il est immuable et permet de déployer une version précise
et reproductible. La production utilise ce tag via `IMAGE_TAG`.
Le tag `latest` sert de référence simple pour les tests manuels.

---

## Bonnes pratiques

- Utiliser un Dockerfile multi-stage.
- Construire une image de production légère.
- Éviter d'exposer directement le port de l'application.
- Utiliser un reverse proxy pour gérer le trafic entrant.
- Utiliser le tag de version Semantic Release comme référence immuable pour les
  déploiements automatisés.
