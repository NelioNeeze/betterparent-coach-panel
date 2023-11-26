import type { NextPage } from "next";
import styles from "../styles/courselist.module.css";

type ITableRow = {
  image?: string;
  title?: string;
  onClick?: () => void;
};

const TableRow: NextPage<ITableRow> = ({
  image = "",
  title = "Kein Titel geladen",
  onClick,
}) => {

  if (image.includes("undefined")) {
    image = "default_course_image.png"
  }

  console.log("Image: ", image)

  return (
    <div className={styles.tablerow} onClick={onClick}>
      <div className={styles.cell5}>
        <img className={styles.imageIcon} 
          alt="Course Picture" 
          src={image} 
        />
        <div className={styles.text5}>
          {title}
        </div>
      </div>
      <div className={styles.cell8}>
        <img className={styles.arrowIcon}
            alt="Arrow Icon"
            src="/arrowIcon.png"
          />
      </div>
    </div>
  );
};

export default TableRow;
