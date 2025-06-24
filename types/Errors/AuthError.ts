/** 
 * @author George Garcia
 * @param { string } code - The error code
 * @param { string } message - The error message
 * @description The error interface for the AuthProvider
 */

export interface AuthError {
  code:    string;
  message: string;
}