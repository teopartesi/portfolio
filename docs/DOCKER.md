# 🐳 Docker

Ce document décrit comment le portfolio est conteneurisé avec Docker et comment gérer son cycle de vie en production.

---

## Présentation

Le portfolio est exécuté dans un conteneur Docker afin de garantir un environnement proche entre le développement, la CI et la production.

L'image est aussi construite et publiée par GitHub Actions sur GitHub Container Registry (GHCR).

---

## Dockerfile

Le Dockerfile utilise une stratégie **multi-stage build**.

### Étapes

1. Installation des dépendances
2. Build de l'application Next.js
3. Création d'une image légère de production

Cette approche permet de réduire la taille finale de l'image tout en améliorant les performances de déploiement.

L'application Next.js utilise `output: "standalone"` afin de produire une image de production plus légère.

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

La CI publie l'image sur GHCR avec deux tags :

```text
ghcr.io/teopartesi/portfolio:<commit-sha>
ghcr.io/teopartesi/portfolio:latest
```

Le tag `<commit-sha>` permet de déployer une version précise et reproductible.
La production utilise ce tag de commit via `IMAGE_TAG`.
Le tag `latest` sert de référence simple pour les tests manuels.

---

## Bonnes pratiques

- Utiliser un Dockerfile multi-stage.
- Construire une image de production légère.
- Éviter d'exposer directement le port de l'application.
- Utiliser un reverse proxy pour gérer le trafic entrant.
- Préférer un tag d'image immuable, comme le SHA Git, pour les déploiements automatisés.
