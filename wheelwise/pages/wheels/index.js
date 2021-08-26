import WheelsList from '../../components/Wheels/WheelsList';
import Header from '../../components/HeaderFooter/Header';
import styles from '../../styles/Wheels/Wheels.module.css';
import Head from 'next/head';
import Footer from '../../components/HeaderFooter/Footer';
import { selectWheels } from '../../slices/webStateSlice';
import Resizer from 'react-image-file-resizer';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPerson } from '../../slices/personStateSlice';
import { db, storage } from '../../firebase/firebase';
import firebase from 'firebase';
import ContactSection from '../../components/ContactSection';
import WheelsSelection from '../../components/Wheels/WheelsSelection';
import { clearWheels, loadWheels } from '../../slices/wheelsSlice';
import { loadBolt, loadDiameter } from '../../slices/cartSlice';

function wheels() {
  const dataSlice = useSelector(selectPerson);
  const dispatch = useDispatch();
  const [description, setDescription] = useState(null);
  const [itemName, setItemName] = useState(null);
  const [isUploaded, setIsUploaded] = useState('idle');
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState([]);
  const [totalFiles, setTotalFiles] = useState(0);
  const [fetched, setFetched] = useState(false);
  const [diameter, setDiameter] = useState(null);
  const [bolt, setBolt] = useState(null);
  const [itemPrice, setItemPrice] = useState(null);
  const [diameterSizes, setDiameterSizes] = useState([]);
  const [boltSizes, setBoltSizes] = useState([]);
  const [array1, setArray1] = useState([]);
  const [array2, setArray2] = useState([]);

  const [selectedSize, setSelectedSize] = useState({
    function: '',
    selection: '',
  });

  const [items, setItems] = useState([
    {
      data: { pictures: [], description: '' },
      id: '',
    },
  ]);

  const image = useSelector(selectWheels);
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
        '/wheels/' + imageFile.name + imageFile.lastModified
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
      .collection('wheels')
      .add({
        description: description,
        name: itemName,
        price: itemPrice * 100,
        pictures: downloadUrl,
        diameter: diameter,
        bolt: bolt,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((ref) => {
        setItemName(null);
        setDescription(null);
        setDownloadUrl([]);
        setIsUploaded('idle');
        addSizes(ref.id);
        alert('Successfully Added Item');
      })
      .catch((e) => {
        alert('Something Went Wrong Try Again' + e);
      });
  };
  const addSizes = (id) => {
    diameter.map(async (size) => {
      await db
        .collection('wheelsDiameter')
        .doc(size)
        .update({
          array: firebase.firestore.FieldValue.arrayUnion(id),
        });
    });

    bolt.map(async (size) => {
      await db
        .collection('boltPattern')
        .doc(size)
        .update({
          array: firebase.firestore.FieldValue.arrayUnion(id),
        });
    });
  };
  const getSizes = async (params) => {
    const snapshot = await db.collection('wheelsDiameter').get();
    snapshot.forEach((doc) => {
      setDiameterSizes((sizes) => sizes.concat(doc.id));
    });
    const snapshot2 = await db.collection('boltPattern').get();
    snapshot2.forEach((doc) => {
      setBoltSizes((sizes) => sizes.concat(doc.id));
    });
  };
  const getDiameterArray = (name) => {
    db.collection('wheelsDiameter')
      .doc(name)
      .get()
      .then((doc) => {
        const { array } = doc.data();
        setArray1(array);
      });
  };
  const getBoltArray = (name) => {
    db.collection('boltPattern')
      .doc(name)
      .get()
      .then((doc) => {
        const { array } = doc.data();
        setArray2(array);
      });
  };
  const fetchIntersection = (params) => {
    const intersection = array1.filter((element) => array2.includes(element));
    fetchFirstItems(intersection).then((data) => {
      // setItems(data);
    });
  };
  const fetchFirstItems = async (array) => {
    var tempItems = [];

    const first = db.collection('wheels');
    /* .orderBy('timestamp', 'desc')
      .limit(pages);*/

    array?.map((id) => {
      first
        .doc(id)
        .get()
        .then((doc) => {
          const { name, description, pictures, price, diameter, bolt } =
            doc.data();
          setItems({
            data: {
              name: name,
              description: description,
              pictures: pictures,
              price: price,
              diameter: diameter,
              bolt: bolt,
            },
            id: doc.id,
          });
        });
      setFetched(true);
    });

    /* const snapshot = await first.get();
    const lastItem = await snapshot.docs[snapshot.docs.length - 1];
    await setLast(lastItem);*/
    return tempItems;
  };

  useEffect(() => {
    getSizes();
  }, []);
  useEffect(() => {
    dispatch(loadWheels(items));
  }, [items]);
  useEffect(() => {
    dispatch(clearWheels());
    if (selectedSize.function === 'bolt') {
      getBoltArray(selectedSize.selection);
      dispatch(loadBolt(selectedSize.selection));
    }
    if (selectedSize.function === 'diameter') {
      getDiameterArray(selectedSize.selection);
      dispatch(loadDiameter(selectedSize.selection));
    }
  }, [selectedSize]);
  useEffect(() => {
    if (array1?.length > 0 && array2?.length > 0) {
      fetchIntersection();
    }
  }, [array2 || array1]);
  return (
    <div className={styles.container}>
      <Head>
        <title>Wheels - 3 Piece Cult </title>
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
            <WheelsSelection
              bolts={boltSizes}
              diameter={diameterSizes}
              setSelectedSize={setSelectedSize}
            />
          </div>
          <div className={styles.midSection}>
            {fetched && <WheelsList />}
            {dataSlice?.email === 'shaikhabdurrafay@gmail.com' && (
              <div className={styles.item}>
                <h1>Add Items</h1>
                <input type='file' multiple onChange={fileSelectedHandler} />
                <h4>Wheel Diameter(Numbers Only)</h4>
                <input
                  type='text'
                  required
                  placeholder='16 17 18 19'
                  onChange={(e) => {
                    const myArr = e.target.value.trim().split(' ');
                    setDiameter(myArr);
                  }}
                />
                <h4>Bolt Pattern(Numbers Only)</h4>
                <input
                  type='text'
                  required
                  placeholder='4x100 5x112 4x144.3'
                  onChange={(e) => {
                    const myArr = e.target.value.trim().split(' ');
                    setBolt(myArr);
                  }}
                />
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

          <ContactSection />
        </div>
        <Footer />
      </main>
    </div>
  );
}

export default wheels;
