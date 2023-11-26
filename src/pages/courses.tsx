import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import styles from "../styles/courselist.module.css";
import { getCourses } from "../services/courseService"
import { useQuery } from "@tanstack/react-query";
import TableRow from "../components/TableRow";
import TableEmpty from "../components/TableEmpty";
import AuthWrapper from "../components/AuthWrapper";

const CourselistBetterParent: NextPage = () => {
  const router = useRouter();

  const onCourseClick = useCallback((courseID: any) => {
    // Pass data via query parameters
    router.push(`/newCourse?courseID=${courseID}`);
  }, [router]);

  const [coachId, setCoachId] = useState("")

  
  useEffect(() => {
    const userString = localStorage.getItem('user')
    const user = userString ? JSON.parse(userString) : null;
    const fetchedCoachID = user?.coachUserId || '';

    setCoachId(fetchedCoachID);
    console.log(user)
  }, []); 

  // Fetch Course Data
  const { data: fetchedCourses } = useQuery({
    queryKey: ["courses"],
    queryFn: () => getCourses(coachId),
    enabled: coachId !== "", 
  })

  function onCreateNewCourseClick() {
    router.push("/newCourse")
  }

  return (
    <AuthWrapper>
      <div className={styles.courselistBetterparent}>
        <Sidebar />
        <div className={styles.siteContent}>
          <Header
            headerText="Deine Kurse"
            showButton
            onButtonClick={onCreateNewCourseClick}
          />
          <div className={styles.table}>
            <div className={styles.tableheader}>
              <div className={styles.cell}>
                <div className={styles.text}>Bild</div>
              </div>
              <div className={styles.cell1}>
                <div className={styles.text}>Kurs</div>
              </div>
            </div>

            {fetchedCourses?.map( (course: any) => (
              <TableRow
                image={process.env.NEXT_PUBLIC_STRAPI_IMAGE_URL + course.Image?.data.attributes.url}
                title={course.title}
                key={"test"}
                onClick={() => onCourseClick(course.id)}
              ></TableRow>
            ))}

            {fetchedCourses?.length === 0 && (
              <TableEmpty/>
            )}

          </div>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default CourselistBetterParent;
