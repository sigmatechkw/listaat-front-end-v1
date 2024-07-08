import React from 'react'
import Button from "@mui/material/Button";
import {useTranslation} from "react-i18next";

const SnackbarConfirmActions = ({handleConfirm, handleClose}) => {
  const {t} = useTranslation()

  return (
    <>
      <Button color="error" size="small" onClick={handleConfirm}>
        {t('yes')}
      </Button>
      <Button color="secondary" size="small" onClick={handleClose}>
        {t('no')}
      </Button>
    </>
  )
}

export default SnackbarConfirmActions
