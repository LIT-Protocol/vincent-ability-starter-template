# Vincent Starter Kit

A template repository for Vincent Ability and Policy authors. This monorepo uses Nx and pnpm and includes:

- A template Vincent Ability for you to customize
- A template Vincent Policy for you to customize
- End-to-end tests that automatically build, deploy, and test your abilities and policies

### See detailed documentation / guides at [docs.heyvincent.ai](https://docs.heyvincent.ai)

## Requirements

- Node.js: ^20.19.4
- pnpm: 10.7.0 (managed via Corepack)

### Using Corepack to use pnpm

This repo is configured to use pnpm and enforces it in the preinstall step. If you do not have pnpm set up, use Corepack:

```bash
# Enable Corepack globally (ships with Node 16.9+)
corepack enable

# Ensure npm & pnpm shims are enabled
corepack enable npm
corepack enable pnpm

# Or run the helper script from the repo root
pnpm run use-corepack
```

Notes:

- The repo sets "packageManager": "pnpm@10.7.0" in package.json. Corepack will automatically provision that version.
- The preinstall script scripts/check-packagemanager.sh verifies Node and Corepack are available and enforces pnpm via `npx only-allow pnpm`.

## Scripts

Root-level scripts you will commonly use:

| Script       | What it does                                            | Notes                                                                   |
| ------------ | ------------------------------------------------------- | ----------------------------------------------------------------------- |
| preinstall   | Ensures Node + Corepack are available and enforces pnpm | Runs automatically during `pnpm install`                                |
| build        | nx run-many -t build                                    | Builds all packages (includes action bundling via Nx deps)              |
| test         | nx run-many -t test                                     | Runs unit tests (if any)                                                |
| test-e2e     | nx run-many -t test-e2e                                 | Builds + deploys the example Ability & Policy, then runs Jest E2E tests |
| reset-e2e    | Moves packages/test-e2e/.env.test-e2e to a .backup file | Useful to re-run bootstrap for a new env                                |
| lint         | nx run-many -t lint                                     | Lints all packages                                                      |
| typecheck    | nx run-many -t typecheck                                | Types checks all packages                                               |
| clean        | nx reset and per-project clean                          | Removes build artifacts and node_modules in projects                    |
| prepare      | husky                                                   | Git hooks setup                                                         |
| use-corepack | corepack enable ...                                     | Quickly enables pnpm via Corepack                                       |
| reset        | pnpm clean && pnpm install                              | Full reinstall                                                          |
| hard-build   | pnpm reset && pnpm build                                | Clean reinstall and build                                               |
| bootstrap    | tsx ./src/bin/bootstrap.ts                              | Interactive environment setup (see Bootstrap flow)                      |

Project-level Nx targets you may find useful (run via pnpm nx ...):

| Target        | Project(s)                        | What it does                                                           |
| ------------- | --------------------------------- | ---------------------------------------------------------------------- |
| action:build  | ability-template, policy-template | Bundles the Lit Action code for the Ability/Policy                     |
| action:deploy | ability-template, policy-template | Builds (if needed) and deploys the Lit Action code                     |
| build         | all                               | TypeScript build (depends on action:build where applicable)            |
| test-e2e      | test-e2e                          | Depends on deploying both the example Ability & Policy, then runs Jest |

## Packages in this repository

| Package                           | Path                      | Purpose                                                                                                                                                                                                                                                        |
| --------------------------------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| @your-org/ability-template        | packages/ability-template | A template Vincent Ability for you to customize. Demonstrates Ability authoring, bundling, and deployment. For blockchain transactions, consider using [@lit-protocol/vincent-scaffold-sdk](https://www.npmjs.com/package/@lit-protocol/vincent-scaffold-sdk). |
| @your-org/policy-template         | packages/policy-template  | A template Vincent Policy for you to customize. Demonstrates Policy authoring, bundling, and deployment. Includes `inputUiSchema.json` for defining user-facing form fields (JSON Schema + UI Schema).                                                         |
| @lit-protocol/vincent-example-e2e | packages/test-e2e         | Private package with end-to-end tests. It orchestrates building and deploying your Ability & Policy and then runs integration tests via Jest.                                                                                                                  |

## Customizing Your Policy

When creating a Vincent Policy, you'll need to define the user-facing configuration parameters. This involves updating three key files:

1. **`src/lib/schemas.ts`** - Define your `userParamsSchema` using Zod to specify what configuration parameters your policy accepts
2. **`src/inputUiSchema.json`** - Define how end-users will see form inputs when connecting to an application and managing their policy values
3. **`src/lib/vincent-policy.ts`** - Implement your policy logic using the user parameters

The `inputUiSchema.json` file controls how end-users configure your policy when connecting their wallet to applications. It follows the [React JSON Schema Form](https://rjsf-team.github.io/react-jsonschema-form/) specification and consists of two parts:

- **`jsonSchema`**: Defines the data structure, types, validation rules, and field metadata that end-users will fill in
- **`uiSchema`**: Defines UI-specific rendering hints like widgets, placeholders, and help text to guide end-users

Example for a rate-limiting policy:

```json
{
  "jsonSchema": {
    "type": "object",
    "properties": {
      "maxActions": {
        "type": "number",
        "title": "Maximum Actions",
        "description": "Maximum number of actions allowed within the time window",
        "minimum": 1
      }
    },
    "required": ["maxActions"]
  },
  "uiSchema": {
    "maxActions": {
      "ui:widget": "number",
      "ui:placeholder": "10",
      "ui:help": "Enter the maximum number of actions allowed"
    }
  }
}
```

This file is published with your policy package and used by Vincent tooling to generate configuration forms.

## Bootstrap flow

The bootstrap script guides you through configuring the repo for the first time and preparing the E2E environment.

Command:

```bash
pnpm bootstrap
```

What happens:

1. Pinata JWT setup
   - A Pinata JWT is required for e2e tests and for publishing Vincent Abilities and Policies to the Registry.
   - You will be prompted to obtain a Pinata JWT from https://app.pinata.cloud/developers/api-keys.
   - The JWT you provide will be stored in a root-level .env as `PINATA_JWT`. Tooling will use this to authenticate with Pinata.
   - If you already have a .env file, the script will skip this step.
2. Funder environment setup for E2E
   - You must fund a wallet with testLPX on the LIT testnet (Yellowstone). You can fund your wallet using the faucet as https://chronicle-yellowstone-faucet.getlit.dev/
   - Once you have funded your wallet, you must provide its private key for usage by tooling in the repository.
   - The bootstrap process creates additional test private keys (app manager, app delegatee, agent wallet PKP owner) and stores those keys in packages/test-e2e/.env.test-e2e

Notes:

- If a root .env already exists, the Pinata JWT step is skipped.
- If packages/test-e2e/.env.test-e2e already exists, bootstrap aborts with an error so you don’t overwrite your private keys. Use `pnpm reset-e2e` to back up the existing .env.test-e2e file, and re-run bootstrap.

## Quick start

It is recommended to use Corepack to ensure pnpm is used for the repository's package management. If you use a different package manager, you may experience problematic behavior.

1. Verify your version of corepack and ensure you are on > 0.31.0
   ```bash
   corepack -v
   npm install -g corepack@latest
   ```
2. Enable Corepack:
   ```bash
   corepack enable && corepack enable pnpm
   ```
3. Run bootstrap to build and configure the repository :
   ```bash
   pnpm bootstrap
   ```
4. Run the example end-to-end test flow:
   ```bash
   pnpm test-e2e
   ```
