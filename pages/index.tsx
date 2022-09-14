import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { PictureMaker } from '../components/PictureMaker';
import classes from '../styles/home.module.scss';

const Home: NextPage = () => {
  return (
    <div className={classes.container}>
      <Head>
        <title>תמונה-טרון 6000</title>
        <meta name='description' content='מעבד טקסט לתמונה בשפת הקודש' />
        <link rel='icon' href='/bot.svg' />
      </Head>

      <main className={classes.main}>
        <header>
          <Image src='/bot-black.svg' alt='bot icon' width={60} height={60} />
          <h1>טקסט חופשי לתמונה</h1>
          {/*  eslint-disable-next-line react/no-unescaped-entities */}
          <p>מונע ע"י stable-diffusion</p>
        </header>
        <PictureMaker />
      </main>
    </div>
  );
};

export default Home;
