# 🚀 Deployment Guide

Ce document décrit le déploiement en production du portfolio sur une VPS Scaleway avec Docker et Traefik.

---

## Architecture

```text
Internet
     │
     ▼
teopartesi.fr
     │
DNS (Scaleway)
     │
51.159.24.182
     │
Traefik
     │
Docker Network (proxy)
     │
Portfolio (Next.js)
```

---

## Infrastructure

### VPS

- Provider : Scaleway
- OS : Ubuntu 24.04 LTS
- Docker Engine
- Docker Compose

### Reverse Proxy

- Traefik v3.7
- HTTPS automatique avec Let's Encrypt
- Redirection HTTP → HTTPS

---

## Structure des dossiers

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

### Lancer Traefik

```bash
cd /opt/docker/compose/traefik
docker compose up -d
```

### Lancer le Portfolio

```bash
cd /opt/docker/compose/portfolio
docker compose up --build -d
```

---

## Mise à jour de l'application

```bash
cd /opt/docker/apps/portfolio

git pull

cd /opt/docker/compose/portfolio

docker compose up --build -d
```

---

## Vérifications

### Conteneurs

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

## HTTPS

Le certificat SSL est généré automatiquement par Let's Encrypt dès que :

- le domaine pointe vers la VPS ;
- les ports 80 et 443 sont accessibles.