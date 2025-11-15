# @your-org/ability-template

A template Vincent Ability package. Abilities are serverless functions that execute in the Lit Protocol network and can interact with blockchains, APIs, and other services.

## Quick Start

1. **Edit `src/lib/schemas.ts`** - Define your ability's input parameters and return values using Zod schemas
2. **Edit `src/lib/vincent-ability.ts`** - Implement your ability logic in `precheck()` and `execute()` functions
3. **Build**: `pnpm nx run ability-template:build`
4. **Deploy to IPFS**: `pnpm nx run ability-template:action:deploy`

## Key Files

- **`src/lib/schemas.ts`** - Zod schemas for parameters and results
- **`src/lib/vincent-ability.ts`** - Main ability definition and logic
- **`src/lib/lit-action.ts`** - Wrapper code (do not modify)
- **`src/generated/`** - Auto-generated bundled code (do not edit)

## Commands

| Command         | Description                                |
| --------------- | ------------------------------------------ |
| `action:build`  | Bundle the Lit Action code                 |
| `action:deploy` | Build and deploy to IPFS via Pinata        |
| `build`         | Compile TypeScript (includes action:build) |

## Working with Policies

To add policy support, import and configure policies in `src/lib/vincent-ability.ts`. See the template file for commented examples.

## Publishing

1. Update package name in `package.json` and `src/lib/vincent-ability.ts`
2. Deploy to IPFS: `pnpm nx run ability-template:action:deploy`
3. Publish to npm: `pnpm publish --access public`

## Resources

- [Vincent Documentation](https://docs.heyvincent.ai)
- [Root README](../../README.md) - Setup and monorepo documentation
- [@lit-protocol/vincent-scaffold-sdk](https://www.npmjs.com/package/@lit-protocol/vincent-scaffold-sdk) - Helper utilities for blockchain transactions
