import styles from '../styles/Gallery/gallery.module.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Footer from '../components/HeaderFooter/Footer';
import Header from '../components/HeaderFooter/Header';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { selectGallery } from '../slices/webStateSlice';
import ContactSection from '../components/ContactSection';
import { selectPerson } from '../slices/personStateSlice';
import { db, storage } from '../firebase/firebase';
import firebase from 'firebase';
import GalleryList from '../components/Gallery/GalleryList';
import Resizer from 'react-image-file-resizer';

function gallery() {
  const image = useSelector(selectGallery);
  const dataSlice = useSelector(selectPerson);
  const [description, setDescription] = useState(null);
  const [isUploaded, setIsUploaded] = useState('idle');
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState([]);
  const [totalFiles, setTotalFiles] = useState(0);
  const [pages, setPages] = useState(5);
  const [last, setLast] = useState(null);
  const [fetched, setFetched] = useState(false);
  const [items, setItems] = useState([
    {
      pictures: ['/logoTemp.png'],
      description:
        'some text  Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui voluptatem tempore consequuntur soluta ab neque eaque consequatur fugit voluptates porro alias non sequi, eveniet earum est adipisci autem eligendi. Esse?',
    },
    {
      pictures: ['/logoTemp.png'],
      description:
        'some text  Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui voluptatem tempore consequuntur soluta ab neque eaque consequatur fugit voluptates porro alias non sequi, eveniet earum est adipisci autem eligendi. Esse?',
    },
  ]);
  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1000,
        1000,
        'JPEG',
        80,
        0,
        (uri) => {
          resolve(uri);
        },
        'file'
      );
    });
  const fileSelectedHandler = (e) => {
    setIsUploaded('uploading');
    setTotalFiles(e.target.files.length + 1);
    for (var i = 0; i < e.target.files.length; i++) {
      var imageFile = e.target.files[i];
      resizeFile(imageFile).then((imageFile) => {
        putStorageItem(imageFile);
      });
    }
    e.target.files = null;
  };

  const putStorageItem = (imageFile) => {
    // the return value will be a Promise
    return new Promise(function (resolve, reject) {
      var storageRef = storage.ref(
        '/gallery/' + imageFile.name + imageFile.lastModified
      );
      //Upload file
      var task = storageRef.put(imageFile);
      //Update progress bar
      task.on(
        'state_changed',
        function progress(snapshot) {
          var percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(percentage);
        },
        function error(err) {
          isUploaded('failed');
        },
        function complete() {
          storageRef.getDownloadURL().then((url) => {
            setDownloadUrl((downloadUrl) => downloadUrl.concat(url));
          });
          setTotalFiles(totalFiles - 1);
          setProgress(0);
          if (totalFiles <= 0) {
            setIsUploaded('uploaded');
            setTotalFiles(0);
          }
        }
      );
    });
  };
  const uploadImage = async (e) => {
    if (dataSlice.email !== 'shaikhabdurrafay@gmail.com') {
      return;
    }
    e.preventDefault();
    if (!description || !downloadUrl) {
      alert('Please Enter Correct Information');
      return;
    }

    await db
      .collection('gallery')
      .add({
        description: description,
        pictures: downloadUrl,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setDescription(null);
        setDownloadUrl([]);
        setIsUploaded('idle');
        alert('Successfully Added Gallery Item');
      })
      .catch((e) => {
        alert('Something Went Wrong Try Again' + e);
      });
  };
  const fetchFirstItems = async () => {
    const first = db
      .collection('gallery')
      .orderBy('timestamp', 'desc')
      .limit(pages);
    const snapshot = await first.get();
    const lastItem = await snapshot.docs[snapshot.docs.length - 1];
    await setLast(lastItem);
    var tempItems = [];
    snapshot.forEach((doc) => {
      tempItems.push(doc.data());
    });

    return tempItems;
  };
  const fetchNextItems = async (params) => {
    if (last) {
      const next = await db
        .collection('gallery')
        .orderBy('timestamp', 'desc')
        .startAfter(last.data().timestamp)
        .limit(pages);
      const snapshot = await next.get();
      const nextItem = await snapshot.docs[snapshot.docs.length - 1];
      await setLast(nextItem);
      var tempItems = [];
      snapshot.forEach((doc) => {
        tempItems.push(doc.data());
      });
      return tempItems;
    }
  };

  const loadMore = (e) => {
    e.preventDefault();
    fetchNextItems().then((data) => {
      setItems((item) => item.concat(data));
    });
  };
  useEffect(() => {
    fetchFirstItems().then((data) => {
      setItems(data);
      setFetched(true);
    });
  }, []);
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
            <img src={image[0]?.picture} alt='' className={styles.image} />
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
            {fetched && <GalleryList items={items} />}
            {dataSlice?.email === 'shaikhabdurrafay@gmail.com' && (
              <div className={styles.item}>
                <h1>Add Items</h1>
                <input type='file' multiple onChange={fileSelectedHandler} />
                <h4>Description</h4>
                <textarea
                  required
                  placeholder='Please Enter The Description'
                  name=''
                  value={description}
                  id=''
                  cols='50'
                  rows='10'
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                ></textarea>
                {isUploaded === 'uploading' && (
                  <h1>Progress: {Math.trunc(progress)} Uploading</h1>
                )}
                {isUploaded === 'uploaded' && (
                  <button className={styles.button} onClick={uploadImage}>
                    Add Item
                  </button>
                )}
              </div>
            )}
          </div>
          {items[items.length - 1] && (
            <button className={styles.button} onClick={loadMore}>
              Load More
            </button>
          )}
          <ContactSection />
        </div>
        <Footer />
      </main>
    </div>
  );
}

export default gallery;
