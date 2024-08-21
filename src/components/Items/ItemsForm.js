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
import { Autocomplete, TextField, Chip } from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchCollectionsInfinityQuery } from '../Collections/CollectionsServices';
import { fetchUsersInfinityQuery } from '../Projects/projectsServices';
import { fetchItemGroupsInfinityQuery } from '../ItemGroups/ItemGroupsServices';
import { fetchCountriesInfinityQuery } from '../countries/countriesServices';

const ItemsForm = ({type = 'create', errors, control, watch, imgSrc , setImgSrc , itemImg , setItemImg ,receiptImg , setReceiptImg, receiptSrc ,setReceiptSrc , setValue, onSubmit, title, loading}) => {
  const {t, i18n} = useTranslation()

  const [searchUsersTerm, setSearchUsersTerm] = useState('');
  const [searchCollectionsTerm, setSearchCollectionsTerm] = useState('');
  const [searchItemGroupsTerm, setSearchItemGroupsTerm] = useState('');
  const [searchCountriesTerm, setSearchCountriesTerm] = useState('');


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

  const {
    data : itemGroups,
    fetchNextPage : fetchItemGroupsNextPage,
    hasNextPage : itemGroupsHasNextPage,
    isFetching : itemGroupsIsFetching,
    isFetchingNextPage : itemGroupsIsFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['fetchItemGroupsInfinityQuery', searchItemGroupsTerm],
    queryFn: fetchItemGroupsInfinityQuery,
     getNextPageParam: (lastPage, allPages) => {
      return lastPage.current_page < lastPage.last_page ? lastPage?.current_page + 1 : undefined;
    },
  });

  const {
    data : countries,
    fetchNextPage : fetchCountriesNextPage,
    hasNextPage : countriesHasNextPage,
    isFetching : countriesIsFetching,
    isFetchingNextPage : countriesIsFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['fetchCountriesInfinityQuery', searchCountriesTerm],
    queryFn: fetchCountriesInfinityQuery,
     getNextPageParam: (lastPage, allPages) => {
      return lastPage.current_page < lastPage.last_page ? lastPage?.current_page + 1 : undefined;
    },
  });

  
  const loadMoreItemGroups = () => {
    if (itemGroupsHasNextPage) {
      fetchItemGroupsNextPage();
    }
  };

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

  const loadMoreCountries = () => {
    if (countriesHasNextPage) {
      fetchCountriesNextPage();
    }
  };

  const usersOptions = users?.pages.flatMap((page) => page.items) || [];  
  const collectionsOptions = collections?.pages.flatMap((page) => page.items) || [];  
  const itemGroupsOptions = itemGroups?.pages.flatMap((page) => page.items) || [];  
  const countriesOptions = countries?.pages.flatMap((page) => page.items) || [];  
  

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

  const handleInputReceiptImageChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => {
        setReceiptSrc(reader.result)
      }
      reader.readAsDataURL(files[0])
      if (reader.result !== null) {
        setReceiptImg(reader.result)
      }
    }
  }

  const handleInputImageReset = () => {
    setItemImg('')
    setImgSrc('')
  }

  const handleInputReceiptImageReset = () => {
    setReceiptSrc('')
  }

  return (
    <>
      <CardHeader title={title} />
      <CardContent>
        <form onSubmit={onSubmit}>
          <Grid container spacing={4}>


        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'between', alignItems: 'end' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Item Pic' />
              <div>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  {t('upload_image')}
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

          <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'between', alignItems: 'end' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ImgStyled src={receiptSrc} alt='Receipt Pic' />
                <div>
                  <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-receipt'>
                    {t('upload_receipt')}
                    <input
                      hidden
                      type='file'
                      value={receiptImg}
                      accept='image/*'
                      onChange={handleInputReceiptImageChange}
                      id='account-settings-upload-receipt'
                    />
                  </ButtonStyled>
                  <ResetButtonStyled color='secondary' variant='tonal' onClick={handleInputReceiptImageReset}>
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
                rules={{required: true}}
                render={({field: {value, onChange}}) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label={t('cost')}
                    onChange={onChange}
                    required
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
                name='source_name'
                control={control}
                rules={{required: false}}
                render={({field: {value, onChange}}) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label={t('source_name')}
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
                name='source_address'
                control={control}
                rules={{required: false}}
                render={({field: {value, onChange}}) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label={t('source_address')}
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
                name='source_website'
                control={control}
                rules={{required: false}}
                render={({field: {value, onChange}}) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label={t('source_website')}
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
                name='collections_ids'
                control={control}
                rules={{ required: false }}
                render={({ field: { value, onChange } }) => (
                   <Autocomplete
                    multiple
                    name='collections_ids'
                    options={collectionsOptions}
                    getOptionLabel={(option) => option.name}
                    onInputChange={(e , val) => setSearchCollectionsTerm(val)}
                    loading={collectionsIsFetching || collectionsIsFetchingNextPage}
                    ListboxProps={{
                      onScroll: (event) => {
                        const listboxNode = event.currentTarget;
                        if (listboxNode.scrollTop + listboxNode.clientHeight >= listboxNode.scrollHeight) {
                          loadMoreCollections();
                        }
                      },
                    }}
                    value={value}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        setValue('collections_ids', newValue)
                        onChange(newValue)
                      } else {
                        setValue('collections_ids', null)
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
                      label={t('collections')}
                      placeholder="Options"
                    />
                    )}
                  /> 
                  )}
              />
            </Grid>
          
            <Grid item xs={12} sm={6}>
              <Controller
                name='item_group_id'
                control={control}
                rules={{ required: false }}
                render={({ field: { value, onChange } }) => (
                  <CustomAutocomplete
                    value={value}
                    loading={itemGroupsIsFetching || itemGroupsIsFetchingNextPage}
                    ListboxProps={{
                      onScroll: (event) => {
                        const listboxNode = event.currentTarget;
                        if (listboxNode.scrollTop + listboxNode.clientHeight >= listboxNode.scrollHeight) {
                          loadMoreItemGroups();
                        }
                      },
                    }}
                    onInputChange={(e , val) => setSearchItemGroupsTerm(val)}
                    onChange={(e, newValue) => {
                      if (newValue) {
                        setValue('item_group_id', newValue)
                        onChange(newValue)
                      } else {
                        setValue('item_group_id', null)
                      }
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                    options={itemGroupsOptions}
                    getOptionLabel={option => option.name || ''}
                    renderInput={params => <CustomTextField {...params}
                     label={t('item_groups')} />}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='country_id'
                control={control}
                rules={{ required: false }}
                render={({ field: { value, onChange } }) => (
                  <CustomAutocomplete
                    value={value}
                    loading={countriesIsFetching || countriesIsFetchingNextPage}
                    ListboxProps={{
                      onScroll: (event) => {
                        const listboxNode = event.currentTarget;
                        if (listboxNode.scrollTop + listboxNode.clientHeight >= listboxNode.scrollHeight) {
                          loadMoreCountries();
                        }
                      },
                    }}
                    onInputChange={(e , val) => setSearchCountriesTerm(val)}
                    onChange={(e, newValue) => {
                      if (newValue) {
                        setValue('country_id', newValue)
                        onChange(newValue)
                      } else {
                        setValue('country_id', null)
                      }
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                    options={countriesOptions}
                    getOptionLabel={option => option.name || ''}
                    renderInput={params => <CustomTextField {...params}
                     label={t('countries')} />}
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
                      {id : 1 , name : 'MILLIMETER'},
                      {id : 2 , name : 'CM'},
                      {id : 3 , name : 'M'},
                      {id : 4 , name : 'KM'},
                      {id : 5 , name : "INCH"},
                      {id : 6 , name : "FEET"},
                      {id : 7 , name : "YARD"},
                      {id : 8 , name : "MILE"}
                    ]}
                    getOptionLabel={option => option.name || ''}
                    renderInput={params => <CustomTextField {...params} label={t('unit')} />}
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

export default ItemsForm;
