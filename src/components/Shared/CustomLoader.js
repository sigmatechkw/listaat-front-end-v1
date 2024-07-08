import React from 'react'
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useTranslation} from "react-i18next";

const CustomLoader = () => {
  const {t} = useTranslation()

  return (
    <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <CircularProgress sx={{ mb: 4 }} />
      <Typography>{t('loading')}...</Typography>
    </Box>
  )
}

export default CustomLoader
