# 🏗 Infrastructure

Ce document décrit l'infrastructure utilisée pour héberger le portfolio.

---

## Architecture

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

## Serveur

### Fournisseur

- Scaleway

### Configuration

- Ubuntu 24.04 LTS
- 2 vCPU
- 2 Go de RAM

---

## Réseau Docker

Un réseau Docker partagé permet à Traefik de communiquer avec les différentes applications.

Nom du réseau :

```text
proxy
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

---

## Technologies

- Ubuntu
- Docker
- Docker Compose
- Traefik
- Next.js
- Let's Encrypt
- Scaleway

---

## Évolutions possibles

- Déploiement automatique avec GitHub Actions.
- Registry d'images avec GitHub Container Registry.
- Monitoring avec Prometheus et Grafana.
- Centralisation des logs avec Loki.
- Migration vers Kubernetes.