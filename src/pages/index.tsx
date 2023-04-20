import Image from 'next/image';
import { useKeenSlider } from 'keen-slider/react';

import * as Styles from '@/styles/pages/home';

import Image_One from '../assets/2_explorer-t-shirt 1.png';
import Image_Two from '../assets/Camisa-Maratona 1.png';
import Image_Three from '../assets/IgniteLab-T-shirt 1.png';

import 'keen-slider/keen-slider.min.css';

export default function Home() {
  const [ sliderRef ] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  });

  return (
    <Styles.HomeContainer ref={sliderRef} className='keen-slider'>
      <Styles.Products className='keen-slider__slide'>
        <Image src={Image_One} width={520} height={480} alt='' />

        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Styles.Products>

      <Styles.Products className='keen-slider__slide'>
        <Image src={Image_Two} width={520} height={480} alt='' />

        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Styles.Products>

      <Styles.Products className='keen-slider__slide'>
        <Image src={Image_Three} width={520} height={480} alt='' />

        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Styles.Products>
      <Styles.Products className='keen-slider__slide'>
        <Image src={Image_Three} width={520} height={480} alt='' />

        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Styles.Products>
    </Styles.HomeContainer>
  )
}
