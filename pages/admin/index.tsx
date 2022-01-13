import useContract from '@hooks/useContract';
import useWallet from '@hooks/useWallet';
import cn from 'classnames';

export default function AdminPage() {
  const { contractBalance, withdraw, isOwner, isPaused, pause } = useContract();
  const { wallet, connectWallet } = useWallet();

  console.log({ isPaused });

  if (wallet && isOwner) {
    return (
      <div>
        <h1>Admin Page</h1>
        <div className="border border-green p-4">
          <h3 className="text-3xl">Dashboard</h3>
          <div className="flex flex-col space-y-5">
            <button className="btn font-bold" onClick={withdraw}>
              Withdraw {contractBalance} eth
            </button>
            {typeof isPaused === 'boolean' && (
              <button
                className={cn('btn font-bold', {
                  'bg-yellow': isPaused,
                  'bg-green border-green hover:text-green': !isPaused,
                })}
                onClick={pause}
              >
                {!isPaused ? 'Sale is live' : 'Resume Sale (Minting is paused)'}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (wallet && !isOwner) {
    return (
      <div>
        <p>You are not authorized to view this page.</p>
      </div>
    );
  }

  return (
    <div className="text-center flex justify-center w-full">
      <button
        className="wallet-button mx-auto block"
        onClick={() => connectWallet()}
      >
        Connect Wallet
      </button>
    </div>
  );
}
