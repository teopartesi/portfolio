export const siteMetadata = {
  url: "https://teopartesi.fr",
  name: "Portfolio de Téo Partesi",
  title: "Téo Partesi | DevOps & Développeur Web",
  description:
    "Portfolio de Téo Partesi, ingénieur DevOps et développeur web : projets Next.js, automatisation CI/CD, Docker, cloud et déploiements fiables.",
  author: "Téo Partesi",
  locale: "fr_FR",
} as const;

export const profile = {
  name: "Téo PARTESI",
  role: "DevOps Engineer ⚙️ / Développeur Web 💻",
  location: "France",
  email: "teopartesi@hotmail.com",
  tagline:
    "Je conçois des interfaces web propres et des environnements cloud fiables, avec une approche orientée automatisation, qualité et déploiements versionnés.",
  summary:
  "Ce portfolio est aussi mon terrain de pratique DevOps : une application Next.js conteneurisée, avec une chaîne CI/CD GitHub Actions pour les contrôles, les releases et les déploiements. Elle est hébergée sur un VPS Scaleway derrière Traefik et également déployée sur Azure Container Apps dans un environnement de lab. J’utilise Ansible pour automatiser la préparation et la configuration de l’infrastructure.",
};

export const navigation = [
  { label: "👋 À propos", href: "#about" },
  { label: "🧰 Compétences", href: "#skills" },
  { label: "🚀 Projets", href: "#projects" },
  { label: "🧭 Parcours", href: "#experience" },
];

export const skills = [
  {
    category: "DevOps",
    items: [
      "🐧 Linux",
      "🐳 Docker",
      "⚡ GitHub Actions",
      "🦊 Gitlab CI/CD",
      "☸️ Kubernetes",
      "⛵ Helm",
      "🏷️ Semantic Release",
      "🤖 Ansible",
      "🔐Vault",
    ],
  },
  {
    category: "Cloud & Infra",
    items: [
      "☁️ Scaleway",
      "☁️ Azure Container Apps",
      "🏗️ OpenStack",
      "🧱 Terraform — notions",
      "🔑 Authentification OIDC",
      "📦 Docker Compose",
      "🗃️ GHCR",
      "🔀 Traefik",
      "🔒 Let's Encrypt",
    ],
  },
  {
    category: "Développement Web",
    items: [
      "▲ Next.js",
      "🔷 TypeScript",
      "⚛️ React",
      "🎨 Tailwind CSS",
      "☕ Java",
      "🌱 Spring Boot",
      "🅰️ Angular",
      "🐘 PostgreSQL",
      "🔗 API REST",
    ],
  },
];

export const projects = [
  {
    title: "🚀 Portfolio Next.js en production",
    description:
      "Application responsive construite avec Next.js 16, conteneurisée dans une image standalone et publiée en HTTPS sur teopartesi.fr.",
    tags: ["Next.js", "TypeScript", "Docker"],
    links: [
      { label: "🌐 Voir le site", href: "https://teopartesi.fr/" },
      {
        label: "👨‍💻 Code source",
        href: "https://github.com/teopartesi/portfolio",
      },
    ],
  },
  {
    title: "🔄 Pipeline de release versionnée",
    description:
      "Déclenché manuellement depuis main, le workflow valide le code, calcule la version sémantique, crée la GitHub Release, publie l'image sur GHCR puis lance le déploiement.",
    tags: ["GitHub Actions", "Semantic Release", "GHCR"],
    links: [
      {
        label: "⚡ Voir le workflow",
        href: "https://github.com/teopartesi/portfolio/actions/workflows/release.yml",
      },
      {
        label: "🏷️ Voir les releases",
        href: "https://github.com/teopartesi/portfolio/releases",
      },
    ],
  },
  {
    title: "☁️ Infrastructure Scaleway automatisée",
    description:
      "La VM Ubuntu exécute Docker Compose derrière Traefik et Let's Encrypt. Des playbooks Ansible versionnés rendent sa préparation, son audit et ses déploiements reproductibles.",
    tags: ["Scaleway", "Ansible", "Docker Compose", "Traefik"],
    links: [
      {
        label: "🤖 Voir les playbooks",
        href: "https://github.com/teopartesi/portfolio/tree/main/infra/ansible",
      },
      {
        label: "📖 Lire le déploiement",
        href: "https://github.com/teopartesi/portfolio/blob/main/docs/DEPLOYMENT.md",
      },
    ],
  },
  {
    title: "☁️ Déploiement Cloud sur Azure Container Apps",
    description:
      "Extension du pipeline du portfolio vers un lab Azure Container Apps. GitHub Actions s’authentifie auprès d’Azure par OIDC et déploie la même image GHCR versionnée que sur le VPS. Ce lab me permet de pratiquer les révisions, le retour à une version précédente et le fonctionnement du scale-to-zero.",
    tags: [
      "Azure Container Apps",
      "GitHub Actions",
      "OIDC",
      "Docker",
      "GHCR",
    ],
    links: [
      {
        label: "⚡ Voir le workflow",
        href: "https://github.com/teopartesi/portfolio/blob/main/.github/workflows/deploy.yml",
      },
      {
        label: "📖 Lire la documentation",
        href: "https://github.com/teopartesi/portfolio/blob/main/docs/DEPLOYMENT.md",
      },
    ],
  },
];

export const experience = [
  {
    period: "Depuis juin 2026",
    type: "💼 CDI · Projet interne",
    organization: "AUBAY SOLUTEC",
    role: "Ingénieur consultant — contribution DevOps au projet Kairos",
    summary:
      "Contribution au projet interne Kairos, une application de visualisation de la présence et des disponibilités dans les bureaux commerciaux. Je prends en charge la mise en place de la chaîne CI/CD et le déploiement de l’environnement de démonstration.",
    highlights: [
      "⚡ Mise en place de la CI pour construire et tester les composants Front-End et Back-End.",
      "🐳 Conteneurisation de l’application et orchestration des services avec Docker Compose.",
      "🏗️ Création et configuration d’une VM Ubuntu sur OpenStack.",
      "🔄 Automatisation du déploiement des images GHCR lors des releases avec un runner GitHub Actions auto-hébergé.",
      "🔐 Hébergement dans une infrastructure interne isolée, accessible via une VM de rebond, sans exposition publique.",
      "🔎 Vérification de l’état des conteneurs et analyse des logs pour résoudre les problèmes de déploiement.",
    ],
    technologies: [
      "Linux",
      "Docker",
      "Docker Compose",
      "GitHub Actions",
      "GHCR",
      "OpenStack",
    ],
  },
  {
    period: "2025 – 2026",
    type: "💼 Stage",
    organization: "ENEDIS",
    role: "Stagiaire ingénieur Full Stack & DevOps",
    summary:
      "Développement d'une application web Full Stack avec Angular, Spring Boot et PostgreSQL, de sa conception à son déploiement.",
    highlights: [
      "🔌 Conception d'API REST et gestion d'une base de données PostgreSQL.",
      "🗄️ Versionnement du schéma avec Liquibase, ainsi que déploiement et gestion de bases de données.",
      "📦 Conteneurisation avec Docker et déploiement sur des clusters Kubernetes.",
      "⚡ Implémentation et optimisation de pipelines GitLab CI/CD pour automatiser les builds et les déploiements.",
      "⛵ Utilisation de Helm pour les déploiements Kubernetes et d’Ansible pour les opérations de configuration et de déploiement.",
      "🔐 Utilisation de Vault pour la gestion des secrets applicatifs.",
      "🔎 Consultation des ressources et des logs avec kubectl et k9s pour analyser les problèmes de déploiement.",
      "🤝 Travail en environnement Agile, présentation du démonstrateur et accompagnement de collègues dans la prise en main des technologies.",
    ],
    technologies: [
      "Angular",
      "Spring Boot",
      "PostgreSQL",
      "Liquibase",
      "Docker",
      "Kubernetes",
      "GitLab CI/CD",
      "Helm",
      "Ansible",
      "Vault",
      "Keycloak",
      "kubectl",
      "k9s",
      "JUnit",
      "Cypress",
    ],
  },
  {
    period: "2024 – 2025",
    type: "🎓 Projet académique",
    organization: "ESME Sudria",
    role: "Projet de fin d'études d'ingénieur",
    summary:
      "Conception d'une solution de contrôle d'accès combinant un interphone connecté basé sur ESP32 et une application mobile Flutter.",
    highlights: [
      "🔧 Développement du prototype d'interphone connecté.",
      "📱 Création d'une application Flutter pour piloter les accès.",
      "🎥 Intégration des communications vidéo et audio, ainsi que de QR codes temporaires.",
    ],
    technologies: ["ESP32", "Flutter", "QR codes", "Audio / vidéo"],
  },
  {
    period: "Juillet – septembre 2024",
    type: "💼 Stage",
    organization: "ENGIE",
    role: "Stagiaire développeur web",
    summary:
      "Formation à Nuxt et Strapi, suivie d'une mise en pratique sur des fonctionnalités web.",
    highlights: [
      "📝 Développement de formulaires web.",
      "🔗 Développement d'API web.",
    ],
    technologies: ["Nuxt", "Strapi", "API web"],
  },
  {
    period: "2023",
    type: "🤝 Job étudiant",
    organization: "CLAVIM",
    role: "Animateur",
    summary:
      "Animation et accompagnement de jeunes dans leur scolarité et leur quotidien.",
    highlights: [
      "📚 Aide aux devoirs et conseils autour de leurs études.",
      "💬 Échanges sur les situations rencontrées dans leur vie quotidienne.",
    ],
    technologies: [],
  },
];

export const contact = {
  summary:
    "Je suis disponible pour échanger autour du développement web, du DevOps et de l'automatisation des déploiements.",
  links: [
    {
      platform: "github",
      label: "GitHub",
      href: "https://github.com/teopartesi",
    },
    {
      platform: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/téo-partesi/",
    },
    {
      platform: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/teo_partesi/",
    },
    {
      platform: "mail",
      label: "Mail",
      href: "mailto:teopart@hotmail.com",
    },
  ],
} as const;
