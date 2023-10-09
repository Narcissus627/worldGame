import React, { useLayoutEffect } from "react";
import PropTypes from "prop-types";

import { WagmiConfig, configureChains, createConfig } from "wagmi";
import {
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    zora,
    goerli,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import {
    getDefaultWallets,
    RainbowKitProvider,
    lightTheme,
} from "@rainbow-me/rainbowkit";
// import multiTabsMain from "../utils/preventMultitabs";
import "./style/rainkitbow/style.css";

const Wrapper = ({ children }) => {
    // Step1 配置链
    const { chains, publicClient, webSocketPublicClient } = configureChains(
        [mainnet, polygon, optimism, arbitrum, base, zora, goerli],
        [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
    );

    // Step2 配置connectors
    const { connectors } = getDefaultWallets({
        appName: process.env.NEXT_PUBLIC_APP_NAME,
        projectId: "54842d223a39805465f643eff0a011be",
        chains: chains.filter((chain) => chain.id !== 1),
    });

    // Step3 创建配置并导出
    const wagmiConfig = createConfig({
        publicClient,
        webSocketPublicClient,
        connectors,
        autoConnect: true,
    });

    // useLayoutEffect(() => {
    //     multiTabsMain(window.location.origin);
    // }, []);

    return (
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider
                chains={chains}
                initialChain={5}
                theme={lightTheme({
                    accentColor: "#9c49d6",
                    accentColorForeground: "white",
                    borderRadius: "large",
                    fontStack: "system",
                    overlayBlur: "small",
                })}
            >
                {children}
            </RainbowKitProvider>
        </WagmiConfig>
    );
};

Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Wrapper;
