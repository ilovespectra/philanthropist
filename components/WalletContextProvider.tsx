import { FC, ReactNode } from "react"
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { clusterApiUrl } from "@solana/web3.js"
import { PhantomWalletAdapter,
        SolflareWalletAdapter,
        TorusWalletAdapter, 
        CoinbaseWalletAdapter, 
        GlowWalletAdapter,
        SpotWalletAdapter,
        SlopeWalletAdapter,
        BackpackWalletAdapter,
        SolletExtensionWalletAdapter,
        LedgerWalletAdapter,
        SolletWalletAdapter
} from "@solana/wallet-adapter-wallets"
import { useMemo } from "react"
require("@solana/wallet-adapter-react-ui/styles.css")

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const url = useMemo(() => clusterApiUrl("devnet"), [])
  const ledger = new LedgerWalletAdapter()
  const phantom = new PhantomWalletAdapter()
  const solflare = new SolflareWalletAdapter()
  const glow = new GlowWalletAdapter()
  const spot = new SpotWalletAdapter()
  const slope = new SlopeWalletAdapter()
  const backpack = new BackpackWalletAdapter()
  const sollet = new SolletExtensionWalletAdapter()
  const torus = new TorusWalletAdapter()
  const coinbase = new CoinbaseWalletAdapter()

const wallets = useMemo(
  () => [
    new LedgerWalletAdapter(),
    new SolletWalletAdapter(),
    new GlowWalletAdapter(),
    new BackpackWalletAdapter(),
    new SpotWalletAdapter(),
    new SlopeWalletAdapter(),
    new CoinbaseWalletAdapter(),
    new PhantomWalletAdapter(),
    new TorusWalletAdapter(),
    new SolflareWalletAdapter()
  ],
  []
);

  return (
    <ConnectionProvider endpoint={url}>
      <WalletProvider wallets={[ledger, phantom, solflare, slope, backpack, spot, glow, sollet, coinbase, torus]}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default WalletContextProvider
