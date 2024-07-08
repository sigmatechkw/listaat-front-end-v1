import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

import CustomTextField from 'src/@core/components/mui/text-field'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import { Checkbox, FormControlLabel } from '@mui/material'

import { useTranslation } from 'react-i18next'
import CircularProgress from '@mui/material/CircularProgress'
import MenuItem from '@mui/material/MenuItem'
/* import Autocomplete from "@mui/material/Autocomplete";
import DatePicker from 'react-datepicker'
import PickersComponent from 'src/views/forms/form-elements/pickers/PickersCustomInput'; */
import 'react-datepicker/dist/react-datepicker.css' // Import the default styles for react-datepicker
import { useTheme } from '@mui/material/styles'
/* import CustomAvatar from "src/@core/components/mui/avatar"; */ // ../../@core/components/mui/avatar
import { Box } from '@mui/system'
import { styled } from '@mui/material/styles'
/* import { Typography } from '@mui/material'; */

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

const SmsEditForm = ({
  type = 'edit',
  active,
  setActive,
  imgSrc,
  setImgSrc,
  errors,
  control,
  onSubmit,
  title,
  loading,
  credentials,
  setValue,
  setCredentials
}) => {
  const { t } = useTranslation()
  const [inputValue, setInputValue] = useState('')

  const theme = useTheme()
  const { direction } = theme

  const handleIsActive = (e, val) => {
    setActive(val)
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
        setImgSrc(reader.result)
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
                <ImgStyled src={imgSrc} alt='Profile Pic' />
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

            {/* <Grid item xs={12} sm={6}>
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
              <Grid item xs={12}>
                <Controller
                  name='description'
                  control={control}
                  render={({ field }) => (
                    <CustomTextField
                      rows={4}
                      fullWidth
                      multiline
                      {...field}
                      label={t('description')}
                      error={Boolean(errors.description)}
                      aria-describedby='validation-basic-description'
                    />
                  )}
                />
              </Grid>
            </Grid>

            {credentials.map(cre => (
              <Grid key={cre.id} item xs={6}>
                {(cre.type == 'url' || cre.type == 'text') && (
                  <Controller
                    name={cre.key}
                    control={control}
                    rules={{ required: cre.required == 0 ? false : true }}
                    render={({ field: { value, onChange } }) => (
                      <>
                        <CustomTextField
                          disabled={cre.editable != 1}
                          fullWidth
                          defaultValue={cre.value ? cre.value : cre.default_value}
                          value={value}
                          label={t(cre.label)}
                          onChange={e => {
                            //setValue(cre.key, e.target.value)

                            setCredentials(prevData =>
                              prevData.map(item => (item.key === cre.key ? { ...item, value: e.target.value } : item))
                            )
                          }}
                          required={cre.required == 0 ? false : true}
                          error={Boolean(errors.value)}
                          aria-describedby='validation-basic-value'
                        />
                      </>
                    )}
                  />
                )}

                {cre.type == 'password' && (
                  <Controller
                    name={cre.label}
                    control={control}
                    rules={{ required: cre.required == 0 ? false : true }}
                    render={({ field: { value, onChange } }) => (
                      <>
                        <CustomTextField
                          type='password'
                          disabled={cre.editable != 1}
                          fullWidth
                          defaultValue={cre.value ? cre.value : cre.default_value}
                          value={cre.value}
                          label={t(cre.label)}
                          onChange={e => {
                            //setValue(cre.key, e.target.value)
                            setCredentials(prevData =>
                              prevData.map(item => (item.key === cre.key ? { ...item, value: e.target.value } : item))
                            )
                          }}
                          required={cre.required == 0 ? false : true}
                          error={Boolean(errors.value)}
                          aria-describedby='validation-basic-value'
                        />
                      </>
                    )}
                  />
                )}
              </Grid>
            ))}

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

export default SmsEditForm
