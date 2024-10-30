export const MAINNET = 'mainnet';
export const TESTNET = 'testnet';

export const ETHEREUM = 'ethereum';
export const POLYGON = 'polygon';

export const NETWORK = process.env.APP_ENV === MAINNET ? MAINNET : TESTNET;

export const ETHEREUM_CHAIN_ID = NETWORK === MAINNET ? 1 : 3;

export const ETHEREUM_API_URL = process.env.APP_ETHEREUM_API_URL;

export const ETHERSCAN_HOST = NETWORK === MAINNET ? 'https://etherscan.io' : 'https://ropsten.etherscan.io';

export const ETHEREUM_CONTRACT_ADDRESS = process.env.ETHEREUM_CONTRACT_ADDRESS;

export const WETH_CONTRACT_ADDRESS =
    NETWORK === MAINNET ? '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' : '0x0a180a76e4466bf68a7f86fb029bed3cccfaaac5';

export const NATIVE_COIN_ADDRESS = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';

export const POLYGON_CHAIN_ID = NETWORK === MAINNET ? 137 : 80001;

export const POLYGON_API_URL = process.env.POLYGON_API_URL;

export const POLYGONSCAN_HOST = NETWORK === MAINNET ? 'https://polygonscan.com' : 'https://mumbai.polygonscan.com';
