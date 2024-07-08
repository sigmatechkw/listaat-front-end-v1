import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CustomTextField from 'src/@core/components/mui/text-field'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import { useTranslation } from 'react-i18next'
import CircularProgress from '@mui/material/CircularProgress'
import { useQuery } from '@tanstack/react-query'
import 'react-datepicker/dist/react-datepicker.css'
import { Box } from '@mui/system'
import { styled } from '@mui/material/styles'
import MultiAutocomplete from '../MultiAutoComplete/MultiAutocomplete'
import axios from 'axios'
import { getCookie } from 'cookies-next'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 100,
  height: 100,
  marginRight: theme.spacing(6),
  borderRadius: theme.shape.borderRadius
}))

const Loader = styled('div')(({ theme }) => ({
  width: 100,
  height: 100,
  marginRight: theme.spacing(6),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
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

const PushMessagesEditForm = ({
  type = 'edit',
  errors,
  control,
  onSubmit,
  title,
  loading,
  setSelectedUsers,
  imgSrc,
  setImgSrc
}) => {
  const { t } = useTranslation()
  const [inputValue, setInputValue] = useState('')

  const { data } = useQuery({
    queryKey: ['fetchUsers'],
    queryFn: () => fetchUsers()
  })

  const handleSelectedUsers = (e, v) => {
    setSelectedUsers(v)
  }

  const handleInputImageChange = file => {
    setImgSrc(null)
    setInputValue('')
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
      if (reader.result !== null) {
        setInputValue(reader.result)
      }
    }
  }

  const handleInputImageReset = () => {
    setInputValue('')
    setImgSrc('/images/avatars/15.png')
  }

  const fetchUsers = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}users`, {
      headers: {
        Authorization: getCookie('token'),
        'Accepted-Language': getCookie('lang') ?? 'en'
      }
    })

    return response.data.data.items
  }

  return (
    <>
      <CardHeader title={title} />
      <CardContent>
        <form onSubmit={onSubmit}>
          <Grid container spacing={4} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'between', alignItems: 'end' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {imgSrc ? (
                  <ImgStyled src={imgSrc} alt='Profile Pic' />
                ) : (
                  <Loader>
                    <CircularProgress size={'1.5rem'} />
                  </Loader>
                )}

                <div>
                  <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                    Upload New Photo
                    <input
                      hidden
                      type='file'
                      value={inputValue}
                      accept='image/*'
                      onChange={handleInputImageChange}
                      id='account-settings-upload-image'
                    />
                  </ButtonStyled>
                  <ResetButtonStyled color='secondary' variant='tonal' onClick={handleInputImageReset}>
                    Reset
                  </ResetButtonStyled>
                </div>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <MultiAutocomplete
                label='users'
                items={data ? data : []}
                placeholder={'users'}
                required
                handleChange={handleSelectedUsers}
              />
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
                      label='body (ar)'
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
                      label='body (en)'
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

export default PushMessagesEditForm
