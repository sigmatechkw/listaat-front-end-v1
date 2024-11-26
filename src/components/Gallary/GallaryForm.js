import React from 'react';
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
import Divider from "@mui/material/Divider";
import { useState } from 'react';
import { Box, Checkbox, FormControlLabel, styled } from '@mui/material'
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchUsersInfinityQuery } from '../Projects/projectsServices';
import { fetchThemeFoldersInfinityQuery } from '../ThemeFolders/ThemeFoldersServices';


const GallaryForm = ({type = 'create', errors, control, watch, setValue, onSubmit, title, loading , imgSrc , setImgSrc , gallaryImg , setGallaryImg}) => {
  const {t, i18n} = useTranslation()
  const [searchUsersTerm, setSearchUsersTerm] = useState('');
  const [searchThemeFoldersTerm, setSearchThemeFoldersTerm] = useState('');

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

  const usersOptions = users?.pages.flatMap((page) => page.items) || [];  

  const {
    data : themeFolders,
    fetchNextPage : fetchThemeFoldersNextPage,
    hasNextPage : themeFoldersHasNextPage,
    isFetching : themeFoldersIsFetching,
    isFetchingNextPage : themeFoldersIsFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['fetchThemeFoldersInfinityQuery', searchUsersTerm],
    queryFn: fetchThemeFoldersInfinityQuery,
     getNextPageParam: (lastPage, allPages) => {
      return lastPage.current_page < lastPage.last_page ? lastPage?.current_page + 1 : undefined;
    },
  });

  const loadMoreThemeFolders = () => {
    if (themeFoldersHasNextPage) {
      fetchThemeFoldersNextPage();
    }
  };

  const themeFoldersOptions = themeFolders?.pages.flatMap((page) => page.items) || [];  




  const handleInputImageChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => {
        setImgSrc(reader.result)
      }
      reader.readAsDataURL(files[0])
      if (reader.result !== null) {
        setGallaryImg(reader.result)
      }
    }
  }

  const handleInputImageReset = () => {
    setGallaryImg('')
    setImgSrc('')
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

  return (
    <>
      <CardHeader title={title} />
      <CardContent>
        <form onSubmit={onSubmit}>
          <Grid container spacing={4}>


            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'between', alignItems: 'end' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ImgStyled src={imgSrc} alt='Gallary Pic' />
                <div>
                  <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                    {t('upload_image')}
                    <input
                      hidden
                      type='file'
                      value={gallaryImg}
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
                name='theme_folder_id'
                control={control}
                rules={{ required: false }}
                render={({ field: { value, onChange } }) => (
                  <CustomAutocomplete
                    value={value}
                    loading={themeFoldersIsFetching || themeFoldersIsFetchingNextPage}
                    ListboxProps={{
                      onScroll: (event) => {
                        const listboxNode = event.currentTarget;
                        if (listboxNode.scrollTop + listboxNode.clientHeight >= listboxNode.scrollHeight) {
                          loadMoreThemeFolders();
                        }
                      },
                    }}
                    onInputChange={(e , val) => setSearchThemeFoldersTerm(val)}
                    onChange={(e, newValue) => {
                      if (newValue) {
                        setValue('theme_folder_id', newValue)
                        onChange(newValue)
                      } else {
                        setValue('theme_folder_id', null)
                      }
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                    options={themeFoldersOptions}
                    getOptionLabel={option => option.name || ''}
                    renderInput={params => <CustomTextField {...params}
                     label={t('theme_folders')} />}
                  />
                )}
              />
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

export default GallaryForm;
