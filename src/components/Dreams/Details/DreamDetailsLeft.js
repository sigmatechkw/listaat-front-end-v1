import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import Grid from '@mui/material/Grid'
import Link from 'next/link'
import CustomChip from '../../../@core/components/mui/chip'
import {DREAM_STATUS, EMPLOYMENT_STATUS, GENDER, MARITAL_STATUS, STATUS_COLORS} from '../../../constants/constants'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CardActions from '@mui/material/CardActions'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { deleteDreams } from '../dreamsServices'
import { useRouter } from 'next/router'
import SnackbarConfirmActions from '../../Shared/SnackbarConfirmActions'
import Snackbar from '@mui/material/Snackbar'
import DreamAssignExpertDialog from './DreamAssignExpertDialog'
import Icon from '../../../@core/components/icon'
import IconButton from '@mui/material/IconButton'
import DreamChangeStatusDialog from './DreamChangeStatusDialog'

const DreamDetailsLeft = ({ dream }) => {
  const { t } = useTranslation()
  const router = useRouter()
  const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false)
  const [showAssignExpertDialog, setShowAssignExpertDialog] = useState(false)
  const [showChangeStatusDialog, setShowChangeStatusDialog] = useState(false)

  const handleDelete = () => {
    deleteDreams([dream.id]).then(res => {
      toast.success(t('success'))
      setOpenDeleteSnackbar(false)
      router.replace('/dreams')
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
          <CardContent>
            <Typography mb={2}>
              {t('title')}: {dream.title}
            </Typography>
            <Typography mb={2}>
              {t('description')}: {dream.description}
            </Typography>
            <Typography mb={2}>
              {t('gender')}: {GENDER[dream.gender]}
            </Typography>
            <Typography mb={2}>
              {t('marital_status')}: {MARITAL_STATUS[dream.marital_status]}
            </Typography>
            <Typography mb={2}>
              {t('employment_status')}: {EMPLOYMENT_STATUS[dream.employment_status]}
            </Typography>
            <Typography mb={2}>
              {t('type')}: {dream.type?.name}
            </Typography>
            <Box mb={2}>
              {t('status')}:&nbsp;
              <CustomChip
                rounded
                skin='light'
                size='small'
                label={DREAM_STATUS[dream.status]}
                color={STATUS_COLORS[dream.status]}
                sx={{ textTransform: 'capitalize' }}
              />
              <IconButton
                sx={{ mx: 1 }}
                color="warning"
                disabled={dream.status === 7}
                onClick={() => setShowChangeStatusDialog(true)}
              >
                <Icon icon='tabler:edit' fontSize={20} />
              </IconButton>
            </Box>
            <Typography mb={2}>
              {t('user')}:&nbsp;
              <Link href={`/users/${dream.user.id}`} target={'_blank'} className={'link'}>
                {dream.user.full_name}
              </Link>
            </Typography>
            <Typography mb={2}>
              {t('expert')}:&nbsp;
              {dream.expert && (
                <Link href={`/users/${dream.expert?.id}`} target={'_blank'} className={'link'}>
                  {dream.expert?.full_name}
                </Link>
              )}
            </Typography>
            <Typography mb={2}>
              {t('price')}: {dream.price} {t('kwd')}
            </Typography>
            <Typography mb={2}>
              {t('final_price')}: {dream.final_price} {t('kwd')}
            </Typography>
            {dream.promo_code && (
              <Typography mb={2}>
                {t('promo_code')}: {dream.promo_code?.code}
              </Typography>
            )}
            <Typography mb={2}>
              {t('payment_method')}: {dream.payment_method?.name}
            </Typography>
            <Box mb={2}>
              {t('paid')}:&nbsp;
              <CustomChip
                rounded
                skin={'light'}
                size={'small'}
                label={dream.paid ? t('yes') : t('no')}
                color={dream.paid ? 'success' : 'error'}
              />
            </Box>
            {dream.paid_date && (
              <Typography mb={2}>
                {t('paid_date')}: {dream.paid_date}
              </Typography>
            )}
            <Box mb={2}>
              {t('late')}:&nbsp;
              <CustomChip
                rounded
                skin={'light'}
                size={'small'}
                label={dream.late ? t('yes') : t('no')}
                color={dream.late ? 'success' : 'error'}
              />
            </Box>
            <Typography mb={2}>
              {t('views')}: {dream.views}
            </Typography>
            <Typography mb={2}>
              {t('created_at')}: {dream.created_at}
            </Typography>
            {dream.review_stars ? (
              <Typography mb={2}>
                {t('review_stars')}: {dream.review_stars}/5
              </Typography>
            ) : (
              <></>
            )}
            {dream.review_text && (
              <Typography mb={2}>
                {t('review_text')}: {dream.review_text}
              </Typography>
            )}
          </CardContent>
          <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant='tonal'
              color={'success'}
              sx={{ mr: 2 }}
              disabled={dream.status === 'Done' || dream.status === 'Cancelled'}
              onClick={() => setShowAssignExpertDialog(true)}
            >
              {t('assign_expert')}
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
      {showAssignExpertDialog && (
        <DreamAssignExpertDialog dreamId={dream.id} show={showAssignExpertDialog} setShow={setShowAssignExpertDialog} />
      )}
      {showChangeStatusDialog && (
        <DreamChangeStatusDialog
          dreamId={dream.id}
          currentStatus={dream.status}
          show={showChangeStatusDialog}
          setShow={setShowChangeStatusDialog}
        />
      )}
    </Grid>
  )
}

export default DreamDetailsLeft
