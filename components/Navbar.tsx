import { ConnectWallet } from "@thirdweb-dev/react";
import Link from 'next/link';
import styles from "../styles/Home.module.css";
import Image from "next/image";
import UserStatus from "../components/user-status";

export default function Navbar() {
    return (
        
        <div className={styles.Navbar}>
        <div className={styles.NavbarLeft}>
<h1 className={styles.gradientText}
>ON SNFT Chain Social</h1>
      </div>

  <div className={styles.NavbarMiddle}>
  </div>
      
      <div className={styles.NavbarRight}>
  <UserStatus />
  </div>

 
        </div>
    )
}