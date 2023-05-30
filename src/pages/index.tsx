import { GetStaticProps } from 'next';
import Image from 'next/image';
import { useKeenSlider } from 'keen-slider/react';

import * as Styles from '@/styles/pages/home';
import { api } from '@/services/api';

import Image_One from '../assets/2_explorer-t-shirt 1.png';
import Image_Two from '../assets/Camisa-Maratona 1.png';
import Image_Three from '../assets/IgniteLab-T-shirt 1.png';

import 'keen-slider/keen-slider.min.css';
import Link from 'next/link';

export default function Home({ data }) {
  const [ sliderRef ] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  });

  return (
    <Styles.HomeContainer ref={sliderRef} className='keen-slider'>
      {data.map((product, index: number) => (
        <Link key={index} href={`/product/${product.id}`}>
          <Styles.Products className='keen-slider__slide'>
            <Image src={Image_One} width={520} height={480} alt='' />

            <footer>
              <strong>{product.title}</strong>
              <span>R$ {product.price}</span>
            </footer>
          </Styles.Products>
        </Link>
      ))}
    </Styles.HomeContainer>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { data } = await api.get('/data');

  const response = data.map((products) => ({
    ...products,
    image: products.image[0],
    price: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(products.price)
  }))

  return {
    props: {
      data: response
    },
    revalidate: 60 * 60 * 2
  }
};
