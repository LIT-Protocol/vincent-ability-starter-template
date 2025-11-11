# @your-org/test-e2e

Development test suite for Vincent Abilities and Policies. This package sets up a Vincent App in the Vincent contracts for local development and testing purposes.

## Quick Start

1. **Set up test environment** - Copy `.env.test-e2e.example` to `.env.test-e2e` and configure (see Environment Variables below)
2. **Update test configuration** - Edit `src/e2e.spec.ts` to configure your ability and policy parameters
3. **Run tests**: `pnpm test-e2e` (from repo root)

## Environment Variables

Required in `packages/test-e2e/.env.test-e2e`:

- **TEST_FUNDER_PRIVATE_KEY** - Wallet with tstLPX tokens (funds other wallets)
- **TEST_APP_MANAGER_PRIVATE_KEY** - Owns the Vincent App
- **TEST_APP_DELEGATEE_PRIVATE_KEY** - Executes abilities
- **TEST_AGENT_WALLET_PKP_OWNER_PRIVATE_KEY** - Owns the agent wallet PKP

See [Root README](../../README.md#e2e-test-environment) for details.

## What This Does

The test suite:

1. Sets up a Vincent App in the Vincent contracts for development using `setupVincentDevelopmentEnvironment`
2. Registers your ability and policy with the test app
3. Executes the ability with the configured policies
4. Verifies the results

**Note:** This is for development/testing only. For production deployment, see the Vincent documentation.

## Test Configuration

### Permission Data

In `src/e2e.spec.ts`, configure which abilities and policies to test:

```typescript
const PERMISSION_DATA: PermissionData = {
  [bundledVincentAbility.ipfsCid]: {
    // No policies
  },
};

// With a policy:
const PERMISSION_DATA: PermissionData = {
  [bundledVincentAbility.ipfsCid]: {
    [bundledVincentPolicy.ipfsCid]: {
      maxSends: 1,
      timeWindowSeconds: 20,
    },
  },
};
```

### Ability Parameters

Update the `precheck()` and `execute()` calls with your ability's parameters:

```typescript
const precheckResult = await abilityClient.precheck(
  {
    // Add your ability parameters here
  },
  {
    delegatorPkpEthAddress: agentPkpInfo.ethAddress,
  },
);
```

## Running Tests

```bash
# From repo root
pnpm test-e2e

# From this directory
pnpm nx run test-e2e:test-e2e
```

Tests have a 120-second timeout by default (configurable in `src/e2e.spec.ts`).

## Resources

- [Vincent Documentation](https://docs.heyvincent.ai)
- [Root README](../../README.md) - Setup instructions
