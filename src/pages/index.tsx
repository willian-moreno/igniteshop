import 'keen-slider/keen-slider.min.css'

import { useKeenSlider } from 'keen-slider/react'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Stripe from 'stripe'
import { stripe } from '../lib/stripe'
import { Container, Product } from '../styles/pages/home'

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    url: string
    price: number
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  return (
    <Container ref={sliderRef} className="keen-slider">
      {products.map((product) => (
        <Product key={product.id} className="keen-slider__slide">
          <Image src={product.imageUrl} width={420} height={378} alt="Camiseta" />
          <footer>
            <strong>{product.name}</strong>
            <span>{product.price}</span>
          </footer>
        </Product>
      ))}
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      url: product.url,
      price: Number(price.unit_amount / 100).toLocaleString('pt-BR', {
        currency: 'BRL',
        style: 'currency',
      }),
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 horas
  }
}
