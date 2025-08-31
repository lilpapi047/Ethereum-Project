import { configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { sepolia } from "wagmi/chains";

const { provider, webSocketProvider } = configureChains(
  [sepolia],
  [publicProvider()]
);

export const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

export function WagmiProvider({ children }) {
  return <WagmiConfig client={client}>{children}</WagmiConfig>;
}