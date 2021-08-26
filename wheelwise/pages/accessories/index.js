import Image from 'next/image';
import AccessoriesList from '../../components/Accessories/AccessoriesList';
import Header from '../../components/HeaderFooter/Header';
import styles from '../../styles/Accessories/accessories.module.css';
import Head from 'next/head';
import Footer from '../../components/HeaderFooter/Footer';
import { selectAccessories } from '../../slices/webStateSlice';
import Resizer from 'react-image-file-resizer';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectPerson } from '../../slices/personStateSlice';
import { db, storage } from '../../firebase/firebase';
import firebase from 'firebase';
import ContactSection from '../../components/ContactSection';

function accessories() {
  const dataSlice = useSelector(selectPerson);
  const [description, setDescription] = useState(null);
  const [itemName, setItemName] = useState(null);
  const [itemPrice, setItemPrice] = useState(null);
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

  const image = useSelector(selectAccessories);
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
        '/accessories/' + imageFile.name + imageFile.lastModified
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
    if (!itemName || !description || !downloadUrl) {
      alert('Please Enter Correct Information');
      return;
    }

    await db
      .collection('accessories')
      .add({
        description: description,
        name: itemName,
        pictures: downloadUrl,
        price: itemPrice * 100,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setItemName(null);
        setDescription(null);
        setItemPrice(null);
        setDownloadUrl([]);
        setIsUploaded('idle');
        alert('Successfully Added Accessory Item');
      })
      .catch((e) => {
        alert('Something Went Wrong Try Again' + e);
      });
  };
  const fetchFirstItems = async () => {
    const first = db
      .collection('accessories')
      .orderBy('timestamp', 'desc')
      .limit(pages);
    const snapshot = await first.get();
    const lastItem = await snapshot.docs[snapshot.docs.length - 1];
    await setLast(lastItem);
    var tempItems = [];
    snapshot.forEach((doc) => {
      tempItems.push({ data: doc.data(), id: doc.id });
    });

    return tempItems;
  };
  const fetchNextItems = async (params) => {
    if (last) {
      const next = await db
        .collection('accessories')
        .orderBy('timestamp', 'desc')
        .startAfter(last.data().timestamp)
        .limit(pages);
      const snapshot = await next.get();
      const nextItem = await snapshot.docs[snapshot.docs.length - 1];
      await setLast(nextItem);
      var tempItems = [];
      snapshot.forEach((doc) => {
        tempItems.push({ data: doc.data(), id: doc.id });
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
        <title>Accessories - 3 Piece Cult </title>
        <meta
          name='keywords'
          content='Wheels, 3 Piece Wheels, Junction Produce, Rims, Modification, Car Community, South Texas, Corpus Christi, Texas, Lowered Car, Buy Car, Sell Parts, '
        />
        <meta
          name='description'
          content='3 Piece Cult offers a wide variety of sizes of wheels.  We can get you wheels for your car, just with contact with us with your inquiries. We are not only an e-commerce bussiness, but it is a community of car guys and girls. You can find 3 Piece Wheels, Car Parts, Car Accessories, and more.'
        />

        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
        <meta name='msapplication-TileColor' content='#b91d47' />
        <meta name='theme-color' content='#ffffff' />
      </Head>
      <main>
        <Header />
        <div className={styles.body}>
          <div className={styles.topSection}>
            <div className={styles.subSec}>
              <div>
                <h1>Accessories</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Ducimus eveniet quae reiciendis voluptatum dolorum repellat
                  quia reprehenderit ipsa quo, beatae cupiditate debitis, error
                  facilis aut rerum fuga tempore. Ab, cum?
                </p>
              </div>
              <img className={styles.image} src={image[0]?.picture} />
            </div>
          </div>
          <div className={styles.midSection}>
            {fetched && <AccessoriesList items={items} />}
            {dataSlice?.email === 'shaikhabdurrafay@gmail.com' && (
              <div className={styles.item}>
                <h1>Add Items</h1>
                <input type='file' multiple onChange={fileSelectedHandler} />
                <h4>Item Title</h4>
                <input
                  type='text'
                  required
                  placeholder='Please Enter The Item Name'
                  onChange={(e) => {
                    setItemName(e.target.value);
                  }}
                />
                <h4>Item Price</h4>
                <input
                  type='number'
                  required
                  placeholder='Please Enter The Item Price'
                  onWheel={(e) => e.target.blur()}
                  onChange={(e) => {
                    setItemPrice(e.target.value);
                  }}
                />
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
          <div>
            {items[items.length - 1] && (
              <button className={styles.button} onClick={loadMore}>
                Load More
              </button>
            )}
          </div>
          <ContactSection />
        </div>
        <Footer />
      </main>
    </div>
  );
}

export default accessories;
