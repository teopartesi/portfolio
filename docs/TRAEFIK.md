# 🌐 Traefik

Ce document présente la configuration de Traefik, utilisé comme reverse proxy pour exposer le portfolio en HTTPS.

---

## Présentation

Traefik est utilisé pour :

- découvrir automatiquement les conteneurs Docker ;
- router les requêtes vers les bonnes applications ;
- générer automatiquement les certificats SSL avec Let's Encrypt.

---

## Architecture

```text
Internet
      │
      ▼
Traefik
      │
Docker Network (proxy)
      │
Portfolio
```

---

## Labels utilisés

```yaml
labels:
  - traefik.enable=true
  - traefik.http.services.portfolio.loadbalancer.server.port=3000
  - traefik.http.routers.portfolio.rule=Host(`teopartesi.fr`)
  - traefik.http.routers.portfolio.entrypoints=websecure
  - traefik.http.routers.portfolio.tls.certresolver=letsencrypt
```

---

## Explication des labels

### traefik.enable

Autorise Traefik à détecter automatiquement le conteneur.

### loadbalancer.server.port

Indique le port interne utilisé par l'application.

### router.rule

Associe le nom de domaine au conteneur.

### entrypoints

Force l'utilisation de l'entrée HTTPS.

### certresolver

Permet la génération automatique du certificat Let's Encrypt.

---

## Gestion des logs

Afficher les logs :

```bash
docker logs traefik
```

---

## Redémarrage

```bash
docker compose restart
```

---

## Bonnes pratiques

- Utiliser un réseau Docker partagé.
- Ne pas exposer directement les applications.
- Centraliser la gestion du HTTPS avec Traefik.
- Renouveler automatiquement les certificats Let's Encrypt.