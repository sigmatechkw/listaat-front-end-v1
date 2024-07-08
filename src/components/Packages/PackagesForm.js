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
import {useSelector} from "react-redux";

const PackagesForm = ({type = 'create', errors, control, watch, setValue, onSubmit, title, loading}) => {
  const {t, i18n} = useTranslation()

  return (
    <>
      <CardHeader title={title} />
      <CardContent>
        <form onSubmit={onSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Controller
                name='name_en'
                control={control}
                render={({field: {value, onChange}}) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label={t('name_en')}
                    onChange={onChange}
                    error={Boolean(errors.name_en)}
                    aria-describedby='validation-basic-name_en'
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='name_ar'
                control={control}
                render={({field: {value, onChange}}) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label={t('name_ar')}
                    onChange={onChange}
                    error={Boolean(errors.name_ar)}
                    aria-describedby='validation-basic-name_ar'
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
                    error={Boolean(errors.description_ar)}
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

            <Grid item xs={12} sm={6}>
              <Controller
                name='price'
                control={control}
                rules={
                  {
                    required: true,
                    pattern: /^([0-9]+([.][0-9]*)?|[.][0-9]+)$/
                  }
                }
                render={({field: {value, onChange}}) => (
                  <CustomTextField
                    fullWidth
                    type='number'
                    steps={0.1}
                    value={value}
                    label={t('price')}
                    onChange={onChange}
                    required
                    error={Boolean(errors.price)}
                    aria-describedby='validation-basic-price'
                    {...(errors.price && {helperText: t('required')})}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='balance'
                control={control}
                rules={
                  {
                    required: true,
                    pattern: /^([0-9]+([.][0-9]*)?|[.][0-9]+)$/
                  }
                }
                render={({field: {value, onChange}}) => (
                  <CustomTextField
                    fullWidth
                    type='number'
                    steps={0.1}
                    value={value}
                    label={t('balance')}
                    onChange={onChange}
                    required
                    error={Boolean(errors.balance)}
                    aria-describedby='validation-basic-balance'
                    {...(errors.balance && {helperText: t('required')})}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='order'
                control={control}
                rules={
                  {
                    pattern: /^\d+$/
                  }
                }
                render={({field: {value, onChange}}) => (
                  <CustomTextField
                    fullWidth
                    type='number'
                    steps={1}
                    value={value}
                    label={t('order')}
                    onChange={onChange}
                    error={Boolean(errors.order)}
                    aria-describedby='validation-basic-order'
                    {...(errors.order && {helperText: t('number_validation')})}
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
                          checked={!!field.value}
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

export default PackagesForm;
