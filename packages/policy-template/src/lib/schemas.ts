import { z } from 'zod';

/**
 * Ability parameters schema - matches the ability this policy works with
 *
 * Example: For a policy that works with a token transfer ability
 * export const abilityParamsSchema = z.object({
 *   to: z.string().min(1, 'Recipient address cannot be empty'),
 *   amount: z.string(),
 * });
 */
export const abilityParamsSchema = z.object({
  // Define which ability parameters your policy needs to access
});

/**
 * User parameters schema - policy configuration set by the user
 *
 * Example: For a rate-limiting policy
 * export const userParamsSchema = z.object({
 *   maxSends: z.number().positive().describe('Maximum sends allowed'),
 *   timeWindowSeconds: z.number().positive().describe('Time window in seconds'),
 * });
 */
export const userParamsSchema = z.object({
  // Define configuration parameters for your policy
});

/**
 * Commit parameters schema - data passed to commit phase
 *
 * Example: For tracking state to commit
 * export const commitParamsSchema = z.object({
 *   currentCount: z.number(),
 *   maxSends: z.number(),
 *   remainingSends: z.number(),
 *   timeWindowSeconds: z.number(),
 * });
 */
export const commitParamsSchema = z.object({
  // Define what data is passed to the commit phase
});

/**
 * Precheck allow result schema
 *
 * Example: Return state information when precheck allows the operation
 * export const precheckAllowResultSchema = z.object({
 *   currentCount: z.number(),
 *   maxSends: z.number(),
 *   remainingSends: z.number(),
 * });
 */
export const precheckAllowResultSchema = z.object({
  // Define what data to return when precheck allows
});

/**
 * Precheck deny result schema
 *
 * Example: Return error information when precheck denies the operation
 * export const precheckDenyResultSchema = z.object({
 *   reason: z.string(),
 *   currentCount: z.number(),
 *   maxSends: z.number(),
 *   secondsUntilReset: z.number(),
 * });
 */
export const precheckDenyResultSchema = z.object({
  reason: z.string(),
});

/**
 * Evaluate allow result schema
 *
 * Example: Return state information when evaluation allows the operation
 * export const evalAllowResultSchema = z.object({
 *   currentCount: z.number(),
 *   maxSends: z.number(),
 *   remainingSends: z.number(),
 *   timeWindowSeconds: z.number(),
 * });
 */
export const evalAllowResultSchema = z.object({
  // Define what data to return when evaluation allows
});

/**
 * Evaluate deny result schema
 *
 * Example: Return error information when evaluation denies the operation
 * export const evalDenyResultSchema = z.object({
 *   reason: z.string(),
 *   currentCount: z.number(),
 *   maxSends: z.number(),
 *   secondsUntilReset: z.number(),
 * });
 */
export const evalDenyResultSchema = z.object({
  reason: z.string(),
});

/**
 * Commit allow result schema
 *
 * Example: Return updated state after successful commit
 * export const commitAllowResultSchema = z.object({
 *   recorded: z.boolean(),
 *   newCount: z.number(),
 *   remainingSends: z.number(),
 * });
 */
export const commitAllowResultSchema = z.object({
  // Define what data to return when commit succeeds
});

/**
 * Commit deny result schema
 *
 * Example: Return error information if commit fails
 * export const commitDenyResultSchema = z.object({
 *   reason: z.string(),
 * });
 */
export const commitDenyResultSchema = z.object({
  reason: z.string(),
});
