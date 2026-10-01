<div align="center">

<img src="./public/images/icon.png" alt="Logo du portfolio de Téo Partesi" width="96">

# Portfolio · Téo Partesi

**DevOps · Développement web · Cloud**

Mon portfolio et mon projet de pratique DevOps : une application Next.js,
conteneurisée et déployée sur Scaleway et Azure Container Apps.

[🌐 Voir le portfolio](https://teopartesi.fr/) · [🚀 Démarrer en local](#-démarrer-en-local) · [📚 Documentation](#-documentation) · [👔 LinkedIn](https://www.linkedin.com/in/t%C3%A9o-partesi/)

<p>
  <a href="https://github.com/teopartesi/portfolio/actions/workflows/ci.yml?query=branch%3Amain+event%3Apush"><img src="https://img.shields.io/github/actions/workflow/status/teopartesi/portfolio/ci.yml?branch=main&amp;event=push&amp;style=flat&amp;label=CI%20%C2%B7%20main&amp;logo=githubactions&amp;logoColor=white&amp;labelColor=1f2937" alt="État de la CI sur les pushs vers main"></a>
  <a href="https://github.com/teopartesi/portfolio/actions/workflows/release.yml?query=branch%3Amain+event%3Aworkflow_dispatch"><img src="https://img.shields.io/github/actions/workflow/status/teopartesi/portfolio/release.yml?branch=main&amp;event=workflow_dispatch&amp;style=flat&amp;label=Release&amp;logo=githubactions&amp;logoColor=white&amp;labelColor=1f2937" alt="État du workflow de release lancé sur main"></a>
  <a href="https://github.com/teopartesi/portfolio/releases/latest"><img src="https://img.shields.io/github/v/release/teopartesi/portfolio?style=flat&amp;label=Version&amp;logo=github&amp;logoColor=white&amp;labelColor=1f2937&amp;color=0891b2" alt="Dernière version publiée sur GitHub"></a>
  <a href="https://github.com/teopartesi/portfolio/pkgs/container/portfolio"><img src="https://img.shields.io/badge/GHCR-images-2563eb?style=flat&amp;logo=docker&amp;logoColor=white&amp;labelColor=1f2937" alt="Images Docker du portfolio sur GHCR"></a>
</p>

</div>

## ✨ Le projet

- **Une vitrine personnelle** : présentation, compétences, projets et parcours.
- **Une interface sombre et responsive** : navigation adaptée au mobile et liens de contact accessibles depuis le pied de page.
- **Des aperçus pour le partage** : métadonnées SEO, sitemap, `robots.txt` et images Open Graph/Twitter.
- **Un projet DevOps concret** : contrôles CI, releases sémantiques, images Docker versionnées et deux cibles de déploiement.

## 🧰 Stack technique

<p>
  <a href="./package.json"><img src="https://img.shields.io/badge/Next.js-16-111827?style=flat&amp;logo=nextdotjs&amp;logoColor=white&amp;labelColor=1f2937" alt="Next.js 16"></a>
  <a href="./package.json"><img src="https://img.shields.io/badge/React-19-087ea4?style=flat&amp;logo=react&amp;logoColor=61dafb&amp;labelColor=1f2937" alt="React 19"></a>
  <a href="./package.json"><img src="https://img.shields.io/badge/TypeScript-5-3178c6?style=flat&amp;logo=typescript&amp;logoColor=white&amp;labelColor=1f2937" alt="TypeScript 5"></a>
  <a href="./package.json"><img src="https://img.shields.io/badge/Tailwind_CSS-4-0e7490?style=flat&amp;logo=tailwindcss&amp;logoColor=67e8f9&amp;labelColor=1f2937" alt="Tailwind CSS 4"></a>
</p>
<p>
  <a href="./docs/DOCKER.md"><img src="https://img.shields.io/badge/Docker-standalone-2563eb?style=flat&amp;logo=docker&amp;logoColor=white&amp;labelColor=1f2937" alt="Image Docker avec sortie Next.js standalone"></a>
  <a href="./docs/TRAEFIK.md"><img src="https://img.shields.io/badge/Traefik-HTTPS-0e7490?style=flat&amp;logo=traefikproxy&amp;logoColor=white&amp;labelColor=1f2937" alt="Traefik pour le routage HTTPS du VPS"></a>
  <a href="./infra/ansible/"><img src="https://img.shields.io/badge/Ansible-infrastructure-991b1b?style=flat&amp;logo=ansible&amp;logoColor=white&amp;labelColor=1f2937" alt="Playbooks Ansible pour l'infrastructure"></a>
  <a href="./release.config.mjs"><img src="https://img.shields.io/badge/semantic--release-Gitmoji-7c3aed?style=flat&amp;logo=semanticrelease&amp;logoColor=white&amp;labelColor=1f2937" alt="Semantic Release avec la configuration Gitmoji partagée"></a>
</p>

| Usage | Outils |
| --- | --- |
| Application | Next.js App Router, React, TypeScript et Tailwind CSS |
| Environnement local | Node.js **24.18.0** et npm **11.16.0**, épinglés dans [`mise.toml`](./mise.toml) |
| Qualité et versions | ESLint, GitHub Actions, Semantic Release et [configuration Gitmoji partagée](https://github.com/teopartesi/semantic-release-gitmoji-config) |
| Conteneurisation | Image Docker multi-stage, sortie Next.js `standalone`, utilisateur non-root et registre GHCR |
| Infrastructure | Docker Compose, Traefik / Let's Encrypt, playbooks Ansible et Azure Container Apps |

## ☁️ Hébergement

| Cible | Rôle | Déploiement |
| --- | --- | --- |
| **VPS Scaleway** | Production : [teopartesi.fr](https://teopartesi.fr/) | Environnement GitHub `portfolio-prod`, runner auto-hébergé, Docker Compose et Traefik |
| **Azure Container Apps** | Lab cloud | Environnement GitHub `azure-lab`, authentification OIDC et mise à jour de l'image de la Container App |
| **Kubernetes / k3s** | Cible d'apprentissage prévue | Manifests dans [`k8s/`](./k8s/), hors du pipeline actif |

La production et le lab reçoivent la **même image GHCR versionnée**. Les deux
déploiements peuvent s'exécuter en parallèle ; Azure n'est pas une étape de
préproduction qui conditionne le déploiement du VPS.

## 🔄 CI, releases et déploiement

La [CI](./.github/workflows/ci.yml) s'exécute sur les pull requests et les pushs
vers `main` : lint, tests de la configuration de release, build Next.js, puis
construction de l'image Docker et smoke test HTTP du conteneur.

La publication d'une version se lance **manuellement** avec le workflow
[Release](https://github.com/teopartesi/portfolio/actions/workflows/release.yml),
depuis `main` :

1. Le workflow rejoue les contrôles CI.
2. Semantic Release analyse les commits Gitmoji / Conventional Commits, puis crée le changelog, le tag `v<version>` et la GitHub Release si une nouvelle version est nécessaire.
3. Le [workflow de déploiement](./.github/workflows/deploy.yml) publie `ghcr.io/teopartesi/portfolio:<version>` et `latest`.
4. Le VPS et Azure déploient le tag **`<version>` sans le préfixe `v`**. Sur Azure, le changement d'image crée une révision.

Sans nouvelle release, la publication de l'image et le déploiement sont ignorés.
Le tag `latest` est une commodité pour les essais manuels ; les déploiements du
pipeline utilisent le tag de version. Un changement de `latest` ne redéploie pas
automatiquement la Container App.

Le rollback reste **manuel et indépendant pour chaque cible**. Les prérequis
OIDC, les vérifications et le retour vers une image ou une révision stable sont
détaillés dans le [guide de déploiement](./docs/DEPLOYMENT.md#rollback).

## 🚀 Démarrer en local

Prérequis : Git et [mise](https://mise.jdx.dev/getting-started.html).

```bash
git clone https://github.com/teopartesi/portfolio.git
cd portfolio
mise install
mise exec -- npm ci
mise exec -- npm run dev
```

Le site est ensuite accessible sur [localhost:3000](http://localhost:3000).
`mise exec --` utilise les versions de Node.js et npm déclarées dans le dépôt.

**Vérifier le projet**

```bash
mise exec -- npm run lint
mise exec -- npm run test:release-config
mise exec -- npm run build
```

**Tester le conteneur en local** — avec Docker et Docker Compose installés :

```bash
docker compose up --build
```

Le fichier [`compose.yaml`](./compose.yaml) construit l'image et expose le site
sur le port local `3000`. Arrêter le serveur de développement avant de lancer
ce conteneur pour libérer le port. Le fichier
[`compose.prod.yaml`](./compose.prod.yaml) est réservé au VPS derrière Traefik.

## 🗂️ Repères dans le dépôt

| Chemin | Contenu |
| --- | --- |
| [`app/`](./app/) | Pages, layout, métadonnées et routes API Next.js |
| [`components/`](./components/) | Navigation, sections du portfolio et composants d'interface |
| [`lib/data.ts`](./lib/data.ts) | Contenu du portfolio : profil, projets, parcours et liens |
| [`public/`](./public/) | Images et ressources statiques |
| [`.github/workflows/`](./.github/workflows/) | CI, release, déploiement et contrôle OIDC du lab Azure |
| [`infra/ansible/`](./infra/ansible/) | Inventaires et playbooks de préparation, d'audit et de déploiement |
| [`k8s/`](./k8s/) | Manifests Kubernetes pour la cible prévue |
| [`Dockerfile`](./Dockerfile) | Construction de l'image de production |
| [`docs/`](./docs/) | Guides d'exploitation et roadmap |

## 📚 Documentation

| Guide | Pour retrouver… |
| --- | --- |
| [Déploiement](./docs/DEPLOYMENT.md) | Pipeline, environnements, OIDC, révisions Azure, vérifications et rollback |
| [Infrastructure](./docs/INFRASTRUCTURE.md) | Architecture Scaleway / Azure, réseau et cible k3s |
| [Docker](./docs/DOCKER.md) | Image, conteneurs et commandes utiles |
| [Traefik](./docs/TRAEFIK.md) | Reverse proxy, routage et HTTPS |
| [Ansible](./infra/ansible/README.md) | Organisation et utilisation des playbooks |
| [Roadmap](./docs/ROADMAP.md) | Évolutions envisagées |
| [Changelog](./CHANGELOG.md) | Historique des versions généré par Semantic Release |

## 👤 Auteur

**Téo Partesi** — DevOps & Développeur Web

[🌐 Portfolio](https://teopartesi.fr/) · [💻 GitHub](https://github.com/teopartesi) · [👔 LinkedIn](https://www.linkedin.com/in/t%C3%A9o-partesi/) · [📷 Instagram](https://www.instagram.com/teo_partesi/)
