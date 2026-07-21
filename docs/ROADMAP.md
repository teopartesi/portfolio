# 🛣 Roadmap

Ce document présente les évolutions prévues pour améliorer l'infrastructure et le processus de déploiement du portfolio.

---

## CI/CD

- [ ] Déploiement automatique avec GitHub Actions
- [ ] Build automatique des images Docker
- [ ] Publication des images sur GitHub Container Registry (GHCR)
- [ ] Déploiement automatique sur la VPS

---

## Infrastructure

- [ ] Ajouter un environnement de préproduction
- [ ] Utiliser des variables d'environnement sécurisées
- [ ] Automatiser les sauvegardes
- [ ] Améliorer la gestion des certificats

---

## Observabilité

- [ ] Monitoring avec Prometheus
- [ ] Dashboards Grafana
- [ ] Centralisation des logs avec Loki
- [ ] Alertes automatiques

---

## Sécurité

- [ ] Ajouter les en-têtes de sécurité HTTP
- [ ] Mettre en place Fail2Ban
- [ ] Scanner régulièrement les images Docker avec Trivy
- [ ] Renouvellement automatique des dépendances

---

## Conteneurisation

- [ ] Optimiser les images Docker
- [ ] Ajouter des healthchecks
- [ ] Réduire le temps de build

---

## Orchestration

- [ ] Migration vers Kubernetes
- [ ] Déploiement avec Helm
- [ ] Gestion des secrets Kubernetes
- [ ] Mise en place d'un Ingress Controller

---

## Documentation

- [ ] Ajouter des diagrammes d'architecture
- [ ] Documenter le pipeline CI/CD
- [ ] Documenter la procédure de restauration
- [ ] Ajouter un guide de contribution