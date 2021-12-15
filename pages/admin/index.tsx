import { signer } from '@lib/providers';
import useRequestAccount from '@hooks/useRequestAccount';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { walletState } from '@components/state';
import nftContract, { MINT_CONTRACT_ADDRESS } from '@lib/nft-contract';

interface ContractInfoProps {
  paused: boolean;
  revealed: boolean;
}

export default function AdminPage() {
  const [contractInfo, setContractInfo] = useState<ContractInfoProps | null>();
  const [isOwner, setOwner] = useState(false);
  const wallet = useRecoilValue(walletState);
  const { requestAccount } = useRequestAccount();

  useEffect(() => {
    async function checkIfOwner() {
      if (!wallet) {
        requestAccount();
      }

      console.log(wallet);
      if (wallet === '0xd4ed143f6b3e5cb2f366d270cf98715196df8d65') {
        setOwner(true);
      }
    }

    checkIfOwner();
  }, [requestAccount, wallet]);

  useEffect(() => {
    async function fetchData() {
      const paused = await nftContract().paused();
      const revealed = await nftContract().revealed();
      setContractInfo({
        paused,
        revealed,
      });
    }
    fetchData();
  }, []);

  async function withdraw() {
    const sign = await signer(window.ethereum);
    const withdrawal = await nftContract(sign).withdraw();
    console.log(withdrawal);
  }

  async function pause() {
    const sign = await signer(window.ethereum);
    const paused = await nftContract(sign).pause(
      contractInfo?.paused ? false : true,
    );
  }

  async function reveal() {
    const sign = await signer(window.ethereum);
    const revealed = await nftContract(sign).reveal();
  }

  if (isOwner) {
    return (
      <main>
        <h1 className="mb-10">Admin Panel</h1>
        <h2 className="text-center">Smart Contract Controls</h2>
        {contractInfo && (
          <div className="grid grid-cols-3 place-items-center">
            <div>
              <button className="btn" onClick={pause}>
                {contractInfo.paused ? 'Resume' : 'Pause'}
              </button>
            </div>
            <div>
              <button className="btn" onClick={reveal}>
                {contractInfo.revealed ? 'Unreveal' : 'Reveal'}
              </button>
            </div>
            <div>
              <button className="btn" onClick={withdraw}>
                Withdraw
              </button>
            </div>
          </div>
        )}
      </main>
    );
  }

  return (
    <main>
      <h1>Hey, you are not authorized.</h1>
    </main>
  );
}
