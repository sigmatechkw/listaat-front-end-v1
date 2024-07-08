import React from 'react'
import { Controller } from 'react-hook-form'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CustomTextField from 'src/@core/components/mui/text-field'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'

import { useTranslation } from 'react-i18next'
import 'react-datepicker/dist/react-datepicker.css' // Import the default styles for react-datepicker
import {
  TableHead,
  Box,
  Tooltip,
  FormControlLabel,
  CircularProgress,
  Checkbox,
  TableCell,
  TableBody,
  TableRow,
  Table,
  MenuItem
} from '@mui/material'
import Icon from 'src/@core/components/icon'

const messages = {
  required: 'This field is required',
  minLength: 'Minimum length is 3 characters'
}

const RolesEditForm = ({
  type = 'edit',
  guardName,
  getValues,
  errors,
  control,
  onSubmit,
  title,
  loading,
  permissions,
  permissionsIds,
  setPermissionsIds
}) => {
  const { t } = useTranslation()

  const destruct = () => {
    const mergedArray = Object.values(permissions).flatMap(array => array)

    setPermissionsIds(mergedArray)
  }

  const handleSelectPermission = (e, id) => {
    if (e.target.checked) {
      setPermissionsIds([
        ...permissionsIds,
        {
          id,
          value: e.target.checked
        }
      ])
    } else {
      setPermissionsIds(permissionsIds.filter(item => item.id != id))
    }
  }

  const handleSelectAllCheckbox = e => {
    if (e.target.checked) {
      destruct()
    } else {
      setPermissionsIds([])
    }
  }

  return (
    <>
      <CardHeader title={title} />
      <CardContent>
        <form onSubmit={onSubmit}>
          <Grid container spacing={4} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Grid item xs={6}>
              <Controller
                name='name'
                control={control}
                rules={{ required: true, minLength: 3 }}
                render={({ field: { value, onChange } }) => (
                  <>
                    <CustomTextField
                      fullWidth
                      value={value}
                      label={t('name')}
                      onChange={onChange}
                      required
                      error={Boolean(errors.name)}
                      helperText={errors.name ? messages[errors.name.type] : ''}
                    />
                  </>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name={'active'}
                control={control}
                render={({ field }) => (
                  <CustomTextField select fullWidth defaultValue='' {...field} label={t('active')} id='custom-select'>
                    <MenuItem value={''}>{t('Select Active')}</MenuItem>
                    <MenuItem value={1}>{t('yes')}</MenuItem>
                    <MenuItem value={0}>{t('no')}</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name={t('Guard Name')}
                control={control}
                render={({ field }) => (
                  <>
                    <CustomTextField select fullWidth {...field} label={t('Guard Name')} id='custom-select'>
                      <MenuItem value={'web'} selected={true}>
                        {t('web')}
                      </MenuItem>
                      <MenuItem value={'api'}>{t('api')}</MenuItem>
                    </CustomTextField>
                  </>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ pl: '0 !important' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          whiteSpace: 'nowrap',
                          alignItems: 'center',
                          textTransform: 'capitalize',
                          '& svg': { ml: 1, cursor: 'pointer' },
                          color: theme => theme.palette.text.secondary,
                          fontSize: theme => theme.typography.h6.fontSize
                        }}
                      >
                        {t('Administrator Access')}
                        <Tooltip placement='top' title='Allows a full access to the system'>
                          <Box sx={{ display: 'flex' }}>
                            <Icon icon='tabler:info-circle' fontSize='1.25rem' />
                          </Box>
                        </Tooltip>
                      </Box>
                    </TableCell>
                    <TableCell colSpan={4}>
                      <FormControlLabel
                        onChange={e => handleSelectAllCheckbox(e)}
                        label={t('Select All')}
                        sx={{ '& .MuiTypography-root': { textTransform: 'capitalize', color: 'text.secondary' } }}
                        control={<Checkbox size='small' />}
                      />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.keys(permissions).map((key, index) => (
                    <TableRow key={index}>
                      <TableCell>{key.replace('_', ' ')}</TableCell>
                      {permissions[key].map(item => (
                        <TableCell
                          key={item.id}
                          colSpan={
                            item.name == 'edit_login_provider' ||
                            item.name == 'edit_payment_method' ||
                            item.name == 'edit_sms_method' ||
                            item.name == 'edit_configuration'
                              ? 3
                              : 1
                          }
                        >
                          <FormControlLabel
                            checked={!!permissionsIds.find(item1 => item1.id == item.id)}
                            onChange={e => handleSelectPermission(e, item.id)}
                            label={item.name.split('_')[0]}
                            sx={{ '& .MuiTypography-root': { color: 'text.secondary' } }}
                            control={<Checkbox size='small' />}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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

export default RolesEditForm
