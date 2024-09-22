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
import {useSelector} from "react-redux";
import Divider from "@mui/material/Divider";
import { useState , useEffect } from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchUsersInfinityQuery } from '../Projects/projectsServices';
import { Box, Checkbox, FormControlLabel, styled } from '@mui/material'


const ProjectTabTypesForm = ({type = 'create', errors, control, watch, setValue, onSubmit, title, loading, imgSrc, setImgSrc , projectTabTypeImg , setProjectTabTypeImg}) => {
  const {t, i18n} = useTranslation()

  const handleInputImageChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => {
        setImgSrc(reader.result)
      }
      reader.readAsDataURL(files[0])
      if (reader.result !== null) {
        setProjectTabTypeImg(reader.result)
      }
    }
  }

  const handleInputImageReset = () => {
    setProjectTabTypeImg('')
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
              <ImgStyled src={imgSrc} alt='Project Tab Type Pic' />
              <div>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  {t('upload_image')}
                  <input
                    hidden
                    type='file'
                    value={projectTabTypeImg}
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
                    error={Boolean(errors.name)}
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
                    label={t('name_en')}
                    onChange={onChange}
                    required
                    error={Boolean(errors.name)}
                    aria-describedby='validation-basic-name_en'
                    {...(errors.name_en && {helperText: t('required')})}
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name='description_en'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    rows={4}
                    fullWidth
                    multiline
                    {...field}
                    label={t('description_en')}
                    error={Boolean(errors.description_en)}
                    aria-describedby='validation-basic-description_en'
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name='description_ar'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    rows={4}
                    fullWidth
                    multiline
                    {...field}
                    label={t('description_ar')}
                    error={Boolean(errors.description_ar)}
                    aria-describedby='validation-basic-description_ar'
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

export default ProjectTabTypesForm;
