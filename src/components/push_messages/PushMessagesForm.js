import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CustomTextField from 'src/@core/components/mui/text-field'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import CircularProgress from '@mui/material/CircularProgress'
/* import DatePicker from 'react-datepicker'
import MenuItem from "@mui/material/MenuItem";
import {useSelector} from "react-redux"; */
import { useTheme } from '@mui/material/styles'
import { Checkbox, FormControlLabel } from '@mui/material'
/* import PickersComponent from 'src/views/forms/form-elements/pickers/PickersCustomInput';
 */ import 'react-datepicker/dist/react-datepicker.css' // Import the default styles for react-datepicker
/* import AutocompleteMultipleValues from 'src/views/forms/form-elements/autocomplete/AutocompleteMultipleValues';
 */
import MultiAutocomplete from '../MultiAutoComplete/MultiAutocomplete'
import { Box } from '@mui/system'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { getCookie } from 'cookies-next'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 100,
  height: 100,
  marginRight: theme.spacing(6),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(2)
  }
}))

const PushMessagesForm = ({
  type = 'create',
  selectedExperts,
  setSelectedExperts,
  selectedUsers,
  imgSrc,
  setImgSrc,
  errors,
  control,
  watch,
  setValue,
  onSubmit,
  title,
  loading,
  pushMessageImg,
  setPushMessageImg,
  setSelectedUsers,
  enableSelectExpert,
  setEnableSelectExpert,
  enableSelectUser,
  setEnableSelectUsers
}) => {
  const { t } = useTranslation()
  const theme = useTheme()

  const [users, setUsers] = useState([])
  const [experts, setExperts] = useState([])

  const { data } = useQuery({
    queryKey: ['fetchUsers'],
    queryFn: () => fetchUsers()
  })

  const { data: dataExperts } = useQuery({
    queryKey: ['fetchExperts'],
    queryFn: () => fetchExperts()
  })

  const fetchUsers = async (search, filtered) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}users${search ? '?search=' + search : ''}`, {
      params: {
        filters: { role: 2 }
      },
      headers: {
        Authorization: getCookie('token'),
        'Accepted-Language': getCookie('lang') ?? 'en'
      }
    })

    if (!filtered) {
      const ids = selectedUsers
      const filteredUsers = response.data.data.items.filter(user => !ids.includes(user.id))
      setUsers(filteredUsers)
    } else {
      const ids = filtered
      const filteredUsers = response.data.data.items.filter(user => !ids.includes(user.id))
      setUsers(filteredUsers)
    }

    //return response.data.data.items
  }

  const fetchExperts = async (search, filtered) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}users${search ? '?search=' + search : ''}`, {
      params: {
        filters: { role: 3 }
      },
      headers: {
        Authorization: getCookie('token'),
        'Accepted-Language': getCookie('lang') ?? 'en'
      }
    })

    if (!filtered) {
      const ids = selectedUsers.map(user => user.id)
      const filteredUsers = response.data.data.items.filter(user => !ids.includes(user.id))
      setExperts(filteredUsers)
    } else {
      const ids = filtered
      const filteredUsers = response.data.data.items.filter(user => !ids.includes(user.id))
      setExperts(filteredUsers)
    }

    return response.data.data.items
  }

  const handleInputImageChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => {
        setImgSrc(reader.result)
      }
      reader.readAsDataURL(files[0])
      if (reader.result !== null) {
        setPushMessageImg(reader.result)
      }
    }
  }

  const handleInputImageReset = () => {
    setPushMessageImg('')
    setImgSrc('/images/avatars/15.png')
  }

  const handleSelectedUsers = (e, v) => {
    setSelectedUsers(v.map(user => user.id))

    /*  fetchUsers(
      false,
      v.map((i) => i.id)
    ); */
  }

  const handleSelectedExperts = (e, v) => {
    setSelectedExperts(v.map(user => user.id))

    /*  fetchUsers(
      false,
      v.map((i) => i.id)
    ); */
  }

  const handleSelectAllUsers = e => {
    if (e.target.checked) {
      //setSelectedUsers(data.map(user => user.id))
      setEnableSelectUsers(true)
    } else {
      setEnableSelectUsers(false)
      //setSelectedUsers([])
    }
  }

  const handleSelectAllExperts = e => {
    if (e.target.checked) {
      console.log(dataExperts)
      //setSelectedExperts(dataExperts.map(user => user.id))
      setEnableSelectExpert(true)
    } else {
      setEnableSelectExpert(false)
      //setSelectedExperts([])
    }
  }

  const handleUsersSearch = val => {
    fetchUsers(val)
  }

  return (
    <>
      <CardHeader title={title} />
      <CardContent>
        <form onSubmit={onSubmit}>
          <Grid container spacing={4} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'between', alignItems: 'end' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ImgStyled src={imgSrc} alt='Profile Pic' />
                <div>
                  <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                    {t('Upload New Photo')}
                    <input
                      hidden
                      type='file'
                      value={pushMessageImg}
                      accept='image/*'
                      onChange={handleInputImageChange}
                      id='account-settings-upload-image'
                    />
                  </ButtonStyled>
                  <ResetButtonStyled color='secondary' variant='tonal' onClick={handleInputImageReset}>
                    {t('Reset')}
                  </ResetButtonStyled>
                </div>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <FormControlLabel
                  onChange={e => handleSelectAllUsers(e)}
                  label={t('Send To All Users')}
                  sx={{ '& .MuiTypography-root': { textTransform: 'capitalize', color: 'text.secondary' } }}
                  control={<Checkbox size='small' />}
                />

                <FormControlLabel
                  onChange={e => handleSelectAllExperts(e)}
                  label={t('Send To All Experts')}
                  sx={{ '& .MuiTypography-root': { textTransform: 'capitalize', color: 'text.secondary' } }}
                  control={<Checkbox size='small' />}
                />
              </Box>

              {!enableSelectUser && (
                <MultiAutocomplete
                  handleUsersSearch={handleUsersSearch}
                  handleChange={handleSelectedUsers}
                  label={t('users')}
                  items={users.length != 0 ? users : data ? data : []}
                  placeholder={t('users')}
                  required
                />
              )}
            </Grid>

            <Grid item xs={12}>
              {!enableSelectExpert && (
                <MultiAutocomplete
                  handleUsersSearch={handleUsersSearch}
                  handleChange={handleSelectedExperts}
                  label={t('experts')}
                  items={experts.length != 0 ? experts : dataExperts ? dataExperts : []}
                  placeholder={t('experts')}
                  required
                />
              )}
            </Grid>

            <Grid item xs={6}>
              <Controller
                name='title_ar'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <>
                    <CustomTextField
                      fullWidth
                      value={value}
                      label={t('title (ar)')}
                      onChange={onChange}
                      required
                      error={Boolean(errors.title_ar)}
                      aria-describedby='validation-basic-title_ar'
                      {...(errors.title_ar && { helperText: t('required') })}
                    />
                  </>
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name='title_en'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <>
                    <CustomTextField
                      fullWidth
                      value={value}
                      label={t('title (en)')}
                      onChange={onChange}
                      required
                      error={Boolean(errors.title_en)}
                      aria-describedby='validation-basic-title_en'
                      {...(errors.title_en && { helperText: t('required') })}
                    />
                  </>
                )}
              />
            </Grid>

            <Grid item container spacing={4} sx={{ alignItems: 'center', justifyContent: 'space-between' }} xs={12}>
              <Grid item xs={6}>
                <Controller
                  name='body_ar'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CustomTextField
                      rows={4}
                      fullWidth
                      multiline
                      required
                      {...field}
                      label={t('body (ar)')}
                      error={Boolean(errors.body_ar)}
                      aria-describedby='validation-basic-body_ar'
                      {...(errors.body_ar && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <Controller
                  name='body_en'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CustomTextField
                      rows={4}
                      fullWidth
                      required
                      multiline
                      {...field}
                      label={t('body (en)')}
                      error={Boolean(errors.body_en)}
                      aria-describedby='validation-basic-body_en'
                      {...(errors.body_en && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ alignSelf: 'flex-end' }}>
              <Button type='submit' variant='contained' disabled={loading}>
                {loading ? <CircularProgress size={'0.5rem'} /> : t('save')}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </>
  )
}

export default PushMessagesForm
