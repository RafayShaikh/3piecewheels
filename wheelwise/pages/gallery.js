import styles from '../styles/Gallery/gallery.module.css';
import Image from 'next/image';
import { useState } from 'react';
import Footer from '../components/HeaderFooter/Footer';
import Header from '../components/HeaderFooter/Header';
import Head from 'next/head';

function gallery() {
  const [items, setItems] = useState([
    {
      picture: '/logoTemp.png',
      description:
        'some text  Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui voluptatem tempore consequuntur soluta ab neque eaque consequatur fugit voluptates porro alias non sequi, eveniet earum est adipisci autem eligendi. Esse?',
    },
    {
      picture: '/logoTemp.png',
      description:
        'some text  Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui voluptatem tempore consequuntur soluta ab neque eaque consequatur fugit voluptates porro alias non sequi, eveniet earum est adipisci autem eligendi. Esse?',
    },
    {
      picture: '/logoTemp.png',
      description:
        'some text  Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui voluptatem tempore consequuntur soluta ab neque eaque consequatur fugit voluptates porro alias non sequi, eveniet earum est adipisci autem eligendi. Esse?',
    },
    {
      picture: '/logoTemp.png',
      description:
        'some text  Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui voluptatem tempore consequuntur soluta ab neque eaque consequatur fugit voluptates porro alias non sequi, eveniet earum est adipisci autem eligendi. Esse?',
    },
    {
      picture: '/logoTemp.png',
      description:
        'some text  Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui voluptatem tempore consequuntur soluta ab neque eaque consequatur fugit voluptates porro alias non sequi, eveniet earum est adipisci autem eligendi. Esse?',
    },
    {
      picture: '/logoTemp.png',
      description:
        'some text  Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui voluptatem tempore consequuntur soluta ab neque eaque consequatur fugit voluptates porro alias non sequi, eveniet earum est adipisci autem eligendi. Esse?',
    },
    {
      picture: '/logoTemp.png',
      description:
        'some text  Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui voluptatem tempore consequuntur soluta ab neque eaque consequatur fugit voluptates porro alias non sequi, eveniet earum est adipisci autem eligendi. Esse?',
    },
    {
      picture: '/logoTemp.png',
      description:
        'some text  Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui voluptatem tempore consequuntur soluta ab neque eaque consequatur fugit voluptates porro alias non sequi, eveniet earum est adipisci autem eligendi. Esse?',
    },
    {
      picture: '/logoTemp.png',
      description:
        'some text  Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui voluptatem tempore consequuntur soluta ab neque eaque consequatur fugit voluptates porro alias non sequi, eveniet earum est adipisci autem eligendi. Esse?',
    },
    {
      picture: '/logoTemp.png',
      description:
        'some text  Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui voluptatem tempore consequuntur soluta ab neque eaque consequatur fugit voluptates porro alias non sequi, eveniet earum est adipisci autem eligendi. Esse?',
    },
    {
      picture: '/logoTemp.png',
      description:
        'some text  Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui voluptatem tempore consequuntur soluta ab neque eaque consequatur fugit voluptates porro alias non sequi, eveniet earum est adipisci autem eligendi. Esse?',
    },
    {
      picture: '/logoTemp.png',
      description:
        'some text  Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui voluptatem tempore consequuntur soluta ab neque eaque consequatur fugit voluptates porro alias non sequi, eveniet earum est adipisci autem eligendi. Esse?',
    },
    {
      picture: '/logoTemp.png',
      description:
        'some text  Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui voluptatem tempore consequuntur soluta ab neque eaque consequatur fugit voluptates porro alias non sequi, eveniet earum est adipisci autem eligendi. Esse?',
    },
    {
      picture: '/logoTemp.png',
      description:
        'some text  Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui voluptatem tempore consequuntur soluta ab neque eaque consequatur fugit voluptates porro alias non sequi, eveniet earum est adipisci autem eligendi. Esse?',
    },
    {
      picture: '/logoTemp.png',
      description:
        'some text  Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui voluptatem tempore consequuntur soluta ab neque eaque consequatur fugit voluptates porro alias non sequi, eveniet earum est adipisci autem eligendi. Esse?',
    },
    {
      picture: '/logoTemp.png',
      description:
        'some text  Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui voluptatem tempore consequuntur soluta ab neque eaque consequatur fugit voluptates porro alias non sequi, eveniet earum est adipisci autem eligendi. Esse?',
    },
  ]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Gallery - Wise Wheels</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <Header />
        <div classNames={styles.galleryContainer}>
          <div className={styles.galleryHead}>
            <img src='/car9.png' alt='' className={styles.image} />
            <div className={styles.headText}>
              <h1>Gallery</h1>
              <p>
                Here you'll find the builds that we helped in. Also, you can go
                through the gallery and find the fitment guides on each vehicles
                the perfect spec for your car. Enjoy !
              </p>
            </div>
          </div>
          <div className={styles.galleryList}>
            {items.map((item) => (
              <div className={styles.item}>
                <Image
                  src={item.picture}
                  width={400}
                  height={400}
                  objectFit='contain'
                />
                <p>{item.description}</p>
              </div>
            ))}
          </div>
          <div className={styles.bottomSection}>
            <h3>Feel Free to contact us for more information</h3>
            <button className={styles.button}>Contact Us</button>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}

export default gallery;
