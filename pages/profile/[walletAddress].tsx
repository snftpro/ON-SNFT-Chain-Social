import { useContract, useContractEvents } from '@thirdweb-dev/react';
import styles from '../../styles/Home.module.css';
import { useRouter } from 'next/router';
import { STATUS_CONTRACT_ADDRESS } from '../../constants/addresses';
import EventCard from '../../components/eventCard';
import Lottie from 'lottie-react';
import loadingLottie from '../../public/loadingLottie.json';
import { useEffect, useState } from 'react';
import Image from "next/image";
import Link from 'next/link';

export default function AcountFeed() {
    const router = useRouter();
    const { walletAddress } = router.query;
    
    const [isLoading, setIsLoading] = useState(true);

    const {
        contract
    } = useContract(STATUS_CONTRACT_ADDRESS);

    const {
        data: userEvents,
        isLoading: isUserEventsLoading,
    } = useContractEvents(
        contract, 
        "StatusUpdated",
    {
        subscribe: true,
        queryFilter: {
            filters: {
                user: walletAddress,
            }
        }
    }
    );

    useEffect(() => {
        // Set a timeout for 2 seconds
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 5000);

        // Cleanup the timer when the component is unmounted
        return () => clearTimeout(timer);
    }, []);

    if(isLoading) {
        return (
            <div className={styles.pageLoading}>
                <div>
                    <Lottie
                        animationData={loadingLottie}
                        loop={true}
                    />
                </div>
            </div>
        );
    };

    return (
        <main className={styles.main}>

        <div style={{ marginBottom: "250px", marginTop: "20px" }}>
            <Link style={{ marginBottom: "30px", display: "flex", flexDirection: "row", 
            alignItems: "center", gap: "30px", border: "1px solid #5351514f", borderRadius: "20px", justifyContent: "center" }}
            href={`/profile/${walletAddress}`}>
        <Image
            src="/images/av.png"
            alt=""
            width={40}
            height={40}
            style={{ borderRadius: "50%" }}
            
            ></Image>
            <h4 style={{ color: "gray" }}>{walletAddress} </h4>

            </Link>
            
            <br/>
            {!isUserEventsLoading && userEvents && ( 
                userEvents.slice(0, 20).map((event, index) => (
                    <EventCard
                        key={index}
                        walletAddress={event.data.user}
                        newStatus={event.data.newStatus}
                        timeStamp={event.data.timestamp}
                    />
                ))
            )}
        </div>

        </main>
    )
};
