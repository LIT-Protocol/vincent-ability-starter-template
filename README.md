# Vincent Starter Kit

A template repository for Vincent Ability and Policy authors. This monorepo uses Nx and pnpm and includes:

- A template Vincent Ability for you to customize
- A template Vincent Policy for you to customize
- End-to-end tests that automatically build, deploy (to IPFS), and test your abilities and policies

### See detailed documentation / guides at [docs.heyvincent.ai](https://docs.heyvincent.ai)

## Requirements

- Node.js: ^20.19.4
- pnpm: 10.7.0

## Setup

### Pinata JWT for IPFS Uploads

Before you can build and deploy your abilities and policies, you need to set up your Pinata JWT for IPFS uploads.

1. Get your Pinata JWT from https://app.pinata.cloud/developers/api-keys
2. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
3. Edit `.env` and add your Pinata JWT:
   ```bash
   PINATA_JWT=your_pinata_jwt_here
   ```

### E2E Test Environment

To run the end-to-end tests, you need to configure test wallet private keys:

1. Copy the test environment example file:
   ```bash
   cp packages/test-e2e/.env.test-e2e.example packages/test-e2e/.env.test-e2e
   ```
2. Edit `packages/test-e2e/.env.test-e2e` and add your test private keys:

   - **TEST_FUNDER_PRIVATE_KEY**: A wallet funded with tstLPX tokens on LIT testnet (Yellowstone). Get tokens from https://chronicle-yellowstone-faucet.getlit.dev/
   - **TEST_APP_MANAGER_PRIVATE_KEY**: Wallet that owns the Vincent App (created automatically or provide your own)
   - **TEST_APP_DELEGATEE_PRIVATE_KEY**: Wallet that executes Vincent Abilities (created automatically or provide your own)
   - **TEST_AGENT_WALLET_PKP_OWNER_PRIVATE_KEY**: Wallet that owns the Agent Wallet PKP (created automatically or provide your own)

   The funder wallet must have tstLPX tokens. The other wallets can be any valid Ethereum private keys and will be funded automatically by the test setup.

## Quick start

1. Install pnpm if you don't have it:
   ```bash
   npm install -g pnpm@10.7.0
   ```
2. Set up your environment (see Setup section above):

   ```bash
   # Set up Pinata JWT for IPFS uploads
   cp .env.example .env
   # Edit .env and add your PINATA_JWT

   # Set up E2E test environment
   cp packages/test-e2e/.env.test-e2e.example packages/test-e2e/.env.test-e2e
   # Edit packages/test-e2e/.env.test-e2e and add your test private keys
   ```

3. Install dependencies and build:
   ```bash
   pnpm install
   pnpm build
   ```
4. Run the example end-to-end test flow:
   ```bash
   pnpm test-e2e
   ```

## Scripts

Root-level scripts you will commonly use:

| Script       | What it does                                            | Notes                                                                   |
| ------------ | ------------------------------------------------------- | ----------------------------------------------------------------------- |
| preinstall   | Ensures Node + Corepack are available and enforces pnpm | Runs automatically during `pnpm install`                                |
| build        | nx run-many -t build                                    | Builds all packages (includes action bundling via Nx deps)              |
| test         | nx run-many -t test                                     | Runs unit tests (if any)                                                |
| test-e2e     | nx run-many -t test-e2e                                 | Builds + deploys the example Ability & Policy, then runs Jest E2E tests |
| lint         | nx run-many -t lint                                     | Lints all packages                                                      |
| typecheck    | nx run-many -t typecheck                                | Types checks all packages                                               |
| clean        | nx reset and per-project clean                          | Removes build artifacts and node_modules in projects                    |
| prepare      | husky                                                   | Git hooks setup                                                         |
| use-corepack | corepack enable ...                                     | Quickly enables pnpm via Corepack                                       |
| reset        | pnpm clean && pnpm install                              | Full reinstall                                                          |
| hard-build   | pnpm reset && pnpm build                                | Clean reinstall and build                                               |

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
