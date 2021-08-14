import styles from '../../styles/Admin/admin.module.css';
import { db, storage } from '../../firebase/firebase';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectPerson } from '../../slices/personStateSlice';

function ImageUpload() {
  const [fileUrl, setFileUrl] = useState(null);
  const [nameState, setNameState] = useState('');
  const [deleteState, setDeleteState] = useState(null);
  const dataSlice = useSelector(selectPerson);

  const onFileChange = async (e) => {
    if (dataSlice.email !== 'shaikhabdurrafay@gmail.com') {
      return;
    }
    setFileUrl('Loading');
    const file = e.target.files[0];
    const storageRef = storage.ref();
    const fileRef = storageRef.child(`images/${nameState}/${file.name}`);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
    deleteItem(nameState);
  };
  const deleteItem = (name) => {
    db.collection('images')
      .doc(name)
      .onSnapshot((doc) => {
        setDeleteState(doc.data());
      });

    if (!deleteState) {
      return;
    }
    if (!deleteState.picture) {
      return;
    }
    const storageRef = storage.refFromURL(deleteState.picture);
    if (!storageRef) {
      return;
    }
    storageRef
      .delete()
      .then()
      .catch((error) => {});
  };
  const onSubmit = async (e) => {
    if (dataSlice.email !== 'shaikhabdurrafay@gmail.com') {
      return;
    }
    e.preventDefault();
    if (!nameState || !fileUrl) {
      alert('Please Enter Correct Information');
      return;
    }

    await db
      .collection('images')
      .doc(nameState)
      .set({
        name: nameState,
        picture: fileUrl,
      })
      .then(() => {
        e.target.name.value = '';
        e.target.file.value = '';
        setNameState('');
        setFileUrl(null);
        alert('Successfully Added The Cover Photo');
      });
  };
  return (
    <div>
      <div className={styles.admin}>
        <form className={styles.form} onSubmit={onSubmit}>
          <h2>Upload Cover Photo</h2>
          <h4>Select The Page Name</h4>
          <select name='name' onChange={(e) => setNameState(e.target.value)}>
            <option selected value={null}></option>
            <option value='home'>Home</option>
            <option value='wheels'>Wheels</option>
            <option value='apparel'>Apparel</option>
            <option value='accessories'>Accessories</option>
            <option value='parts'>Parts</option>
            <option value='gallery'>Gallery</option>
          </select>
          <h4>Select An Image</h4>
          <input type='file' name='file' onChange={onFileChange} />
          {fileUrl === 'Loading' && <h1>Uploading Picture</h1>}
          {!fileUrl ? (
            <h1>Please Select A Picture</h1>
          ) : (
            <button className={styles.button}>Update</button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ImageUpload;
