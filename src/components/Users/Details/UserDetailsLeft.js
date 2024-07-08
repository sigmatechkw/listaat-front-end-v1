// ** React Imports
import {useState} from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import {styled, useTheme} from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import {useTranslation} from "react-i18next";
import {useRouter} from "next/router";
import SnackbarConfirmActions from "../../Shared/SnackbarConfirmActions";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import toast from "react-hot-toast";
import {useQueryClient} from "@tanstack/react-query";
import {deleteUsers} from "./userDetailsServices";
import {useSelector} from "react-redux";
import ExpertStatistics from "./ExpertStatistics";

const roleColors = {
  admin: 'error',
  user: 'success',
  expert: 'primary'
}

const activeColors = {
  active: 'success',
  inactive: 'secondary'
}

// ** Styled <sup> component
const Sup = styled('sup')(({ theme }) => ({
  top: 0,
  left: -10,
  position: 'absolute',
  color: theme.palette.primary.main
}))

// ** Styled <sub> component
const Sub = styled('sub')(({ theme }) => ({
  alignSelf: 'flex-end',
  color: theme.palette.text.disabled,
  fontSize: theme.typography.body1.fontSize
}))

const UserDetailsLeft = ({user}) => {
  const queryClient = useQueryClient()
  const theme = useTheme()
  const auth = useSelector(state => state.auth)
  const lang = useSelector(state => state.lang)
  const {t} = useTranslation()
  const router = useRouter()
  const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false);

  const handleDelete = () => {
    deleteUsers([user.id]).then(res => {
      toast.success(t('success'));
      setOpenDeleteSnackbar(false)
      router.replace('/users')
    })
  }

  const handleClickDeleteButton = () => {
    setOpenDeleteSnackbar(true);
  };

  const handleCloseDeleteSnackbar = () => {
    setOpenDeleteSnackbar(false);
  };

  const handleToggleUserActive = () => {
    let data = {
      active: user.active ? 0 : 1
    }
    axios
      .put(`${process.env.NEXT_PUBLIC_API_KEY}users/${user.id}/toggle-active`, data, {
        headers: {
          'Authorization': auth.token,
          'Accepted-Language': lang ?? 'en'
        }
      })
      .then(res => {
        toast.success(t('success'));
        queryClient.invalidateQueries({ queryKey: ['fetchUserDetails', user.id] })

      })
      .catch(error => {
        toast.error(t('error'));
      });
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ pt: 13.5, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              {user.image ? (
                <CustomAvatar
                  src={user.image}
                  variant='rounded'
                  alt={user.full_name}
                  sx={{ width: 100, height: 100, mb: 4 }}
                />
              ) : (
                <CustomAvatar
                  skin='light'
                  variant='rounded'
                  color={'primary'}
                  sx={{ width: 100, height: 100, mb: 4, fontSize: '3rem' }}
                >
                  {getInitials(user.full_name)}
                </CustomAvatar>
              )}
              <Typography variant='h4' sx={{ mb: 3 }}>
                {user.full_name}
              </Typography>
              <CustomChip
                rounded
                skin='light'
                size='small'
                label={user.roles[0]?.name}
                color={roleColors[user.roles[0]?.name]}
                sx={{ textTransform: 'capitalize' }}
              />
            </CardContent>

            <Divider sx={{ my: '0 !important', mx: 6 }} />

            <CardContent sx={{ pb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                  {t('details')}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {
                    user.is_busy && user.roles[0]?.id === 3 ?
                      <CustomChip
                        rounded
                        skin='light'
                        size='small'
                        label={t('busy')}
                        color={'error'}
                        sx={{ textTransform: 'capitalize', mx: 2 }}
                      />
                    : <></>
                  }
                  <CustomChip
                    rounded
                    skin='light'
                    size='small'
                    label={user.is_online ? t('online') : t('offline')}
                    color={user.is_online ? 'success' : 'secondary'}
                    sx={{ textTransform: 'capitalize' }}
                  />
                </Box>
              </Box>
              <Box sx={{ pt: 4 }}>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('email')}:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{user.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('phone')}:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{user.phone}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('active')}:</Typography>
                  <CustomChip
                    rounded
                    skin='light'
                    size='small'
                    label={user.active ? t('active') : t('inactive')}
                    color={activeColors[user.active ? 'active' : 'inactive']}
                    sx={{
                      textTransform: 'capitalize'
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('wallet')}:</Typography>
                  <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{user.wallet ?? 0} {t('kwd')}</Typography>
                </Box>
                {
                  user.birthday &&
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('birthday')}:</Typography>
                      <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{user.birthday}</Typography>
                    </Box>
                }
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('email_verified')}:</Typography>
                  {
                    user.email_verified ?
                      <Icon icon='tabler:circle-check' color='green' fontSize='1.5rem'/>
                    :
                      <Icon icon='tabler:xbox-x' color='red' fontSize='1.5rem'/>
                  }
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('phone_verified')}:</Typography>
                  {
                    user.phone_verified ?
                      <Icon icon='tabler:circle-check' color='green' fontSize='1.5rem'/>
                      :
                      <Icon icon='tabler:xbox-x' color='red' fontSize='1.5rem'/>
                  }
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('enable_notification')}:</Typography>
                  {
                    user.notification_enabled ?
                      <Icon icon='tabler:circle-check' color='green' fontSize='1.5rem'/>
                      :
                      <Icon icon='tabler:xbox-x' color='red' fontSize='1.5rem'/>
                  }
                </Box>
                {
                  user.preferred_language &&
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('preferred_language')}:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{user.preferred_language}</Typography>
                    </Box>
                }
                {
                  user.roles[0]?.id === 3 &&
                    <>
                      <Box sx={{ display: 'flex', mb: 3 }}>
                        <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('commission_value')}:</Typography>
                        <Typography sx={{ color: 'text.secondary' }}>{user.commission_value}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', mb: 3 }}>
                        <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('commission_type')}:</Typography>
                        <Typography sx={{ color: 'text.secondary' }}>{user.commission_type}</Typography>
                      </Box>
                    </>
                }
              </Box>
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant='tonal' sx={{ mr: 2 }} onClick={() => router.push(`/users/edit/${user.id}`)}>
                {t('edit')}
              </Button>
              <Button variant='tonal' color={user.active ? 'warning' : 'success'} sx={{ mr: 2 }} onClick={handleToggleUserActive}>
                {user.active ? t('deactivate') : t('activate')}
              </Button>
              <Button color='error' variant='tonal' onClick={handleClickDeleteButton}>
                {t('delete')}
              </Button>
            </CardActions>

          </Card>
        </Grid>
        {
          user.roles[0]?.id === 3 &&
            <ExpertStatistics userId={user.id} />
        }
      </Grid>
      <Snackbar
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        open={openDeleteSnackbar}
        onClose={handleCloseDeleteSnackbar}
        message={t('are_you_sure')}
        action={<SnackbarConfirmActions handleConfirm={handleDelete} handleClose={handleCloseDeleteSnackbar} />}
      />
    </Grid>
  )
}

export default UserDetailsLeft
