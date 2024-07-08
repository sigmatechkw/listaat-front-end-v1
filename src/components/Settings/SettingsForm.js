import React from 'react'
import { Controller } from 'react-hook-form'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

import CustomTextField from 'src/@core/components/mui/text-field'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'

import { useTranslation } from 'react-i18next'
import CircularProgress from '@mui/material/CircularProgress'

const SettingsForm = ({ type = 'create', errors, control, watch, setValue, onSubmit, title, loading }) => {
  const { t } = useTranslation()

  return (
    <>
      <CardHeader title={title} />
      <CardContent>
        <form onSubmit={onSubmit}>
          <Grid container spacing={4} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Grid item xs={6}>
              <Controller
                name='label_ar'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <>
                    <CustomTextField
                      fullWidth
                      value={value}
                      label={t('label (ar)')}
                      onChange={onChange}
                      required
                      error={Boolean(errors.label_ar)}
                      aria-describedby='validation-basic-label_ar'
                      {...(errors.label_ar && { helperText: t('required') })}
                    />
                  </>
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name='label_en'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <>
                    <CustomTextField
                      fullWidth
                      value={value}
                      label={t('label (en)')}
                      onChange={onChange}
                      required
                      error={Boolean(errors.label_en)}
                      aria-describedby='validation-basic-label_en'
                      {...(errors.label_en && { helperText: t('required') })}
                    />
                  </>
                )}
              />
            </Grid>

            <Grid item xs={6}>
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

            <Grid item xs={6}>
              <Controller
                name='group'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <>
                    <CustomTextField
                      fullWidth
                      value={value}
                      label={t('group')}
                      onChange={onChange}
                      required
                      error={Boolean(errors.group)}
                      aria-describedby='validation-basic-group'
                      {...(errors.group && { helperText: t('required') })}
                    />
                  </>
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name='key'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <>
                    <CustomTextField
                      fullWidth
                      value={value}
                      label={t('key')}
                      onChange={onChange}
                      required
                      error={Boolean(errors.key)}
                      aria-describedby='validation-basic-key'
                      {...(errors.key && { helperText: t('required') })}
                    />
                  </>
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name='title'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <>
                    <CustomTextField
                      fullWidth
                      value={value}
                      label={t('title')}
                      onChange={onChange}
                      required
                      error={Boolean(errors.title)}
                      aria-describedby='validation-basic-title'
                      {...(errors.title && { helperText: t('required') })}
                    />
                  </>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name='textarea'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    rows={4}
                    fullWidth
                    multiline
                    {...field}
                    label='description'
                    error={Boolean(errors.textarea)}
                    aria-describedby='validation-basic-textarea'
                    {...(errors.textarea && { helperText: 'This field is required' })}
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

export default SettingsForm
