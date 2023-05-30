<<<<<<< HEAD
import { GetStaticProps } from 'next';
=======
import { GetServerSideProps, GetStaticProps } from 'next';
import { Fragment, useEffect, useState } from 'react';

>>>>>>> f7dcbdbd9bf2b1b69cd47783462520010922c224
import Image from 'next/image';
import { useKeenSlider } from 'keen-slider/react';

import * as Styles from '@/styles/pages/home';
import { api } from '@/services/api';

import Image_One from '../assets/2_explorer-t-shirt 1.png';

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
<<<<<<< HEAD
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
=======
    <Fragment>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <Styles.HomeContainer ref={sliderRef} className='keen-slider'>
        {products.map((prod, index) => (
          <Styles.Products key={index} href={`/products/${prod.id}`} className='keen-slider__slide'>
            <Image src={Image_One} width={520} height={480} alt='' />

            <footer>
              <strong>{prod.name}</strong>
              <span>{prod.price}</span>
            </footer>
          </Styles.Products>
        ))}
      </Styles.HomeContainer>
    </Fragment>
>>>>>>> f7dcbdbd9bf2b1b69cd47783462520010922c224
  )
};

export const getStaticProps: GetStaticProps = async() => {
  const { data } = await api.get('data');
  const products = data.map((product: any) => ({
    id: product.id,
    name: product.name,
    price: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(product.price)
  }))

  return {
    props: {
      products
    },
    revalidate: 60 * 60 + 2
  }
}

<<<<<<< HEAD
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
=======
/**
 * @augments SSR
 *  export const getServerSideProps: GetServerSideProps = async() => {
 *    const { data } = await api.get('data');
 *    const products = data.map(product => ({
 *      name: product.name,
 *      price: product.price
 *    }))
 *  
 *    return {
 *      props: {
 *        products
 *      }
 *    }
 *  }
 */
>>>>>>> f7dcbdbd9bf2b1b69cd47783462520010922c224
