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
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import DreamTypesNotesForm from "./DreamTypesNotesForm";
import {Box} from "@mui/system";
import {nanoid} from "nanoid";

const DreamTypesForm = ({type = 'create', errors, control, watch, setValue, onSubmit, title, loading}) => {
  const auth = useSelector(state => state.auth)
  const lang = useSelector(state => state.lang)
  const {t, i18n} = useTranslation()

  const handleAddNote = (notes) => {
    if (notes) {
      setValue('notes', [...notes, {id: nanoid(), text: {en: '', ar: ''}}])
    } else {
      setValue('notes', [{id: nanoid(), text: {en: '', ar: ''}}])
    }
  }

  const handleRemoveNote = (notes, id) => {
    setValue('notes', notes.filter(note => note.id !== id))
  }

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
                name='letters_limit'
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
                    label={t('letters_limit')}
                    onChange={onChange}
                    error={Boolean(errors.letters_limit)}
                    aria-describedby='validation-basic-letters_limit'
                    {...(errors.letters_limit && {helperText: t('number_validation')})}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='audio_limit'
                control={control}
                rules={
                  {
                    pattern: /^([0-9]+([.][0-9]*)?|[.][0-9]+)$/
                  }
                }
                render={({field: {value, onChange}}) => (
                  <CustomTextField
                    fullWidth
                    type='number'
                    steps={0.1}
                    value={value}
                    label={t('audio_limit')}
                    onChange={onChange}
                    error={Boolean(errors.audio_limit)}
                    aria-describedby='validation-basic-audio_limit'
                    {...(errors.audio_limit && {helperText: t('number_validation')})}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='special_flag'
                control={control}
                render={({field: {value, onChange}}) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label={t('special_flag')}
                    onChange={onChange}
                    required
                    error={Boolean(errors.special_flag)}
                    aria-describedby='validation-basic-special_flag'
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='waiting_for_approve_time'
                control={control}
                rules={
                  {
                    pattern: /^([0-9]+([.][0-9]*)?|[.][0-9]+)$/
                  }
                }
                render={({field: {value, onChange}}) => (
                  <CustomTextField
                    fullWidth
                    type='number'
                    value={value}
                    label={t('waiting_for_approve_time')}
                    onChange={onChange}
                    error={Boolean(errors.waiting_for_approve_time)}
                    aria-describedby='validation-basic-waiting_for_approve_time'
                    {...(errors.waiting_for_approve_time && {helperText: t('number_validation')})}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='waiting_for_response_time'
                control={control}
                rules={
                  {
                    pattern: /^([0-9]+([.][0-9]*)?|[.][0-9]+)$/,
                    min: 0
                  }
                }
                render={({field: {value, onChange}}) => (
                  <CustomTextField
                    fullWidth
                    type='number'
                    value={value}
                    label={t('waiting_for_response_time')}
                    onChange={onChange}
                    error={Boolean(errors.waiting_for_response_time)}
                    aria-describedby='validation-basic-waiting_for_response_time'
                    {...(errors.waiting_for_response_time && {helperText: t('number_validation')})}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sx={{pt: theme => `${theme.spacing(2)} !important`}}>
              <FormControl>
                <Controller
                  name='public'
                  control={control}
                  render={({field}) => (
                    <FormControlLabel
                      label={t('public')}
                      sx={errors.public ? {color: 'error.main'} : null}
                      control={
                        <Checkbox
                          {...field}
                          checked={field.value}
                          name='validation-basic-public'
                          sx={errors.public ? {color: 'error.main'} : null}
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
                  name='fast'
                  control={control}
                  render={({field}) => (
                    <FormControlLabel
                      label={t('fast')}
                      sx={errors.fast ? {color: 'error.main'} : null}
                      control={
                        <Checkbox
                          {...field}
                          checked={field.value}
                          name='validation-basic-fast'
                          sx={errors.fast ? {color: 'error.main'} : null}
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
            <Grid item xs={12} p={3}>
              <Controller
                name='notes'
                control={control}
                render={({field: {value, onChange}}) => (
                  <Box>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3}}>
                      <Typography variant={'h4'}>{t('notes')}</Typography>
                      <Button role='button' variant='contained' color='success' onClick={() => handleAddNote(value)}>{t('add')}</Button>
                    </Box>
                    {
                      value && value.length > 0 &&
                        value.map(note => (
                          <DreamTypesNotesForm
                            key={note.id}
                            note={note}
                            errors={errors}
                            notes={value}
                            setValue={setValue}
                            handleRemoveNote={() => handleRemoveNote(value, note.id)}
                          />
                        ))
                    }
                  </Box>
                )}
              />
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

export default DreamTypesForm;
