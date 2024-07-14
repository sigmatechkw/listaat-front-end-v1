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

const ProjectFieldsForm = ({type = 'create', errors, control, watch, setValue, onSubmit, title, loading}) => {
  const {t, i18n} = useTranslation()

  const [projectTabs, setProjectTabs] = useState([]);

  useEffect(() => {
    fetchProjectTabs();
  }, [])

  const fetchProjectTabs = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}project-tabs`, {
      headers: {
        Authorization: getCookie('token'),
        'Accepted-Language': getCookie('lang') ?? 'en'
      }
    })
    setProjectTabs(response.data.data.items)
  }
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
                rules={{ required: false }}
                render={({ field: { value, onChange } }) => (
                  <CustomAutocomplete
                    value={value}
                    onChange={(e, newValue) => {
                      if (newValue) {
                        setValue('project_tab_id', newValue)
                        onChange(newValue)
                      } else {
                        setValue('project_tab_id', null)
                      }
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                    options={projectTabs}
                    getOptionLabel={option => option.name || ''}
                    renderInput={params => <CustomTextField {...params}
                     label={t('project_tab')} />}
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
