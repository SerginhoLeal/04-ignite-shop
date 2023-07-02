import Link from 'next/link';
import * as Styles from '../styles/pages/success';
import { GetServerSideProps } from 'next';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';
import Image from 'next/image';
import React from 'react';
import Head from 'next/head';

interface Props {
  customerName: string;
  product: {
    name: string;
    imageUrl: string;
  }
}

export default function Success({ customerName, product }: Props) {
  return (
    <React.Fragment>
      <Head>
        <title>Compra Efetuada com Sucesso</title>

        <meta name='robots' content='noindex'/>
      </Head>
      <Styles.SuccessContainer>
        <h1>Compra efetuada</h1>
        <Styles.ImageContainer>
          <Image src={product.imageUrl} width={120} height={110} alt={product.name} />
        </Styles.ImageContainer>

        <p>
          Uhuu <strong>{customerName}</strong>, sua <strong>{product.name}</strong> está sendo preparada para entrega.
        </p>

        <Link href='/'>Voltar ao catálogo</Link>
      </Styles.SuccessContainer>
    </React.Fragment>
  )
};

export const getServerSideProps: GetServerSideProps = async ({ query}) => {
    if(!query.session_id){
      return {
        // notFound: true,
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  });

  const customerName = session.customer_details?.name;
  const product = session.line_items.data[0].price.product as Stripe.Product;

  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0]
      }
    }
  }
};