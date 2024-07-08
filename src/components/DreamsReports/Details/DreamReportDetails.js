import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import Grid from '@mui/material/Grid'
import Link from 'next/link'
import Button from '@mui/material/Button'
import CardActions from '@mui/material/CardActions'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { deleteDreamsReports } from '../dreamsReportsServices'
import { useRouter } from 'next/router'
import SnackbarConfirmActions from '../../Shared/SnackbarConfirmActions'
import Snackbar from '@mui/material/Snackbar'

const DreamReportDetails = ({ report }) => {
  const { t } = useTranslation()
  const router = useRouter()
  const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false)

  const handleDelete = () => {
    deleteDreamsReports([report.id]).then(res => {
      toast.success(t('success'))
      setOpenDeleteSnackbar(false)
      router.replace('/dream-reports')
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
            {t('dream_report')}
          </Typography>
          <CardContent>
            <Typography mb={2}>
              {t('message')}: {report.message}
            </Typography>
            <Typography mb={2}>
              {t('dream')}:&nbsp;
              <Link href={`/dreams/${report.dream.id}`} target={'_blank'} className={'link'}>
                {report.dream.id}
              </Link>
            </Typography>
            <Typography mb={2}>
              {t('user')}:&nbsp;
              <Link href={`/users/${report.user.id}`} target={'_blank'} className={'link'}>
                {report.user?.full_name} {report.user?.id === report.dream?.expert?.id ? `(${t('expert')})` : ''}
              </Link>
            </Typography>
            <Typography mb={2}>
              {t('created_at')}: {report.created_at}
            </Typography>
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

export default DreamReportDetails
