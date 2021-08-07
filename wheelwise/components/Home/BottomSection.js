import Facebook from '@material-ui/icons/Facebook';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/Home/BottomSection.module.css';

function BottomSection() {
  return (
    <div className={styles.container}>
      <Image src='/car7.png' width={2000} height={700} objectFit='contain' />
      <h1>Join The Community</h1>
      <p>
        Here at Wheel Wise group we dissuss several car modification topis like
        wheels, accessories, parts, and many more. The growing community is
        based on the Car Enthusiasts like YOU. Join the group for all your car
        related needs and more.
      </p>
      <Link href='https://www.facebook.com/groups/4232301490157059/'>
        <a>
          <div className={styles.logo}>
            <Facebook
              style={{
                fontSize: 120,
                color: 'blue',
                background: 'white',
                borderRadius: 100,
                padding: 10,
              }}
            ></Facebook>
            <h1>3~PIECE CULT</h1>
          </div>
        </a>
      </Link>
    </div>
  );
}

export default BottomSection;
