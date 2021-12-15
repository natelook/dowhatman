import { walletState } from '@components/state';
import { useSetRecoilState } from 'recoil';

export default function useRequestAccount() {
  const setWallet = useSetRecoilState(walletState);

  async function requestAccount() {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    setWallet(accounts[0]);
  }

  return { requestAccount };
}
