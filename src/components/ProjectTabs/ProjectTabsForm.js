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
import { Autocomplete, TextField, Chip } from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchProjectTypesInfinityQuery } from '../ProjectTypes/projectTypesServices';
import { fetchProjectsInfinityQuery } from '../Projects/projectsServices';
import { fetchUsersInfinityQuery } from '../Projects/projectsServices';
import { fetchProjectTabsInfintyQuery } from './projectTabsServices';
import { fetchProjectTabsTypesAll } from '../ProjectTabTypes/ProjectTabTypesServices';

const ProjecTabsForm = ({type = 'create', errors, control, watch, setValue, onSubmit, title, loading}) => {
  const {t, i18n} = useTranslation()
  const [searchTypesTerm, setSearchTypesTerm] = useState('');
  const [searchProjectsTerm, setSearchProjectsTerm] = useState('');
  const [searchUsersTerm, setSearchUsersTerm] = useState('');
  const [searchTabsTerm, setSearchTabsTerm] = useState('');
  const [projectTabTypes, setProjectTabTypes] = useState('');

  const {
    data : types,
    fetchNextPage : fetchTypesNextPage,
    hasNextPage : typesHasNextPage,
    isFetching : typesIsFetching,
    isFetchingNextPage : typesIsFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['fetchProjectTypesInfinityQuery', searchTypesTerm],
    queryFn: fetchProjectTypesInfinityQuery,
     getNextPageParam: (lastPage, allPages) => {
      return lastPage.current_page < lastPage.last_page ? lastPage?.current_page + 1 : undefined;
    },
  });

  const {
    data : projects,
    fetchNextPage : fetchProjectsNextPage,
    hasNextPage : projectsHasNextPage,
    isFetching : projectsIsFetching,
    isFetchingNextPage : projectsIsFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['fetchProjectsInfinityQuery', searchProjectsTerm],
    queryFn: fetchProjectsInfinityQuery,
     getNextPageParam: (lastPage, allPages) => {
      return lastPage.current_page < lastPage.last_page ? lastPage?.current_page + 1 : undefined;
    },
  });

  const {
    data : users,
    fetchNextPage : fetchUsersNextPage,
    hasNextPage : usersHasNextPage,
    isFetching : usersIsFetching,
    isFetchingNextPage : usersIsFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['fetchUsersInfinityQuery', searchUsersTerm],
    queryFn: fetchUsersInfinityQuery,
     getNextPageParam: (lastPage, allPages) => {
      return lastPage.current_page < lastPage.last_page ? lastPage?.current_page + 1 : undefined;
    },
  });

  const {
    data : tabs,
    fetchNextPage : fetchTabsNextPage,
    hasNextPage : tabsHasNextPage,
    isFetching : tabsIsFetching,
    isFetchingNextPage : tabsIsFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['fetchProjectTabsInfintyQuery', searchTabsTerm],
    queryFn: fetchProjectTabsInfintyQuery,
     getNextPageParam: (lastPage, allPages) => {
      return lastPage.current_page < lastPage.last_page ? lastPage?.current_page + 1 : undefined;
    },
  });

  const loadMoreTabs = () => {
    if (tabsHasNextPage) {
      fetchTabsNextPage();
    }
  };


  const loadMoreTypes = () => {
    if (typesHasNextPage) {
      fetchTypesNextPage();
    }
  };

  const loadMoreProjects = () => {
    if (projectsHasNextPage) {
      fetchProjectsNextPage();
    }
  };

  const loadMoreUsers = () => {
    if (usersHasNextPage) {
      fetchUsersNextPage();
    }
  };

  const getProjectTabTypes = async () => { 
    const data = await fetchProjectTabsTypesAll();
    setProjectTabTypes(data.items);
  }

  useEffect(() => { 
    getProjectTabTypes();
  }, [])

  const tabsOptions = tabs?.pages.flatMap((page) => page.items) || [];
  const typesOptions = types?.pages.flatMap((page) => page.items) || [];
  const projectsOptions = projects?.pages.flatMap((page) => page.items) || [];  
  const usersOptions = users?.pages.flatMap((page) => page.items) || [];  


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
                    loading={usersIsFetching || usersIsFetchingNextPage}
                    ListboxProps={{
                      onScroll: (event) => {
                        const listboxNode = event.currentTarget;
                        if (listboxNode.scrollTop + listboxNode.clientHeight >= listboxNode.scrollHeight) {
                          loadMoreUsers();
                        }
                      },
                    }}
                    onInputChange={(e , val) => setSearchUsersTerm(val)}
                    onChange={(e, newValue) => {
                      if (newValue) {
                        setValue('user_id', newValue)
                        onChange(newValue)
                      } else {
                        setValue('user_id', null)
                      }
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                    options={usersOptions}
                    getOptionLabel={option => option.first_name || ''}
                    renderInput={params => <CustomTextField {...params}
                     label={t('user')} />}
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
                    loading={tabsIsFetching || tabsIsFetchingNextPage}
                    ListboxProps={{
                      onScroll: (event) => {
                        const listboxNode = event.currentTarget;
                        if (listboxNode.scrollTop + listboxNode.clientHeight >= listboxNode.scrollHeight) {
                          loadMoreTabs();
                        }
                      },
                    }}
                    onInputChange={(e , val) => setSearchTabsTerm(val)}
                    onChange={(e, newValue) => {
                      if (newValue) {
                        setValue('parent_id', newValue)
                        onChange(newValue)
                      } else {
                        setValue('parent_id', null)
                      }
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                    options={tabsOptions}
                    getOptionLabel={option => option.name || ''}
                    renderInput={params => <CustomTextField {...params}
                     label={t('tab_parent')} />}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
                <Controller
                  name='type'
                  control={control}
                  rules={{ required: true }}
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
                      required
                      isOptionEqualToValue={(option, value) => option.id === value?.id}
                      options={projectTabTypes}
                      getOptionLabel={option => option.name || ''}
                      renderInput={params => <CustomTextField {...params}
                      label={t('type')} />}
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
                   <Autocomplete
                    multiple
                    name='project_type_id'
                    options={typesOptions}
                    getOptionLabel={(option) => option.name}
                    onInputChange={(e , val) => setSearchTypesTerm(val)}
                    loading={typesIsFetching || typesIsFetchingNextPage}
                    ListboxProps={{
                      onScroll: (event) => {
                        const listboxNode = event.currentTarget;
                        if (listboxNode.scrollTop + listboxNode.clientHeight >= listboxNode.scrollHeight) {
                          loadMoreTypes();
                        }
                      },
                    }}
                    value={value}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        setValue('project_type_id', newValue)
                        onChange(newValue)
                      } else {
                        setValue('project_type_id', null)
                      }
                    }}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          key={index}
                          variant="outlined"
                          label={option.name}
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <CustomTextField
                      {...params}
                      variant="outlined"
                      label={t('project_type_id')}
                      placeholder="Options"
                    />
                    )}
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
                    loading={projectsIsFetching || projectsIsFetchingNextPage}
                    ListboxProps={{
                      onScroll: (event) => {
                        const listboxNode = event.currentTarget;
                        if (listboxNode.scrollTop + listboxNode.clientHeight >= listboxNode.scrollHeight) {
                          loadMoreProjects();
                        }
                      },
                    }}
                    onInputChange={(e , val) => setSearchProjectsTerm(val)}
                    onChange={(e, newValue) => {
                      if (newValue) {
                        setValue('project_id', newValue)
                        onChange(newValue)
                      } else {
                        setValue('project_id', null)
                      }
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                    options={projectsOptions}
                    getOptionLabel={option => option.name || ''}
                    renderInput={params => <CustomTextField {...params}
                     label={t('projects')} />}
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
