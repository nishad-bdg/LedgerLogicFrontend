import Head from 'next/head'
import { AppProps } from 'next/app'
import '../styles/index.css'
import { Provider } from 'urql'
import client from '../utils/client'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>NextJS TailwindCSS TypeScript Starter</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Provider value={client}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default MyApp