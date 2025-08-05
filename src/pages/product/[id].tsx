import Image from 'next/image'
import { useRouter } from 'next/router'
import { Container, ImageContainer, ProductDetails } from '../../styles/pages/product'

export default function Product() {
  const { query } = useRouter()

  return (
    <Container>
      <ImageContainer>
        <Image
          src={
            'https://files.stripe.com/links/MDB8YWNjdF8xUnNxQzVHU0lpVzBzQXl4fGZsX3Rlc3RfZlhZeFQ3THo0OE1vNXRGc3U5SmhmN2lq002VpnLbvl'
          }
          width={420}
          height={378}
          alt=""
        />
      </ImageContainer>
      <ProductDetails>
        <h1>Camiseta X</h1>
        <span>R$ 79,90</span>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, aut.</p>
        <button>Comprar agora</button>
      </ProductDetails>
    </Container>
  )
}
