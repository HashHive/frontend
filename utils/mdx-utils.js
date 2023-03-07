import { readContract } from '@wagmi/core';
import { erc721ABI } from '@wagmi/core';

export const getTotalSupply = async () => {
  const data = await readContract({
    address: '0xe904a8f39651c888A0993542e0A08F78e38C0eAB',
    abi: [
      {
        name: 'totalSupply',
        type: 'function',
        stateMutability: 'view',
        inputs: [],
        outputs: [
          { internalType: 'uint256', name: 'totalSupply', type: 'uint256' },
        ],
      },
    ],
    functionName: 'totalSupply',
  });

  return { data };
};
export const getPosts = async () => {
  const totalSupply = await getTotalSupply();

  let posts = [];

  for (let i = 0; i < totalSupply.data.toNumber(); i++) {
    const data = await readContract({
      address: '0xe904a8f39651c888A0993542e0A08F78e38C0eAB',
      abi: erc721ABI,
      functionName: 'tokenURI',
      args: [i],
    });

    const splitedURI = data?.split('data:application/json;base64,')[1];

    const decodeBase64Uri = JSON.parse(
      Buffer.from(splitedURI, 'base64').toString('utf-8')
    );

    posts.push({
      title: decodeBase64Uri.title,
      text: decodeBase64Uri.text,
      tokenId: i,
    });
  }
  return posts;
};

export const getPostByTokenID = async (tokenId) => {
  const data = await readContract({
    address: '0xe904a8f39651c888A0993542e0A08F78e38C0eAB',
    abi: erc721ABI,
    functionName: 'tokenURI',
    args: [tokenId],
  });
  const splitedURI = data?.split('data:application/json;base64,')[1];

  const decodeBase64Uri = JSON.parse(
    Buffer.from(splitedURI, 'base64').toString('utf-8')
  );
  return decodeBase64Uri;
};

// export const getNextPostByTokenID = async (tokenId) => {
//   const posts = await getPosts();
//   const currentFileName = tokenId;
//   const currentPost = posts.find((post) => post.tokenId === currentFileName);
//   const currentPostIndex = posts.indexOf(currentPost);

//   const post = posts[currentPostIndex - 1];
//   // no prev post found
//   if (!post) return null;

//   const nextPostTokenID = post?.tokenId;

//   return {
//     title: post.title,
//     tokenId: nextPostTokenID,
//   };
// };

// export const getPreviousPostByTokenID = async (tokenId) => {
//   const posts = await getPosts();
//   const currentFileName = tokenId;
//   const currentPost = posts.find((post) => post.tokenId === currentFileName);
//   const currentPostIndex = posts.indexOf(currentPost);

//   const post = posts[currentPostIndex + 1];
//   // no prev post found
//   if (!post) return null;

//   const previousPostTokenID = post?.tokenId;

//   return {
//     title: post.title,
//     tokenId: previousPostTokenID,
//   };
// };
