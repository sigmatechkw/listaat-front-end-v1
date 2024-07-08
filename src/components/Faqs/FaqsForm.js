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

const FaqsForm = ({errors, control, onSubmit, title}) => {
  const {t} = useTranslation()

  return (
    <>
      <CardHeader title={title}/>
      <CardContent>
        <form onSubmit={onSubmit}>

          <Grid container spacing={4}>
            <Grid item xs={12} sm={12}>
              <Controller
                name='question_en'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange}}) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label={t('question_en')}
                    onChange={onChange}
                    error={Boolean(errors.question_en)}
                    aria-describedby='validation-basic-question_en'
                    required
                    {...(errors.question_en && {helperText: t('required')})}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Controller
                name='question_ar'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange}}) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label={t('question_ar')}
                    onChange={onChange}
                    error={Boolean(errors.question_ar)}
                    aria-describedby='validation-basic-question_ar'
                    required
                    {...(errors.question_ar && {helperText: t('required')})}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Controller
                name='order'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange}}) => (
                  <CustomTextField
                    fullWidth
                    type='number'
                    value={value}
                    label={t('order')}
                    onChange={onChange}
                    error={Boolean(errors.order)}
                    aria-describedby='validation-basic-order'
                    required
                    {...(errors.order && {helperText: t('required')})}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name='answer_en'
                control={control}
                rules={{required: true}}
                render={({field}) => (
                  <CustomTextField
                    rows={4}
                    fullWidth
                    multiline
                    {...field}
                    label={t('answer_en')}
                    error={Boolean(errors.answer_en)}
                    aria-describedby='validation-basic-answer_en'
                    required
                    {...(errors.answer_en && {helperText: t('required')})}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name='answer_ar'
                control={control}
                rules={{required: true}}
                render={({field}) => (
                  <CustomTextField
                    rows={4}
                    fullWidth
                    multiline
                    {...field}
                    label={t('answer_ar')}
                    error={Boolean(errors.answer_ar)}
                    aria-describedby='validation-basic-answer_ar'
                    required
                    {...(errors.answer_ar && {helperText: t('required')})}
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
                          checked={Boolean(field.value)}
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
              <Button type='submit' variant='contained'>
                {t('save')}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </>
  );
};

export default FaqsForm;
