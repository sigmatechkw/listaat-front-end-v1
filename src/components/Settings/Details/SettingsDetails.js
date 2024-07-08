import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { useTranslation } from 'react-i18next'
import { CardContent, IconButton, Typography } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { useRouter } from 'next/router'

const SettingsDetails = ({ data }) => {
  const { t } = useTranslation()
  const { id, label, value } = data
  const router = useRouter()

  const handleEdit = e => {
    e.stopPropagation()
    router.push(`/settings/edit/${id}`)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent sx={{ pb: 4 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #3d4158',
                pb: 3
              }}
            >
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
                  {t('setting_details')}
                </Typography>
              </Box>

              <Box>
                <IconButton color='warning' onClick={e => handleEdit(e, id)}>
                  <Icon icon='tabler:edit' fontSize={20} />
                </IconButton>
              </Box>
            </Box>

            <Box sx={{ pt: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
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
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('label')}:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{label}</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 3 }}>
                <Icon icon='tabler:equal' />
                <Box sx={{ display: 'flex' }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('value')}:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{value}</Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default SettingsDetails
