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
import { deleteProjectTypes } from '../projectTypesServices'
import Icon from '../../../@core/components/icon'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import CustomAvatar from 'src/@core/components/mui/avatar'
import SubProjectTypeTable from './SubProjectTypeTable'

const ProjectTypeDetails = ({ type }) => {
  const { t } = useTranslation()
  const router = useRouter()
  const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false)

  const handleDelete = () => {
    deleteProjectTypes([type.id]).then(res => {
      toast.success(t('success'))
      setOpenDeleteSnackbar(false)
      router.replace('/project-types')
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
            {t('project_types')}
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
              <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('filter_name')}:</Typography>
              <Typography sx={{ color: 'text.secondary' }}>{type.filter_name}</Typography>
            </Box>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('description')}:</Typography>
              <Typography sx={{ color: 'text.secondary' }}>{type.description}</Typography>
            </Box>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('hint')}:</Typography>
              <Typography sx={{ color: 'text.secondary' }}>{type.hint}</Typography>
            </Box>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('next')}:</Typography>
              <Typography sx={{ color: 'text.secondary' }}>{type.next}</Typography>
            </Box>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('alt')}:</Typography>
              <Typography sx={{ color: 'text.secondary' }}>{type.alt}</Typography>
            </Box>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>
                {t('should_has_sub_tabs')}:
              </Typography>
              {type.should_has_sub_tabs ? (
                <Icon icon='tabler:circle-check' color='green' fontSize='1.5rem' />
              ) : (
                <Icon icon='tabler:xbox-x' color='red' fontSize='1.5rem' />
              )}
            </Box>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>
                {t('is_creation_allowed_directly')}:
              </Typography>
              {type.is_creation_allowed_directly ? (
                <Icon icon='tabler:circle-check' color='green' fontSize='1.5rem' />
              ) : (
                <Icon icon='tabler:xbox-x' color='red' fontSize='1.5rem' />
              )}
            </Box>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>
                {t('has_child')}:
              </Typography>
              {type.has_child ? (
                <Icon icon='tabler:circle-check' color='green' fontSize='1.5rem' />
              ) : (
                <Icon icon='tabler:xbox-x' color='red' fontSize='1.5rem' />
              )}
            </Box>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('is_active')}:</Typography>
              {type.active ? (
                <Icon icon='tabler:circle-check' color='green' fontSize='1.5rem' />
              ) : (
                <Icon icon='tabler:xbox-x' color='red' fontSize='1.5rem' />
              )}
            </Box>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('sort')}:</Typography>
              <Typography sx={{ color: 'text.secondary' }}>{type.sort}</Typography>
            </Box>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('created_at')}:</Typography>
              <Typography sx={{ color: 'text.secondary' }}>{type.created_at}</Typography>
            </Box>
          </CardContent>
          <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant='tonal' sx={{ mr: 2 }} onClick={() => router.push(`/project-types/edit/${type.id}`)}>
              {t('edit')}
            </Button>
            <Button color='error' variant='tonal' onClick={handleClickDeleteButton}>
              {t('delete')}
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12}>
            <SubProjectTypeTable data={type?.sub_types} />
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

export default ProjectTypeDetails
