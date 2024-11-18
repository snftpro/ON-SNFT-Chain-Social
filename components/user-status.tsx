import { ConnectWallet, Web3Button, useAddress, useContract, useContractRead, useDisconnect } from "@thirdweb-dev/react";
import { STATUS_CONTRACT_ADDRESS } from "../constants/addresses";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import Lottie  from "lottie-react";
import loadingLottie from "../public/loadingLottie.json";
import { truncateAddress } from "../utils/truncateAddress";
import Link from "next/link";

export default function UserStatus() {
    const address = useAddress();
    const disconnect = useDisconnect();
    const [newStatus, setNewStatus] = useState("");
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [characterCount, setCharacterCount] = useState(0);
    const characterDecoration = characterCount >= 140 ? styles.characterCountOver : styles.characterCountUnder;

    const {
        contract
    } = useContract(STATUS_CONTRACT_ADDRESS);

    const {
        data: myStatus,
        isLoading: isMyStatusLoading,
    } = useContractRead(contract, "getStatus", [address]);

    if (!address) {
        return (
            <div>
                 <ConnectWallet
          hideSwitchToPersonalWallet={true}
          theme={"dark"}
          
          showThirdwebBranding={false}
          btnTitle={"Connect Wallet"}
          modalTitle={"Connect"}
          modalSize={"wide"}
          modalTitleIconUrl={
            "https://i.imgur.com/j1m7Pqo.png"
          }
          welcomeScreen={{
            title: "ON SNFT Chain Social",
            subtitle: "Beta",
            img: {
              src: "https://i.imgur.com/j1m7Pqo.png",
              width: 150,
              height: 150,
            },
          }}
          style={{ 
            color: "#a6a8a7", 
            backgroundColor: "#ffffff00",
            border: "1px solid #a6a8a7",
            borderRadius: "16px",
            padding: "15px 30px",  
            fontWeight: "700",
            marginTop: "20px",
            marginBottom: "30px",
            fontSize: "14px",
            fontStyle: "italic",
            fontFamily: "var(--font-mono)",
            }}
        />
            </div>
        );
    }

    if (isMyStatusLoading) {
        return (
            <div className={styles.sectionLoading}>
                <Lottie
                    animationData={loadingLottie}
                    loop={true}
                />
            </div>
        );
    }

    return (
        <div className={styles.main}>
            {!isMyStatusLoading && myStatus && (
                <div>
                    <Link href={`/`} style={{ color: "white"}}>
                    <p className={styles.muneButton}>Home</p>
                </Link>
                </div>
                
            )}
            <button
               className={styles.gradientText}
                onClick={() => setIsStatusModalOpen(true)}
            >New Post</button>
              
              <Link href={`/profile/${address}`} style={{ color: "white"}}>
                    <p className={styles.muneButton}>Profile</p>
                </Link>
              
                
             <button
                    className={styles.gradientText}
                    onClick={() => disconnect()}
                >Logout</button>
               
              
            
          

            {isStatusModalOpen && (
                <div className={styles.statusModalContainer}>
                    <div className={styles.statusModal}>
                        <div className={styles.statusModalHeader}>
                            <button  style={{ color: "white", borderRadius: "50px", padding: "3px 7px", fontWeight: "900",  fontSize: "16px", border: "1px solid gray" }}
                                onClick={() => setIsStatusModalOpen(false)}
                            >X</button>
                        </div>
                        <textarea 
                            className={styles.statusModaltextarea }
                            value={newStatus}
                            onChange={(e) => {
                                setNewStatus(e.target.value)
                                setCharacterCount(e.target.value.length)
                            }}
                            placeholder="On-chain message, Cannot be deleted!"
                        />
                        <div className={styles.characterCountContainer}>
                            <p className={characterDecoration}>{characterCount}/140</p>
                        </div>
                        <Web3Button
                            className={styles.statusModalButton}
                            contractAddress={STATUS_CONTRACT_ADDRESS}
                            action={(contract) => contract.call(
                                "setStatus",
                                [newStatus]
                            )}
                            isDisabled={characterCount === 0 || characterCount > 140}
                            onSuccess={() => {
                                setIsStatusModalOpen(false);
                                setNewStatus("");
                            }}
                        >Post</Web3Button>
                    </div>
                </div>
            )}
        </div>
    );
};
