// ** React Imports

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { useTranslation } from 'react-i18next'
import { Alert, CardContent, IconButton, Typography } from '@mui/material'
import Icon from 'src/@core/components/icon'
import CustomChip from 'src/@core/components/mui/chip'
import { useRouter } from 'next/router'

const PromoCodesDetails = ({ data }) => {
  const { t } = useTranslation()

  const {
    id,
    active,
    name,
    name_ar,
    promo_type,
    usage_type,
    name_en,
    start_date,
    end_date,
    code,
    description_ar,
    description_en,
    first_order_only,
    max_applied_amount,
    min_order_amount,
    amount
  } = data
  const router = useRouter()

  const formatDate = dateString => {
    const dateTime = new Date(dateString)
    const formattedDate = `${dateTime.getDate()}/${dateTime.getMonth() + 1}/${dateTime.getFullYear()}`
    let hours = dateTime.getHours()
    const minutes = dateTime.getMinutes().toString().padStart(2, '0')
    const ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12 || 12
    const formattedTime = `${hours}:${minutes} ${ampm}`
    const formattedDateTime = `${formattedDate} ${formattedTime}`

    return formattedDateTime
  }

  const handleEdit = e => {
    e.stopPropagation()
    router.push(`/promo_codes/edit/${id}`)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent sx={{ pb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #3d4158', pb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  class='icon icon-tabler icon-tabler-list-details'
                  width='25'
                  height='25'
                  viewBox='0 0 24 24'
                  stroke-width='1.5'
                  stroke='#FFF'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                  <path d='M13 5h8' />
                  <path d='M13 9h5' />
                  <path d='M13 15h8' />
                  <path d='M13 19h5' />
                  <path d='M3 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z' />
                  <path d='M3 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z' />
                </svg>

                <Typography
                  variant='body2'
                  sx={{ color: 'text.primary', textTransform: 'uppercase', fontSize: '1.5rem' }}
                >
                  {t('promo_codes_details')}
                </Typography>
              </Box>

              <Box>
                <IconButton color='warning' onClick={e => handleEdit(e, id)}>
                  <Icon icon='tabler:edit' fontSize={20} />
                </IconButton>
              </Box>
            </Box>

            <Box sx={{ pt: 10, display: 'flex', gap: 4 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Icon icon='tabler:id' />
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('ID')}:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{id}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Icon icon='tabler:vocabulary' />
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('name (ar)')}:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{name_ar}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Icon icon='tabler:vocabulary' />
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('name (en)')}:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{name_en}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Icon icon='tabler:script' />
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('code')}:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{code}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Icon icon='tabler:align-box-left-middle' />
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('promo type')}:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                      {promo_type == 1 ? 'Fixed Amount' : 'Percentage'}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Icon icon='tabler:coin-bitcoin' />
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('amount')}:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                      {amount}
                      {promo_type != 1 && '%'}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Icon icon='tabler:calendar-event' />
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('start date')}:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{formatDate(start_date)}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Icon icon='tabler:calendar-event' />
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('end date')}:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{formatDate(end_date)}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Icon icon='tabler:math-min' />
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>
                      {t('min order amount')}:
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{min_order_amount}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Icon icon='tabler:math-max' />
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>
                      {t('max applied amount')}:
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{max_applied_amount}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Icon icon='tabler:a-b-2' />
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('usage type')}:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                      {usage_type == 1 && 'One Time Use'}
                      {usage_type == 2 && 'Daily Use'}
                      {usage_type == 3 && 'Unlimited Use'}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Icon icon='tabler:arrows-sort' />
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>
                      {t('first order only')}:
                    </Typography>

                    <CustomChip
                      rounded
                      skin={'light'}
                      size={'small'}
                      label={first_order_only == 1 ? t('yes') : t('no')}
                      color={first_order_only == 1 ? 'success' : 'error'}
                    />
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Icon icon='tabler:toggle-right' />
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('active')}:</Typography>
                    <Box mb={2}>
                      <CustomChip
                        rounded
                        skin={'light'}
                        size={'small'}
                        label={active ? t('yes') : t('no')}
                        color={active ? 'success' : 'error'}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 4, marginTop: 5 }}>
              <Box sm={12} sx={{ flex: 1 }}>
                <Box sx={{ fontSize: '1.3em', color: 'text.primary' }}>{t('Description (ar)')} </Box>

                <Alert severity='info' icon={false} sx={{ mt: 2 }}>
                  <Box>{description_ar}</Box>
                </Alert>
              </Box>

              <Box sm={12} sx={{ flex: 1 }}>
                <Box sx={{ fontSize: '1.3em', color: 'text.primary' }}>{t('Description (en)')} </Box>

                <Alert severity='info' icon={false} sx={{ mt: 2 }}>
                  <Box>{description_en}</Box>
                </Alert>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default PromoCodesDetails
