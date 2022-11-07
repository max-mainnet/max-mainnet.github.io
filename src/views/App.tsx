import "react-app-polyfill/ie11";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { WalletSelectorContextProvider } from "./WalletSelectorContext";
import { Content } from "./Content";
export const REF_WIDGET_NETWORK_ENV_KEY = "REF_WIDGET_NETWORK_ENV_VALUE";

export const App = () => {
  return (
    <WalletSelectorContextProvider>
      <Content />
    </WalletSelectorContextProvider>
  );
};
