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

function getLibrary(provider: ExternalProvider | JsonRpcFetchFunc) {
  console.log('getLibray Provider', { provider });
  return new Web3Provider(provider);
}

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  return (
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
  );
}

export default MyApp;
