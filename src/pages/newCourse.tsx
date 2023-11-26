import type { NextPage } from "next";
import Sidebar from "../components/Sidebar";
import formStyles from "../styles/components/create-form.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import TopBar from "../components/TopBar";
import EditContentSection from "../components/EditContentSection";
import { IInputLabels } from "../interfaces/IInputLabels";
import { IFormContentType } from "../interfaces/IFormContent";
import { useQuery } from "@tanstack/react-query";
import { addNewCourse, deleteCourse, getCourse, updateCourse } from "../services/courseService";
import AuthWrapper from "../components/AuthWrapper";


const CourseEdit: NextPage = () => {

  const router = useRouter();
  const { courseID } = router.query;

  // Placeholder Text for Inputfields in EditContentSection Component
  const textLabels: IInputLabels = {
    textField1: "Titel",
    textField2: "Kurzbeschreibung",
    textField3: "Text",
  };

  const initObj: IFormContentType = {
    textField1: "",
    textField2: "",
    textField3: "",
  }

  const [formContent, setFormContent] = useState(initObj)
  const [coachId, setCoachId] = useState("")

  useEffect(() => {
    const userString = localStorage.getItem('user')
    const user = userString ? JSON.parse(userString) : null;
    const fetchedCoachID = user?.coachUserId || '';

    setCoachId(fetchedCoachID);
  }, []); 

  // Fetch Course Data
  const { data: course } = useQuery({
    queryKey: ["course"],
    queryFn: () => {
      getCourse(courseID).then((course) => {
        const coachContent : IFormContentType = {
          textField1: course.title,
          textField2: course.shortDescription,
          textField3: course.detailedText,
          category: course.category,
          ageStart: course.ageStart,
          ageEnd: course.ageEnd,
          image: course.image?.data?.attributes?.url || null,
          id: courseID,
        }
        setFormContent(coachContent)
      })
    },
    enabled: coachId !== "" && courseID !== undefined, 
  })


  function onUserInput(content: any) {
    setFormContent(content)
  }

  function onSaveClick(createNew: Boolean) {
    console.log("Updated/Created Course:", formContent)
    if(!courseID){
      addNewCourse(formContent, coachId)
    } else {
      updateCourse(formContent)
    }
  }

  function deleteCourseAction() {
    deleteCourse(formContent.id).then(() => {
      Router.push("/courses")
    })
  }

  return (
    <AuthWrapper>
      <div className={formStyles.coursedetailPage}>
        <Sidebar/>
        <div className={formStyles.siteContent}>
          <TopBar 
            hasBackButton 
            headerText={!courseID && "Neuen Kurs erstellen" || courseID && "Kurs bearbeiten"}
            backTo="/courses"
            viewOnWebsiteUrl={process.env.NEXT_PUBLIC_WEBSITE_URL + "/course-detail?courseID=" + courseID}
          ></TopBar>
          <EditContentSection
              showAge
              showCategory
              showDeleteButton
              formContent={formContent}
              onValueChange={onUserInput}
              onDelete={deleteCourseAction}
              labelObject={textLabels}
              onSave={onSaveClick}
              navigateBackTo="/courses"
          ></EditContentSection>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default CourseEdit;
