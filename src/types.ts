import { BigNumberish } from "ethers";

export type Page = "Home" | "Paymaster" | "Account"
// UserOp
export interface UserOpInfo {
    fromAddr?: string;
    toAddr?: string;
    assetType?: string;
    amount?: string;
    paymaster?: string;
    // Gas things ...
    callGasLimit?: BigNumberish;
    preVerificationGas?: BigNumberish;
    verificationGasLimit?: BigNumberish;
    maxFeePerGas?: BigNumberish;
    maxPriorityFeePerGas?: BigNumberish;
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
export interface Account{
    privateKey?: string;
    AAaddress?: string;
}
export interface CLIOpts {
    dryRun: boolean;
    withPM: boolean;
  }
  