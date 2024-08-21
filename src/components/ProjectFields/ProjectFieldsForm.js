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
import { useInfiniteQuery } from '@tanstack/react-query';
import Divider from "@mui/material/Divider";
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { fetchProjectTabsInfintyQuery } from '../ProjectTabs/projectTabsServices';
import { fetchProjectsInfinityQuery } from '../Projects/projectsServices';
import {styled } from '@mui/material';
import IconifyIcon from 'src/@core/components/icon';
import Box from '@mui/material/Box'



const ProjectFieldsForm = ({type = 'create', errors, control, watch, setValue, onSubmit, title, loading, filesArr , setFilesArr , fieldFiles, setFieldFiles}) => {
  const {t, i18n} = useTranslation()
  const [searchTerm, setSearchTerm] = useState('');
  const [searchProjectsTerm, setSearchProjectsTerm] = useState('');

  const {
    data : tabs,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['fetchProjectTabsInfintyQuery', searchTerm],
    queryFn: fetchProjectTabsInfintyQuery,
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

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const loadMoreProjects = () => {
    if (projectsHasNextPage) {
      fetchProjectsNextPage();
    }
  };

  const tabsOptions = tabs?.pages.flatMap((page) => page.items) || [];
  const projectsOptions = projects?.pages.flatMap((page) => page.items) || [];  

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

  const handleInputImagesChange = (event) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      const promises = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        
        const promise = new Promise((resolve) => {
          reader.onload = () => {
            resolve(reader.result);
          };
          reader.readAsDataURL(file);
        });
        
        promises.push(promise);
      }
      
      Promise.all(promises).then((images) => {
        setFilesArr(images);
        setFieldFiles(images);
      });
    }
  }

  const handleInputImagesReset = () => {
    setFilesArr([]);
    setFieldFiles([]);
  }

  
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'wbmp'];

  const isImage = (fileUrl) => {
    if (!fileUrl) return false;
    const extension = fileUrl.split('.').pop().toLowerCase();

    return imageExtensions.includes(extension);
  };


  return (
    <>
      <CardHeader title={title} />
      <CardContent>
        <form onSubmit={onSubmit}>
          <Grid container spacing={4}>

          <Grid item md={12} sx={{ display: 'flex', justifyContent: 'between', alignItems: 'end' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                
                  {filesArr.map((file, index) => {

                      const isNotImage = !isImage(file.url);

                      return (

                      <div key={index}>
                        {isNotImage ? (
                          <ButtonStyled href={file.url} target="_blank" rel="noopener noreferrer">
                            <IconifyIcon icon="carbon:view-filled"></IconifyIcon>
                          </ButtonStyled>
                        ) : (
                          !file.url ?
                          <ImgStyled src={file} key={index} alt={t('upload_files')} /> :
                          <ImgStyled src={file.url} key={index} alt={t('upload_files')} />
                        )}
                      </div>
                      
                    );
                  })}
                  
                  
                  <div>
                    <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-files'>
                      {t('upload_files')}
                      <input
                        hidden
                        type='file'
                        onChange={handleInputImagesChange}
                        multiple
                        id='account-settings-upload-files'
                      />
                    </ButtonStyled>
                    <ResetButtonStyled color='secondary' variant='tonal' onClick={handleInputImagesReset}>
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
                name='value'
                control={control}
                rules={{required: false}}
                render={({field: {value, onChange}}) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label={t('value')}
                    onChange={onChange}
                    error={Boolean(errors.filter_name)}
                    aria-describedby='validation-basic-value'
                    {...(errors.value && {helperText: t('required')})}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='project_tab_id'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomAutocomplete
                    value={value}
                    loading={isFetching || isFetchingNextPage}
                    ListboxProps={{
                      onScroll: (event) => {
                        const listboxNode = event.currentTarget;
                        if (listboxNode.scrollTop + listboxNode.clientHeight >= listboxNode.scrollHeight) {
                          loadMore();
                        }
                      },
                    }}
                    onInputChange={(e , val) => setSearchTerm(val)}
                    onChange={(e, newValue) => {
                      if (newValue) {
                        setValue('project_tab_id', newValue)
                        onChange(newValue)
                      } else {
                        setValue('project_tab_id', null)
                      }
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                    options={tabsOptions}
                    getOptionLabel={option => option.name || ''}
                    renderInput={params => <CustomTextField required {...params}
                     label={t('project_tab')} />}
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
                  name='is_cost_calculated'
                  control={control}
                  render={({field}) => (
                    <FormControlLabel
                      label={t('is_cost_calculated')}
                      sx={errors.should_has_sub_tabs ? {color: 'error.main'} : null}
                      control={
                        <Checkbox
                          {...field}
                          checked={field.value}
                          name='validation-basic-is_cost_calculated'
                          sx={errors.is_cost_calculated ? {color: 'error.main'} : null}
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

export default ProjectFieldsForm;
