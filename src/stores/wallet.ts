import { defineStore } from 'pinia'
import { ethers } from "ethers";
import { Client } from "userop";
import { createAA }  from '../utils/wallet.ts'
import { CLIOpts, Account } from "../types.ts";
import config from "../../config.ts";
export const useWalletStore = defineStore('wallet', {
    state: (): Account => ({
        privateKey: undefined,
    }),
    actions: {
        // 生成一个 wallet
        async generateAA(opts: CLIOpts) {
            // create AA
            console.log(config)
            const wallet = ethers.Wallet.createRandom();
            this.privateKey = wallet.privateKey;
            const simpleAccount = await createAA(wallet, opts);
            this.AAaddress = simpleAccount.getSender();
            console.log(`Wallet address: ${wallet.address}`)
        },
        // 设置 wallet
        async setAA(signingKey: string, opts: CLIOpts) {
            // create AA
            const wallet = new ethers.Wallet(signingKey)
            this.privateKey = wallet.privateKey;
            const simpleAccount = await createAA(wallet, opts);
            console.log(`Wallet address: ${wallet.address}`)
            console.log(`AA address: ${simpleAccount.getSender()}`)
        },
        async transfer(to: string, amount: string, opts: CLIOpts) {
            // create AA
            const wallet = new ethers.Wallet(this.privateKey!)
            // Tx Parameters
            const client = await Client.init(config.rpcUrl);
            const target = ethers.utils.getAddress(to);
            const value = ethers.utils.parseEther(amount);
            console.log("Wallet: ", wallet)
            const simpleAccount = await createAA(wallet, opts);
            const res = await client.sendUserOperation(
                simpleAccount.execute(target, value, "0x"),
                {
                    dryRun: opts.dryRun,
                    onBuild: (op) => console.log("Signed UserOperation:", op),
                }
            );
            console.log(`UserOpHash: ${res.userOpHash}`);
            console.log("Waiting for transaction...");
            const ev = await res.wait();
            console.log(`Transaction hash: ${ev?.transactionHash ?? null}`);
        },
    }
})