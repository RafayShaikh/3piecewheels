import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from '../../styles/Wheels/Wheel.module.css';
import { useRouter } from 'next/router';
import { db, storage } from '../../firebase/firebase';
import { selectPerson } from '../../slices/personStateSlice';
import { useSelector } from 'react-redux';
import firebase from 'firebase';

function Wheel({ id, item, fetched }) {
  const [deleteState, setDeleteState] = useState(null);
  const dataSlice = useSelector(selectPerson);
  const [array1, setArray1] = useState([]);
  const [array2, setArray2] = useState([]);

  const router = useRouter();
  const deleteItem = () => {
    if (dataSlice.email !== 'shaikhabdurrafay@gmail.com') {
      return;
    }
    if (!deleteState) {
      return;
    }
    if (!deleteState.pictures) {
      return;
    }
    deleteState.pictures.forEach((picture) => {
      var storageRef = storage.refFromURL(picture);
      if (!storageRef) {
        return;
      }
      storageRef
        .delete()
        .then()
        .catch((error) => {});
    });
  };

  const removeSizes = () => {
    item?.diameter.map(async (size) => {
      await db
        .collection('wheelsDiameter')
        .doc(size)
        .update({
          array: firebase.firestore.FieldValue.arrayRemove(id),
        });
    });

    item?.bolt.map(async (size) => {
      await db
        .collection('boltPattern')
        .doc(size)
        .update({
          array: firebase.firestore.FieldValue.arrayRemove(id),
        });
    });
  };
  const deleteEntry = async (docId) => {
    if (dataSlice.email !== 'shaikhabdurrafay@gmail.com') {
      return;
    }

    const ref = db.collection('wheels').doc(docId);
    const data = await ref.get();

    setDeleteState(data.data());
    removeSizes();

    const collectionRef = await db.collection('wheels');
    collectionRef
      .doc(docId)
      .delete()
      .then(() => {
        alert('Succefully Deleted The Record');
      });
  };
  const handleClick = (e) => {
    router.push({
      pathname: `/wheels/${JSON.stringify(id)}`,
      query: {
        id: JSON.stringify(id),
        name: JSON.stringify(item.name),
        description: JSON.stringify(item.description),
        price: JSON.stringify(item?.price),
        pictures: JSON.stringify(item.pictures),
      },
    });
  };

  const [truncateDescription, setTruncateDescription] = useState(null);

  const truncate = (input) => {
    input?.length > 100
      ? setTruncateDescription(`${input.substring(0, 100)}...`)
      : setTruncateDescription(input);
  };

  useEffect(() => {
    truncate(item?.description);
  }, []);
  useEffect(() => {
    if (deleteState) {
      deleteItem();
    }
  }, [deleteState]);

  return (
    fetched && (
      <div className={styles.wheelThumbnail}>
        <div onClick={handleClick}>
          <div className={styles.icons}>
            {item?.pictures.length > 0 && (
              <div className={styles.image}>
                <Image
                  src={item?.pictures[0]}
                  height={400}
                  width={400}
                  objectFit='contain'
                  blurDataURL='/car9.png'
                  placeholder='blur'
                  loading='eager'
                  quality={100}
                  alt='Product'
                />
              </div>
            )}
          </div>
          <h1>{item?.name}</h1>
          <h1>
            {new Intl.NumberFormat('en-us', {
              style: 'currency',
              currency: 'USD',
            }).format(item?.price / 100)}
          </h1>
          <p>{truncateDescription}</p>
        </div>
        {dataSlice?.email === 'shaikhabdurrafay@gmail.com' && (
          <button className={styles.button} onClick={() => deleteEntry(id)}>
            Delete
          </button>
        )}
      </div>
    )
  );
}

export default Wheel;
