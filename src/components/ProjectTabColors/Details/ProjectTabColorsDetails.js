import { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CardActions from '@mui/material/CardActions'
import SnackbarConfirmActions from '../../Shared/SnackbarConfirmActions'
import Snackbar from '@mui/material/Snackbar'
import { useRouter } from 'next/router'
import Icon from '../../../@core/components/icon'
import Box from '@mui/material/Box'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { deleteProjectTabColors } from '../ProjectTabColorsServices'

const ProjectTabColorsDetails = ({ type }) => {
  const { t } = useTranslation()
  const router = useRouter()
  const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false)

  const handleDelete = () => {
    deleteProjectTabColors([type.id]).then(res => {
      toast.success(t('success'))
      setOpenDeleteSnackbar(false)
      router.replace('/project-tab-colors')
    })
  }

  const handleClickDeleteButton = () => {
    setOpenDeleteSnackbar(true)
  }

  const handleCloseDeleteSnackbar = () => {
    setOpenDeleteSnackbar(false)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <Typography variant={'h3'} sx={{ px: 3, pt: 3 }}>
            {t('project_tab_colors')}
          </Typography>
        

            <CardContent sx={{ pt: 13.5, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              {type.image && (
                <CustomAvatar
                  src={type.image}
                  variant='rounded'
                  alt={type.name}
                  sx={{ width: 100, height: 100, mb: 4 }}
                />
              )}
              </CardContent>

          <CardContent>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('name')}:</Typography>
              <Typography sx={{ color: 'text.secondary' }}>{type.name}</Typography>
            </Box>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('hex_color')}:</Typography>
              <Typography sx={{ color: 'text.secondary' }}>{type.hex_color}</Typography>
            </Box>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('rgb_color')}:</Typography>
              <Typography sx={{ color: 'text.secondary' }}>{type.rgb_color}</Typography>
            </Box>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('project')}:</Typography>
              <Typography sx={{ color: 'text.secondary' }}>{type.project?.name}</Typography>
            </Box>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('project_tab')}:</Typography>
              <Typography sx={{ color: 'text.secondary' }}>{type.project_tab?.name}</Typography>
            </Box>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('created_at')}:</Typography>
              <Typography sx={{ color: 'text.secondary' }}>{type.created_at}</Typography>
            </Box>
          </CardContent>
          <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
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

export default ProjectTabColorsDetails
