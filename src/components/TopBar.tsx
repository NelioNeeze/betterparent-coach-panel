import type { NextPage } from "next";
import styles from "../styles/components/top-bar.module.css";
import { Button, Typography } from "@mui/material";

type ITopBarType = {
  headerText?: string;
  hasBackButton?: boolean;
  viewOnWebsiteUrl: string;
  backTo?: string;
};

const TopBar: NextPage<ITopBarType> = ({
  headerText = "Header Label",
  backTo="/kjse",
  hasBackButton = false,
  viewOnWebsiteUrl = ""
}) => {

    return (
        <div className={styles.topBar}>
            <div className={styles.leftSection}>
                {hasBackButton &&
                    <Button 
                        variant="contained" 
                        className={styles.backButton}
                        href={backTo}
                        >Zurück
                    </Button>
                }
                <Typography variant="h6" className={styles.label}>{headerText}</Typography>
            </div>
            <div className={styles.rightSection}>
                <Button 
                    variant="contained" 
                    className={styles.previewButton} 
                    onClick={() => {window.open(viewOnWebsiteUrl, "_blank");}}
                    >Anzeigen
                </Button>
            </div>
        </div>
    );
};

export default TopBar;
