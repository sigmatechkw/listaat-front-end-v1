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
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'
import {useSelector} from "react-redux";
import Divider from "@mui/material/Divider";
import { useState , useEffect } from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next';

const ItemGroupProjectForm = ({type = 'create', errors, control, watch, setValue, onSubmit, title, loading}) => {
  const {t, i18n} = useTranslation()
  const [projects, setProjects] = useState([])
  const [itemGroups, setItemGroups] = useState([])

  useEffect(() => {
    fetchProjects()
    fetchItemGroups()
  }, [])

  const fetchProjects = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}projects`, {
      headers: {
        Authorization: getCookie('token'),
        'Accepted-Language': getCookie('lang') ?? 'en'
      }
    })
    setProjects(response.data.data.items)
  }

  const fetchItemGroups = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}item-groups`, {
      headers: {
        Authorization: getCookie('token'),
        'Accepted-Language': getCookie('lang') ?? 'en'
      }
    })
    setItemGroups(response.data.data.items)
  }

  return (
    <>
      <CardHeader title={title} />
      <CardContent>
        <form onSubmit={onSubmit}>
          <Grid container spacing={4}>
            
            <Grid item xs={12} sm={6}>
              <Controller
                name='item_group_id'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CustomAutocomplete
                    value={value}
                    onChange={(e, newValue) => {
                      if (newValue) {
                        setValue('item_group_id', newValue)
                        onChange(newValue)
                      } else {
                        setValue('item_group_id', null)
                      }
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                    options={itemGroups}
                    getOptionLabel={option => option.name || ''} 
                    renderInput={params => <CustomTextField {...params} 
                    error={Boolean(errors.price)}
                    aria-describedby='validation-basic-price'
                    {...(errors.price && {helperText: t('required')})}
                     label={t('item_groups')} />}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='project_id'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CustomAutocomplete
                    value={value}
                    onChange={(e, newValue) => {
                      if (newValue) {
                        setValue('project_id', newValue)
                        onChange(newValue)
                      } else {
                        setValue('project_id', null)
                      }
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                    options={projects}
                    getOptionLabel={option => option.name || ''} 
                    renderInput={params => <CustomTextField {...params} 
                    error={Boolean(errors.price)}
                    aria-describedby='validation-basic-price'
                    {...(errors.price && {helperText: t('required')})}
                     label={t('project')} />}
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

export default ItemGroupProjectForm;
