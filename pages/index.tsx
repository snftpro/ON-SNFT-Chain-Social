import { useAddress } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import StatusEvents from "../components/statusEvents";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import loadingLottie from "../public/loadingLottie.json";

const Home: NextPage = () => {
  const address = useAddress();
  const [isLoading, setIsLoading] = useState(true);

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
    <div  className={styles.statusContainer2}>
        <StatusEvents />
        </div>
        
  );
};

export default Home;