import React, { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

import CustomTextField from 'src/@core/components/mui/text-field'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'

import { useTranslation } from 'react-i18next'
import CircularProgress from '@mui/material/CircularProgress'

import axios from 'axios'
import { useSelector } from 'react-redux'
import { useTheme } from '@mui/material/styles'
import { Autocomplete, Box, Typography } from '@mui/material'
import 'react-datepicker/dist/react-datepicker.css' // Import the default styles for react-datepicker
import { styled } from '@mui/material/styles'

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

const ContactUsForm = ({
  type = 'create',
  imgSrc,
  contactUsImg,
  setImgSrc,
  errors,
  control,
  watch,
  setValue,
  onSubmit,
  title,
  loading
}) => {
  const { t } = useTranslation()
  const [roles, setRoles] = useState([])

  const auth = useSelector(state => state.auth)
  const lang = useSelector(state => state.lang)
  const theme = useTheme()
  const { direction } = theme
  const popperPlacement = direction === 'ltr' ? 'bottom-start' : 'bottom-end'
  const [countries, setCountries] = useState([])
  const [currentPhonePattern, setCurrentPhonePattern] = useState('')

  useEffect(() => {
    fetchCountries()
  }, [])

  const fetchCountries = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_KEY}countries`, {
        headers: {
          'Accepted-Language': lang ?? 'en'
        }
      })
      .then(res => {
        setCountries(
          res.data.data.items.map(country => {
            return {
              id: country.id,
              label: country.name,
              pattern: country.phone_pattern
            }
          })
        )
      })
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

  return (
    <>
      <CardHeader title={title} />
      <CardContent>
        <form onSubmit={onSubmit}>
          <Grid container spacing={4} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'between', alignItems: 'end' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ImgStyled src={imgSrc} alt='Profile Pic' />
                <div>
                  <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                    Upload New Photo
                    <input
                      hidden
                      type='file'
                      value={contactUsImg}
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
            <Grid item xs={6}>
              <Controller
                name='name'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <>
                    <CustomTextField
                      fullWidth
                      value={value}
                      label={t('name')}
                      onChange={onChange}
                      required
                      error={Boolean(errors.name)}
                      aria-describedby='validation-basic-name'
                      {...(errors.name && { helperText: t('required') })}
                    />
                  </>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='email'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    type='email'
                    value={value}
                    label={t('email')}
                    onChange={onChange}
                    required
                    error={Boolean(errors.order)}
                    aria-describedby='validation-basic-email'
                    {...(errors.email && { helperText: t('required') })}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='phone'
                control={control}
                rules={{
                  required: true,
                  pattern: {
                    value: new RegExp(currentPhonePattern),
                    message: 'Invalid phone number format'
                  }
                }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Phone'
                    onChange={onChange}
                    required
                    error={Boolean(errors.phone)}
                    aria-describedby='validation-basic-phone'
                    {...(errors.phone && { helperText: errors.phone.message })}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='country_id'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <Autocomplete
                    value={value}
                    onChange={(e, newValue) => {
                      setValue('country_id', newValue)

                      const phonePat = countries.filter(coun => coun.id == newValue.id)[0].pattern
                      setCurrentPhonePattern(phonePat)
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    options={countries}
                    renderInput={params => <CustomTextField {...params} label={t('country')} />}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name='message'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    rows={4}
                    fullWidth
                    multiline
                    {...field}
                    label='message'
                    error={Boolean(errors.message)}
                    aria-describedby='validation-basic-message'
                    {...(errors.message && { helperText: 'This field is required' })}
                  />
                )}
              />
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

export default ContactUsForm
