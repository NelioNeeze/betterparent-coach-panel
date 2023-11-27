import type { NextPage } from "next";
import formStyles from "../styles/components/edit-content-section.module.css";
import { useState } from "react";
import { TextField } from "@mui/material";
import ConfirmationModal from "./ConfirmationModal";
import EditContentSidebar from "./EditContentSidebar";
import { IInputLabels } from "../interfaces/IInputLabels";
import { IFormContentType } from "../interfaces/IFormContent";

type IEditContentSectionType = {
    showAge?: boolean;
    showDeleteButton?: boolean;
    showLocation?: boolean;
    showCategory?: boolean;
    navigateBackTo?: string;
    onDelete?: () => void;
    onSave?: (updatedContent: any) => void;
    onValueChange: (value: IFormContentType) => void;
    formContent: IFormContentType;
    labelObject: IInputLabels;
};

const EditContentSection: NextPage<IEditContentSectionType> = ({
    showAge = false,
    showDeleteButton= false,
    showLocation = false,
    showCategory = false,
    formContent,
    onSave,
    onDelete,
    onValueChange,
    labelObject = undefined,
}) => {

  // Open Confirmation Modal after user clicks delete course
  const [confirmationOpen, setConfirmationOpen] = useState(false)

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    onValueChange({ ...formContent, [name]: value });
  };
  
  function openDeleteModal(){
    if(showDeleteButton){
      setConfirmationOpen(true)
    }
  }  

  var imageStrapiURL = "/defaultCourseImage.png"
  if(formContent?.image) {
    imageStrapiURL = (process.env.NEXT_PUBLIC_STRAPI_IMAGE_URL || '') + formContent?.image
  }

  return (
    <div className={formStyles.pageContent}>
        <div className={formStyles.courseinfo}>
            <img 
                className={formStyles.image}
                alt="Course or Blog Image"
                src={imageStrapiURL}
            />
            <TextField 
                fullWidth 
                sx={{bgcolor: 'white', mt: "15px"}}
                value={formContent?.textField1} 
                name="textField1"
                onChange={(e) => { 
                  handleInputChange(e)
                }} 
                placeholder={labelObject?.textField1}
            />
            <TextField 
                fullWidth 
                sx={{bgcolor: 'white', mt: "15px"}} 
                value={formContent?.textField2} 
                name="textField2"
                multiline
                onChange={(e) => { 
                  handleInputChange(e) 
                }} 
                placeholder={labelObject?.textField2}
            />
            <TextField 
                fullWidth 
                sx={{bgcolor: 'white', mt: "15px"}}
                value={formContent?.textField3} 
                name="textField3"
                multiline
                onChange={(e) => { 
                  handleInputChange(e) 
                }} 
                placeholder={labelObject?.textField3}
            />
        </div>
        <EditContentSidebar
            showAge={showAge}
            showCategory={showCategory}
            showDeleteButton={showDeleteButton}
            showLocation={showLocation}
            formContent={formContent}
            onValueChange={onValueChange}
            onDeleteClick={openDeleteModal}
            onSaveClick={onSave}
        />
        <ConfirmationModal 
            isOpened={confirmationOpen} 
            handleCloseConfirmation={() => setConfirmationOpen(false)}
            handleConfirmation={onDelete}
        ></ConfirmationModal>
    </div>
  );
};

export default EditContentSection;
