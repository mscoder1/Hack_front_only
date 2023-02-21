import { goerli } from "wagmi/chains";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { useWeb3Modal, Web3Modal } from "@web3modal/react";

type WagmiProviderProps = {
  children: React.ReactNode;
};

const WagmiProvider = ({ children }: WagmiProviderProps) => {
  const { setDefaultChain } = useWeb3Modal();
  setDefaultChain(goerli);

  const chains = [goerli];

  const { provider } = configureChains(chains, [
    walletConnectProvider({ projectId: "327bb34e470220af95f4c2aa5b36a1e7" }),
  ]);

  const wagmiClient = createClient({
    autoConnect: true,
    connectors: modalConnectors({
      projectId: "327bb34e470220af95f4c2aa5b36a1e7",
      version: "1",
      appName: "HackPoap",
      chains,
    }),
    provider,
  });

  const ethereumClient = new EthereumClient(wagmiClient, chains);

  return (
    <>
      <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>
      <Web3Modal
        projectId="327bb34e470220af95f4c2aa5b36a1e7"
        ethereumClient={ethereumClient}
      />
    </>
  );
};

export default WagmiProvider;
