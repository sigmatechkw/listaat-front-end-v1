import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { useTranslation } from 'react-i18next'
import { CardContent, IconButton, Typography, styled } from '@mui/material'
import Icon from 'src/@core/components/icon'
import CustomChip from 'src/@core/components/mui/chip'
import { useRouter } from 'next/router'

const SmsMethodsDetails = ({ data }) => {
  const { t } = useTranslation()
  const { id, active, description, name, slug, image } = data
  const router = useRouter()

  const ImgStyled = styled('img')(({ theme }) => ({
    width: 50,
    height: 50,
    marginRight: theme.spacing(6),
    borderRadius: theme.shape.borderRadius
  }))

  const handleEdit = e => {
    e.stopPropagation()
    router.push(`/sms_methods/edit/${id}`)
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
                pb: 3,
                gap: 2
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                  sx={{ color: 'text.primary', textTransform: 'uppercase', fontSize: '1.5rem', mx: 2 }}
                >
                  {t('sms methods details')}
                </Typography>
              </Box>

              <Box>
                <IconButton color='warning' onClick={e => handleEdit(e, id)}>
                  <Icon icon='tabler:edit' fontSize={20} />
                </IconButton>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ pt: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Icon icon='tabler:id' />
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('ID')}:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{id}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Icon icon='tabler:flag-3' />
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('slug')}:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{slug}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Icon icon='tabler:vocabulary' />
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('Name')}:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{name}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Icon icon='tabler:box-padding' />
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>
                      {t('description')}:
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{description}</Typography>
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

              <Box sx={{ pt: 10 }}>
                <ImgStyled src={image} alt='Profile Pic' />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default SmsMethodsDetails
