import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ImageUpload from '../../components/Admin/ImageUpload';
import Header from '../../components/HeaderFooter/Header';
import { selectPerson } from '../../slices/personStateSlice';

function imageupload() {
  return (
    <div>
      <Head>
        <title>Image Upload - Admin Panel</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <ImageUpload />
    </div>
  );
}
export default imageupload;
