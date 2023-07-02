import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';

import { GetStaticProps } from 'next';
import { useKeenSlider } from 'keen-slider/react';

import * as Styles from '@/styles/pages/home';

import 'keen-slider/keen-slider.min.css';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';
import React from 'react';

interface DAtaProps {
  products: Array<any>;
}

export default function Home({ products }: DAtaProps) {
  const [ sliderRef ] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  });

  return (
    <React.Fragment>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <Styles.HomeContainer ref={sliderRef} className='keen-slider'>
        {products.map((product: any, index: number) => (
          <Link key={index} href={`/product/${product.id}`} prefetch={false}>
            <Styles.Products className='keen-slider__slide'>
              <Image src={product.image} width={520} height={480} alt='' />

              <footer>
                <strong>{product.title}</strong>
                <span>{product.price}</span>
              </footer>
            </Styles.Products>
          </Link>
        ))}
      </Styles.HomeContainer>
    </React.Fragment>
  )
};

export const getStaticProps: GetStaticProps = async() => {
  const { data } = await stripe.products.list({
    expand: [ 'data.default_price' ]
  });

  
  const products = data.map(product => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      image: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount / 100)
    }
  })

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
