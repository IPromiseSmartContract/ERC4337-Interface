// 你可以定义一个接口来描述你的配置
interface Config {
    rpcUrl: string;
    entryPoint: string;
    simpleAccountFactory: string;
    paymaster: {
        rpcUrl: string;
        context: {type: string};
    };
}

const config: Config = {
    rpcUrl: import.meta.env.VITE_API_KEY? `https://api.stackup.sh/v1/node/${import.meta.env.VITE_API_KEY}` : '',
    entryPoint: import.meta.env.VITE_ENTRYPOINT || '',
    simpleAccountFactory: import.meta.env.VITE_SIMPLE_ACCOUNT_FACTORY || '',
    paymaster: {
        rpcUrl:  import.meta.env.VITE_API_KEY? `https://api.stackup.sh/v1/paymaster/${import.meta.env.VITE_API_KEY}` : '',
        context: {type: "payg"}
    }
};
export default config;