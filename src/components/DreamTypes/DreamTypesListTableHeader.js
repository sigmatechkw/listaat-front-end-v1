import React, {useState} from 'react'
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import {useTranslation} from "react-i18next";
import Snackbar from "@mui/material/Snackbar";
import {Icon} from "@iconify/react";
import CustomTextField from "../../@core/components/mui/text-field";
import SnackbarConfirmActions from "../Shared/SnackbarConfirmActions";
import {deleteDreamTypes} from "./dreamTypesServices";
import {useRouter} from "next/router";


const DreamTypesListTableHeader = ({ selectedRows, onChange, value, clearSearch, fetchData, canExport }) => {
  const router = useRouter()
  const {t} = useTranslation()
  const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false);

  const handleClickDeleteButton = (id) => {
    setOpenDeleteSnackbar(true);
  };

  const handleCloseDeleteSnackbar = () => {
    setOpenDeleteSnackbar(false);
  };

  const handleDelete = () => {
    deleteDreamTypes(selectedRows).then(res => {
      setOpenDeleteSnackbar(false)
      fetchData()
    })

  }

  return (
    <Box
      sx={{
        gap: 2,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: theme => theme.spacing(2, 5, 4, 5)
      }}
    >
      <Box sx={{rowGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}>
        {
          selectedRows.length > 0 &&
          <Button sx={{ marginInline: 2}} color={'error'} variant={'tonal'} onClick={handleClickDeleteButton}>
            <Icon fontSize='1.125rem' icon='tabler:trash' />&nbsp;
            {t('delete_selected_rows')}
          </Button>
        }
      </Box>
      <Box sx={{ rowGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <CustomTextField
          value={value}
          placeholder={t('search')}
          onChange={onChange}
          InputProps={{
            startAdornment: (
              <Box sx={{ mr: 2, display: 'flex' }}>
                <Icon fontSize='1.25rem' icon='tabler:search' />
              </Box>
            ),
            endAdornment: (
              <IconButton size='small' title='Clear' aria-label='Clear' onClick={clearSearch}>
                <Icon fontSize='1.25rem' icon='tabler:x' />
              </IconButton>
            )
          }}
          sx={{
            mr: 3,
            width: {
              xs: 1,
              sm: 'auto'
            },
            '& .MuiInputBase-root > svg': {
              mr: 2
            }
          }}
        />
        <Button onClick={() => router.push('/dream-types/create')} variant='contained' sx={{ '& svg': { mr: 2 } }}>
          <Icon fontSize='1.125rem' icon='tabler:plus' />
          {t('add')}
        </Button>
      </Box>
      <Snackbar
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        open={openDeleteSnackbar}
        onClose={handleCloseDeleteSnackbar}
        message={t('are_you_sure')}
        action={<SnackbarConfirmActions handleConfirm={handleDelete} handleClose={handleCloseDeleteSnackbar} />}
      />
    </Box>
  )
}

export default DreamTypesListTableHeader
