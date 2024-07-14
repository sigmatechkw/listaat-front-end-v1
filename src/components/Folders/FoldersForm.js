import React from 'react';
import {Controller} from 'react-hook-form';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import CustomTextField from 'src/@core/components/mui/text-field';
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import {useTranslation} from "react-i18next";
import CircularProgress from "@mui/material/CircularProgress";
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'
import {useSelector} from "react-redux";
import Divider from "@mui/material/Divider";
import { useState , useEffect } from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next';

const FoldersForm = ({type = 'create', errors, control, watch, setValue, onSubmit, title, loading}) => {
  const {t, i18n} = useTranslation()
  const [users, setUsers] = useState([])
  const [folders, setFolders] = useState([])

  useEffect(() => {
    fetchUsers()
    fetchFolders()
  }, [])

  const fetchUsers = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}users`, {
      headers: {
        Authorization: getCookie('token'),
        'Accepted-Language': getCookie('lang') ?? 'en'
      }
    })
    setUsers(response.data.data.items)
  }

  const fetchFolders = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}folders`, {
      headers: {
        Authorization: getCookie('token'),
        'Accepted-Language': getCookie('lang') ?? 'en'
      }
    })
    setFolders(response.data.data.items)
  }

  return (
    <>
      <CardHeader title={title} />
      <CardContent>
        <form onSubmit={onSubmit}>
          <Grid container spacing={4}>
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
                name='user_id'
                control={control}
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
                    renderInput={params => <CustomTextField {...params} 
                    required
                    error={Boolean(errors.user_id)}
                    aria-describedby='validation-basic-user_id'
                    {...(errors.user_id && {helperText: t('required')})}
                     label={t('user')} />}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='parent_id'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CustomAutocomplete
                    value={value}
                    onChange={(e, newValue) => {
                      if (newValue) {
                        setValue('parent_id', newValue)
                        onChange(newValue)
                      } else {
                        setValue('parent_id', null)
                      }
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                    options={folders}
                    getOptionLabel={option => option.name || ''} 
                    renderInput={params => <CustomTextField {...params} 
                    error={Boolean(errors.parent_id)}
                    aria-describedby='validation-basic-parent_id'
                    {...(errors.parent_id && {helperText: t('required')})}
                     label={t('folders')} />}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='type'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CustomAutocomplete
                    value={value}
                    onChange={(e, newValue) => {
                      if (newValue) {
                        setValue('type', newValue)
                        onChange(newValue)
                      } else {
                        setValue('type', null)
                      }
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                    options={[
                      {id: 10 , name: "Normal"}
                    ]}
                    getOptionLabel={option => option.name || ''} 
                    renderInput={params => <CustomTextField {...params} 
                    error={Boolean(errors.type)}
                    aria-describedby='validation-basic-type'
                    {...(errors.type && {helperText: t('required')})}
                     label={t('type')} />}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='sort'
                control={control}
                rules={{required: false}}
                render={({field: {value, onChange}}) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label={t('sort')}
                    onChange={onChange}
                    error={Boolean(errors.sort)}
                    aria-describedby='validation-basic-sort'
                    {...(errors.sort && {helperText: t('required')})}
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

export default FoldersForm;
