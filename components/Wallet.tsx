import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import useENSName from '../hooks/useENSName';
import { shortenHex } from 'utils';
import { injected } from '../connectors';
import { UserRejectedRequestError } from '@web3-react/injected-connector';
import useMetaMaskOnboarding from 'hooks/useMetaMaskOnboarding';

export default function Wallet() {
  const { active, error, activate, chainId, account, setError } =
    useWeb3React();

  const {
    isMetaMaskInstalled,
    isWeb3Available,
    startOnboarding,
    stopOnboarding,
  } = useMetaMaskOnboarding();

  const [connecting, setConnecting] = useState(false);
  useEffect(() => {
    if (active || error) {
      setConnecting(false);
      stopOnboarding();
    }
  }, [active, error, stopOnboarding]);

  const ENSName = useENSName(account);
  console.log({ account });

  if (error) {
    return null;
  }

  // if (!triedToEagerConnect) {
  //   return null;
  // }

  if (!account) {
    return (
      <button
        className="wallet-button"
        disabled={connecting}
        onClick={() => {
          setConnecting(true);

          activate(injected, undefined, true).catch(error => {
            if (error instanceof UserRejectedRequestError) {
              setConnecting(false);
            } else {
              setError(error);
            }
          });
        }}
      >
        Connect Wallet
      </button>
    );
  } else {
    return (
      <a className="wallet-button cursor-pointer">
        {ENSName || shortenHex(account, 4)}
      </a>
    );
  }
}
