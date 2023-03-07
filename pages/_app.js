import '../styles/globals.css';
import 'prismjs/themes/prism-tomorrow.css';
import { WagmiConfig, createClient, configureChains } from 'wagmi';

import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { goldcoast } from '../utils/goldCoastTestnet';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider } = configureChains(
  [goldcoast],
  [
    // alchemyProvider({
    //   apiKey: 'alchemy-key',
    // }),
    publicProvider(),
  ]
);

// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [
    // new MetaMaskConnector({ chains }),
    // new CoinbaseWalletConnector({
    //   chains,
    //   options: {
    //     appName: 'HashHive',
    //   },
    // }),
    // new WalletConnectConnector({
    //   chains,
    //   options: {
    //     projectId: '...',
    //   },
    // }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  provider,
});

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={client}>
      <span className="theme-bejamas" />
      <Component {...pageProps} />
    </WagmiConfig>
  );
}

export default MyApp;
