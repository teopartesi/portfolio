export const profile = {
  name: "Téo PARTESI",
  role: "DevOps Engineer / Développeur Web",
  location: "France",
  email: "teopartesi@hotmail.com",
  tagline:
    "Je conçois des interfaces web propres et des environnements cloud fiables, avec une approche orientée automatisation, qualité et déploiements versionnés.",
  summary:
    "Ce portfolio est aussi mon projet DevOps fil rouge : une application Next.js conteneurisée, validée et versionnée par GitHub Actions, puis déployée sur une VM Scaleway derrière Traefik.",
};

export const navigation = [
  { label: "À propos", href: "#about" },
  { label: "Compétences", href: "#skills" },
  { label: "Projets", href: "#projects" },
  { label: "Parcours", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const skills = [
  {
    category: "DevOps",
    items: [
      "Linux",
      "Docker",
      "GitHub Actions",
      "Semantic Release",
      "Ansible",
    ],
  },
  {
    category: "Cloud & Infra",
    items: [
      "Scaleway",
      "Docker Compose",
      "GHCR",
      "Traefik",
      "Let's Encrypt",
    ],
  },
  {
    category: "Développement Web",
    items: ["Next.js", "TypeScript", "React", "Tailwind CSS", "API REST"],
  },
];

export const projects = [
  {
    title: "Portfolio Next.js en production",
    description:
      "Application responsive construite avec Next.js 16, conteneurisée dans une image standalone et publiée en HTTPS sur teopartesi.fr.",
    tags: ["Next.js", "TypeScript", "Docker"],
    links: [
      { label: "Voir le site", href: "https://teopartesi.fr/" },
      {
        label: "Code source",
        href: "https://github.com/teopartesi/portfolio",
      },
    ],
  },
  {
    title: "Pipeline de release versionnée",
    description:
      "Déclenché manuellement depuis main, le workflow valide le code, calcule la version sémantique, crée la GitHub Release, publie l'image sur GHCR puis lance le déploiement.",
    tags: ["GitHub Actions", "Semantic Release", "GHCR"],
    links: [
      {
        label: "Voir le workflow",
        href: "https://github.com/teopartesi/portfolio/actions/workflows/release.yml",
      },
      {
        label: "Voir les releases",
        href: "https://github.com/teopartesi/portfolio/releases",
      },
    ],
  },
  {
    title: "Infrastructure Scaleway automatisée",
    description:
      "La VM Ubuntu exécute Docker Compose derrière Traefik et Let's Encrypt. Des playbooks Ansible versionnés rendent sa préparation, son audit et ses déploiements reproductibles.",
    tags: ["Scaleway", "Ansible", "Docker Compose", "Traefik"],
    links: [
      {
        label: "Voir les playbooks",
        href: "https://github.com/teopartesi/portfolio/tree/main/infra/ansible",
      },
      {
        label: "Lire le déploiement",
        href: "https://github.com/teopartesi/portfolio/blob/main/docs/DEPLOYMENT.md",
      },
    ],
  },
];

export const experience = [
  {
    period: "2025 – 2026",
    type: "Stage",
    organization: "ENEDIS",
    role: "Stagiaire ingénieur Full Stack & DevOps",
    summary:
      "Développement d'une application web Full Stack avec Angular, Spring Boot et PostgreSQL, de sa conception à son déploiement.",
    highlights: [
      "Conception d'API REST et gestion d'une base de données PostgreSQL.",
      "Versionnement du schéma avec Liquibase, ainsi que déploiement et gestion de bases de données.",
      "Conteneurisation avec Docker et déploiement sur des clusters Kubernetes.",
      "Implémentation et optimisation de pipelines GitLab CI/CD pour automatiser les builds et les déploiements.",
    ],
    technologies: [
      "Angular",
      "Spring Boot",
      "PostgreSQL",
      "Liquibase",
      "Docker",
      "Kubernetes",
      "GitLab CI/CD",
    ],
  },
  {
    period: "2024 – 2025",
    type: "Projet académique",
    organization: "ESME Sudria",
    role: "Projet de fin d'études d'ingénieur",
    summary:
      "Conception d'une solution de contrôle d'accès combinant un interphone connecté basé sur ESP32 et une application mobile Flutter.",
    highlights: [
      "Développement du prototype d'interphone connecté.",
      "Création d'une application Flutter pour piloter les accès.",
      "Intégration des communications vidéo et audio, ainsi que de QR codes temporaires.",
    ],
    technologies: ["ESP32", "Flutter", "QR codes", "Audio / vidéo"],
  },
  {
    period: "Juillet – septembre 2024",
    type: "Stage",
    organization: "ENGIE",
    role: "Stagiaire développeur web",
    summary:
      "Formation à Nuxt et Strapi, suivie d'une mise en pratique sur des fonctionnalités web.",
    highlights: [
      "Développement de formulaires web.",
      "Développement d'API web.",
    ],
    technologies: ["Nuxt", "Strapi", "API web"],
  },
  {
    period: "2023",
    type: "Job étudiant",
    organization: "CLAVIM",
    role: "Animateur",
    summary:
      "Animation et accompagnement de jeunes dans leur scolarité et leur quotidien.",
    highlights: [
      "Aide aux devoirs et conseils autour de leurs études.",
      "Échanges sur les situations rencontrées dans leur vie quotidienne.",
    ],
    technologies: [],
  },
];
