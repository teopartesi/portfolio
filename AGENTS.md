# Repository guidance

## Project overview

This repository contains a French, single-page portfolio built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS 4. It is packaged as a standalone Node.js application in a multi-stage Docker image.

The current production path is GitHub Actions -> GHCR -> a Scaleway VPS -> Docker Compose -> Traefik. The manifests in `k8s/` describe a future k3s target; do not treat them as the active production deployment unless the deployment documentation and workflow are changed accordingly.

Before changing Next.js code, read the relevant version-matched documentation in `node_modules/next/dist/docs/`. Do not rely on framework behavior remembered from older Next.js versions.

## Important repository structure

- `app/`: App Router entry points, metadata, layout, and global styles.
- `components/layout/`: shared page chrome such as the navigation and footer.
- `components/sections/`: sections assembled by `app/page.tsx`.
- `components/ui/`: small reusable presentation primitives.
- `lib/data.ts`: portfolio content and navigation data. Prefer updating content here rather than embedding repeated copy in components.
- `public/`: static images and other public assets.
- `.github/workflows/ci.yml`: CI, Docker publication, and active VPS deployment pipeline.
- `Dockerfile`, `compose.yaml`, and `compose.prod.yaml`: image build, local container usage, and production Compose configuration.
- `k8s/`: Kubernetes/k3s manifests for the planned deployment target.
- `docs/`: operational architecture, deployment, Docker, Traefik, and roadmap documentation.
- `.agents/skills/portfolio-frontend/`: project-specific workflow for frontend changes.

## Sources of truth

Resolve discrepancies in this order:

1. Executable code and configuration (`package.json`, application code, Docker/Compose files, Kubernetes manifests).
2. `.github/workflows/ci.yml` for the behavior of CI and the active deployment pipeline.
3. Focused documents in `docs/` for operational intent and context.
4. `README.md` for the public project overview.

Do not silently copy stale documentation into code or configuration. Verify statements against the current implementation, then update every affected source in the same change.

## Setup and validation

Use the Node.js and npm versions pinned in `mise.toml` (Node.js 24.18.0 and npm 11.16.0).

```bash
npm ci
npm run dev
```

Run the checks that match the change. The minimum validation for code changes is:

```bash
npm run lint
npm run build
```

For container or deployment changes, also validate the relevant artifacts when Docker is available:

```bash
docker build -t portfolio:local .
docker compose config
docker compose -f compose.prod.yaml config
```

For Kubernetes changes, render or dry-run the manifests against an available cluster before applying them. Never apply manifests to production merely to validate a change.

## Development conventions

- Keep TypeScript strict and preserve the `@/*` import alias.
- Prefer React Server Components; add `"use client"` only when browser state, effects, or APIs require it.
- Keep `app/page.tsx` focused on section composition. Put reusable layout in `components/layout/`, page sections in `components/sections/`, and small shared primitives in `components/ui/`.
- Keep portfolio copy and list data in `lib/data.ts` when it can remain separate from presentation.
- Follow the existing named-export convention for components and the default export convention required by App Router entry points.
- Reuse the existing dark visual language, cyan accent, spacing, and responsive patterns. Avoid adding a dependency for behavior that can be implemented clearly with the current stack.
- Preserve semantic HTML, keyboard access, visible focus states, useful alternative text, and mobile layouts.
- Keep changes scoped. Do not reformat or rewrite unrelated files.

## Documentation synchronization

Update documentation in the same change whenever behavior changes:

- update `README.md` for user-facing setup, stack, structure, or project behavior;
- update `docs/DOCKER.md` for image or container lifecycle changes;
- update `docs/DEPLOYMENT.md` for CI/CD or deployment procedure changes;
- update `docs/INFRASTRUCTURE.md` for architecture, hosting, network, or platform changes;
- update `docs/TRAEFIK.md` for routing, TLS, labels, or reverse-proxy changes;
- update `docs/ROADMAP.md` when planned work changes status or direction;
- update this file and the relevant project skill when agent guidance, commands, or conventions change.

Clearly distinguish current production behavior from planned Kubernetes/k3s work in code comments, documentation, and reviews.

## Secrets and production safety

- Never commit `.env` files, credentials, private keys, tokens, kubeconfigs, `acme.json`, or values copied from GitHub Actions secrets. Commit only sanitized examples such as `.env.production.example`.
- Do not print secrets in commands, logs, fixtures, documentation, or test output.
- Do not expose the application port directly in production; Traefik reaches port 3000 through the external `proxy` network.
- Keep production images pinned to immutable commit-SHA tags. Treat `latest` as a manual convenience, not a reproducible production release.
- Do not run deployment commands, mutate the VPS, publish images, change DNS/TLS, or apply Kubernetes resources without explicit user authorization.
- Treat changes to `.github/workflows/ci.yml`, `compose.prod.yaml`, `Dockerfile`, and `k8s/` as production-sensitive. Explain impact and rollback considerations, and validate them more thoroughly than ordinary UI changes.
