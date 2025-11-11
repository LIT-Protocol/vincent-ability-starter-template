import { z } from 'zod';

/**
 * Define known error codes for your ability
 * Example:
 * export const KNOWN_ERRORS = {
 *   INSUFFICIENT_BALANCE: 'INSUFFICIENT_BALANCE',
 *   INVALID_PARAMETER: 'INVALID_PARAMETER',
 * } as const;
 */
export const KNOWN_ERRORS = {
  // Define your error codes here
} as const;

/**
 * Ability parameters schema - defines the input parameters for your ability
 *
 * Example: For a token transfer ability
 * export const abilityParamsSchema = z.object({
 *   to: z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid Ethereum address'),
 *   amount: z.string().regex(/^\d*\.?\d+$/, 'Invalid amount format'),
 *   rpcUrl: z.string().url('Invalid RPC URL').optional(),
 * });
 */
export const abilityParamsSchema = z.object({
  // Define your ability input parameters here
});

/**
 * Precheck success result schema
 *
 * Example: Return validation data that confirms the ability can execute
 * export const precheckSuccessSchema = z.object({
 *   availableBalance: z.string(),
 *   estimatedGas: z.string(),
 * });
 */
export const precheckSuccessSchema = z.object({
  // Define what data to return when precheck succeeds
});

/**
 * Precheck failure result schema
 *
 * Example: Return structured error information
 * export const precheckFailSchema = z.object({
 *   reason: z.union([
 *     z.literal('INSUFFICIENT_BALANCE'),
 *     z.literal('INVALID_PARAMETER'),
 *   ]),
 *   error: z.string(),
 * });
 */
export const precheckFailSchema = z.object({
  error: z.string(),
});

/**
 * Execute success result schema
 *
 * Example: Return the results of successful execution
 * export const executeSuccessSchema = z.object({
 *   txHash: z.string(),
 *   to: z.string(),
 *   amount: z.string(),
 *   timestamp: z.number(),
 * });
 */
export const executeSuccessSchema = z.object({
  // Define what data to return when execution succeeds
});

/**
 * Execute failure result schema
 *
 * Example: Return error details
 * export const executeFailSchema = z.object({
 *   error: z.string(),
 *   code: z.string().optional(),
 * });
 */
export const executeFailSchema = z.object({
  error: z.string(),
});
