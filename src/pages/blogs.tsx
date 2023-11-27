import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import styles from "../styles/courselist.module.css";
import { useQuery } from "@tanstack/react-query";
import TableRow from "../components/TableRow";
import TableEmpty from "../components/TableEmpty";
import { getBlogs } from "../services/blogService";
import AuthWrapper from "../components/AuthWrapper";

const BlogList: NextPage = () => {
  const router = useRouter();

  const onCourseClick = useCallback((blogID: any) => {
    // Pass data via query parameters
    router.push(`/newBlog?blogID=${blogID}`);
  }, [router]);

  // Here goes the coachId of the currrently logged in coach

  const [coachId, setCoachId] = useState("")

  useEffect(() => {
    const userString = localStorage.getItem('user')
    const user = userString ? JSON.parse(userString) : null;
    const fetchedCoachID = user?.coachUserId || '';

    setCoachId(fetchedCoachID);
  }, []); 

  // Fetch Course Data
  const { data: blogs } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => getBlogs(coachId),
    enabled: coachId !== "", // Enable the query when coachId is loaded
  })

  function onCreateNewCourseClick() {
    router.push("/newBlog")
  }
  

  return (
    <AuthWrapper>
      <div className={styles.courselistBetterparent}>
        <Sidebar />
        <div className={styles.siteContent}>
          <Header
            headerText="Deine Blog-Artikel"
            buttonText="+ Neuen Artikel erstellen"
            showButton
            onButtonClick={onCreateNewCourseClick}
          />
          <div className={styles.table}>
            <div className={styles.tableheader}>
              <div className={styles.cell}>
                <div className={styles.text}>Bild</div>
              </div>
              <div className={styles.cell1}>
                <div className={styles.text}>Artikel</div>
              </div>
            </div>

            {blogs?.map( (blog: any) => (
              <TableRow
                image={"defaultCourseImage.png"}
                //image={process.env.NEXT_PUBLIC_STRAPI_IMAGE_URL + blog.data?.attributes?.image?.data?.attributes?.url}
                title={blog.title}
                key={blog.id}
                onClick={() => onCourseClick(blog.id)}
              ></TableRow>
            ))}

            {blogs?.length === 0 && (
              <TableEmpty/>
            )}

          </div>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default BlogList;
