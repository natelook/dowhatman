import '../styles/global.css';
import { Web3ReactProvider } from '@web3-react/core';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import type {
  ExternalProvider,
  JsonRpcFetchFunc,
} from '@ethersproject/providers';
import { Web3Provider } from '@ethersproject/providers';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { LayoutGroup } from 'framer-motion';
import { useEffect } from 'react';
import { walletState } from '@components/state';

function getLibrary(provider: ExternalProvider | JsonRpcFetchFunc) {
  return new Web3Provider(provider);
}

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  return (
    <LayoutGroup>
      <Web3ReactProvider getLibrary={getLibrary}>
        <RecoilRoot>
          <Layout>
            {pathname !== '/' ? (
              <div className="py-24 max-w-3xl mx-auto">
                <Component {...pageProps} />
              </div>
            ) : (
              <Component {...pageProps} />
            )}
          </Layout>
        </RecoilRoot>
      </Web3ReactProvider>
    </LayoutGroup>
  );
}

export default MyApp;
