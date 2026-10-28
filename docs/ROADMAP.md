# 🛣 Roadmap

Ce document présente les évolutions prévues pour améliorer l'infrastructure et le processus de déploiement du portfolio.

---

## CI/CD

- [x] Validation automatique des pull requests et de `main`
- [x] Build automatique des images Docker
- [x] Publication des images sur GitHub Container Registry (GHCR)
- [x] Release manuelle et déploiement GitHub Actions sur la VPS

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
- [x] Scanner les images Docker avec Trivy dans la CI et conserver les rapports SARIF
- [ ] Vérifier ou activer l'intégration GitHub et le PR gating Aikido
- [ ] Ajouter l'analyse SonarQube et valider le Quality Gate
- [ ] Ajouter Semgrep et définir les règles bloquantes
- [ ] Intégrer les contrôles complémentaires à la validation de release
- [x] Renouvellement automatique des dépendances npm, GitHub Actions et Docker avec Dependabot

---

## Conteneurisation

- [x] Optimiser les images Docker
- [x] Ajouter des healthchecks
- [ ] Réduire le temps de build

---

## Orchestration

- [x] Ajouter les manifests Kubernetes de base
- [x] Ajouter un namespace Kubernetes dédié
- [ ] Déployer sur k3s
- [ ] Déploiement avec Helm
- [ ] Gestion des secrets Kubernetes
- [ ] Mise en place d'un Ingress Controller

---

## Documentation

- [ ] Ajouter des diagrammes d'architecture
- [x] Documenter le pipeline CI/CD
- [x] Documenter Trivy et les procédures d’ajout d’Aikido, SonarQube et Semgrep dans [SECURITY.md](./SECURITY.md)
- [ ] Documenter la procédure de restauration
- [ ] Ajouter un guide de contribution
