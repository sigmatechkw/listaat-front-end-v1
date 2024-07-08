import React from 'react'
import { Controller } from 'react-hook-form'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CustomTextField from 'src/@core/components/mui/text-field'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import { useTranslation } from 'react-i18next'
import CircularProgress from '@mui/material/CircularProgress'
//import MenuItem from "@mui/material/MenuItem";
import { Box } from '@mui/material'
import 'react-datepicker/dist/react-datepicker.css'
import CkEditorForEdit from '../ckEditor/CkEditorForEdit'
import { Checkbox, FormControlLabel } from '@mui/material'

const PagesForm = ({
  type = 'create',
  contentAr,
  active,
  setActive,
  setContentAr,
  contentEn,
  setContentEn,
  errors,
  control,
  watch,
  setValue,
  onSubmit,
  title,
  loading
}) => {
  const { t } = useTranslation()

  const handleIsActive = (e, val) => {
    setActive(val)
  }

  return (
    <>
      <CardHeader title={title} />
      <CardContent>
        <form onSubmit={onSubmit}>
          <Grid container spacing={4} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
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
                name='slug'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <>
                    <CustomTextField
                      fullWidth
                      value={value}
                      label={t('slug')}
                      onChange={onChange}
                      required
                      error={Boolean(errors.slug)}
                      aria-describedby='validation-basic-slug'
                      {...(errors.slug && { helperText: t('required') })}
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
                    <MenuItem value={''}>{t('active')}</MenuItem>
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

            <Grid item xs={12}>
              <Box>
                <label>{t('content (ar)')}</label>
                <Box sx={{ marginTop: 1 }}>
                  <CkEditorForEdit textEditor={contentAr} setTextEditorVal={setContentAr} />
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box>
                <label>{t('content (en)')}</label>
                <Box sx={{ marginTop: 1 }}>
                  <CkEditorForEdit textEditor={contentEn} setTextEditorVal={setContentEn} />
                </Box>
              </Box>
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

export default PagesForm
