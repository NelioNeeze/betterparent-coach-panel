import type { NextPage } from "next";
import styles from "../styles/components/courseEditButton.module.css";

type ICourseEditButtonType = {
    inEditmode?: boolean;
    isSavable?: boolean;
    creatingNewCourse?: boolean;
    onEditCourseClick?: () => void;
    onUpdateCourseClick?: () => void;
    onCreateCourseClick?: () => void;
};

const CourseEditButton: NextPage<ICourseEditButtonType> = ({
    inEditmode = false,
    isSavable = false,
    creatingNewCourse = false,
    onEditCourseClick,
    onUpdateCourseClick,
    onCreateCourseClick,
}) => {

  return (
    <>
        {inEditmode && !creatingNewCourse &&
            <div className={styles.updateButton} onClick={onEditCourseClick}>
                <b className={styles.label}>Bearbeiten</b>
            </div>
        }
        {!inEditmode && !isSavable &&
            <div className={styles.saveButtonGray}>
                <b className={styles.label}>Speichern</b>
            </div>
        }
        {!inEditmode && isSavable && !creatingNewCourse &&
            <div className={styles.saveButton} onClick={onUpdateCourseClick}>
                <b className={styles.label}>Speichern</b>
            </div>
        }
        {!inEditmode && isSavable && creatingNewCourse && 
            <div className={styles.saveButton} onClick={onCreateCourseClick}>
                <b className={styles.label}>Speichern</b>
            </div>
        }
    </>
  );
};

export default CourseEditButton;
