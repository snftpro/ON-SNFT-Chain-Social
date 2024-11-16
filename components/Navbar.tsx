import { ConnectWallet } from "@thirdweb-dev/react";
import Link from 'next/link';
import styles from "../styles/Home.module.css";
import Image from "next/image";
export default function Navbar() {
    return (
        
        <div>
        <div className={styles.NavbarLeft}>
            
            <Link href="https://snft.pro/" className={`${styles.homeLink} ${styles.footerRight}`} rel="noreferrer">
    <Image
       src="/images/h.png"
       width={35}
       height={35}
      alt="" 
    />
  </Link>

  </div>

  <div className={styles.NavbarMiddle}>

  <h1>ON SNFT Chain Social</h1>


        </div>
        </div>
    )
}