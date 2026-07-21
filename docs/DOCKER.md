# 🐳 Docker

Ce document décrit comment le portfolio est conteneurisé avec Docker et comment gérer son cycle de vie en production.

---

## Présentation

Le portfolio est exécuté dans un conteneur Docker afin de garantir un environnement identique entre le développement et la production.

---

## Dockerfile

Le Dockerfile utilise une stratégie **multi-stage build**.

### Étapes

1. Installation des dépendances
2. Build de l'application Next.js
3. Création d'une image légère de production

Cette approche permet de réduire la taille finale de l'image tout en améliorant les performances de déploiement.

---

## Construction de l'image

```bash
docker compose build
```

---

## Démarrage

```bash
docker compose up -d
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

## Bonnes pratiques

- Utiliser un Dockerfile multi-stage.
- Construire une image de production légère.
- Éviter d'exposer directement le port de l'application.
- Utiliser un reverse proxy pour gérer le trafic entrant.