import { createVincentPolicy } from '@lit-protocol/vincent-ability-sdk';

import {
  commitAllowResultSchema,
  commitDenyResultSchema,
  commitParamsSchema,
  evalAllowResultSchema,
  evalDenyResultSchema,
  precheckAllowResultSchema,
  precheckDenyResultSchema,
  abilityParamsSchema,
  userParamsSchema,
} from './schemas';

// Example: Import Lit and ethers types if needed
// import type { LitNamespace, EthersType } from '../Lit';
// declare const Lit: typeof LitNamespace;
// declare const ethers: EthersType;

export const vincentPolicy = createVincentPolicy({
  packageName: '@your-org/policy-template' as const,

  abilityParamsSchema,
  userParamsSchema,
  commitParamsSchema,

  precheckAllowResultSchema,
  precheckDenyResultSchema,

  evalAllowResultSchema,
  evalDenyResultSchema,

  commitAllowResultSchema,
  commitDenyResultSchema,

  /**
   * Precheck - Validate policy constraints before ability execution
   *
   * This runs before the ability executes to check if the policy allows it.
   *
   * Example: Check rate limits
   * precheck: async (
   *   { abilityParams, userParams },
   *   { allow, deny, appId, delegation: { delegatorPkpInfo } },
   * ) => {
   *   const { maxActions, timeWindow } = userParams;
   *   const { ethAddress } = delegatorPkpInfo;
   *
   *   // Check your constraint (e.g., query a smart contract, check local state)
   *   const currentCount = await checkLimit(ethAddress);
   *
   *   if (currentCount >= maxActions) {
   *     return deny({
   *       reason: `Limit of ${maxActions} actions exceeded`,
   *     });
   *   }
   *
   *   return allow({});
   * },
   */
  precheck: async ({ abilityParams, userParams }, { allow }) => {
    // Add your precheck logic here
    return allow({});
  },

  /**
   * Evaluate - Perform policy evaluation during ability execution
   *
   * This runs during ability execution to verify policy compliance.
   * Use Lit.Actions.runOnce for coordinated checks across nodes.
   *
   * Example: Verify limits during execution
   * evaluate: async (
   *   { abilityParams, userParams },
   *   { allow, deny, delegation: { delegatorPkpInfo } },
   * ) => {
   *   const checkResponse = await Lit.Actions.runOnce(
   *     { waitForResponse: true, name: 'checkLimit' },
   *     async () => {
   *       // Perform your check
   *       const isAllowed = await checkConstraint();
   *       return JSON.stringify({ allowed: isAllowed });
   *     }
   *   );
   *
   *   const { allowed } = JSON.parse(checkResponse);
   *   if (!allowed) {
   *     return deny({ reason: 'Constraint not met' });
   *   }
   *
   *   return allow({});
   * },
   */
  evaluate: async ({ abilityParams, userParams }, { allow }) => {
    // Add your evaluation logic here
    return allow({});
  },

  /**
   * Commit - Update policy state after successful ability execution
   *
   * This runs after the ability succeeds to record state changes.
   *
   * Example: Update counter in smart contract
   * commit: async (
   *   commitParams,
   *   { allow, deny, appId, delegation: { delegatorPkpInfo } },
   * ) => {
   *   const { ethAddress, publicKey } = delegatorPkpInfo;
   *
   *   // Update state (e.g., call smart contract to increment counter)
   *   // For blockchain transactions, consider using @lit-protocol/vincent-scaffold-sdk
   *   // import { laUtils } from '@lit-protocol/vincent-scaffold-sdk';
   *   //
   *   // const txHash = await laUtils.transaction.handler.contractCall({
   *   //   provider: new ethers.providers.JsonRpcProvider(rpcUrl),
   *   //   pkpPublicKey: publicKey,
   *   //   callerAddress: ethAddress,
   *   //   abi: yourContractAbi,
   *   //   contractAddress: yourContractAddress,
   *   //   functionName: 'updateState',
   *   //   args: [],
   *   // });
   *
   *   return allow({});
   * },
   */
  commit: async (commitParams, { allow }) => {
    // Add your commit logic here
    return allow({});
  },
});
