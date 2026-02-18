import { http, createConfig } from 'wagmi'
import { arbitrumSepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'
import { defineChain } from 'viem'

/**
 * Robinhood Chain — custom chain definition
 * Replace RPC URL and chain ID when official details are published
 */
export const robinhoodChain = defineChain({
    id: 23011913, // Stylus testnet / placeholder — update with official Robinhood Chain ID
    name: 'Robinhood Chain',
    nativeCurrency: {
        decimals: 18,
        name: 'Ether',
        symbol: 'ETH',
    },
    rpcUrls: {
        default: {
            http: ['https://stylus-testnet.arbitrum.io/rpc'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Stylus Testnet Explorer',
            url: 'https://stylus-testnet-explorer.arbitrum.io',
        },
    },
    testnet: true,
})

export const config = createConfig({
    chains: [robinhoodChain, arbitrumSepolia],
    connectors: [
        injected({
            target: 'metaMask',
            shimDisconnect: true,
        }),
    ],
    transports: {
        [robinhoodChain.id]: http(),
        [arbitrumSepolia.id]: http(),
    },
    ssr: true,
})

/** Chain IDs for easy reference throughout the app */
export const CHAIN_IDS = {
    robinhoodChain: robinhoodChain.id,
    arbitrumSepolia: arbitrumSepolia.id,
} as const
