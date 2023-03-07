import { Chain } from '@wagmi/core';

export const goldcoast = {
  id: 84962,
  name: 'Dcomm-goldcoast',
  network: 'goldcoast',
  nativeCurrency: {
    decimals: 18,
    name: 'Dcomm-goldcoast',
    symbol: 'DCM',
  },
  rpcUrls: {
    public: { http: ['https://api-goldcoast.dcomm.network/ext/bc/ACT/rpc'] },
    default: { http: ['https://api-goldcoast.dcomm.network/ext/bc/ACT/rpc'] },
  },
  blockExplorers: {
    etherscan: {
      name: 'Explorer Goldcoast',
      url: 'https://explorer.dcomm.network/',
    },
    default: {
      name: 'Explorer Goldcoast',
      url: 'https://explorer.dcomm.network/',
    },
  },
};
