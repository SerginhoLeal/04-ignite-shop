import { GetServerSideProps, GetStaticProps } from 'next';
import { Fragment, useEffect, useState } from 'react';

import Image from 'next/image';
import { useKeenSlider } from 'keen-slider/react';

import * as Styles from '@/styles/pages/home';
import { api } from '@/services/api';

import Image_One from '../assets/2_explorer-t-shirt 1.png';

import 'keen-slider/keen-slider.min.css';
import Head from 'next/head';

interface HomeProps {
  products: {
    id: number;
    name: string;
    price: string;
  }[];
}

export default function Home({ products }: HomeProps) {
  const [ sliderRef ] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  });

  return (
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
