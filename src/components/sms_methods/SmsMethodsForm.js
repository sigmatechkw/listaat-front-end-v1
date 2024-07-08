import React, { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

import CustomTextField from 'src/@core/components/mui/text-field'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'

import { useTranslation } from 'react-i18next'
import CircularProgress from '@mui/material/CircularProgress'
import DatePicker from 'react-datepicker'
import MenuItem from '@mui/material/MenuItem'
//import Autocomplete from "@mui/material/Autocomplete";
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useTheme } from '@mui/material/styles'
import { Autocomplete } from '@mui/material'
import PickersComponent from 'src/views/forms/form-elements/pickers/PickersCustomInput'
import 'react-datepicker/dist/react-datepicker.css' // Import the default styles for react-datepicker

const SmsMethodsForm = ({ type = 'create', errors, control, watch, setValue, onSubmit, title, loading }) => {
  const { t } = useTranslation()
  const [roles, setRoles] = useState([])
  const [promoTypes, setPromoTypes] = useState([])
  const auth = useSelector(state => state.auth)
  const lang = useSelector(state => state.lang)
  const theme = useTheme()
  const { direction } = theme
  const popperPlacement = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

  const fetchRoles = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_KEY}roles`, {
        headers: {
          Authorization: auth.token,
          'Accepted-Language': lang ?? 'en'
        }
      })

      .then(res => {
        setRoles(
          res.data.data.items.map(role => {
            return {
              id: role.id,
              label: role.name
            }
          })
        )
      })
  }

  const fetchPromoTypes = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_KEY}getPromoCodeTypes`, {
        headers: {
          Authorization: auth.token,
          'Accepted-Language': lang ?? 'en'
        }
      })
      .then(res => {
        setPromoTypes([res.data.data.items.promo_type])
      })
  }
  useEffect(() => {
    fetchRoles()
    fetchPromoTypes()
  }, [])

  return (
    <>
      <CardHeader title={title} />
      <CardContent>
        <form onSubmit={onSubmit}>
          <Grid container spacing={4} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
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

            <Grid item xs={6}>
              <Controller
                name='code'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <>
                    <CustomTextField
                      fullWidth
                      value={value}
                      label={t('code')}
                      onChange={onChange}
                      required
                      error={Boolean(errors.code)}
                      aria-describedby='validation-basic-code'
                      {...(errors.code && { helperText: t('required') })}
                    />
                  </>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name={'first_order_only'}
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    select
                    fullWidth
                    defaultValue=''
                    {...field}
                    label={t('first order only')}
                    id='custom-select'
                  >
                    <MenuItem value={''}>{t('select_first_order_only')}</MenuItem>
                    <MenuItem value={1}>{t('yes')}</MenuItem>
                    <MenuItem value={0}>{t('no')}</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name='min_order_amount'
                control={control}
                rules={{ required: false }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    type='number'
                    fullWidth
                    value={value}
                    label={t('min order amount')}
                    onChange={onChange}
                    error={Boolean(errors.min_order_amount)}
                    aria-describedby='validation-basic-min_order_amount'
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name='max_applied_amount'
                control={control}
                rules={{ required: false }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    type='number'
                    fullWidth
                    value={value}
                    label={t('max applied amount')}
                    onChange={onChange}
                    aria-describedby='validation-basic-max_applied_amount'
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name='amount'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <>
                    <CustomTextField
                      type='number'
                      fullWidth
                      value={value}
                      label={t('amount')}
                      onChange={onChange}
                      required
                      error={Boolean(errors.amount)}
                      aria-describedby='validation-basic-amount'
                      {...(errors.amount && { helperText: t('required') })}
                    />
                  </>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='applied_users_type'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <Autocomplete
                    value={value}
                    onChange={(e, newValue) => {
                      setValue('applied_users_type', newValue)
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    options={roles}
                    renderInput={params => <CustomTextField {...params} label={t('applied_users_type')} />}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='promo_type'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <Autocomplete
                    value={value}
                    onChange={(e, newValue) => {
                      setValue('promo_type', newValue)
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    options={promoTypes}
                    renderInput={params => <CustomTextField {...params} label={t('promo_type')} />}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='usage_type'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <Autocomplete
                    value={value}
                    onChange={(e, newValue) => {
                      setValue('usage_type', newValue)
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    options={promoTypes}
                    renderInput={params => <CustomTextField {...params} label={t('usage_type')} />}
                  />
                )}
              />
            </Grid>

            <Grid item container spacing={4} sx={{ alignItems: 'center', justifyContent: 'space-between' }} xs={12}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name='start_date'
                  control={control}
                  render={({ field: { value } }) => (
                    <DatePicker
                      showTimeSelect
                      selected={value ? value : new Date()}
                      id='locale-time'
                      dateFormat='MM/dd/yyyy h:mm aa'
                      popperPlacement={popperPlacement} // Set the popperPlacement if needed
                      onChange={newValue => setValue('start_date', newValue)}
                      customInput={<PickersComponent label={'start date'} />}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name='end_date'
                  control={control}
                  render={({ field: { value } }) => (
                    <DatePicker
                      showTimeSelect
                      selected={value ? value : new Date()}
                      id='locale-time'
                      dateFormat='MM/dd/yyyy h:mm aa'
                      popperPlacement={popperPlacement}
                      onChange={newValue => setValue('end_date', newValue)}
                      customInput={<PickersComponent label={'end date'} />}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name={'active'}
                control={control}
                render={({ field }) => (
                  <CustomTextField select fullWidth defaultValue='' {...field} label={t('active')} id='custom-select'>
                    <MenuItem value={''}>{t('active')}</MenuItem>
                    <MenuItem value={1}>{t('yes')}</MenuItem>
                    <MenuItem value={0}>{t('no')}</MenuItem>
                  </CustomTextField>
                )}
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
                      label='description_ar'
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
                      label='description_en'
                      error={Boolean(errors.description_en)}
                      aria-describedby='validation-basic-description_en'
                      {...(errors.description_en && { helperText: 'This field is required' })}
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

export default SmsMethodsForm
