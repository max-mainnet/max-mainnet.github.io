import * as React from "react";
import {
  SwapWidget,
  config,
  Transaction,
  transformTransactions,
  getDefaultTokenList,
  NotLoginError,
  TokenMetadata,
  getPool,
  init_env,
  getConfig,
  ftGetTokensMetadata,
  getPoolByIds,
} from "@ref-finance/ref-sdk";
import { useWalletSelector } from "./WalletSelectorContext";
import "@near-wallet-selector/modal-ui/styles.css";

import { SignAndSendTransactionsParams } from "@near-wallet-selector/core/lib/wallet";
import { useEffect } from "react";
import { REF_WIDGET_NETWORK_ENV_KEY } from "./App";

export const Content = () => {
  const [enableSmartRouting, setEnableSmartRouting] = React.useState(false);

  const { modal, selector, accountId } = useWalletSelector();

  const onDisConnect = async () => {
    if (!accountId) return;

    const wallet = await selector.wallet();
    return await wallet.signOut();
  };

  const onConnect = () => {
    modal.show();
  };

  const [swapState, setSwapState] = React.useState<"success" | "fail" | null>(null);

  const [tx, setTx] = React.useState<string | undefined>(undefined);

  const [referralId, setReferralId] = React.useState<string>("ref-fee.testnet");

  React.useEffect(() => {
    const errorCode = new URLSearchParams(window.location.search).get("errorCode");

    const transactions = new URLSearchParams(window.location.search).get("transactionHashes");

    const lastTX = transactions?.split(",").pop();

    setTx(lastTX);

    setSwapState(!!errorCode ? "fail" : !!lastTX ? "success" : null);

    window.history.replaceState({}, "", window.location.origin + window.location.pathname);

    ftGetTokensMetadata().then((res) => {
      console.log(res);
    });
  }, []);

  const onSwap = async (transactionsRef: Transaction[]) => {
    const wallet = await selector.wallet();

    if (!accountId) throw NotLoginError;

    const WalletSelectorTransactions = {
      transactions: transformTransactions(transactionsRef, accountId),
    } as SignAndSendTransactionsParams;

    return wallet.signAndSendTransactions(WalletSelectorTransactions);
  };

  const defaultList = getDefaultTokenList();

  return (
    <>
      <button
        className="text-white outline ml-2 mt-2"
        onClick={async () => {
          localStorage.setItem(REF_WIDGET_NETWORK_ENV_KEY, getConfig().networkId === "testnet" ? "mainnet" : "testnet");

          await onDisConnect();

          window.location.reload();
        }}
      >
        Change Network from
        {` ${getConfig().networkId} to ${getConfig().networkId === "testnet" ? "mainnet" : "testnet"}`}
      </button>

      <button
        className="text-white outline ml-2 mt-2"
        onClick={() => {
          setEnableSmartRouting(!enableSmartRouting);
        }}
      >
        enable smart routing from
        {` ${enableSmartRouting} to ${!enableSmartRouting}`}
      </button>

      <button
        className="text-white outline ml-2 mt-2"
        onClick={() => {
          // setEnableSmartRouting(!enableSmartRouting);
          setReferralId(!referralId ? "ref-fee.testnet" : "");
        }}
      >
        {referralId ? `clear referral id` : `set referral id to ref-fee.testnet`}
      </button>

      <button
        className="text-white outline ml-2 mt-2"
        onClick={() => {
          // setEnableSmartRouting(!enableSmartRouting);
          setReferralId("amyliang.testnet");
        }}
      >
        set referral id to amyliang.testnet
      </button>

      <SwapWidget
        onSwap={onSwap}
        onDisConnect={onDisConnect}
        width={"500px"}
        connection={{
          AccountId: accountId || "",
          isSignedIn: !!accountId,
        }}
        className="mx-auto"
        transactionState={{
          state: swapState,
          setState: setSwapState,
          tx,
          detail: "(success details show here)",
        }}
        defaultTokenList={defaultList as TokenMetadata[]}
        enableSmartRouting={enableSmartRouting}
        onConnect={onConnect}
        referralId={referralId}
      />
    </>
  );
};
