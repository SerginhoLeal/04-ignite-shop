import type { AppProps } from 'next/app'
import { globalStyles } from '@/styles/global'

import LogoImg from '../assets/logo.svg';

import * as Styles from '@/styles/pages/app';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Styles.Container>
      <Styles.Header>
        <img src={LogoImg.src} alt='' />
      </Styles.Header>
      <Component {...pageProps} />
    </Styles.Container>
  )
}
