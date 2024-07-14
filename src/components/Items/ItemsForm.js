import React, { useEffect, useState } from 'react'
import {Controller} from 'react-hook-form';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import CustomTextField from 'src/@core/components/mui/text-field';
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import {useTranslation} from "react-i18next";
import CircularProgress from "@mui/material/CircularProgress";
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'
import {useSelector} from "react-redux";
import Divider from "@mui/material/Divider";
import axios from 'axios'
import { getCookie } from 'cookies-next'
import { Box, Checkbox, FormControlLabel, styled } from '@mui/material'

const ItemsForm = ({type = 'create', errors, control, watch, imgSrc , setImgSrc , itemImg , setItemImg , setValue, onSubmit, title, loading}) => {
  const {t, i18n} = useTranslation()

  const [users, setUsers] = useState([])
  const [collections, setCollections] = useState([])
  const [countries, setCountries] = useState([])

  useEffect(() => {
    fetchCollections()
    fetchUsers()
    fetchCountries()
  }, [])

  const fetchCollections = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}collections`, {
      headers: {
        Authorization: getCookie('token'),
        'Accepted-Language': getCookie('lang') ?? 'en'
      }
    })
    setCollections(response.data.data.items)
  }

  const fetchCountries = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}countries`, {
      headers: {
        Authorization: getCookie('token'),
        'Accepted-Language': getCookie('lang') ?? 'en'
      }
    })
    setCollections(response.data.data.items)
  }

  const fetchUsers = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}users`, {
      headers: {
        Authorization: getCookie('token'),
        'Accepted-Language': getCookie('lang') ?? 'en'
      }
    })
    setUsers(response.data.data.items)
  }

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


  const handleInputImageChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => {
        setImgSrc(reader.result)
      }
      reader.readAsDataURL(files[0])
      if (reader.result !== null) {
        setItemImg(reader.result)
      }
    }
  }

  const handleInputImageReset = () => {
    setItemImg('')
    setImgSrc('/images/avatars/15.png')
  }


  return (
    <>
      <CardHeader title={title} />
      <CardContent>
        <form onSubmit={onSubmit}>
          <Grid container spacing={4}>


          <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'between', alignItems: 'end' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ImgStyled src={imgSrc} alt='Profile Pic' />
                <div>
                  <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                    {t('Upload New Photo')}
                    <input
                      hidden
                      type='file'
                      value={itemImg}
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


            <Grid item xs={12} sm={6}>
              <Controller
                name='name'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange}}) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label={t('name')}
                    onChange={onChange}
                    required
                    error={Boolean(errors.name)}
                    aria-describedby='validation-basic-name'
                    {...(errors.name && {helperText: t('required')})}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='cost'
                control={control}
                rules={{required: false}}
                render={({field: {value, onChange}}) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label={t('cost')}
                    onChange={onChange}
                    error={Boolean(errors.name)}
                    aria-describedby='validation-basic-cost'
                    {...(errors.cost && {helperText: t('required')})}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='extra_cost'
                control={control}
                rules={{required: false}}
                render={({field: {value, onChange}}) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label={t('extra_cost')}
                    onChange={onChange}
                    error={Boolean(errors.name)}
                    aria-describedby='validation-basic-extra_cost'
                    {...(errors.extra_cost && {helperText: t('required')})}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='width'
                control={control}
                rules={{required: false}}
                render={({field: {value, onChange}}) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label={t('width')}
                    onChange={onChange}
                    error={Boolean(errors.name)}
                    aria-describedby='validation-basic-width'
                    {...(errors.width && {helperText: t('required')})}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='height'
                control={control}
                rules={{required: false}}
                render={({field: {value, onChange}}) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label={t('height')}
                    onChange={onChange}
                    error={Boolean(errors.name)}
                    aria-describedby='validation-basic-height'
                    {...(errors.height && {helperText: t('required')})}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='length'
                control={control}
                rules={{required: false}}
                render={({field: {value, onChange}}) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label={t('length')}
                    onChange={onChange}
                    error={Boolean(errors.name)}
                    aria-describedby='validation-basic-length'
                    {...(errors.length && {helperText: t('required')})}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='notes'
                control={control}
                rules={{required: false}}
                render={({field: {value, onChange}}) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label={t('notes')}
                    onChange={onChange}
                    error={Boolean(errors.name)}
                    aria-describedby='validation-basic-notes'
                    {...(errors.notes && {helperText: t('required')})}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='source'
                control={control}
                rules={{required: false}}
                render={({field: {value, onChange}}) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label={t('source')}
                    onChange={onChange}
                    error={Boolean(errors.source)}
                    aria-describedby='validation-basic-source'
                    {...(errors.source && {helperText: t('required')})}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='user_id'
                control={control}
                rules={{ required: false }}
                render={({ field: { value, onChange } }) => (
                  <CustomAutocomplete
                    value={value}
                    onChange={(e, newValue) => {
                      if (newValue) {
                        setValue('user_id', newValue)
                        onChange(newValue)
                      } else {
                        setValue('user_id', null)
                      }
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                    options={users}
                    getOptionLabel={option => option.first_name || ''}
                    renderInput={params => <CustomTextField {...params} label={t('user')} />}
                  />
                )}
              />
            </Grid>

            {/* <Grid item xs={12} sm={6}>
              <Controller
                name='item_group_id'
                control={control}
                rules={{ required: false }}
                render={({ field: { value, onChange } }) => (
                  <CustomAutocomplete
                    value={value}
                    onChange={(e, newValue) => {
                      if (newValue) {
                        setValue('item_group_id', newValue)
                        onChange(newValue)
                      } else {
                        setValue('item_group_id', null)
                      }
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                    options={collections}
                    getOptionLabel={option => option.name || ''}
                    renderInput={params => <CustomTextField {...params} label={t('item_groups')} />}
                  />
                )}
              />
            </Grid> */}

            <Grid item xs={12} sm={6}>
              <Controller
                name='country_id'
                control={control}
                rules={{ required: false }}
                render={({ field: { value, onChange } }) => (
                  <CustomAutocomplete
                    value={value}
                    onChange={(e, newValue) => {
                      if (newValue) {
                        setValue('country_id', newValue)
                        onChange(newValue)
                      } else {
                        setValue('country_id', null)
                      }
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                    options={countries}
                    getOptionLabel={option => option.name || ''}
                    renderInput={params => <CustomTextField {...params} label={t('countries')} />}
                  />
                )}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Controller
                name='unit'
                control={control}
                rules={{ required: false }}
                render={({ field: { value, onChange } }) => (
                  <CustomAutocomplete
                    value={value}
                    onChange={(e, newValue) => {
                      if (newValue) {
                        setValue('unit', newValue)
                        onChange(newValue)
                      } else {
                        setValue('unit', null)
                      }
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                    options={[
                      {id : 1},
                      {id : 2},
                      {id : 3},
                      {id : 4},
                      {id : 5},
                      {id : 6},
                      {id : 7}
                    ]}
                    getOptionLabel={option => option.id || ''}
                    renderInput={params => <CustomTextField {...params} label={t('type')} />}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sx={{pt: theme => `${theme.spacing(2)} !important`}}>
              <FormControl>
                <Controller
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
              <Divider sx={{ my: theme => `${theme.spacing(2)} !important` }} />
            </Grid>

            <Grid item xs={12}>
              <Button type='submit' variant='contained' disabled={loading}>
                {
                  loading ?
                    <CircularProgress size={'1.5rem'} />
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

export default ItemsForm;
