import "react-app-polyfill/ie11";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { WalletSelectorContextProvider } from "./WalletSelectorContext";
import { Content } from "./Content";
import { init_env } from "@ref_finance/ref-sdk";
export const REF_WIDGET_NETWORK_ENV_KEY = "REF_WIDGET_NETWORK_ENV_VALUE";

export const App = () => {
  const STORED_NETWORK = localStorage.getItem(REF_WIDGET_NETWORK_ENV_KEY);
  STORED_NETWORK && init_env(STORED_NETWORK);

  return (
    <WalletSelectorContextProvider>
      <Content />
    </WalletSelectorContextProvider>
  );
};
