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

#### Lancer Traefik

```bash
cd /opt/docker/compose/traefik
docker compose up -d
```

#### Lancer le Portfolio

```bash
cd /opt/docker/compose/portfolio
docker compose up --build -d
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

```bash
cd /opt/docker/apps/portfolio

git pull

cd /opt/docker/compose/portfolio

docker compose up --build -d
```

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
