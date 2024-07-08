import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { useTranslation } from 'react-i18next'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import CustomTextField from '../../@core/components/mui/text-field'
import { useEffect, useState } from 'react'
import { fetchDreamsStatuses, fetchDreamsTypes } from './dreamsServices'
import MenuItem from '@mui/material/MenuItem'
import CustomLoader from '../Shared/CustomLoader'
import IconButton from '@mui/material/IconButton'
import { Icon } from '@iconify/react'

const DreamsFilters = ({ type, setType, status, setStatus, isLate, setIsLate, isPublic, setIsPublic, isPaid, setIsPaid }) => {
  const {t} = useTranslation()
  const [types, setTypes] = useState([])
  const [statuses, setStatuses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDreamsTypes().then(res => {
      setTypes(res)

      fetchDreamsStatuses().then(result => {
        setStatuses(result)
        setLoading(false)
      })
    })
  }, [])

  const handleTypeChange = e => {
    setType(e.target.value)
  }

  const handleStatusChange = e => {
    setStatus(e.target.value)
  }

  const handleIsLateChange = e => {
    setIsLate(e.target.value)
  }

  const handleIsPublicChange = e => {
    setIsPublic(e.target.value)
  }

  const handleIsPaidChange = (e) => {
    setIsPaid(e.target.value)
  }

  return (
    loading ?
      <CustomLoader />
    :
      <Card sx={{ mb: 3 }}>
        <CardHeader title={t('filters')} />
        <CardContent>
          <Grid container spacing={6}>
            <Grid item xs={12} md={3} lg={3}>
              <CustomTextField
                select
                fullWidth
                defaultValue={t('select_type')}
                SelectProps={{
                  value: type,
                  displayEmpty: true,
                  onChange: handleTypeChange,
                  endAdornment: (
                    <IconButton sx={{ mx: 2 }} onClick={() => setType('')}>
                      <Icon icon={'tabler:circle-x'} />
                    </IconButton>
                  )
                }}
              >
                <MenuItem value={''}>{t('select_type')}</MenuItem>
                {
                  types.length > 0 &&
                    types.map(type => (
                      <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
                    ))
                }
              </CustomTextField>
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
              <CustomTextField
                select
                fullWidth
                defaultValue={t('select_status')}
                SelectProps={{
                  value: status,
                  displayEmpty: true,
                  onChange: handleStatusChange,
                  endAdornment: (
                    <IconButton sx={{ mx: 2 }} onClick={() => setStatus('')}>
                      <Icon icon={'tabler:circle-x'} />
                    </IconButton>
                  )
                }}
              >
                <MenuItem value={''}>{t('select_status')}</MenuItem>
                {
                  statuses.length > 0 &&
                    statuses.map(status => (
                      <MenuItem key={status.id} value={status.id}>{status.name}</MenuItem>
                    ))
                }
              </CustomTextField>
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
              <CustomTextField
                select
                fullWidth
                defaultValue={t('is_late')}
                SelectProps={{
                  value: isLate,
                  displayEmpty: true,
                  onChange: handleIsLateChange,
                  endAdornment: (
                    <IconButton sx={{ mx: 2 }} onClick={() => setIsLate('')}>
                      <Icon icon={'tabler:circle-x'} />
                    </IconButton>
                  )
                }}
              >
                <MenuItem value={''}>{t('is_late')}</MenuItem>
                <MenuItem value={1}>{t('yes')}</MenuItem>
                <MenuItem value={0}>{t('no')}</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
              <CustomTextField
                select
                fullWidth
                defaultValue={t('is_public')}
                SelectProps={{
                  value: isPublic,
                  displayEmpty: true,
                  onChange: handleIsPublicChange,
                  endAdornment: (
                    <IconButton sx={{ mx: 2 }} onClick={() => setIsPublic('')}>
                      <Icon icon={'tabler:circle-x'} />
                    </IconButton>
                  )
                }}
              >
                <MenuItem value={''}>{t('is_public')}</MenuItem>
                <MenuItem value={1}>{t('yes')}</MenuItem>
                <MenuItem value={0}>{t('no')}</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
              <CustomTextField
                select
                fullWidth
                defaultValue={t('is_paid')}
                SelectProps={{
                  value: isPaid,
                  displayEmpty: true,
                  onChange: handleIsPaidChange,
                  endAdornment: (
                    <IconButton sx={{ mx: 2 }} onClick={() => setIsPaid('')}>
                      <Icon icon={'tabler:circle-x'} />
                    </IconButton>
                  )
                }}
              >
                <MenuItem value={''}>{t('is_paid')}</MenuItem>
                <MenuItem value={1}>{t('yes')}</MenuItem>
                <MenuItem value={0}>{t('no')}</MenuItem>
              </CustomTextField>
            </Grid>
          </Grid>
      </CardContent>
    </Card>
  )
}

export default DreamsFilters
