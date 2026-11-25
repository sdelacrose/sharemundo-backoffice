# LINKS back-office

Back-office frontend, separate from the administration panel and main LINKS frontend.
Use Node 24.22.3 and npm 11.19.1. package-lock.json is the canonical dependency lockfile.

Install: npm ci --legacy-peer-deps. Development: npm run dev -- --port 3004. Validation: npm run build.

The Dockerfile ships Next standalone output and runs node server.js. Configure AUTH0_BASE_URL, ADMIN_API_INTERNAL_URL, Auth0 credentials and NEXT_PUBLIC_BASE_API_URL through the existing environment/secret store. The server callback verifies an existing account and redirects to the configured public origin; it creates no users and places no token in the redirect URL.

The paired API/model revisions are in release-contract.json. Preserve the existing back-office Auth0 gate and business data. This branch performs no merge, deployment, migration, email or payment. Review all environment/database compatibility before rollout.
