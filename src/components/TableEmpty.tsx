import type { NextPage } from "next";
import styles from "../styles/courselist.module.css";

const TableEmpty: NextPage= () => {
  return (
    <div className={styles.tablerowempty}>
        <div className={styles.babydee1Parent}>
            <img
                className={styles.babydee1Icon}
                alt=""
                src="/babydee-1@2x.png"
            />
            <div className={styles.hierSiehtEsZiemlichLeerAuParent}>
                <b className={styles.hierSiehtEs}>
                    Hier sieht es ziemlich leer aus
                </b>
                <div className={styles.erstelleJetztDeinen}>
                    Erstelle jetzt deinen ersten Eintrag
                </div>
            </div>
        </div>
    </div>
  );
};

export default TableEmpty;
