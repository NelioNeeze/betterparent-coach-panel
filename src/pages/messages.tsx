import type { NextPage } from "next";
import Sidebar from "../components/Sidebar";
import styles from "../styles/settings.module.css";
import Header from "../components/Header";
import AuthWrapper from "../components/AuthWrapper";

const Messages: NextPage = () => {

    return (
        <AuthWrapper>
            <div className={styles.coursedetailPage}>
                <Sidebar/>
                <div className={styles.siteContent}>
                    <Header 
                        headerText="Deine Nachrichten" 
                        showButton={false}
                    />
                </div>
            </div>
        </AuthWrapper>
    );
};

export default Messages;