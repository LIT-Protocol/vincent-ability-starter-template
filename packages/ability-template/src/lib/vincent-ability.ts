import {
  createVincentAbility,
  supportedPoliciesForAbility,
} from '@lit-protocol/vincent-ability-sdk';

import {
  executeFailSchema,
  executeSuccessSchema,
  precheckFailSchema,
  precheckSuccessSchema,
  abilityParamsSchema,
} from './schemas';

// Example: Import KNOWN_ERRORS if you define error codes in schemas.ts
// import { KNOWN_ERRORS } from './schemas';

// Example: Declare types if you need to use ethers or Lit in your ability
// import type { EthersType } from '../Lit';
// declare const ethers: EthersType;

// Example: Destructure error codes from KNOWN_ERRORS for use in precheck/execute
// const { INSUFFICIENT_BALANCE, INVALID_PARAMETER } = KNOWN_ERRORS;

// Example: Create a policy for your ability
// import { createVincentAbilityPolicy } from '@lit-protocol/vincent-ability-sdk';
// import { bundledVincentPolicy } from '@your-org/policy-template';
//
// const YourPolicy = createVincentAbilityPolicy({
//   abilityParamsSchema: abilityParamsSchema,
//   bundledVincentPolicy,
//   abilityParameterMappings: {
//     abilityParamName: 'policyParamName',
//   },
// });

export const vincentAbility = createVincentAbility({
  packageName: '@your-org/ability-template' as const,
  abilityParamsSchema: abilityParamsSchema,
  abilityDescription: 'Describe what your ability does',
  supportedPolicies: supportedPoliciesForAbility([]),

  precheckSuccessSchema,
  precheckFailSchema,

  executeSuccessSchema,
  executeFailSchema,

  precheck: async ({ abilityParams }, { fail, succeed, delegation }) => {
    // Example: Validate prerequisites before execution
    // const { rpcUrl, amount, to } = abilityParams;
    // const { ethAddress: delegatorAddress } = delegation.delegatorPkpInfo;
    //
    // const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    // const balance = await provider.getBalance(delegatorAddress);
    //
    // if (balance.lt(ethers.utils.parseEther(amount))) {
    //   return fail({
    //     error: `Insufficient balance for ${delegatorAddress}`,
    //     reason: INSUFFICIENT_BALANCE, // Use error codes from KNOWN_ERRORS
    //   });
    // }
    //
    // return succeed({ availableBalance: balance.toString() });

    return succeed({});
  },

  execute: async ({ abilityParams }, { succeed, fail, delegation, policiesContext }) => {
    // Example: Execute your ability logic
    // try {
    //   const { to, amount, rpcUrl } = abilityParams;
    //   const pkpPublicKey = delegation.delegatorPkpInfo.publicKey;
    //
    //   // For blockchain transactions, use @lit-protocol/vincent-scaffold-sdk
    //   // import { laUtils } from '@lit-protocol/vincent-scaffold-sdk';
    //   //
    //   // const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    //   // const txHash = await laUtils.transaction.handler.nativeSend({
    //   //   provider,
    //   //   pkpPublicKey,
    //   //   amount,
    //   //   to,
    //   // });
    //
    //   // Example: Access policy context
    //   // const policyContext = policiesContext.allowedPolicies['@your-org/your-policy'];
    //   // if (policyContext) {
    //   //   await policyContext.commit(policyContext.result);
    //   // }
    //
    //   // return succeed({ txHash, to, amount, timestamp: Date.now() });
    // } catch (error) {
    //   return fail({ error: error instanceof Error ? error.message : 'Unknown error' });
    // }

    return succeed({});
  },
});
