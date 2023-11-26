import type { NextPage } from "next";
import Sidebar from "../components/Sidebar";
import styles from "../styles/settings.module.css";
import Header from "../components/Header";
import { Button, Checkbox, Typography } from "@mui/material";
import { logout } from "../services/authService";
import Router from "next/router";
import AuthWrapper from "../components/AuthWrapper";

const Settings: NextPage = () => {

  function logoutUser() {
    logout()
    Router.push("login")
  }

  return (
    <AuthWrapper>
      <div className={styles.coursedetailPage}>
        <Sidebar/>
        <div className={styles.siteContent}>
          <Header headerText="Einstellungen" showButton={false}/>
          <div className={styles.settingsContainer}>
              <Typography variant="h6">E-Mail</Typography>
              <div className={styles.settingsInnerContainer}>   
                  <div className={styles.oneSetting}>
                      <Checkbox/>
                      <div className={styles.oneSettingText}>
                          <Typography variant="body1">Termin Benachrichtigungen</Typography>
                          <Typography variant="body1">Werde Benachrichtigt wenn ein Termin gebucht wurde</Typography>
                      </div>
                  </div>
                  <div className={styles.oneSetting}>
                      <Checkbox/>
                      <div className={styles.oneSettingText}>
                      <Typography variant="body1">Nachrichten Benachrichtigungen</Typography>
                          <Typography variant="body1">Werde Benachrichtigt wenn ein Termin gebucht wurde</Typography>
                      </div>
                  </div>
                  <div className={styles.oneSetting}>
                      <Checkbox/>
                      <div className={styles.oneSettingText}>
                          <Typography variant="body1">Newsletter Benachrichtigungen</Typography>
                          <Typography variant="body1">Werde Benachrichtigt wenn ein Termin gebucht wurde</Typography>
                      </div>
                  </div>
              </div>
          </div>
          <Button onClick={logoutUser} variant="outlined">Abmelden</Button>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default Settings;