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
            <p className={styles.gradientText3}>{props.newStatus}</p>
            <div className={styles.eventHeader}>
                <Link href={`/profile/${props.walletAddress}`} style={{ color: "white" }}>
                    <p className={styles.gradientText2}>{truncateAddress(props.walletAddress)}</p>
                </Link>
                <p className={styles.gradientText4}>{date.toLocaleString()}</p>
            </div>
        </div>
    );
};