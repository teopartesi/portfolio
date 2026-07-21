# 🚀 Deployment Guide

Ce document décrit la stratégie de déploiement du portfolio.

L'infrastructure cible est une VPS Scaleway. Le projet contient actuellement deux pistes :

- Docker Compose + Traefik pour un déploiement simple sur VPS ;
- Kubernetes/k3s pour la suite de l'apprentissage DevOps.

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

La cible Kubernetes en cours de préparation suit plutôt ce flux :

```text
GitHub Actions
     │
     ▼
GHCR
     │
     ▼
VPS Scaleway
     │
     ▼
k3s
     │
     ▼
Namespace portfolio
     │
     ▼
Deployment / Service / Ingress
```

---

## Infrastructure cible

### VPS

- Provider : Scaleway
- OS : Ubuntu 24.04 LTS
- Docker Engine
- Docker Compose
- k3s prévu pour le déploiement Kubernetes

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

### Docker Compose

Le déploiement VPS ne reconstruit plus l'application depuis un clone Git.
La VM récupère l'image publiée sur GHCR et lance `compose.prod.yaml`.
En production, le tag déployé est le SHA du commit. Le tag `latest` reste utile pour des tests manuels.

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

### Kubernetes

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

Le déploiement automatisé depuis GitHub Actions est prévu via `kubectl apply` et le tag d'image GHCR correspondant au commit.

---

## Mise à jour de l'application

### Docker Compose

La mise à jour Docker Compose est automatisée par GitHub Actions après un push sur `main` :

- build et smoke test de l'image Docker ;
- publication sur GHCR avec les tags `latest` et SHA Git ;
- connexion SSH à la VM ;
- copie du fichier Compose de production ;
- écriture du `.env` avec `IMAGE_TAG=<sha du commit>` ;
- `docker compose pull` ;
- `docker compose up -d --remove-orphans`.

La VM doit disposer des secrets GitHub Actions suivants :

- `VPS_HOST` : adresse IP ou domaine de la VM ;
- `VPS_USER` : utilisateur SSH ;
- `VPS_SSH_KEY` : clé privée SSH utilisée par GitHub Actions ;
- `VPS_PORT` : port SSH, optionnel si `22` ;
- `VPS_DEPLOY_PATH` : dossier de déploiement, optionnel si `/opt/docker/compose/portfolio`.

Si l'image GHCR est privée, la VM doit être authentifiée une seule fois avec un PAT GitHub ayant `read:packages` :

```bash
echo "$GHCR_TOKEN" | docker login ghcr.io -u "$GHCR_USERNAME" --password-stdin
```

Docker stocke ensuite l'authentification dans `~/.docker/config.json`, et les déploiements suivants peuvent faire `docker compose pull` sans refaire de login.

### Kubernetes

Une fois l'automatisation en place, GitHub Actions construira et publiera l'image Docker, puis mettra à jour le Deployment Kubernetes avec le tag du commit.

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

La configuration Ingress Controller + TLS est suivie dans l'issue dédiée.
