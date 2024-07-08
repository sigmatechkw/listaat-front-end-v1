// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { GridToolbarExport } from '@mui/x-data-grid'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import Button from "@mui/material/Button";
import React, {useState} from "react";
import {useRouter} from "next/router";
import {useTranslation} from "react-i18next";
import axios from "axios";
import toast from "react-hot-toast";
import Snackbar from "@mui/material/Snackbar";
import SnackbarConfirmActions from "../Shared/SnackbarConfirmActions";
import {useSelector} from "react-redux";

const FaqsListTableHeader = props => {
  const auth = useSelector(state => state.auth)
  const lang = useSelector(state => state.lang)
  const {t} = useTranslation()
  const router = useRouter()
  const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false);

  const handleClickDeleteButton = (id) => {
    setOpenDeleteSnackbar(true);
  };

  const handleCloseDeleteSnackbar = () => {
    setOpenDeleteSnackbar(false);
  };

  const handleDelete = () => {
    let data = {
      delete_ids: props.selectedRows
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_API_KEY}faqs/delete`, data, {
        headers: {
          'Authorization': auth.token,
          'Accepted-Language': lang ?? 'en'
        }
      })
      .then(res => {
        toast.success(t('success'));
        setOpenDeleteSnackbar(false)
        props.fetchTableData();
      })
      .catch(error => {
        toast.error(t('error'));
      });
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
          props.selectedRows.length > 0 &&
          <Button sx={{ marginInline: 2}} color={'error'} variant={'tonal'} onClick={handleClickDeleteButton}>
            <Icon fontSize='1.125rem' icon='tabler:trash' />&nbsp;
            {t('delete_selected_rows')}
          </Button>
        }
      </Box>
      <Box sx={{ rowGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <CustomTextField
          value={props.value}
          placeholder={t('search')}
          onChange={props.onChange}
          InputProps={{
            startAdornment: (
              <Box sx={{ mr: 2, display: 'flex' }}>
                <Icon fontSize='1.25rem' icon='tabler:search' />
              </Box>
            ),
            endAdornment: (
              <IconButton size='small' title='Clear' aria-label='Clear' onClick={props.clearSearch}>
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
        <Button onClick={() => router.push('/faqs/create')} variant='contained' sx={{ '& svg': { mr: 2 } }}>
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

export default FaqsListTableHeader
