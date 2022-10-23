import "react-app-polyfill/ie11";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { WalletSelectorContextProvider } from "./WalletSelectorContext";
import { Content } from "./Content";
export const App = () => {
    return (
        <WalletSelectorContextProvider>
            <Content />
        </WalletSelectorContextProvider>
    );
};
