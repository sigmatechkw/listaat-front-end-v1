import React from 'react'
import { Controller } from 'react-hook-form'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

import CustomTextField from 'src/@core/components/mui/text-field'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'

import { useTranslation } from 'react-i18next'
import CircularProgress from '@mui/material/CircularProgress'
import { Box, Checkbox, FormControl, FormControlLabel, MenuItem, styled } from '@mui/material'

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

const SettingsEditForm = ({
  type = 'create',
  options,
  active,
  setActive,
  imgSrcAsUrl,
  setImgSrcAsUrl,
  imgSrc,
  setImgSrc,
  inputType,
  errors,
  control,
  watch,
  setValue,
  onSubmit,
  title,
  loading
}) => {
  const { t } = useTranslation()

  const handleInputImageChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => {
        setImgSrc(reader.result)
      }
      reader.readAsDataURL(files[0])
      if (reader.result !== null) {
        setImgSrcAsUrl(reader.result)
      }
    }
  }

  const handleInputImageReset = () => {
    setImgSrc('/images/avatars/15.png')
    setImgSrcAsUrl('')
  }

  const handleIsActive = (e, val) => {
    setActive(val)
  }

  return (
    <>
      <CardHeader title={title} />
      <CardContent>
        <form onSubmit={onSubmit}>
          <Grid container spacing={4} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            {(inputType == 'url' || inputType == 'text') && (
              <Grid item xs={11}>
                <Controller
                  name='value'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <>
                      <CustomTextField
                        fullWidth
                        value={value}
                        label={t('value')}
                        onChange={onChange}
                        required
                        error={Boolean(errors.value)}
                        aria-describedby='validation-basic-value'
                        {...(errors.value && { helperText: t('required') })}
                      />
                    </>
                  )}
                />
              </Grid>
            )}

            {inputType == 'image' && (
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ImgStyled src={imgSrc ? imgSrc : '/images/avatars/15.png'} alt='Profile Pic' />
                  <div>
                    <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                      Upload New Photo
                      <input
                        hidden
                        type='file'
                        value={imgSrcAsUrl}
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
            )}

            {inputType == 'textarea' && (
              <Grid item xs={12}>
                <Grid item xs={11}>
                  <Controller
                    name='value'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <>
                        {field.value}
                        <CustomTextField
                          rows={4}
                          fullWidth
                          multiline
                          {...field}
                          label='description (en)'
                          error={Boolean(errors.value)}
                          aria-describedby='value'
                          {...(errors.value && { helperText: 'This field is required' })}
                        />
                      </>
                    )}
                  />
                </Grid>
              </Grid>
            )}

            {inputType == 'number' && (
              <Grid item xs={12}>
                <Controller
                  name='value'
                  control={control}
                  rules={{ required: false }}
                  render={({ field: { value, onChange } }) => (
                    <>
                      <CustomTextField
                        type='number'
                        fullWidth
                        value={value}
                        label={t('value')}
                        onChange={onChange}
                        aria-describedby='validation-basic-value'
                      />
                    </>
                  )}
                />
              </Grid>
            )}

            {inputType == 'checkbox' && (
              <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'between', gap: 4, alignItems: 'center' }}>
                <label>active </label>
                <FormControlLabel
                  label='Yes'
                  control={
                    <Checkbox
                      checked={active == 1}
                      onChange={(e, v) => {
                        handleIsActive(e, '1')
                      }}
                      name='yes'
                    />
                  }
                />
                <FormControlLabel
                  label='No'
                  control={
                    <Checkbox
                      checked={active == 0}
                      onChange={(e, v) => {
                        handleIsActive(e, '0')
                      }}
                      name='No'
                    />
                  }
                />
              </Grid>
            )}

            {inputType == 'select' && (
              <Grid item xs={12} sm={6}>
                <Controller
                  name={'select'}
                  control={control}
                  render={({ field }) => (
                    <>
                      <CustomTextField
                        select
                        fullWidth
                        defaultValue=''
                        {...field}
                        label={t('value')}
                        id='custom-select'
                      >
                        {options.map(i => (
                          <MenuItem key={i} value={i}>
                            {i}
                          </MenuItem>
                        ))}
                      </CustomTextField>
                    </>
                  )}
                />
              </Grid>
            )}

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

export default SettingsEditForm
