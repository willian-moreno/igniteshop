import { AppProps } from 'next/app'
import Image from 'next/image'
import Link from 'next/link'
import logoImg from '../assets/logo.svg'
import { globalStyles } from '../styles/global'
import { Container, Header } from '../styles/pages/app'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Link href="/" prefetch={false}>
          <Image src={logoImg} alt="Logo Ignite Shop" />
        </Link>
      </Header>
      <Component {...pageProps} />
    </Container>
  )
}
