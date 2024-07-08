import React, {useRef} from 'react';
import {Controller} from 'react-hook-form';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import CustomTextField from 'src/@core/components/mui/text-field';
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import MenuItem from '@mui/material/MenuItem'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Icon from 'src/@core/components/icon'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {useTranslation} from "react-i18next";
import CustomAvatar from "../../@core/components/mui/avatar";
import {getInitials} from "../../@core/utils/get-initials";
import createBase64Image from "../../helpers/createBase64Image";
import Autocomplete from "@mui/material/Autocomplete";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import CircularProgress from "@mui/material/CircularProgress";
import {useSelector} from "react-redux";

const UsersForm = ({type = 'create', errors, control, watch, setValue, onSubmit, title, loading}) => {
  const auth = useSelector(state => state.auth)
  const lang = useSelector(state => state.lang)
  const {t, i18n} = useTranslation()
  const [countries, setCountries] = useState([])
  const [roles, setRoles] = useState([])
  const imageRef = useRef(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const image = watch('image')
  const name = watch('first_name') + ' ' + watch('last_name')
  const role = watch('role_id')
  const expertCommissionType = watch('expert_commission_type')

  const fetchCountries = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_KEY}countries`, {
        headers: {
          'Accepted-Language': lang ?? 'en'
        }
      })
      .then(res => {
        setCountries(res.data.data.items.map(country => {
          return {
            id: country.id,
            label: country.name
          }
        }))
      })
  }

  const fetchRoles = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_KEY}roles`, {
        headers: {
          'Authorization': auth.token,
          'Accepted-Language': lang ?? 'en'
        }
      })
      .then(res => {
        setRoles(res.data.data.items.map(role => {
          return {
            id: role.id,
            label: role.name
          }
        }))
      })
  }

  const handleUploadImage = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      createBase64Image(file, setImageValues)
    }
  }

  const setImageValues = (value) => {
    setValue('image', value)
  }

  useEffect(() => {
    fetchCountries()
    fetchRoles()
  }, [])

  return (
    <>
      <CardHeader title={title}/>
      <CardContent>
        <form onSubmit={onSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} sx={{display: 'flex', justifyContent: 'between', alignItems: 'end'}}>
              <Controller
                name='image'
                control={control}
                render={({field: {value, onChange}}) => (
                  <>
                    <input
                      ref={imageRef}
                      onChange={handleUploadImage}
                      type='file'
                      className={'d-none'}
                    />
                    {image ? (
                      <CustomAvatar
                        src={image}
                        variant='rounded'
                        className={'cursor-pointer'}
                        alt={name}
                        sx={{width: 100, height: 100}}
                        onClick={() => imageRef.current.click()}
                      />
                    ) : (
                      <CustomAvatar
                        skin='light'
                        variant='rounded'
                        color={'primary'}
                        className={'cursor-pointer'}
                        sx={{width: 100, height: 100, fontSize: '3rem'}}
                        onClick={() => imageRef.current.click()}
                      >
                        {getInitials(name)}
                      </CustomAvatar>
                    )}
                  </>
                )}
              />
              {
                image &&
                <Button color={'error'} size={'small'} variant={'contained'} onClick={() => setImageValues('')}
                        sx={{mx: 1}}>{t('remove')}</Button>
              }
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='first_name'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange}}) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label={t('first_name')}
                    onChange={onChange}
                    required
                    error={Boolean(errors.first_name)}
                    aria-describedby='validation-basic-first_name'
                    {...(errors.first_name && {helperText: t('required')})}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='last_name'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange}}) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label={t('last_name')}
                    onChange={onChange}
                    required
                    error={Boolean(errors.last_name)}
                    aria-describedby='validation-basic-last_name'
                    {...(errors.last_name && {helperText: t('required')})}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='email'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange}}) => (
                  <CustomTextField
                    fullWidth
                    type='email'
                    value={value}
                    label={t('email')}
                    onChange={onChange}
                    required
                    error={Boolean(errors.order)}
                    aria-describedby='validation-basic-email'
                    {...(errors.email && {helperText: t('required')})}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='phone'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange}}) => (
                  <CustomTextField
                    fullWidth
                    type='number'
                    value={value}
                    label={t('phone')}
                    onChange={onChange}
                    required
                    error={Boolean(errors.phone)}
                    aria-describedby='validation-basic-phone'
                    {...(errors.phone && {helperText: t('required')})}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='password'
                control={control}
                rules={{required: type === 'create'}}
                render={({field: {value, onChange}}) => (
                  <CustomTextField
                    label={t('password')}
                    fullWidth
                    value={value}
                    id='icons-adornment-password'
                    onChange={onChange}
                    required={type === 'create'}
                    error={Boolean(errors.password)}
                    aria-describedby='validation-basic-password'
                    {...(errors.phone && {helperText: t('required')})}
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={() => setShowPassword(prev => !prev)}
                            onMouseDown={e => e.preventDefault()}
                            aria-label='toggle password visibility'
                          >
                            <Icon fontSize='1.25rem' icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'}/>
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='password_confirmation'
                control={control}
                rules={{required: type === 'create'}}
                render={({field: {value, onChange}}) => (
                  <CustomTextField
                    label={t('password_confirmation')}
                    fullWidth
                    value={value}
                    id='icons-adornment-password_confirmation'
                    onChange={onChange}
                    required={type === 'create'}
                    error={Boolean(errors.password_confirmation)}
                    aria-describedby='validation-basic-password_confirmation'
                    {...(errors.phone && {helperText: t('required')})}
                    type={showConfirmPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={() => setShowConfirmPassword(prev => !prev)}
                            onMouseDown={e => e.preventDefault()}
                            aria-label='toggle password visibility'
                          >
                            <Icon fontSize='1.25rem' icon={showConfirmPassword ? 'tabler:eye' : 'tabler:eye-off'}/>
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='country_id'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange}}) => (
                  <Autocomplete
                    value={value}
                    onChange={(e, newValue) => {
                      setValue('country_id', newValue)
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    options={countries}
                    renderInput={(params) => <CustomTextField {...params} label={t('country')} required/>}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='role_id'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange}}) => (
                  <Autocomplete
                    value={value}
                    onChange={(e, newValue) => {
                      setValue('role_id', newValue)
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    options={roles}
                    renderInput={(params) => <CustomTextField {...params} label={t('role')} required/>}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name={'gender'}
                control={control}
                render={({field}) => (
                  <CustomTextField select fullWidth defaultValue='' {...field} label={t('gender')} id='custom-select'>
                    <MenuItem value=''>{t('none')}</MenuItem>
                    <MenuItem value={1}>{t('male')}</MenuItem>
                    <MenuItem value={2}>{t('female')}</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name={'lang'}
                control={control}
                render={({field}) => (
                  <CustomTextField select fullWidth defaultValue='' {...field} label={t('preferred_language')}
                                   id='custom-select'>
                    <MenuItem value=''>{t('none')}</MenuItem>
                    <MenuItem value='en'>{t('english')}</MenuItem>
                    <MenuItem value='ar'>{t('arabic')}</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>

            {
              role?.id === 3 ?
                <>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name='expert_commission_value'
                      control={control}
                      rules={
                        {
                          pattern: /^([0-9]+([.][0-9]*)?|[.][0-9]+)$/,
                          min: 0,
                          max: expertCommissionType === 'percentage' ? 100 : null
                        }
                      }
                      render={({field: {value, onChange}}) => (
                        <CustomTextField
                          fullWidth
                          type='number'
                          value={value}
                          label={t('expert_commission_value')}
                          onChange={onChange}
                          error={Boolean(errors.expert_commission_value)}
                          aria-describedby='validation-basic-expert_commission_value'
                          {...(errors.expert_commission_value && {helperText: t('expert_commission_value_validation')})}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name={'expert_commission_type'}
                      control={control}
                      render={({field}) => (
                        <CustomTextField select fullWidth defaultValue='' {...field} label={t('expert_commission_type')}
                                         id='custom-select'>
                          <MenuItem value='fixed'>{t('fixed')}</MenuItem>
                          <MenuItem value='percentage'>{t('percentage')}</MenuItem>
                        </CustomTextField>
                      )}
                    />
                  </Grid>
                </>
                :
                <></>
            }

            <Grid item xs={12} sm={6}>
              <Controller
                name={'birthday'}
                control={control}
                render={({field: {value}}) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      format={'YYYY-MM-DD'}
                      disableFuture
                      label={t('birthday')}
                      value={value}
                      onChange={(newValue) => setValue('birthday', newValue)}
                      className={'w-100'}
                      slotProps={{
                        textField: {
                          error: false,
                        },
                      }}
                    />
                  </LocalizationProvider>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Controller
                name='bio'
                control={control}
                render={({field: {value, onChange}}) => (
                  <CustomTextField
                    fullWidth
                    multiline
                    rows={3}
                    value={value}
                    label={t('bio')}
                    onChange={onChange}
                    aria-describedby='validation-basic-bio'
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sx={{pt: theme => `${theme.spacing(2)} !important`}}>
              <FormControl>
                <Controller
                  name='is_phone_verified'
                  control={control}
                  render={({field}) => (
                    <FormControlLabel
                      label={t('phone_verified')}
                      sx={errors.is_phone_verified ? {color: 'error.main'} : null}
                      control={
                        <Checkbox
                          {...field}
                          checked={field.value}
                          name='validation-basic-is_phone_verified'
                          sx={errors.is_phone_verified ? {color: 'error.main'} : null}
                        />
                      }
                    />
                  )}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sx={{pt: theme => `${theme.spacing(2)} !important`}}>
              <FormControl>
                <Controller
                  name='is_mail_verified'
                  control={control}
                  render={({field}) => (
                    <FormControlLabel
                      label={t('email_verified')}
                      sx={errors.is_mail_verified ? {color: 'error.main'} : null}
                      control={
                        <Checkbox
                          {...field}
                          checked={field.value}
                          name='validation-basic-is_mail_verified'
                          sx={errors.is_mail_verified ? {color: 'error.main'} : null}
                        />
                      }
                    />
                  )}
                />
              </FormControl>
            </Grid>

            {
              role?.id === 3 ?
                <>
                  <Grid item xs={12} sm={6} sx={{pt: theme => `${theme.spacing(2)} !important`}}>
                    <FormControl>
                      <Controller
                        name='is_busy'
                        control={control}
                        render={({field}) => (
                          <FormControlLabel
                            label={t('busy')}
                            sx={errors.is_busy ? {color: 'error.main'} : null}
                            control={
                              <Checkbox
                                {...field}
                                checked={field.value}
                                name='validation-basic-is_busy'
                                sx={errors.is_busy ? {color: 'error.main'} : null}
                              />
                            }
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                </>
                :
                <></>
            }

            <Grid item xs={12} sx={{pt: theme => `${theme.spacing(2)} !important`}}>
              <FormControl>
                <Controller
                  label='notification_enabled'
                  name='notification_enabled'
                  control={control}
                  render={({field}) => (
                    <FormControlLabel
                      label={t('enable_notification')}
                      sx={errors.notification_enabled ? {color: 'error.main'} : null}
                      control={
                        <Checkbox
                          {...field}
                          checked={field.value}
                          name='validation-basic-notification_enabled'
                          sx={errors.notification_enabled ? {color: 'error.main'} : null}
                        />
                      }
                    />
                  )}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sx={{pt: theme => `${theme.spacing(2)} !important`}}>
              <FormControl>
                <Controller
                  label='active'
                  name='active'
                  control={control}
                  render={({field}) => (
                    <FormControlLabel
                      label={t('active')}
                      sx={errors.active ? {color: 'error.main'} : null}
                      control={
                        <Checkbox
                          {...field}
                          checked={field.value}
                          name='validation-basic-active'
                          sx={errors.active ? {color: 'error.main'} : null}
                        />
                      }
                    />
                  )}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button type='submit' variant='contained' disabled={loading}>
                {
                  loading ?
                    <CircularProgress size={'0.5rem'}/>
                    :
                    t('save')
                }
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </>
  );
};

export default UsersForm;
