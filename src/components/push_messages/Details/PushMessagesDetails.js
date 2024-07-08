import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { useTranslation } from 'react-i18next'
import { Button, CardContent, Chip, Typography, styled } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { useState } from 'react'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'

const PushMessagesDetails = ({ data }) => {
  const { t } = useTranslation()
  const { id, body_en, body_ar, title_en, title_ar, image, users } = data
  const [isFullscreenEnabled, setIsFullscreenEnabled] = useState(true)
  const handle = useFullScreenHandle()

  const ImgStyled = styled('img')(({ theme }) => ({
    width: isFullscreenEnabled ? '70%' : 300,
    height: isFullscreenEnabled ? '70%' : 200,
    margin: isFullscreenEnabled ? 'auto' : 0,
    borderRadius: theme.shape.borderRadius
  }))

  const handleOpenFullSCreen = () => {
    handle.enter()
  }

  const handleChangeSize = () => {
    setIsFullscreenEnabled(!isFullscreenEnabled)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent sx={{ pb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #3d4158', pb: 3, gap: 2 }}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='icon icon-tabler icon-tabler-list-details'
                width='25'
                height='25'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
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
                {t('push_messages_details')}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
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
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('title (en)')}:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{title_en}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Icon icon='tabler:vocabulary' />
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('title (ar)')}:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{title_ar}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Icon icon='tabler:box-padding' />
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('body (en)')}:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{body_en}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Icon icon='tabler:box-padding' />
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('body (ar)')}:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{body_ar}</Typography>
                  </Box>
                </Box>
              </Box>

              <FullScreen handle={handle} onChange={() => handleChangeSize()}>
                {image && (
                  <Box
                    sx={{
                      pt: 10,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 3,
                      justifyContent: 'center'
                    }}
                  >
                    <ImgStyled src={image} alt='Profile Pic' />

                    {!isFullscreenEnabled && (
                      <Button
                        sx={{ width: 300 }}
                        color={'info'}
                        variant={'tonal'}
                        onClick={() => handleOpenFullSCreen()}
                      >
                        <Icon fontSize='1.125rem' icon='tabler:arrows-maximize' />
                        &nbsp; Enter fullscreen
                      </Button>
                    )}
                  </Box>
                )}
              </FullScreen>
            </Box>

            <Box>
              <Box sx={{ display: 'flex', gap: 3, mt: 4 }}>
                <Icon icon='tabler:user' />

                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>{t('users')}:</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 3, mt: 4, alignItems: 'center', flexWrap: 'wrap' }}>
                {users.map(item => (
                  <Chip
                    key={item.id}
                    label={item.full_name ? item.full_name : item.first_name + ' ' + item.last_name}
                    color='primary'
                    variant='outlined'
                  />
                ))}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default PushMessagesDetails
