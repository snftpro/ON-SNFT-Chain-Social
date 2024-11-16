import { useContract, useContractEvents } from '@thirdweb-dev/react';
import styles from '../../styles/Home.module.css';
import { useRouter } from 'next/router';
import { STATUS_CONTRACT_ADDRESS } from '../../constants/addresses';
import EventCard from '../../components/eventCard';
import Lottie from 'lottie-react';
import loadingLottie from '../../public/loadingLottie.json';
import { useEffect, useState } from 'react';

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

        <div 
        style={{ marginBottom: "250px", marginTop: "20px" }}
        >
         
            <h1 className={styles.gradientText5}>Address: {walletAddress} </h1>
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
