import React, { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import CustomTextField from 'src/@core/components/mui/text-field'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import { useTranslation } from 'react-i18next'
import CircularProgress from '@mui/material/CircularProgress'
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'
import { useSelector } from 'react-redux'
import Divider from '@mui/material/Divider'
import axios from 'axios'
import { getCookie } from 'cookies-next'

const ProjectsForm = ({ type = 'create', errors, control, watch, setValue, onSubmit, title, loading }) => {
  const { t, i18n } = useTranslation()

  const [projectTypes, setProjectTypes] = useState([])
  const [projects, setProjects] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetchProjectTypes()
    fetchProjects()
    fetchUsers()
  }, [])

  const fetchProjectTypes = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}project-types`, {
      headers: {
        Authorization: getCookie('token'),
        'Accepted-Language': getCookie('lang') ?? 'en'
      }
    })
    setProjectTypes(response.data.data.items)
  }
  
  const fetchProjects = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}projects`, {
      headers: {
        Authorization: getCookie('token'),
        'Accepted-Language': getCookie('lang') ?? 'en'
      }
    })
    setProjects(response.data.data.items)
  }

  const fetchUsers = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}users`, {
      headers: {
        Authorization: getCookie('token'),
        'Accepted-Language': getCookie('lang') ?? 'en'
      }
    })
    setUsers(response.data.data.items)
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
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label={t('name')}
                    onChange={onChange}
                    required
                    error={Boolean(errors.name)}
                    aria-describedby='validation-basic-name'
                    {...(errors.name && { helperText: t('required') })}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='budget'
                control={control}
                rules={{ required: false }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label={t('budget')}
                    onChange={onChange}
                    error={Boolean(errors.budget)}
                    aria-describedby='validation-basic-budget'
                    {...(errors.budget && { helperText: t('required') })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='total_cost'
                control={control}
                rules={{ required: false }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label={t('total_cost')}
                    onChange={onChange}
                    error={Boolean(errors.total_cost)}
                    aria-describedby='validation-basic-total_cost'
                    {...(errors.total_cost && { helperText: t('required') })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='area'
                control={control}
                rules={{ required: false }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label={t('area')}
                    onChange={onChange}
                    error={Boolean(errors.area)}
                    aria-describedby='validation-basic-area'
                    {...(errors.area && { helperText: t('required') })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='length'
                control={control}
                rules={{ required: false }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label={t('length')}
                    onChange={onChange}
                    error={Boolean(errors.length)}
                    aria-describedby='validation-basic-length'
                    {...(errors.length && { helperText: t('required') })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='width'
                control={control}
                rules={{ required: false }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label={t('width')}
                    onChange={onChange}
                    error={Boolean(errors.width)}
                    aria-describedby='validation-basic-width'
                    {...(errors.width && { helperText: t('required') })}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='height'
                control={control}
                rules={{ required: false }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label={t('height')}
                    onChange={onChange}
                    error={Boolean(errors.height)}
                    aria-describedby='validation-basic-height'
                    {...(errors.height && { helperText: t('required') })}
                  />
                )}
              />
            </Grid>
                  <Grid item xs={12} sm={6}>
                  <Controller
                    name='project_type_id'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomAutocomplete
                        value={value}
                        onChange={(e, newValue) => {
                          if (newValue) {
                            setValue('project_type_id', newValue)
                          } else {
                            setValue('project_type_id', null)
                          }
                        }}
                        isOptionEqualToValue={(option, value) => option.id === value?.id}
                        options={projectTypes}
                        getOptionLabel={option => option.name || ''} // Render the full name of the user
                        renderInput={params => <CustomTextField {...params} label={t('project_type')} />}
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
                    onChange={(e, newValue) => {
                      if (newValue) {
                        setValue('parent_id', newValue)
                        onChange(newValue)
                      } else {
                        setValue('parent_id', null)
                      }
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                    options={projects}
                    getOptionLabel={option => option.name} // Render the full name of project
                    renderInput={params => <CustomTextField {...params} label={t('parent_project')} />}
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
                    onChange={(e, newValue) => {
                      if (newValue) {
                        setValue('user_id', newValue)
                        onChange(newValue)
                      } else {
                        setValue('user_id', null)
                      }
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                    options={users}
                    getOptionLabel={option => option.first_name} // Render the full name of project
                    renderInput={params => <CustomTextField {...params} label={t('user')} />}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(2)} !important` }}>
              <FormControl>
                <Controller
                  name='active'
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      label={t('active')}
                      sx={errors.active ? { color: 'error.main' } : null}
                      control={
                        <Checkbox
                          {...field}
                          checked={field.value}
                          name='validation-basic-active'
                          sx={errors.active ? { color: 'error.main' } : null}
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
                {loading ? <CircularProgress size={'1.5rem'} /> : t('save')}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </>
  )
}

export default ProjectsForm
