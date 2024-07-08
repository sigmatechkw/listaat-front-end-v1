import React, { useState } from 'react'
import Box from '@mui/material/Box'
import CustomTextField from 'src/@core/components/mui/text-field'
import Icon from 'src/@core/components/icon'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import Snackbar from '@mui/material/Snackbar'
import SnackbarConfirmActions from '../Shared/SnackbarConfirmActions'
import { deleteBlog } from './fetchBlogsService'
import toast from 'react-hot-toast'

const BlogsTableHeader = props => {
  const { t } = useTranslation()
  const router = useRouter()
  const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false)

  const handleClickDeleteButton = id => {
    setOpenDeleteSnackbar(true)
  }

  const handleCloseDeleteSnackbar = () => {
    setOpenDeleteSnackbar(false)
  }

  const handleDelete = () => {
    deleteBlog(props.selectedRows).then(res => {
      toast.success(t('success'))
      setOpenDeleteSnackbar(false)
      props.fetchData()
    })
  }

  return (
    <Box
      sx={{
        p: theme => theme.spacing(2, 5, 4, 5)
      }}
    >
      <Box sx={{ rowGap: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
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

          {props.selectedRows.length > 0 && (
            <Button sx={{ marginInline: 2 }} color={'error'} variant={'tonal'} onClick={handleClickDeleteButton}>
              <Icon fontSize='1.125rem' icon='tabler:trash' />
              &nbsp;
              {t('delete_selected_rows')}
            </Button>
          )}
        </Box>

        <Button onClick={() => router.push('/blogs/create')} variant='contained' sx={{ '& svg': { mr: 2 } }}>
          <Icon fontSize='1.125rem' icon='tabler:plus' />
          {t('add')}
        </Button>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={openDeleteSnackbar}
        onClose={handleCloseDeleteSnackbar}
        message={t('are_you_sure')}
        action={<SnackbarConfirmActions handleConfirm={handleDelete} handleClose={handleCloseDeleteSnackbar} />}
      />
    </Box>
  )
}

export default BlogsTableHeader
