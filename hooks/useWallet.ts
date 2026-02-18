"use client";

import { useAccount, useConnect, useDisconnect, useEnsName } from 'wagmi'
import { useCallback } from 'react'

// Extend Window type untuk MetaMask ethereum provider
declare global {
    interface Window {
        ethereum?: {
            isMetaMask?: boolean
            providers?: Array<{ isMetaMask?: boolean }>
            request?: (args: { method: string; params?: unknown[] }) => Promise<unknown>
        }
    }
}

export function useWallet() {
    const { address, isConnected, isConnecting } = useAccount()
    const { data: ensName } = useEnsName({ address })
    const { connectors, connect, isPending: isConnectPending, error: connectError } = useConnect()
    const { disconnect } = useDisconnect()

    const handleConnect = useCallback(() => {
        if (isConnected) {
            disconnect()
            return
        }

        // Cek apakah MetaMask terinstall di browser
        if (typeof window === 'undefined') return

        const metamaskInstalled =
            typeof window.ethereum !== 'undefined' &&
            (window.ethereum?.isMetaMask === true || window.ethereum?.providers?.some((p) => p.isMetaMask) === true)

        if (!metamaskInstalled) {
            window.open('https://metamask.io/download/', '_blank', 'noopener,noreferrer')
            return
        }

        const connector = connectors[0]
        if (!connector) return

        connect({ connector })
    }, [isConnected, connectors, connect, disconnect])

    // Format address untuk display: ENS name atau short address
    const displayAddress = ensName ?? (address ? `${address.slice(0, 6)}...${address.slice(-4)}` : null)

    return {
        address,
        isConnected,
        isConnecting: isConnecting || isConnectPending,
        displayAddress,
        connectError,
        handleConnect,
        disconnect,
    }
}
