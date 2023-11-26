import type { NextPage } from "next";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import styles from "../styles/settings.module.css";
import AuthWrapper from "../components/AuthWrapper";
import { Typography } from "@mui/material";

const DashboardBetterParent: NextPage = () => {
  
  return (
    <AuthWrapper>
      <div className={styles.coursedetailPage}>
        <Sidebar />
        <div className={styles.siteContent}>
          <Header
            headerText="Deine Termine"
            showButton={false}
          />
        </div>
      </div>
    </AuthWrapper>
  );
};

export default DashboardBetterParent;
