import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

import CustomTextField from 'src/@core/components/mui/text-field'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'

import { useTranslation } from 'react-i18next'
import CircularProgress from '@mui/material/CircularProgress'
import MenuItem from '@mui/material/MenuItem'
import 'react-datepicker/dist/react-datepicker.css' // Import the default styles for react-datepicker
import { Box } from '@mui/system'
import { styled } from '@mui/material/styles'
import { Checkbox, FormControlLabel } from '@mui/material'

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

const LoginMethodsEditForm = ({
  type = 'edit',
  active,
  setActive,
  errors,
  control,
  onSubmit,
  title,
  loading,
  imgSrc,
  setImgSrc
}) => {
  const { t } = useTranslation()
  const [inputValue, setInputValue] = useState('')

  const handleIsActive = (e, val) => {
    setActive(val)
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

  return (
    <>
      <CardHeader title={title} />
      <CardContent>
        <form onSubmit={onSubmit}>
          <Grid container spacing={4} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'between', alignItems: 'end' }}>
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
                    {t('Upload New Photo')}
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
                    {t('Reset')}
                  </ResetButtonStyled>
                </div>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Controller
                name='name_ar'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <>
                    <CustomTextField
                      fullWidth
                      value={value}
                      label={t('name (ar)')}
                      onChange={onChange}
                      required
                      error={Boolean(errors.name_ar)}
                      aria-describedby='validation-basic-name_ar'
                      {...(errors.name_ar && { helperText: t('required') })}
                    />
                  </>
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name='name_en'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <>
                    <CustomTextField
                      fullWidth
                      value={value}
                      label={t('name (en)')}
                      onChange={onChange}
                      required
                      error={Boolean(errors.name_en)}
                      aria-describedby='validation-basic-name_en'
                      {...(errors.name_en && { helperText: t('required') })}
                    />
                  </>
                )}
              />
            </Grid>

            {/*     <Grid item xs={12} sm={6}>
              <Controller
                name={'active'}
                control={control}
                render={({field}) => (
                  <CustomTextField select fullWidth defaultValue='' {...field} label={t('active')} id='custom-select'>
                    <MenuItem value={''}>{t('Select Active')}</MenuItem>
                    <MenuItem value={1}>{t('yes')}</MenuItem>
                    <MenuItem value={0}>{t('no')}</MenuItem>
                  </CustomTextField>
                )}
              />
          </Grid> */}

            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'between', gap: 4, alignItems: 'center' }}>
              <label>{t('active')}</label>
              <FormControlLabel
                label={t('yes')}
                control={
                  <Checkbox
                    checked={active == 1}
                    onChange={(e, v) => {
                      handleIsActive(e, 1)
                    }}
                    name='yes'
                  />
                }
              />
              <FormControlLabel
                label={t('no')}
                control={
                  <Checkbox
                    checked={active == 0}
                    onChange={(e, v) => {
                      handleIsActive(e, 0)
                    }}
                    name='No'
                  />
                }
              />
            </Grid>

            <Grid item container spacing={4} sx={{ alignItems: 'center', justifyContent: 'space-between' }} xs={12}>
              <Grid item xs={6}>
                <Controller
                  name='description_ar'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CustomTextField
                      rows={4}
                      fullWidth
                      multiline
                      {...field}
                      label={t('Description (ar)')}
                      error={Boolean(errors.description_ar)}
                      aria-describedby='validation-basic-description_ar'
                      {...(errors.description_ar && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <Controller
                  name='description_en'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CustomTextField
                      rows={4}
                      fullWidth
                      multiline
                      {...field}
                      label={t('Description (en)')}
                      error={Boolean(errors.description_en)}
                      aria-describedby='validation-basic-description_en'
                      {...(errors.description_en && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid item xs={1} sx={{ alignSelf: 'flex-end' }}>
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

export default LoginMethodsEditForm
