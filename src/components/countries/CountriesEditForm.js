import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

import CustomTextField from 'src/@core/components/mui/text-field'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'

import { useTranslation } from 'react-i18next'
import CircularProgress from '@mui/material/CircularProgress'
import MenuItem from '@mui/material/MenuItem'
import 'react-datepicker/dist/react-datepicker.css' // Import the default styles for react-datepicker
import { Box } from '@mui/system'
import { styled } from '@mui/material/styles'
import { Checkbox, FormControlLabel } from '@mui/material'

const CountriesEditForm = ({
  type = 'edit',
  active,
  setActive,
  errors,
  control,
  onSubmit,
  title,
  loading,
  setImgSrc
}) => {
  const { t } = useTranslation()
  const [inputValue, setInputValue] = useState('')

  const handleIsActive = (e, val) => {
    setActive(val)
  }

  return (
    <>
      <CardHeader title={title} />
      <CardContent>
        <form onSubmit={onSubmit}>
          <Grid container spacing={4} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'between', gap: 4, alignItems: 'center' }}>
              <label>{t('active')}</label>
              <FormControlLabel
                label={t('yes')}
                control={
                  <Checkbox
                    checked={active == 1}
                    onChange={(e, v) => {
                      handleIsActive(e, 1)
                    }}
                    name='yes'
                  />
                }
              />
              <FormControlLabel
                label={t('no')}
                control={
                  <Checkbox
                    checked={active == 0}
                    onChange={(e, v) => {
                      handleIsActive(e, 0)
                    }}
                    name='No'
                  />
                }
              />
            </Grid>
            <Grid item xs={1} sx={{ alignSelf: 'flex-end' }}>
              <Button type='submit' variant='contained' disabled={loading}>
                {loading ? <CircularProgress size={'0.5rem'} /> : t('save')}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </>
  )
}

export default CountriesEditForm
