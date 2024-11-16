import Link from "next/link";
import styles from "../styles/Home.module.css";
import { truncateAddress } from "../utils/truncateAddress";
import { BigNumber } from "ethers";

type EventCardProps = {
    walletAddress: string;
    newStatus: string;
    timeStamp: BigNumber;
};

export default function EventCard(props: EventCardProps) {
    const date = new Date(props.timeStamp.toNumber() * 1000);

    return (
        <div className={styles.eventCard}>
            <p 
            style={{ fontSize: "12px", border: "1px solid #fffff010", borderRadius: "5px", padding: "20px 20px 50px 20px ", textAlign: "left", width: "600px" }}>{props.newStatus}</p>
            <div className={styles.eventHeader}>
                <Link href={`/profile/${props.walletAddress}`} style={{ color: "white" }}>
                    <p className={styles.connectedAddress}>{truncateAddress(props.walletAddress)}</p>
                </Link>
                <p style={{ fontSize: "0.5rem" }}>{date.toLocaleString()}</p>
            </div>
        </div>
    );
};