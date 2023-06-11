import { ethers } from "ethers";
import { Presets } from "userop";
import { CLIOpts } from "../types";
// @ts-ignore
import config from "../../config.ts";


export async function createAA(wallet: ethers.Wallet, opts: CLIOpts) {
  const paymasterMiddleware = opts.withPM
    ? Presets.Middleware.verifyingPaymaster(
        config.paymaster.rpcUrl,
        config.paymaster.context
    ): undefined;
  const simpleAccount = await Presets.Builder.SimpleAccount.init(
    wallet,
    config.rpcUrl,
    { paymasterMiddleware }
  );
  console.log("Simple AA created: ", simpleAccount.getSender())
  return simpleAccount;
}
