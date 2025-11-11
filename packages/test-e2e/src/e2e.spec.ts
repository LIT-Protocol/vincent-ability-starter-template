import { bundledVincentAbility } from '@your-org/ability-template';

import type { PermissionData } from '@lit-protocol/vincent-contracts-sdk';

import {
  disconnectVincentAbilityClients,
  getVincentAbilityClient,
} from '@lit-protocol/vincent-app-sdk/abilityClient';
// import { bundledVincentPolicy } from '@your-org/policy-template';
import { setupVincentDevelopmentEnvironment } from '@lit-protocol/vincent-e2e-test-utils';

// TODO: Update PERMISSION_DATA with your ability and policy configuration
// Define permission data for all abilities and policies
// Example with a policy:
// const PERMISSION_DATA: PermissionData = {
//   [bundledVincentAbility.ipfsCid]: {
//     [bundledVincentPolicy.ipfsCid]: {
//       maxSends: 1,
//       timeWindowSeconds: 20
//     },
//   },
// };
const PERMISSION_DATA: PermissionData = {
  [bundledVincentAbility.ipfsCid]: {}, // No policies configured for template
};

// This is a full e2e test -- no mocks, so increase timeout accordingly
jest.setTimeout(120_000);

describe('Vincent Ability E2E Test', () => {
  let agentPkpInfo: { ethAddress: string; tokenId: string };
  let appDelegatee: any;

  beforeAll(async () => {
    console.log('🔧 Setting up Vincent development environment...');

    // Setup Vincent development environment (handles all funding, app registration, etc.)
    const setup = await setupVincentDevelopmentEnvironment({
      permissionData: PERMISSION_DATA,
    });

    agentPkpInfo = setup.agentPkpInfo;
    appDelegatee = setup.wallets.appDelegatee;

    console.log('✅ Setup complete');
    console.log('Agent PKP Address:', agentPkpInfo.ethAddress);
  });

  afterAll(async () => {
    await disconnectVincentAbilityClients();
  });

  it('should execute the ability successfully', async () => {
    console.log('⚡ Testing ability execution...');

    const abilityClient = getVincentAbilityClient({
      bundledVincentAbility: bundledVincentAbility,
      ethersSigner: appDelegatee,
      debug: false,
    });

    // TODO: Update parameters to match your ability's schema
    const precheckResult = await abilityClient.precheck(
      {
        // Add your ability parameters here
      },
      {
        delegatorPkpEthAddress: agentPkpInfo.ethAddress,
      },
    );

    console.log('Precheck result:', precheckResult);
    expect(precheckResult).toHaveProperty('success', true);

    // TODO: Update parameters to match your ability's schema
    const executeResult = await abilityClient.execute(
      {
        // Add your ability parameters here
      },
      {
        delegatorPkpEthAddress: agentPkpInfo.ethAddress,
      },
    );

    console.log('Execute result:', executeResult);
    expect(executeResult).toHaveProperty('success', true);

    console.log('✅ Ability executed successfully');
  });
});
