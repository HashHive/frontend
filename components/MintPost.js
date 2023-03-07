import React from 'react';
import { useAccount } from 'wagmi';

import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi';
export default function MintPost() {
  const [title, setTitle] = React.useState('');

  const [text, setText] = React.useState('');

  const { address } = useAccount();

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: '0xe904a8f39651c888A0993542e0A08F78e38C0eAB',
    abi: [
      {
        name: 'safeMint',
        type: 'function',
        stateMutability: 'payable',
        inputs: [
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'string', name: 'title', type: 'string' },
          { internalType: 'string', name: 'text', type: 'string' },
        ],
        outputs: [],
      },
    ],
    functionName: 'safeMint',
    args: [address, title, text],
    enabled: Boolean(title),
  });
  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <form className="flex flex-col justify-center items-center gap-4">
      <input
        aria-label="Title"
        placeholder="Title..."
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <input
        aria-label="Text"
        placeholder="Text..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        disabled={!title || !text || !write || isLoading}
        onClick={() => write()}
      >
        {isLoading ? 'Minting...' : 'Mint'}
      </button>
      {isSuccess && (
        <div>
          Successfully minted your NFT!
          <div>
            <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
          </div>
        </div>
      )}
      {(isPrepareError || isError) && (
        <div>Error: {(prepareError || error)?.message}</div>
      )}
    </form>
  );
}
