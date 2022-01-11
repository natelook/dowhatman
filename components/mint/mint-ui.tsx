import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { motion } from 'framer-motion';

interface MintUIProps {
  setMintAmount: (amount: number) => void;
  mintAmount: number;
  mint: () => void;
  isMinting: boolean;
  isMinted: boolean;
}

export default function MintUI({
  setMintAmount,
  mintAmount,
  mint,
  isMinting,
  isMinted,
}: MintUIProps) {
  return (
    <div className="mt-6">
      <h3 className="text-3xl text-center">Select Mint Amount. ( 10 Max )</h3>
      <div className="max-w-xs mx-auto flex justify-between items-center space-x-10 p-5">
        <motion.button
          onClick={() => setMintAmount(mintAmount - 1)}
          className="bg-black p-2 text-xl rounded-lg border-yellow border hover:bg-yellow hover:text-black transition-colors"
          disabled={mintAmount === 0}
          whileTap={{ scale: 0.8 }}
          transition={{ duration: 0.1 }}
        >
          <AiOutlineMinus />
        </motion.button>
        <span className="text-2xl">{mintAmount}</span>
        <motion.button
          onClick={() => setMintAmount(mintAmount + 1)}
          className="bg-black p-2 text-xl rounded-lg border-yellow border hover:bg-yellow hover:text-black transition-colors"
          disabled={mintAmount === 10}
          whileTap={{ scale: 0.8 }}
          transition={{ duration: 0.1 }}
        >
          <AiOutlinePlus />
        </motion.button>
      </div>
      <div className="max-w-xs mx-auto">
        {!isMinting && !isMinted && (
          <button
            onClick={mint}
            className="bg-green text-black w-full py-2 rounded-lg uppercase font-bold text-xl"
          >
            Mint
          </button>
        )}
        {isMinting && <p>Minting...</p>}
        {isMinted && <p>Minted.</p>}
      </div>
    </div>
  );
}
