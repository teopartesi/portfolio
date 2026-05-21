export const profile = {
  name: "Téo PARTESI",
  role: "DevOps Engineer / Développeur Web",
  location: "France",
  email: "teopartesi@hotmail.com",
  tagline:
    "Je conçois des interfaces web propres et des environnements cloud fiables, avec une approche orientée automatisation, qualité et déploiement continu.",
  summary:
    "Portfolio personnel en construction pour présenter un profil hybride DevOps et développement web. Le contenu est provisoire et sera remplacé progressivement par tes informations, projets et liens réels.",
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
    items: ["Linux", "Docker", "CI/CD", "GitHub Actions", "Monitoring"],
  },
  {
    category: "Cloud & Infra",
    items: ["Cloud", "Vercel", "Nginx", "Scripting", "Sécurité"],
  },
  {
    category: "Développement Web",
    items: ["Next.js", "TypeScript", "React", "TailwindCSS", "API REST"],
  },
];

export const projects = [
  {
    title: "Pipeline CI/CD",
    description:
      "Automatisation d'un workflow de build, lint et déploiement pour une application web moderne.",
    tags: ["GitHub Actions", "Docker", "Next.js"],
  },
  {
    title: "Dashboard Monitoring",
    description:
      "Interface de suivi pour visualiser l'état de services, les métriques clés et les alertes.",
    tags: ["React", "API", "Observabilité"],
  },
  {
    title: "Portfolio DevOps",
    description:
      "Site personnel responsive pour présenter compétences, projets et parcours professionnel.",
    tags: ["Next.js", "TypeScript", "TailwindCSS"],
  },
];

export const experience = [
  {
    period: "Aujourd'hui",
    title: "Construction du portfolio",
    description:
      "Mise en place d'une base Next.js propre, scalable et documentée étape par étape.",
  },
  {
    period: "Avant",
    title: "Apprentissage DevOps / Web",
    description:
      "Progression autour de Linux, Git, Docker, déploiement, React et bonnes pratiques frontend.",
  },
  {
    period: "Prochaine étape",
    title: "Projets réels et déploiement",
    description:
      "Ajout de projets détaillés, animations légères, SEO avancé et publication sur Vercel.",
  },
];
