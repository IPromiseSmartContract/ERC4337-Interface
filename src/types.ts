export type Page = "Home" | "Paymaster" | "Account"
// UserOp
export interface UserOpInfo {
    fromAddr?: string;
    toAddr?: string;
    assetType?: string;
    amount?: number;
    paymaster?: string;
    // Gas things ...
    callGasLimit?: number;
    preVerificationGasLimit?: number;
    VerificationGasLimit?: number;
    maxFeePerGas?: number;
    maxPriorityFeePerGas?: number;
}
export interface EOAAccount {
    address: string;
    balance?: number;
    aaAcounts: AAAcount[];
} 
export type Role = "User" | "Paymaster" | "Bundler" | "None"
export interface AAAcount {
    role: Role;
    address: string;
    balance?: number;
    tokens?: string[]
} 