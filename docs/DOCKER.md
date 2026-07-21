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
Le tag `latest` sert de référence simple pour les tests et les premiers déploiements.

---

## Bonnes pratiques

- Utiliser un Dockerfile multi-stage.
- Construire une image de production légère.
- Éviter d'exposer directement le port de l'application.
- Utiliser un reverse proxy pour gérer le trafic entrant.
- Préférer un tag d'image immuable, comme le SHA Git, pour les déploiements automatisés.
