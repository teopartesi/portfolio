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
En production, le tag déployé est la version Semantic Release sans préfixe `v`,
par exemple `1.2.0`. Ce tag est immuable. Le tag `latest` reste utile pour des
tests manuels.

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

Le déploiement automatisé depuis GitHub Actions est prévu via `kubectl apply` et
le tag d'image GHCR correspondant à la version Semantic Release.

---

## Pipeline CI/CD actif

### Docker Compose

Les responsabilités GitHub Actions sont séparées dans trois workflows :

- `ci.yml` lance le lint, le build Next.js et le smoke test Docker sur les pull
  requests et les pushs vers `main` ;
- `release.yml` orchestre manuellement la validation, le versionnage puis le
  déploiement depuis `main` ;
- `deploy.yml` est appelé par le workflow de release pour publier l'image sur
  GHCR et mettre à jour le VPS.

Un push sur `main` ne déploie donc plus directement en production. Pour publier
une version :

1. ouvrir l'onglet **Actions** du dépôt GitHub ;
2. sélectionner **Portfolio Release** ;
3. cliquer sur **Run workflow** et sélectionner la branche `main` ;
4. attendre la validation du lint, du build et du smoke test Docker ;
5. laisser `semantic-release` analyser les Conventional Commits depuis le
   dernier tag et créer le nouveau tag ainsi que la GitHub Release ;
6. laisser le workflow réutilisable publier l'image avec les tags `latest` et
   `<version>`, puis déployer cette version sur le VPS.

Le tag Git et la GitHub Release conservent le préfixe `v` (`v1.2.0`), tandis que
le tag Docker ne le contient pas (`1.2.0`). Le SHA reste utilisé pour checkout
exactement le code de la release, mais il n'est plus publié comme tag d'image.

Le workflow refuse explicitement une branche autre que `main`. Si aucun commit
ne justifie une nouvelle version, `semantic-release` ne crée pas de tag et le
déploiement est ignoré. Il ne publie aucun paquet npm.

La GitHub Release est créée avant le déploiement, conformément au flux de
promotion choisi. Si la publication de l'image ou le déploiement VPS échoue, la
release reste donc visible ; il faut corriger la cause puis relancer le job de
déploiement échoué dans GitHub Actions.

### Permissions GitHub Actions

Aucun Personal Access Token n'est nécessaire dans les secrets du dépôt. Chaque
job utilise le `GITHUB_TOKEN` temporaire créé automatiquement par GitHub avec
les permissions minimales déclarées dans les workflows :

- CI : `contents: read` ;
- Semantic Release : `contents: write`, `issues: write` et
  `pull-requests: write` ;
- publication GHCR : `contents: read` et `packages: write`.

Les droits sur les issues et les pull requests permettent au plugin GitHub de
Semantic Release de publier ses commentaires de succès ou d'échec. Le dépôt
peut conserver les permissions par défaut du `GITHUB_TOKEN` en lecture seule :
les élévations nécessaires sont limitées aux jobs concernés.

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
Ce PAT appartient uniquement à la VM et n'est pas utilisé par Semantic Release.

### Kubernetes

Une fois l'automatisation en place, GitHub Actions construira et publiera
l'image Docker, puis mettra à jour le Deployment Kubernetes avec le tag de
version.

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
