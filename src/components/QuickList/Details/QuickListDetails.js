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
import { deleteQuickList } from '../QuickListServices'
import Icon from '../../../@core/components/icon'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

const QuickListDetails = ({ type }) => {
  const { t } = useTranslation()
  const router = useRouter()
  const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false)

  const handleDelete = () => {
    deleteQuickList([type.id]).then(res => {
      toast.success(t('success'))
      setOpenDeleteSnackbar(false)
      router.replace('/quicklist')
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
            {t('quick_list')}
          </Typography>
          <CardContent>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('name')}:</Typography>
              <Typography sx={{ color: 'text.secondary' }}>{type.name}</Typography>
            </Box>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('qty')}:</Typography>
              <Typography sx={{ color: 'text.secondary' }}>{type.qty}</Typography>
            </Box>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('price')}:</Typography>
              <Typography sx={{ color: 'text.secondary' }}>{type.price}</Typography>
            </Box>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('user')}:</Typography>
              <Typography sx={{ color: 'text.secondary' }}>{type.user.first_name}</Typography>
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
            <Button variant='tonal' sx={{ mr: 2 }} onClick={() => router.push(`/quicklist/edit/${type.id}`)}>
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

export default QuickListDetails
