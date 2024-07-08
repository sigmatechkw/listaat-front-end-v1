import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { useTranslation } from 'react-i18next'
import Icon from 'src/@core/components/icon'
import { useQueryClient } from '@tanstack/react-query'
import { CardContent, IconButton, Typography, styled } from '@mui/material'
import CustomChip from 'src/@core/components/mui/chip'
import { useRouter } from 'next/router'

const BannersDetailsPage = ({ data }) => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  const { id, name, active, start_date, image_ios, image_site, views, clicks } = data
  const router = useRouter()

  const ImgStyled = styled('img')(({ theme }) => ({
    width: 150,
    height: 100,
    marginRight: theme.spacing(6),
    borderRadius: theme.shape.borderRadius
  }))

  const handleEdit = e => {
    e.stopPropagation()
    router.push(`/banners/edit/${id}`)
  }

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

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent sx={{ pb: 4 }}>
            <Box
              sx={{
                display: 'flex',
                borderBottom: '1px solid #3d4158',
                pb: 3,
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #3d4158',
                pb: 3,
                gap: 2
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
                  stroke-linecap='round'
                  stroke-linejoin='round'
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
                  {t('banners_details')}
                </Typography>
              </Box>

              <IconButton color='warning' onClick={e => handleEdit(e, id)}>
                <Icon icon='tabler:edit' fontSize={20} />
              </IconButton>
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
                  <Icon icon='tabler:vocabulary' />
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('name')}:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{name}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Icon icon='tabler:eye' />
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('views')}:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{views}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Icon icon='tabler:click' />
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('clicks')}:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{clicks}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Icon icon='tabler:calendar-event' />
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('start date')}:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{formatDate(start_date)}</Typography>
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
                        label={active ? t('Yes') : t('No')}
                        color={active ? 'success' : 'error'}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box sx={{ mt: 10, display: 'flex', gap: 2, backgroundColor: '#25293c', p: 5, borderRadius: 2 }}>
              {image_ios && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <label>Image (ios)</label>
                  <ImgStyled src={image_ios} alt='Profile Pic' />
                </Box>
              )}

              {image_site && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <label>Image (site)</label>
                  {image_site && <ImgStyled src={image_site} alt='Profile Pic' />}
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default BannersDetailsPage
