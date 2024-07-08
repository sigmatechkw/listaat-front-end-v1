// ** React Imports

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { useTranslation } from 'react-i18next'
import { CardContent, Typography } from '@mui/material'
import Icon from 'src/@core/components/icon'
import styled from '@emotion/styled'

const ContactUsDetails = ({ data }) => {
  const { t } = useTranslation()
  const { id, message, name, email, phone, images } = data

  const ImgStyled = styled('img')(({ theme }) => ({
    width: 200,
    height: 200,
    marginRight: theme.spacing(6),
    borderRadius: theme.shape.borderRadius
  }))

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent sx={{ pb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #3d4158', pb: 3, gap: 2 }}>
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

            <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 10 }}>
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
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('name')}:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{name}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Icon icon='tabler:at' />
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('email')}:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{email}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Icon icon='tabler:phone' />
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('phone')}:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{phone}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Icon icon='tabler:message-circle-2' />
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('message')}:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{message}</Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                {images.length != 0 &&
                  images.map(item => (
                    <Box key={item.id} sx={{ display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap', gap: 3 }}>
                      <ImgStyled src={item.url} alt='Profile Pic' />
                    </Box>
                  ))}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ContactUsDetails
