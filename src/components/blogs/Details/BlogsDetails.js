import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { useTranslation } from 'react-i18next'
import { Alert, CardContent, IconButton, Typography } from '@mui/material'
import Comments from './Comments'
import Icon from 'src/@core/components/icon'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Tab from '@mui/material/Tab'
import { useState } from 'react'
import { useRouter } from 'next/router'

const BlogsDetails = ({ data }) => {
  const { t } = useTranslation()
  const { id, comments, comments_count, likes, content, content_en } = data
  const [activeTab, setActiveTab] = useState('main_info')
  const router = useRouter()

  const { expert } = data

  const TabList = styled(MuiTabList)(({ theme }) => ({
    borderBottom: '0 !important',
    '&, & .MuiTabs-scroller': {
      boxSizing: 'content-box',
      padding: theme.spacing(1.25, 1.25, 2),
      margin: `${theme.spacing(-1.25, -1.25, -2)} !important`
    },
    '& .MuiTabs-indicator': {
      display: 'none'
    },
    '& .Mui-selected': {
      boxShadow: theme.shadows[2],
      backgroundColor: theme.palette.primary.main,
      color: `${theme.palette.common.white} !important`
    },
    '& .MuiTab-root': {
      minWidth: 65,
      minHeight: 38,
      lineHeight: 1,
      borderRadius: theme.shape.borderRadius,
      '&:hover': {
        color: theme.palette.primary.main
      },
      [theme.breakpoints.up('sm')]: {
        minWidth: 130
      }
    }
  }))

  const handleEdit = e => {
    e.stopPropagation()
    router.push(`/blogs/edit/${id}`)
  }

  const handleChange = (event, value) => {
    setActiveTab(value)
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

              <IconButton color='warning' onClick={e => handleEdit(e, id)}>
                <Icon icon='tabler:edit' fontSize={20} />
              </IconButton>
            </Box>

            <Box sx={{ mt: 5 }}>
              <Grid item xs={12}>
                <TabContext value={activeTab}>
                  <Grid container spacing={6}>
                    <Grid item xs={12}>
                      <TabList
                        variant='scrollable'
                        scrollButtons='auto'
                        onChange={handleChange}
                        aria-label='customized tabs example'
                      >
                        <Tab
                          value='main_info'
                          label={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Icon fontSize='1.125rem' icon='tabler:user-check' />
                              {t('blog details')}
                            </Box>
                          }
                        />

                        <Tab
                          value='comments'
                          label={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Icon fontSize='1.125rem' icon='tabler:message-circle-2-filled' />
                              {t('comments')}
                            </Box>
                          }
                        />
                      </TabList>
                    </Grid>
                    <Grid item xs={12}>
                      <TabPanel sx={{ p: 0 }} value={activeTab}>
                        {activeTab == 'comments' ? (
                          <Box>
                            {comments.length > 0 ? (
                              <Box sx={{ mt: 3 }}>
                                {/* <Typography variant='h5' sx={{color: '#FFF'}}>Comments</Typography> */}
                                <Comments comments={comments} />
                              </Box>
                            ) : (
                              <Alert severity='info'>No Comments For This Blog</Alert>
                            )}
                          </Box>
                        ) : (
                          <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 7 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                              <Box sx={{ display: 'flex', gap: 3 }}>
                                <Icon icon='tabler:id' />
                                <Box sx={{ display: 'flex' }}>
                                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>
                                    {t('ID')}:
                                  </Typography>
                                  <Typography sx={{ color: 'text.secondary' }}>{id}</Typography>
                                </Box>
                              </Box>

                              <Box sx={{ display: 'flex', gap: 3 }}>
                                <Icon icon='tabler:clock-pause' />
                                <Box sx={{ display: 'flex' }}>
                                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>
                                    {t('comments count')}:
                                  </Typography>
                                  <Typography sx={{ color: 'text.secondary' }}>{comments_count}</Typography>
                                </Box>
                              </Box>

                              <Box sx={{ display: 'flex', gap: 3 }}>
                                <Icon icon='tabler:thumb-up-filled' />
                                <Box sx={{ display: 'flex' }}>
                                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>
                                    {t('likes')}:
                                  </Typography>
                                  <Typography sx={{ color: 'text.secondary' }}>{likes}</Typography>
                                </Box>
                              </Box>

                              {expert && (
                                <>
                                  <Box sx={{ display: 'flex', gap: 3 }}>
                                    <Icon icon='tabler:user' />
                                    <Box sx={{ display: 'flex' }}>
                                      <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>
                                        {t('expert')}:
                                      </Typography>
                                      <Typography sx={{ color: 'text.secondary' }}>{expert?.full_name}</Typography>
                                    </Box>
                                  </Box>

                                  <Box sx={{ display: 'flex', gap: 3 }}>
                                    <Icon icon='tabler:user' />
                                    <Box sx={{ display: 'flex' }}>
                                      <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>
                                        {t('Expert Email')}:
                                      </Typography>
                                      <Typography sx={{ color: 'text.secondary' }}>{expert?.email}</Typography>
                                    </Box>
                                  </Box>
                                </>
                              )}
                            </Box>

                            <Box sm={12}>
                              <Box sx={{ fontSize: '1.5em', color: '#FFF', color: 'text.primary' }}>
                                {t('content')}{' '}
                              </Box>

                              <Alert severity='info' icon={false} sx={{ mt: 2 }}>
                                <Box>
                                  <div dangerouslySetInnerHTML={{ __html: content }}></div>
                                </Box>
                              </Alert>
                            </Box>
                          </Box>
                        )}
                      </TabPanel>
                    </Grid>
                  </Grid>
                </TabContext>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default BlogsDetails
