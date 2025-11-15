# @your-org/policy-template

A template Vincent Policy package. Policies define constraints and rules that govern how abilities can be executed, such as rate limits, spending caps, or custom validation logic.

## Quick Start

1. **Edit `src/lib/schemas.ts`** - Define user parameters, ability parameters, and result schemas using Zod
2. **Edit `src/inputUiSchema.json`** - Define how end-users configure your policy in UI forms
3. **Edit `src/lib/vincent-policy.ts`** - Implement `precheck()`, `evaluate()`, and `commit()` functions
4. **Build**: `pnpm nx run policy-template:build`
5. **Deploy to IPFS**: `pnpm nx run policy-template:action:deploy`

## Key Files

- **`src/lib/schemas.ts`** - Zod schemas for policy parameters and results
- **`src/inputUiSchema.json`** - JSON Schema + UI Schema for end-user configuration forms
- **`src/lib/vincent-policy.ts`** - Main policy definition and logic
- **`src/lib/lit-action.ts`** - Wrapper code (do not modify)
- **`src/generated/`** - Auto-generated bundled code (do not edit)

## Commands

| Command         | Description                                |
| --------------- | ------------------------------------------ |
| `action:build`  | Bundle the Lit Action code                 |
| `action:deploy` | Build and deploy to IPFS via Pinata        |
| `build`         | Compile TypeScript (includes action:build) |

## Policy Lifecycle

Policies execute in three phases:

- **`precheck()`** - Validates constraints before ability execution (e.g., check rate limits)
- **`evaluate()`** - Performs checks during ability execution (e.g., verify conditions mid-flight)
- **`commit()`** - Updates policy state after successful execution (e.g., increment counter)

## Customizing Your Policy

### 1. Define Schemas (`src/lib/schemas.ts`)

Define your policy's configuration parameters using Zod:

- **`userParamsSchema`** - Configuration parameters that end-users set (e.g., maxActions, timeWindow)
- **`abilityParamsSchema`** - Parameters from the ability that your policy needs access to
- **`commitParamsSchema`** - Data passed to the commit phase
- Result schemas for precheck, evaluate, and commit phases (allow/deny)

### 2. Configure User Interface (`src/inputUiSchema.json`)

This file controls how end-users configure your policy when connecting their wallet to applications. It follows the [React JSON Schema Form](https://rjsf-team.github.io/react-jsonschema-form/) specification:

- **`jsonSchema`**: Defines data structure, types, validation rules, and field metadata
- **`uiSchema`**: Defines UI rendering hints (widgets, placeholders, help text)

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

### 3. Implement Policy Logic (`src/lib/vincent-policy.ts`)

Implement the three policy lifecycle functions using your schemas and user parameters. See the template file for detailed examples and comments.

## Publishing

1. Update package name in `package.json` and `src/lib/vincent-policy.ts`
2. Deploy to IPFS: `pnpm nx run policy-template:action:deploy`
3. Publish to npm: `pnpm publish --access public`

## Resources

- [Vincent Documentation](https://docs.heyvincent.ai)
- [Root README](../../README.md) - Setup and monorepo documentation
