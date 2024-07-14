import React, { useEffect, useState } from 'react'
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
import axios from 'axios';
import { getCookie } from 'cookies-next';

const ProjecTabsForm = ({type = 'create', errors, control, watch, setValue, onSubmit, title, loading}) => {
  const {t, i18n} = useTranslation()

  const [projects, setProjects] = useState([]);
  const [projectTypes, setProjectTypes] = useState([]);
  const [projectTabs, setProjectTabs] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchProjects();
    fetchProjectTypes();
    fetchUsers();
    fetchProjectTabs();
  }, [])

  const fetchProjectTypes = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}project-types`, {
      headers: {
        Authorization: getCookie('token'),
        'Accepted-Language': getCookie('lang') ?? 'en'
      }
    })
    setProjectTypes(response.data.data.items)
  }

  const fetchProjects = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}projects`, {
      headers: {
        Authorization: getCookie('token'),
        'Accepted-Language': getCookie('lang') ?? 'en'
      }
    })
    setProjects(response.data.data.items)
  }

  const fetchProjectTabs = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}project-tabs`, {
      headers: {
        Authorization: getCookie('token'),
        'Accepted-Language': getCookie('lang') ?? 'en'
      }
    })
    setProjectTabs(response.data.data.items)
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
                    renderInput={params => <CustomTextField
                    error={Boolean(errors.user_id)}
                    aria-describedby='validation-basic-user_id'
                    {...(errors.user_id && {helperText: t('required')})}
                     {...params} label={t('user')} />}
                    
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='parent_id'
                control={control}
                rules={{ required: false }}
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
                    options={projectTabs}
                    getOptionLabel={option => option.name}
                    renderInput={params => <CustomTextField {...params}
                     label={t('tab_parent')} />}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='project_type_id'
                control={control}
                rules={{ required: false }}
                render={({ field: { value, onChange } }) => (
                  <CustomAutocomplete
                    value={value}
                    onChange={(e, newValue) => {
                      if (newValue) {
                        setValue('project_type_id', newValue)
                        onChange(newValue)
                      } else {
                        setValue('project_type_id', null)
                      }
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                    options={projectTypes}
                    getOptionLabel={option => option.name || ''}
                    renderInput={params => <CustomTextField {...params} 
                    error={Boolean(errors.project_type_id)}
                    aria-describedby='validation-basic-project_type_id'
                    {...(errors.project_type_id && {helperText: t('required')})}
                     label={t('project_type')}  /> 
                    }
                    
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='project_id'
                control={control}
                rules={{ required: false }}
                render={({ field: { value, onChange } }) => (
                  <CustomAutocomplete
                    value={value}
                    onChange={(e, newValue) => {
                      if (newValue) {
                        setValue('project_id', newValue)
                        onChange(newValue)
                      } else {
                        setValue('project_id', null)
                      }
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                    options={projects}
                    getOptionLabel={option => option.name || ''}
                    renderInput={params => <CustomTextField {...params} 
                    error={Boolean(errors.project_id)}
                    aria-describedby='validation-basic-project_id'
                    {...(errors.project_id && {helperText: t('required')})}
                     label={t('projects')}  /> 
                    }
                    
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sx={{pt: theme => `${theme.spacing(2)} !important`}}>
              <FormControl>
                <Controller
                  name='is_default'
                  control={control}
                  render={({field}) => (
                    <FormControlLabel
                      label={t('is_default')}
                      sx={errors.is_default ? {color: 'error.main'} : null}
                      control={
                        <Checkbox
                          {...field}
                          checked={field.value}
                          name='validation-basic-is_default'
                          sx={errors.is_default ? {color: 'error.main'} : null}
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
                  name='is_dimensional_info'
                  control={control}
                  render={({field}) => (
                    <FormControlLabel
                      label={t('is_dimensional_info')}
                      sx={errors.is_dimensional_info ? {color: 'error.main'} : null}
                      control={
                        <Checkbox
                          {...field}
                          checked={field.value}
                          name='validation-basic-is_dimensional_info'
                          sx={errors.is_dimensional_info ? {color: 'error.main'} : null}
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
                  name='is_text_info'
                  control={control}
                  render={({field}) => (
                    <FormControlLabel
                      label={t('is_text_info')}
                      sx={errors.is_text_info ? {color: 'error.main'} : null}
                      control={
                        <Checkbox
                          {...field}
                          checked={field.value}
                          name='validation-basic-is_text_info'
                          sx={errors.is_text_info ? {color: 'error.main'} : null}
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
                  name='is_numerical'
                  control={control}
                  render={({field}) => (
                    <FormControlLabel
                      label={t('is_numerical')}
                      sx={errors.is_numerical ? {color: 'error.main'} : null}
                      control={
                        <Checkbox
                          {...field}
                          checked={field.value}
                          name='validation-basic-is_numerical'
                          sx={errors.is_numerical ? {color: 'error.main'} : null}
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
                  name='is_details'
                  control={control}
                  render={({field}) => (
                    <FormControlLabel
                      label={t('is_details')}
                      sx={errors.is_details ? {color: 'error.main'} : null}
                      control={
                        <Checkbox
                          {...field}
                          checked={field.value}
                          name='validation-basic-is_details'
                          sx={errors.is_details ? {color: 'error.main'} : null}
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
                  name='is_breakdown'
                  control={control}
                  render={({field}) => (
                    <FormControlLabel
                      label={t('is_breakdown')}
                      sx={errors.is_breakdown ? {color: 'error.main'} : null}
                      control={
                        <Checkbox
                          {...field}
                          checked={field.value}
                          name='validation-basic-is_breakdown'
                          sx={errors.is_breakdown ? {color: 'error.main'} : null}
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

export default ProjecTabsForm;
