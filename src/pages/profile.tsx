import type { NextPage } from "next";
import Sidebar from "../components/Sidebar";
import formStyles from "../styles/components/create-form.module.css";
import { getCoach, updateProfile } from "../services/profileService";
import { useEffect } from "react";
import { useState } from "react";
import EditContentSection from "../components/EditContentSection";
import TopBar from "../components/TopBar";
import { IInputLabels } from "../interfaces/IInputLabels";
import { useQuery } from "@tanstack/react-query";
import { IFormContentType } from "../interfaces/IFormContent";
import AuthWrapper from "../components/AuthWrapper";

const ProfilescreenBetterParent: NextPage = () => {

  // Placeholder Text for Inputfields in EditContentSection Component
  const textLabels: IInputLabels = {
    textField1: "Name",
    textField2: "Kurzbeschreibung",
    textField3: "Über dich",
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
    console.log(user)
  }, []); 

  // Fetch Course Data
  const { data: coach } = useQuery({
    queryKey: ["coach"],
    queryFn: () => {
      getCoach(coachId).then((coach) => {
        const coachContent : IFormContentType = {
          textField1: coach.name,
          textField2: coach.previewText,
          textField3: coach.detailedDescription,
          image: coach.image.data.attributes.url,
          location: coach.location,
          id: coachId
        }
        setFormContent(coachContent)
      })
    },
    enabled: coachId !== "", 
  })

  function onUserInput(content: any) {
    setFormContent(content)
  }

  function onSaveClick() {
    console.log("Updated Content:", formContent)
    updateProfile(formContent)
  }

  return (
    <AuthWrapper>
      <div className={formStyles.coursedetailPage}>
        <Sidebar/>
        <div className={formStyles.siteContent}>
          <TopBar 
            headerText="Profil bearbeiten" 
            viewOnWebsiteUrl={process.env.NEXT_PUBLIC_WEBSITE_URL + "/coach-detail?coachID=" + coachId}
          ></TopBar>
          <EditContentSection
              showLocation
              labelObject={textLabels}
              onValueChange={onUserInput}
              onSave={onSaveClick}
              formContent={formContent}
          ></EditContentSection>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default ProfilescreenBetterParent;
