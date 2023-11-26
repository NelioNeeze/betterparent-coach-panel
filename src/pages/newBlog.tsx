import type { NextPage } from "next";
import Sidebar from "../components/Sidebar";
import formStyles from "../styles/components/create-form.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import TopBar from "../components/TopBar";
import EditContentSection from "../components/EditContentSection";
import { IInputLabels } from "../interfaces/IInputLabels";
import { addNewBlog, deleteBlog, getBlog, updateBlog } from "../services/blogService";
import { IFormContentType } from "../interfaces/IFormContent";
import { useQuery } from "@tanstack/react-query";
import AuthWrapper from "../components/AuthWrapper";


const CourseEdit: NextPage = () => {

  const router = useRouter();
  const { blogID } = router.query;

  // Placeholder Text for Inputfields in EditContentSection Component
  const textLabels: IInputLabels = {
    textField1: "Titel",
    textField2: "Zusammenfassung",
    textField3: "Text",
  };

  const initObj: IFormContentType = {
    textField1: "",
    textField2: "",
    textField3: "",
  }
  const [formContent, setFormContent] = useState(initObj);
  const [coachId, setCoachId] = useState("")

  useEffect(() => {
    const userString = localStorage.getItem('user')
    const user = userString ? JSON.parse(userString) : null;
    const fetchedCoachID = user?.coachUserId || '';

    setCoachId(fetchedCoachID);
  }, []); 

  // Fetch Course Data
  const { data: blog } = useQuery({
    queryKey: ["blog"],
    queryFn: () => {
      getBlog(blogID).then((blog: any) => {
        const coachContent : IFormContentType = {
          textField1: blog.title,
          textField2: blog.summary,
          textField3: blog.text,
          category: blog.category,
          image: blog.image?.data?.attributes?.url || null,
          id: blogID,
        }
        setFormContent(coachContent)
      })
    },
    enabled: coachId !== "" && blogID !== undefined, 
  })


  function onUserInput(content: any) {
    setFormContent(content)
  }

  function onSaveClick() {
    console.log("Updated/Created Course:", formContent)
    if(!blogID){
      addNewBlog(formContent, coachId)
    } else {
      updateBlog(formContent)
    }
  }
  
  function deleteBlogAction() {
    deleteBlog(formContent.id).then(() => {
      Router.push("/blogs")
    })
  }


  return (
    <AuthWrapper>
      <div className={formStyles.coursedetailPage}>
        <Sidebar/>
        <div className={formStyles.siteContent}>
          <TopBar 
            hasBackButton 
            headerText={!blogID && "Neuen Blog-Artikel erstellen" || blogID && "Blog-Artikel bearbeiten"} 
            backTo="/blogs"
            viewOnWebsiteUrl={process.env.NEXT_PUBLIC_WEBSITE_URL + "/blog-detail?blogID=" + blogID}
          ></TopBar>
          <EditContentSection
            showCategory
            showDeleteButton
            formContent={formContent}
            onDelete={deleteBlogAction}
            labelObject={textLabels}
            onValueChange={onUserInput}
            onSave={onSaveClick}
            navigateBackTo="/blogs"
          ></EditContentSection>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default CourseEdit;
