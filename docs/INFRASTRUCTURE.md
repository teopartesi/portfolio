# 🏗 Infrastructure

Ce document décrit l'infrastructure utilisée pour héberger le portfolio.

---

## Architecture cible Docker/Traefik

```text
                        Internet
                             │
                             ▼
                     teopartesi.fr
                             │
                      Scaleway DNS
                             │
                     51.159.24.182
                             │
                     Ubuntu 24.04 VPS
                             │
                        Traefik
                             │
                  Docker Network (proxy)
                             │
                     Portfolio Next.js
```

---

## Architecture cible Kubernetes

```text
                        Internet
                             │
                             ▼
                     teopartesi.fr
                             │
                      Scaleway DNS
                             │
                     51.159.24.182
                             │
                     Ubuntu 24.04 VPS
                             │
                            k3s
                             │
                    Namespace portfolio
                             │
        Ingress ── Service ── Deployment ── Pod
                             │
                             ▼
                     Portfolio Next.js
```

---

## Serveur

### Fournisseur

- Scaleway

### Configuration

- Ubuntu 24.04 LTS
- 2 vCPU
- 2 Go de RAM

### Rôle

La VM Scaleway sert de cible pour :

- l'apprentissage du déploiement Docker/Traefik ;
- la préparation d'un cluster k3s ;
- le futur déploiement automatisé depuis GitHub Actions.

---

## Réseau Docker

Un réseau Docker partagé permet à Traefik de communiquer avec les différentes applications.

Nom du réseau :

```text
proxy
```

---

## Kubernetes

Les manifests Kubernetes sont stockés dans :

```text
k8s/
```

Ressources actuelles :

- `Namespace` : `portfolio`
- `Deployment` : `portfolio`
- `Service` : `portfolio`
- `Ingress` : `portfolio`

L'image utilisée vient de GHCR :

```text
ghcr.io/teopartesi/portfolio
```

---

## Domaine

Le domaine utilisé est :

```text
teopartesi.fr
```

Les enregistrements DNS pointent vers l'adresse IP publique de la VPS.

---

## Sécurité

Les seuls ports exposés sont :

- 80 (HTTP)
- 443 (HTTPS)

Le port 3000 de l'application n'est jamais exposé directement sur Internet.

Le port Kubernetes API `6443` ne doit être exposé que si nécessaire pour l'automatisation du déploiement, et idéalement avec une restriction d'accès.

---

## Technologies

- Ubuntu
- Docker
- Docker Compose
- Traefik
- Kubernetes / k3s
- Next.js
- Let's Encrypt
- Scaleway

---

## Évolutions possibles

- Déploiement automatique avec GitHub Actions.
- Registry d'images avec GitHub Container Registry.
- Monitoring avec Prometheus et Grafana.
- Centralisation des logs avec Loki.
- Helm chart pour remplacer les manifests bruts.
