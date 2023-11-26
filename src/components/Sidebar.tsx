import type { NextPage } from "next";
import styles from "../styles/components/sidebar.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";

const Sidebar: NextPage = () => {

  const [email, setEmail] = useState("")

  useEffect(() => {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    const email = user?.email || '';
    setEmail(email);
  }, []); 


  return (
    <div className={styles.sidebar}>
      <div className={styles.top}>
        <Link className={styles.logo} style={{cursor: "pointer"}} href='/appointments'>
          <img className={styles.icon} alt="" src="/icon@2x.png"/>
          <div className={styles.betterparent}>
            <b>Better</b>
            <span>Parent</span>
          </div>
        </Link>
        <nav className={styles.nav}>
          <Link className={styles.navitem} href='/appointments'>
            <div className={styles.icon1}>
              <img
                className={styles.iconsnavbaricCart}
                alt=""
                src="/icon_termine.png"
              />
            </div>
            <div className={styles.text}>
              <div className={styles.title}>Termine</div>
            </div>
          </Link>
          <Link className={styles.navitem} href='/messages'>
            <div className={styles.icon1}>
              <img
                className={styles.iconsnavbaricCart}
                alt=""
                src="/icon_nachrichten.png"
              />
            </div>
            <div className={styles.text}>
              <div className={styles.title}>Nachrichten</div>
            </div>
          </Link>
          <Link className={styles.navitem} href='/courses'>
            <div className={styles.icon1}>
              <img
                className={styles.iconsnavbaricCart}
                alt=""
                src="/icon_kurse.png"
              />
            </div>
            <div className={styles.text}>
              <div className={styles.title}>Meine Kurse</div>
            </div>
          </Link>
          <Link className={styles.navitem} href='/blogs'>
            <div className={styles.icon1}>
              <img
                className={styles.iconsnavbaricCart}
                alt=""
                src="/icon_blog.png"
              />
            </div>
            <div className={styles.text}>
              <div className={styles.title}>Mein Blog</div>
            </div>
          </Link>
          <Link className={styles.navitem} href='/profile'>
            <div className={styles.icon1}>
              <img
                className={styles.iconsnavbaricCart}
                alt=""
                src="/icon_profil.png"
              />
            </div>
            <div className={styles.text}>
              <div className={styles.title}>Mein Profil</div>
            </div>
          </Link>
          <Link className={styles.navitem} href='/settings'>
            <div className={styles.icon1}>
              <img
                className={styles.iconsnavbaricCart}
                alt=""
                src="/icon_einstellungen.png"
              />
            </div>
            <div className={styles.text}>
              <div className={styles.title}>Einstellungen</div>
            </div>
          </Link>
        </nav>
      </div>
      <div className={styles.usercard}>
        <div className={styles.content}>
          <div className={styles.welcome}>Willkommen</div>
          <div className={styles.email}>{email}</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
