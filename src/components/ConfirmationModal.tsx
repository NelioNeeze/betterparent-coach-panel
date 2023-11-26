import type { NextPage } from "next";
import { Modal, Box, Typography, Button } from "@mui/material";

type IConfirmationModalType = {
    isOpened?: boolean;
    handleCloseConfirmation?: () => void;
    handleConfirmation?: () => void;
};

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
};

const ConfirmationModal: NextPage<IConfirmationModalType> = ({ 
    isOpened = false, 
    handleCloseConfirmation, 
    handleConfirmation 
}) => {

  return (
    <>
        <Modal
            open={isOpened}
            onClose={handleCloseConfirmation}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style} borderRadius="8px">
                <Typography marginBottom="16px" id="modal-modal-title" variant="h6" component="h2">
                Sind Sie sicher, dass Sie diesen Kurs löschen möchten?
                </Typography>
                <Button onClick={handleCloseConfirmation}>Abbrechen</Button>
                <Button onClick={handleConfirmation}>Löschen</Button>
            </Box>
        </Modal>
    </>
  );
};

export default ConfirmationModal;


