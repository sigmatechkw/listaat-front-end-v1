import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CardActions from '@mui/material/CardActions'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import SnackbarConfirmActions from '../../Shared/SnackbarConfirmActions'
import Snackbar from '@mui/material/Snackbar'
import Icon from '../../../@core/components/icon'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { deleteProjectFields } from '../projectFieldsServices'
import CustomAvatar from 'src/@core/components/mui/avatar'
import {styled } from '@mui/material';
import IconifyIcon from 'src/@core/components/icon';

const ProjectFieldsDetails = ({ type }) => {
  const { t } = useTranslation()
  const router = useRouter()
  const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false)

  const handleDelete = () => {
    deleteProjectFields([type.id]).then(res => {
      toast.success(t('success'))
      setOpenDeleteSnackbar(false)
      router.replace('/project-fields')
    })
  }

  const handleClickDeleteButton = () => {
    setOpenDeleteSnackbar(true)
  }

  const handleCloseDeleteSnackbar = () => {
    setOpenDeleteSnackbar(false)
  }

  const ButtonStyled = styled(Button)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      textAlign: 'center'
    }
  }))


  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'wbmp'];

  const isImage = (fileUrl) => {
    if (!fileUrl) return false;
    const extension = fileUrl.split('.').pop().toLowerCase();

    return imageExtensions.includes(extension);
  };


  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <Typography variant={'h3'} sx={{ px: 3, pt: 3 }}>
            {t('project_fields')}
          </Typography>

          <CardContent sx={{ pt: 13.5, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              {type?.files && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {type?.files.map((file, index) => {

                    const isNotImage = !isImage(file.url);

                    return(
                      
                      <div>
                      {isNotImage ? (
                        <ButtonStyled href={file.url} target="_blank" rel="noopener noreferrer">
                        <IconifyIcon icon="carbon:view-filled"></IconifyIcon>
                        </ButtonStyled>
                      ): (<CustomAvatar
                        src={file.url}
                        variant='rounded'
                        alt={file.url}
                        sx={{ width: 100, height: 100, m: 2 }}
                        />)
                      }
                      </div>

                    )
                })}
                </Box>
              )}
          </CardContent>

          <CardContent>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('name')}:</Typography>
              <Typography sx={{ color: 'text.secondary' }}>{type.name}</Typography>
            </Box>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('project_tab')}:</Typography>
              <Typography sx={{ color: 'text.secondary' }}>{type.project_tab.name}</Typography>
            </Box>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('project')}:</Typography>
              <Typography sx={{ color: 'text.secondary' }}>{type.project?.name}</Typography>
            </Box>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('value')}:</Typography>
              <Typography sx={{ color: 'text.secondary' }}>{type.value}</Typography>
            </Box>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>
                {t('is_cost_calculated')}:
              </Typography>
              {type.is_cost_calculated ? (
                <Icon icon='tabler:circle-check' color='green' fontSize='1.5rem' />
              ) : (
                <Icon icon='tabler:xbox-x' color='red' fontSize='1.5rem' />
              )}
            </Box>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('created_at')}:</Typography>
              <Typography sx={{ color: 'text.secondary' }}>{type.created_at}</Typography>
            </Box>
          </CardContent>
          <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant='tonal' sx={{ mr: 2 }} onClick={() => router.push(`/project-fields/edit/${type.id}`)}>
              {t('edit')}
            </Button>
            <Button color='error' variant='tonal' onClick={handleClickDeleteButton}>
              {t('delete')}
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={openDeleteSnackbar}
        onClose={handleCloseDeleteSnackbar}
        message={t('are_you_sure')}
        action={<SnackbarConfirmActions handleConfirm={handleDelete} handleClose={handleCloseDeleteSnackbar} />}
      />
    </Grid>
  )
}

export default ProjectFieldsDetails
