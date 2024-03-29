import styles from '../styles/FAQ/faq.module.css';
import SingleQuestion from '../components/FAQ/Question';
import Header from '../components/HeaderFooter/Header';
import Footer from '../components/HeaderFooter/Footer';
import ReCAPTCHA from 'react-google-recaptcha';
import { useState } from 'react';
import Head from 'next/head';

function Faq() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: 'Do I have to allow the use of cookies?',
      info: 'Unicorn vinyl poutine brooklyn, next level direct trade iceland. Shaman copper mug church-key coloring book, whatever poutine normcore fixie cred kickstarter post-ironic street art.',
    },
    {
      id: 2,
      title: 'How do I change my My Page password?',
      info: 'Coloring book forage photo booth gentrify lumber. Migas chillwave poutine synth shoreditch, enamel pin thundercats fashion axe roof party polaroid chartreuse.',
    },
    {
      id: 3,
      title: 'What is BankID?',
      info: 'Enamel pin fam sustainable woke whatever venmo. Authentic asymmetrical put a bird on it, lumbersexual activated charcoal kinfolk banjo cred pickled sartorial.',
    },
    {
      id: 4,
      title: 'Whose birth number can I use?',
      info: 'Edison bulb direct trade gentrify beard lo-fi seitan sustainable roof party franzen occupy squid. Knausgaard cronut succulents, scenester readymade shabby chic lyft. Copper mug meh vegan gentrify.',
    },
    {
      id: 5,
      title: 'When do I recieve a password ordered by letter?',
      info: 'Locavore franzen fashion axe live-edge neutra irony synth af tilde shabby chic man braid chillwave waistcoat copper mug messenger bag. Banjo snackwave blog, microdosing thundercats migas vaporware viral lo-fi seitan ',
    },
  ]);

  const handleForm = (params) => {
    const data = { name: name, phone: phone, email: email, message: message };
    fetch('/api/questions', {
      method: 'post',
      body: JSON.stringify(data),
    });
  };
  return (
    <div>
      <Head>
        <title>Contact - 3 Piece Cult</title>
        <meta
          name='keywords'
          content='Wheels, 3 Piece Wheels, Junction Produce, Rims, Modification, Car Community, South Texas, Corpus Christi, Texas, Lowered Car, Buy Car, Sell Parts, '
        />
        <meta
          name='description'
          content='3 Piece Cult offer a wide variety of car parts. In the Contact page you can inquirea about some products or issues. We can help you with your car needs. Join us of facebook or send us a quick message. '
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
          <h1>Contact Us</h1>
          <div className={styles.contactContainer}>
            <h1>3PieceCult - Inquiries</h1>
            <p>
              We know that your car build is important to you that's why we have
              this portal for you. If you have a question or need help with your
              car mods, feel free to contac us bellow. We'll be happy to assist
              you with your car mods here at Wise Wheels.
            </p>
            <div className={styles.userInfo}>
              <div className={styles.email}>
                <h4>Name</h4>
                <input
                  required
                  placeholder='Please Enter Your Name'
                  type='text'
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className={styles.email}>
                <h4>Phone</h4>
                <input
                  required
                  placeholder='Please Enter Your Phone (999-999-9999)'
                  type='tel'
                  pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </div>
              <div className={styles.email}>
                <h4>Email</h4>
                <input
                  required
                  placeholder='Please Enter Your Email'
                  type='email'
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className={styles.text}>
              <h4>Message</h4>
              <textarea
                required
                placeholder='Please Enter Your Inquiry'
                name=''
                id=''
                cols='50'
                rows='10'
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              ></textarea>
            </div>
            <div className={styles.userInfo}>
              <ReCAPTCHA
                sitekey='6LeskeYbAAAAAEneUs9AfNLYm5rn36q556et81mw'
                onChange={(e) => setIsVerified(!isVerified)}
                render='explicit'
              />
              {isVerified && (
                <button onClick={handleForm} className={styles.button}>
                  Send It
                </button>
              )}
            </div>
          </div>
          <h1>FAQs</h1>
          <div className={styles.container}>
            <section className={styles.info}>
              {questions.map((question) => {
                return (
                  <SingleQuestion
                    key={question.id}
                    {...question}
                  ></SingleQuestion>
                );
              })}
            </section>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}

export default Faq;
