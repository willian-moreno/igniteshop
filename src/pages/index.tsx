import Image from 'next/image'
import { HomeContainer, Product } from '../styles/pages/home'

import Shirt1 from '../assets/shirts/1.png'
import Shirt2 from '../assets/shirts/2.png'
import Shirt3 from '../assets/shirts/3.png'
import Shirt4 from '../assets/shirts/4.png'

const shirts = [
  {
    id: 1,
    image: Shirt1,
    product: {
      name: 'Camiseta X',
      price: 79.9,
    },
  },
  {
    id: 2,
    image: Shirt2,
    product: {
      name: 'Camiseta X2',
      price: 79.9,
    },
  },
  {
    id: 3,
    image: Shirt3,
    product: {
      name: 'Camiseta X3',
      price: 79.9,
    },
  },
  {
    id: 4,
    image: Shirt4,
    product: {
      name: 'Camiseta X4',
      price: 79.9,
    },
  },
]

export default function Home() {
  return (
    <HomeContainer>
      {shirts
        .map((shirt) => (
          <Product key={shirt.id}>
            <Image src={shirt.image} width={420} height={378} alt="Camiseta" />
            <footer>
              <strong>{shirt.product.name}</strong>
              <span>
                {Number(shirt.product.price).toLocaleString('pt-BR', {
                  currency: 'BRL',
                  style: 'currency',
                })}
              </span>
            </footer>
          </Product>
        ))
        .slice(0, 2)}
    </HomeContainer>
  )
}
