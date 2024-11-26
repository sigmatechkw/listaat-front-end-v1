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
import axios from 'axios'
import { getCookie } from 'cookies-next'
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchUsersInfinityQuery } from '../Projects/projectsServices';
import { fetchCollectionsInfinityQuery, fetchCollectionsTypes } from './CollectionsServices';
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";

const CollectionsForm = ({type = 'create', errors, control, watch, setValue, onSubmit, title, loading}) => {
  const {t, i18n} = useTranslation()
  const [collectionTypes, setCollectionTypes] = useState([]);
  const [searchUsersTerm, setSearchUsersTerm] = useState('');
  const [searchCollectionsTerm, setSearchCollectionsTerm] = useState('');


  const {
    data : collections,
    fetchNextPage : fetchCollectionsNextPage,
    hasNextPage : collectionsHasNextPage,
    isFetching : collectionsIsFetching,
    isFetchingNextPage : collectionsIsFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['fetchCollectionsInfinityQuery', searchCollectionsTerm],
    queryFn: fetchCollectionsInfinityQuery,
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

  const loadMoreUsers = () => {
    if (usersHasNextPage) {
      fetchUsersNextPage();
    }
  };

  const loadMoreCollections = () => {
    if (collectionsHasNextPage) {
      fetchCollectionsNextPage();
    }
  };

  const usersOptions = users?.pages.flatMap((page) => page.items) || [];
  const collectionsOptions = collections?.pages.flatMap((page) => page.items) || [];

  const getCollectionTypes = async () => {
    const collectionTypes = await fetchCollectionsTypes();
    setCollectionTypes(collectionTypes);
  }

  useEffect(() => {
    getCollectionTypes();
  } , [])

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
                name='parent_id'
                control={control}
                rules={{ required: false }}
                render={({ field: { value, onChange } }) => (
                  <CustomAutocomplete
                    value={value}
                    loading={collectionsIsFetching || collectionsIsFetchingNextPage}
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={option.id}>
                          {option.name}
                        </li>
                      );
                    }}
                    ListboxProps={{
                      onScroll: (event) => {
                        const listboxNode = event.currentTarget;
                        if (listboxNode.scrollTop + listboxNode.clientHeight >= listboxNode.scrollHeight) {
                          loadMoreCollections();
                        }
                      },
                    }}
                    onInputChange={(e , val) => setSearchCollectionsTerm(val)}
                    onChange={(e, newValue) => {
                      if (newValue) {
                        setValue('parent_id', newValue)
                        onChange(newValue)
                      } else {
                        setValue('parent_id', null)
                      }
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                    options={collectionsOptions}
                    getOptionLabel={option => option.name || ''}
                    renderInput={params => <CustomTextField {...params}
                     label={t('parent_Collection')} />}
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
                    loading={!users && (usersIsFetching || usersIsFetchingNextPage)}
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
                    renderInput={params => <CustomTextField {...params} label={t('user')} />}
                    renderOption={(props, user) => (
                      <ListItem {...props} key={user.id}>
                        <ListItemAvatar>
                          <Avatar src={user.image} alt={user.full_name} sx={{ height: 28, width: 28 }} />
                        </ListItemAvatar>
                        <ListItemText primary={user.full_name} />
                      </ListItem>
                    )}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='type'
                control={control}
                rules={{ required: false }}
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
                    options={collectionTypes}
                    getOptionLabel={option => option.name || ''}
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

export default CollectionsForm;
