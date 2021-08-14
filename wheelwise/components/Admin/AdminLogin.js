import { auth, db, provider } from '../../firebase/firebase';
import { loggedIn, signedOut } from '../../slices/personStateSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectPerson } from '../../slices/personStateSlice';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import { useEffect, useState } from 'react';
import styles from '../../styles/Admin/admin.module.css';
import { useRouter } from 'next/router';

function AdminLogin() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const dataSlice = useSelector(selectPerson);
  const [error, setError] = useState(false);
  const router = useRouter();

  var email = null;
  const fetchEmail = async () => {
    await db
      .collection('user')
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          email = doc.id;
        });
      })
      .catch((error) => {
        setError(error);
        alert(error);
      });
  };
  async function signIn(e) {
    e.preventDefault();
    fetchEmail();
    await auth
      .signInWithPopup(provider)
      .then((result) => {
        if (result.user.email !== email) signOut(e);
        const data = {
          email: result.user.email,
          name: result.user.displayName,
          uid: result.user.uid,
        };
        dispatch(loggedIn(data));
        setUser(data);
        email == null;
        router.push('/admin/imageupload');
      })
      .catch((error) => {
        setError(error);
        alert(error);
      });
  }
  async function signOut(e) {
    e.preventDefault();
    await auth
      .signOut()
      .then(() => {
        setUser(null);
        dispatch(signedOut());
      })
      .catch((error) => {
        setError(true);
        alert(error);
      });
  }
  useEffect(() => {
    setUser(dataSlice);
  }, []);
  return (
    <div>
      <div className={styles.adminLogin}>
        <div className={styles.caution}>
          <h2>No User Allowed Beyond This Point Except Admin! </h2>
        </div>
        <div className={styles.adminCard}>
          <h3>Hello Admin, Sign In With Google Below</h3>
          <VerifiedUserIcon />
          {user?.email !== 'shaikhabdurrafay@gmail.com' ? (
            <h1 onClick={signIn}>Sign In</h1>
          ) : (
            <h1 onClick={signOut}>Sign Out</h1>
          )}
          {error ? <h3>Something Went Wrong Please Try Again</h3> : null}
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
