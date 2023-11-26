import type { NextPage } from "next";
import styles from "../styles/components/header.module.css";

type IHeaderType = {
  headerText?: string;
  buttonText?: string;
  showButton?: boolean;
  onButtonClick?: () => void;
};

const Header: NextPage<IHeaderType> = ({
  headerText = "Header Label",
  showButton = true,
  buttonText = "+ Neuen Kurs erstellen",
  onButtonClick = () => {},
}) => {

  return (
    <div className={styles.header}>
      <b className={styles.deineKurse}>{headerText}</b>
      {showButton && (
        <div className={styles.button} onClick={onButtonClick}>
          <b className={styles.buttontext}>{buttonText}</b>
        </div>
      )}
    </div>
  )
};

export default Header;
