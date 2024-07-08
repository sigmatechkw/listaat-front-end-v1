import React, { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

import CustomTextField from 'src/@core/components/mui/text-field'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'

import { useTranslation } from 'react-i18next'
import CircularProgress from '@mui/material/CircularProgress'
import MenuItem from '@mui/material/MenuItem'
import { Autocomplete } from '@mui/material'
import 'react-datepicker/dist/react-datepicker.css' // Import the default styles for react-datepicker
import MultiAutocomplete from '../MultiAutoComplete/MultiAutocomplete'
import { Checkbox, FormControlLabel } from '@mui/material'
import DatePicker from 'react-datepicker'
import PickersComponent from 'src/views/forms/form-elements/pickers/PickersCustomInput'
import { useTheme } from '@mui/material/styles'

const PromosEditForm = ({
  type = 'edit',
  getValues,
  endDate,
  setEndDate,
  setStartDate,
  startDate,
  setUsers,
  active,
  setActive,
  fetchUsers,
  showUsersSelect,
  setShowUsersSelect,
  selectedUsers,
  setSelectedUsers,
  users,
  errors,
  control,
  watch,
  setValue,
  onSubmit,
  title,
  loading,
  promoTypes,
  promoUsageType,
  appliedUsersTypes
}) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const { direction } = theme
  const [percentage, setPercentage] = useState('')

  useEffect(() => {
    if (getValues('promo_type').id == 2) {
      setPercentage('(%)')
    }
  }, [getValues('promo_type').id])

  const popperPlacement = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

  const handleIsActive = (e, val) => {
    setActive(val)
  }

  const handleSelectedUsers = (e, v) => {
    // setSelectedUsers(v)

    setSelectedUsers(v)
    fetchUsers(
      false,
      v.map(i => i.id)
    )
  }

  const handleUsersSearch = val => {
    fetchUsers(val)
  }

  const handleKeyDown = e => {
    if (e.key === '-' || e.key === 'e' || e.key === 'E') {
      e.preventDefault()
    }
  }

  const handlePaste = e => {
    const pasteData = e.clipboardData.getData('Text')
    if (/[-eE]/.test(pasteData)) {
      e.preventDefault()
    }
  }

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
                    inputProps={{ min: 1 }}
                    onKeyDown={handleKeyDown}
                    onPaste={handlePaste}
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
                    onKeyDown={handleKeyDown}
                    onPaste={handlePaste}
                    value={value}
                    label={t('max applied amount')}
                    onChange={onChange}
                    inputProps={{ min: 2 }} // Set the minimum value to 2
                    aria-describedby='validation-basic-max_applied_amount'
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
                    value={value ? value : null} // Ensure value is controlled by setting it to null if it's undefined
                    onChange={(e, newValue) => setValue('usage_type', newValue)}
                    isOptionEqualToValue={(option, value) => option.id == value.id}
                    options={promoUsageType}
                    getOptionLabel={option => option.name} // Use the 'name' property as the option label
                    renderInput={params => <CustomTextField {...params} label={t('usage type')} />}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='applied_users_type'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <>
                    <Autocomplete
                      value={value ? value : null}
                      onChange={(e, newValue) => {
                        setValue('applied_users_type', newValue)

                        if (newValue.id == 2) {
                          fetchUsers()
                          setShowUsersSelect(true)
                        } else {
                          setUsers([])
                          setShowUsersSelect(false)
                        }
                      }}
                      isOptionEqualToValue={(option, value) => option.id == value.id}
                      options={appliedUsersTypes}
                      renderInput={params => <CustomTextField {...params} label={t('applied users type')} />}
                    />
                  </>
                )}
              />
            </Grid>

            {showUsersSelect && (users.length > 0 || selectedUsers.length > 0) && (
              <Grid item xs={12}>
                <MultiAutocomplete
                  value={selectedUsers}
                  handleUsersSearch={handleUsersSearch}
                  handleChange={handleSelectedUsers}
                  label={t('users')}
                  items={users ? users : []}
                  placeholder={'users'}
                  required
                />
              </Grid>
            )}

            <Grid item xs={12} sm={6}>
              <Controller
                name='promo_type'
                control={control}
                rules={{ required: true }}
                defaultValue='' // Set a default value for the Controller
                render={({ field: { value, onChange } }) => (
                  <Autocomplete
                    value={value ? value : null}
                    onChange={(e, newValue) => {
                      setValue('promo_type', newValue)

                      if (newValue.id == 2) {
                        setPercentage('(%)')
                      } else {
                        setPercentage('')
                      }
                    }}
                    isOptionEqualToValue={(option, value) => option.id == value.id}
                    options={promoTypes}
                    getOptionLabel={option => option.name} // Use the 'name' property as the option label
                    renderInput={params => <CustomTextField {...params} label={t('promo type')} />}
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
                      onKeyDown={handleKeyDown}
                      onPaste={handlePaste}
                      type='number'
                      fullWidth
                      inputProps={{ min: 0 }}
                      value={value}
                      label={`${t('amount')} ${percentage}`}
                      onChange={e => {
                        if (getValues('promo_type')?.id == 2 && e.target.value > 100) {
                          setValue('amount', '')
                        } else {
                          setValue('amount', e.target.value)
                        }

                        if (e.target.value > 100) {
                          setValue('amount', 100)
                        }
                      }}
                      required
                      error={Boolean(errors.amount)}
                      aria-describedby='validation-basic-amount'
                      {...(errors.amount && { helperText: t('required') })}
                    />
                  </>
                )}
              />
            </Grid>

            <Grid item container spacing={4} sx={{ alignItems: 'center', justifyContent: 'space-between' }} xs={12}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name='start_date'
                  control={control}
                  render={({ field: { value } }) => (
                    <>
                      <DatePicker
                        minDate={new Date()}
                        selected={startDate ? startDate : value ? value : new Date()}
                        showTimeSelect
                        id='locale-time'
                        dateFormat='MM/dd/yyyy h:mm aa'
                        popperPlacement={popperPlacement} // Set the popperPlacement if needed
                        onChange={newValue => setStartDate(newValue)}
                        customInput={<PickersComponent label={t('start date')} />}
                      />
                    </>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name='end_date'
                  control={control}
                  render={({ field: { value } }) => (
                    <>
                      <DatePicker
                        minDate={new Date().setDate(new Date().getDate() + 1)}
                        selected={endDate ? endDate : value ? value : new Date()}
                        showTimeSelect
                        id='locale-time'
                        dateFormat='MM/dd/yyyy h:mm aa'
                        popperPlacement={popperPlacement} // Set the popperPlacement if needed
                        onChange={newValue => setEndDate(newValue)}
                        customInput={<PickersComponent label={t('end date')} />}
                      />
                    </>
                  )}
                />
              </Grid>

              {/*               <Grid item xs={12} sm={6}>                  
                    
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
    onChange={(newValue) => setValue('end_date', newValue)}
    customInput={<PickersComponent  label={'end date'}  />}
/>
)}
/>
              </Grid> */}
            </Grid>

            {/*  <Grid item xs={12} sm={6}>
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
              <label>{t('active')} </label>
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

export default PromosEditForm
