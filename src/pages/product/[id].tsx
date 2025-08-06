import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import Stripe from 'stripe'
import { stripe } from '../../lib/stripe'
import { Container, ImageContainer, ProductDetails } from '../../styles/pages/product'

interface ProductProps {
  product: {
    id: string
    name: string
    description: string
    imageUrl: string
    url: string
    priceId: string
    price: string
  }
}

export default function Product({ product }: ProductProps) {
  function handleBuyProduct() {
    console.log(product.priceId)
  }

  return (
    <Container>
      <ImageContainer>
        <Image src={product.imageUrl} width={520} height={480} alt="" />
      </ImageContainer>
      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
        <p>{product.description}</p>
        <button onClick={handleBuyProduct}>Comprar agora</button>
      </ProductDetails>
    </Container>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: { id: 'prod_SoTHr8ohQL7msZ' },
      },
    ],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params.id

  const response = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = response.default_price as Stripe.Price

  const product = {
    id: response.id,
    name: response.name,
    description: response.description,
    imageUrl: response.images[0],
    url: response.url,
    priceId: price.id,
    price: Number(price.unit_amount / 100).toLocaleString('pt-BR', {
      currency: 'BRL',
      style: 'currency',
    }),
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 1, // 1 hora
  }
}
