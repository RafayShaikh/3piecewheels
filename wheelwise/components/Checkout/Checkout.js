import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems, clearCartItems } from '../../slices/cartSlice';
import styles from '../../styles/checkout.module.css';
import ReCAPTCHA from 'react-google-recaptcha';
import { useRouter } from 'next/router';
import { checkoutConfirmation } from '../../slices/webStateSlice';

function Checkout() {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const router = useRouter();

  const items = useSelector(selectCartItems);
  const [proceeded, setProceeded] = useState(false);
  const dispatch = useDispatch();

  const proceedToCheckout = (e) => {
    e.preventDefault();
    setProceeded(true);
  };

  const clearCart = (params) => {
    dispatch(clearCartItems());
  };
  const handleForm = (params) => {
    if (name && email && phone && name === '' && email === '' && phone === '') {
      return;
    }
    const data = {
      name: name,
      phone: phone,
      email: email,
      items: items.map(
        (item) =>
          `{ ITEM: ${item.name}, DESCRIPTION: ${item.description}, BOLT: ${item.bolt}, DIAMETER: ${item.diameter}}`
      ),
    };
    console.log(data);
    fetch('/api/checkoutItems', {
      method: 'post',
      body: JSON.stringify(data),
    }).then((data) => {
      if (data.ok) {
        router.replace('/checkout/success');
        dispatch(checkoutConfirmation(true));
      } else {
        router.replace('/checkout/rejected');
        dispatch(checkoutConfirmation(true));
      }
    });
  };
  return (
    <div className={styles.checkoutSection}>
      {proceeded === false ? (
        <div className={styles.buttons}>
          <h1>Cart Options</h1>
          <button onClick={proceedToCheckout} className={styles.button}>
            Checkout
          </button>
          <button onClick={clearCart} className={styles.button2}>
            Clear Cart
          </button>
        </div>
      ) : (
        <div>
          <h1>Please Enter The Contact Information</h1>
          <div className={styles.checkoutForm}>
            <h1>Full Name</h1>
            <input
              required
              placeholder='Enter full name'
              type='text'
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <h1>Email</h1>
            <input
              required
              placeholder='Enter valid email'
              type='email'
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <h1>Phone</h1>
            <input
              required
              pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
              placeholder='Enter valid phone number'
              type='tel'
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
            <ReCAPTCHA
              sitekey='6LeskeYbAAAAAEneUs9AfNLYm5rn36q556et81mw'
              onChange={(e) => setIsVerified(!isVerified)}
              render='explicit'
            />
            {isVerified && (
              <button onClick={handleForm} className={styles.button}>
                Queue Order
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
