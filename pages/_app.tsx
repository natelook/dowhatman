import '../styles/global.css';
import { Web3ReactProvider } from '@web3-react/core';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import type {
  ExternalProvider,
  JsonRpcFetchFunc,
} from '@ethersproject/providers';
import { Web3Provider } from '@ethersproject/providers';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

function getLibrary(provider: ExternalProvider | JsonRpcFetchFunc) {
  console.log('getLibray Provider', { provider });
  return new Web3Provider(provider);
}

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname, route } = useRouter();

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Layout>
        <motion.div
          key={route}
          initial="pageInitial"
          animate="pageAnimate"
          variants={{
            pageInitial: {
              opacity: 0,
            },
            pageAnimate: {
              opacity: 1,
            },
          }}
        >
          {pathname !== '/' ? (
            <div className="py-24 max-w-3xl mx-auto px-2">
              <Component {...pageProps} />
            </div>
          ) : (
            <Component {...pageProps} />
          )}
        </motion.div>
      </Layout>
    </Web3ReactProvider>
  );
}

export default MyApp;
