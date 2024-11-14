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
import {useSelector} from "react-redux";
import Divider from "@mui/material/Divider";
import { Box, Checkbox, FormControlLabel, styled } from '@mui/material'
import { useState , useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchProjectTypesInfinityQuery } from './projectTypesServices';
import CustomAutocomplete from 'src/@core/components/mui/autocomplete';

const ProjectTypesForm = ({type = 'create', errors, control, watch, setValue, onSubmit, title, loading , imgSrc , setImgSrc , projectTypeImg , setProjectTypeImg , parentId , setParentId}) => {
  const {t, i18n} = useTranslation()
  const [searchTypesTerm, setSearchTypesTerm] = useState('');


  const handleInputImageChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => {
        setImgSrc(reader.result)
      }
      reader.readAsDataURL(files[0])
      if (reader.result !== null) {
        setProjectTypeImg(reader.result)
      }
    }
  }

  const handleInputImageReset = () => {
    setProjectTypeImg('')
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

  const loadMoreTypes = () => {
    if (typesHasNextPage) {
      fetchTypesNextPage();
    }
  };

  const typesOptions = types?.pages.flatMap((page) => page.items) || [];


  return (
    <>
      <CardHeader title={title} />
      <CardContent>
        <form onSubmit={onSubmit}>
          <Grid container spacing={4}>

          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'between', alignItems: 'end' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='ProjectType Pic' />
              <div>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  {t('upload_image')}
                  <input
                    hidden
                    type='file'
                    value={projectTypeImg}
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
                name='name_en'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange}}) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label={t('name_en')}
                    onChange={onChange}
                    required
                    error={Boolean(errors.name_en)}
                    aria-describedby='validation-basic-name_en'
                    {...(errors.name_en && {helperText: t('required')})}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='name_ar'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange}}) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label={t('name_ar')}
                    onChange={onChange}
                    required
                    error={Boolean(errors.name_ar)}
                    aria-describedby='validation-basic-name_ar'
                    {...(errors.name_ar && {helperText: t('required')})}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='filter_name_en'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange}}) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label={t('filter_name_en')}
                    onChange={onChange}
                    required
                    error={Boolean(errors.filter_name_en)}
                    aria-describedby='validation-basic-filter_name_en'
                    {...(errors.filter_name_en && {helperText: t('required')})}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='filter_name_ar'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange}}) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label={t('filter_name_ar')}
                    onChange={onChange}
                    required
                    error={Boolean(errors.filter_name_ar)}
                    aria-describedby='validation-basic-filter_name_ar'
                    {...(errors.filter_name_ar && {helperText: t('required')})}
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
                    loading={typesIsFetching || typesIsFetchingNextPage}
                    ListboxProps={{
                      onScroll: (event) => {
                        const listboxNode = event.currentTarget;
                        if (listboxNode.scrollTop + listboxNode.clientHeight >= listboxNode.scrollHeight) {
                          loadMoreTypes();
                        }
                      },
                    }}
                    onInputChange={(e , val) => setSearchTypesTerm(val)}
                    onChange={(e, newValue) => {
                      if (newValue) {
                        setValue('parent_id', newValue)
                        onChange(newValue)
                      } else {
                        setValue('parent_id', null)
                      }
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                    options={typesOptions}
                    getOptionLabel={option => option.name || ''}
                    renderInput={params => <CustomTextField {...params}
                     label={t('parent_project_type')} />}
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

              <Grid item xs={6}>
                <Controller
                  name='description_en'
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <CustomTextField
                      rows={4}
                      fullWidth
                      multiline
                      required
                      {...field}
                      label={t('description_en')}
                      error={Boolean(errors.description_en)}
                      aria-describedby='validation-basic-description_en'
                      {...(errors.description_en)}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <Controller
                  name='description_ar'
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <CustomTextField
                      rows={4}
                      fullWidth
                      multiline
                      required
                      {...field}
                      label={t('description_ar')}
                      error={Boolean(errors.description_ar)}
                      aria-describedby='validation-basic-description_ar'
                      {...(errors.description_ar)}
                    />
                  )}
                />
              </Grid>

            <Grid item xs={6}>
              <Controller
                name='hint_en'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    rows={4}
                    fullWidth
                    multiline
                    {...field}
                    label={t('hint_en')}
                    error={Boolean(errors.hint_en)}
                    aria-describedby='validation-basic-hint_en'
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name='hint_ar'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    rows={4}
                    fullWidth
                    multiline
                    {...field}
                    label={t('hint_ar')}
                    error={Boolean(errors.hint_ar)}
                    aria-describedby='validation-basic-hint_ar'
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name='next_en'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    rows={4}
                    fullWidth
                    multiline
                    {...field}
                    label={t('next_en')}
                    error={Boolean(errors.next_en)}
                    aria-describedby='validation-basic-next_en'
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name='next_ar'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    rows={4}
                    fullWidth
                    multiline
                    {...field}
                    label={t('next_ar')}
                    error={Boolean(errors.next_ar)}
                    aria-describedby='validation-basic-next_ar'
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name='alt_en'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    rows={4}
                    fullWidth
                    multiline
                    {...field}
                    label={t('alt_en')}
                    error={Boolean(errors.alt_en)}
                    aria-describedby='validation-basic-alt_en'
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name='alt_ar'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    rows={4}
                    fullWidth
                    multiline
                    {...field}
                    label={t('alt_ar')}
                    error={Boolean(errors.alt_ar)}
                    aria-describedby='validation-basic-alt_ar'
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sx={{pt: theme => `${theme.spacing(2)} !important`}}>
              <FormControl>
                <Controller
                  name='should_has_sub_tabs'
                  control={control}
                  render={({field}) => (
                    <FormControlLabel
                      label={t('should_has_sub_tabs')}
                      sx={errors.should_has_sub_tabs ? {color: 'error.main'} : null}
                      control={
                        <Checkbox
                          {...field}
                          checked={field.value}
                          name='validation-basic-should_has_sub_tabs'
                          sx={errors.should_has_sub_tabs ? {color: 'error.main'} : null}
                          onChange={(e, newValue) => {
                            if (newValue) {
                              setValue('has_child', false)
                              field.onChange(newValue)
                            }
                          }}
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
                  name='has_child'
                  control={control}
                  render={({field}) => (
                    <FormControlLabel
                      label={t('has_child')}
                      sx={errors.has_child ? {color: 'error.main'} : null}
                      control={
                        <Checkbox
                          {...field}
                          checked={field.value}
                          name='validation-basic-has_child'
                          sx={errors.has_child ? {color: 'error.main'} : null}
                          onChange={(e, newValue) => {
                            if (newValue) {
                              setValue('should_has_sub_tabs', false)
                              field.onChange(newValue)
                            }
                          }}
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
                  name='is_creation_allowed_directly'
                  control={control}
                  render={({field}) => (
                    <FormControlLabel
                      label={t('is_creation_allowed_directly')}
                      sx={errors.is_creation_allowed_directly ? {color: 'error.main'} : null}
                      control={
                        <Checkbox
                          {...field}
                          checked={field.value}
                          name='validation-basic-is_creation_allowed_directly'
                          sx={errors.is_creation_allowed_directly ? {color: 'error.main'} : null}
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

export default ProjectTypesForm;
