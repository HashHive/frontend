import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPosts } from '../utils/mdx-utils';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout, { GradientBackground } from '../components/Layout';
import ArrowIcon from '../components/ArrowIcon';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import MintPost from '../components/MintPost';

export default function Index({ globalData }) {
  const [posts, setPosts] = useState();
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  useEffect(() => {
    async function fetchData() {
      const posts = await getPosts();
      setPosts(posts);
    }
    fetchData();
  }, []);

  return (
    <Layout>
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <Header name={globalData.name} />
      {isConnected ? (
        <div className="flex flex-col justify-center items-center gap-4">
          Connected to {address}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded gap-4"
            onClick={() => disconnect()}
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded gap-4"
          onClick={() => connect()}
        >
          Connect Wallet
        </button>
      )}
      <div className="my-12">
        <MintPost />
      </div>
      <main className="w-full">
        <h1 className="text-3xl lg:text-5xl text-center mb-12">
          {globalData.blogTitle}
        </h1>
        <ul className="w-full">
          {posts ? (
            posts.map((post) => (
              <li
                key={post.tokenId}
                className="md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0 my-8"
              >
                <Link as={`/posts/${post.tokenId}`} href={`/posts/[tokenId]`}>
                  <a className="py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">
                    <h2 className="text-2xl md:text-3xl">{post.title}</h2>
                    {post.text && (
                      <p className="mt-3 text-lg opacity-60">{post.text}</p>
                    )}
                    <ArrowIcon className="mt-4" />
                  </a>
                </Link>
              </li>
            ))
          ) : (
            <h6 className="text-3xl lg:text-5xl text-center mb-12">
              Loading posts...
            </h6>
          )}
        </ul>
      </main>
      <Footer copyrightText={globalData.footerText} />
      <GradientBackground
        variant="large"
        className="fixed top-20 opacity-40 dark:opacity-60"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
    </Layout>
  );
}

export async function getStaticProps() {
  const globalData = getGlobalData();

  return { props: { globalData } };
}
