import React from "react"
import Image from "next/image";
import Head from 'next/head';
import { useRouter } from "next/router"
import { GetStaticPaths, GetStaticProps } from "next";

import * as Styles from "@/styles/pages/product";

import { stripe } from "@/lib/stripe";

import Stripe from "stripe";
import axios from "axios";

export default function Product({ product }){
  const { isFallback } = useRouter();
  const [isCheckout, setIsCheckout] = React.useState(false);

  if(isFallback){
    return <p>loading...</p>
  };

  async function handleBuyProduct(){
    try {
      setIsCheckout(true);
      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;

    } catch (error) {
      // Datadog or Sentry
      setIsCheckout(false);

      alert('Falha ao redirecionar ao checkout');
    }
    
  };

  return (
    <React.Fragment>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
      <Styles.ProductContainer>

        <Styles.ImageContainer>
          <Image src={product.image} width={520} height={480} alt="" />
        </Styles.ImageContainer>

        <Styles.ProductDetail>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button disabled={isCheckout} onClick={handleBuyProduct}>Comprar agora</button>

        </Styles.ProductDetail>

      </Styles.ProductContainer>
    </React.Fragment>
  )
};

export const getStaticPaths: GetStaticPaths = async() => {
  return {
    paths: [
      // { params: { id: 1 } }
    ],
    fallback: true,
  }
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {

  const product = await stripe.products.retrieve(params.id, {
    expand: ['default_price']
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        image: product.images[0],
        description: product.description,
        price: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(price.unit_amount / 100),
        defaultPriceId: price.id
      }
    },
    revalidate: 60 * 60 * 1 // 1 hour
  };
};
