import React, { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

import CustomTextField from 'src/@core/components/mui/text-field'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'

import { useTranslation } from 'react-i18next'
import CircularProgress from '@mui/material/CircularProgress'

import axios from 'axios'
import { Box, Checkbox, FormControlLabel, styled } from '@mui/material'
import 'react-datepicker/dist/react-datepicker.css' // Import the default styles for react-datepicker
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'
import CkEditorForEdit from '../ckEditor/CkEditorForEdit'
import { getCookie } from 'cookies-next'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 100,
  height: 100,
  marginRight: theme.spacing(6),
  borderRadius: theme.shape.borderRadius
}))

const VideoStyled = styled('video')(({ theme }) => ({
  width: 300,
  height: 200,
  marginRight: theme.spacing(6),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(2)
  }
}))

const BlogsForm = ({
  type = 'create',
  active,
  setActive,
  imgSrc,
  content,
  setContent,
  setImgSrc,
  blogImg,
  setBlogImg,
  errors,
  control,
  setValue,
  onSubmit,
  title,
  loading,

  videoSrc,
  setVideoSrc,
  blogVideo,
  setBlogVideo
}) => {
  const { t } = useTranslation()
  //const [users, setUsers] = useState([])
  const [experts, setExperts] = useState([])

  useEffect(() => {
    //fetchUsers()
    fetchExperts()
  }, [])

  /*   const fetchUsers = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}users`, {
      headers: {
        'Authorization': getCookie('token'),
        'Accepted-Language': getCookie('lang') ?? 'en'
      }
    })
    console.log(response.data.data.items)
    setUsers(response.data.data.items)
    //return response.data.data.items
  } */

  const fetchExperts = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}experts`, {
      headers: {
        Authorization: getCookie('token'),
        'Accepted-Language': getCookie('lang') ?? 'en'
      }
    })
    setExperts(response.data.data.items)
    //return response.data.data.items
  }

  const handleInputImageChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => {
        setImgSrc(reader.result)
      }
      reader.readAsDataURL(files[0])
      if (reader.result !== null) {
        setBlogImg(reader.result)
      }
    }
  }

  const handleInputVideoChange = e => {
    const file = e.target.files[0]

    setVideoSrc(file)

    const blob = new Blob([file], { type: file.type })
    const blobUrl = URL.createObjectURL(blob)
    setBlogVideo(blobUrl)
  }

  const handleInputVideoReset = () => {
    setBlogVideo('')
    setVideoSrc('/images/avatars/15.png')
  }

  const handleInputImageReset = () => {
    setBlogImg('')
    setImgSrc('/images/avatars/15.png')
  }

  const handleIsActive = (e, val) => {
    setActive(val)
  }

  return (
    <>
      <CardHeader title={title} />
      <CardContent>
        <form onSubmit={onSubmit}>
          <Grid container spacing={4} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'between', alignItems: 'end' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ImgStyled src={imgSrc} alt='Profile Pic' />
                <div>
                  <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                    {t('Upload New Photo')}
                    <input
                      hidden
                      type='file'
                      value={blogImg}
                      accept='image/*'
                      onChange={handleInputImageChange}
                      id='account-settings-upload-image'
                    />
                  </ButtonStyled>
                  <ResetButtonStyled color='secondary' variant='tonal' onClick={handleInputImageReset}>
                    {t('Reset')}
                  </ResetButtonStyled>
                </div>
              </Box>
            </Grid>

            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'between', alignItems: 'end' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {!videoSrc ? (
                  <ImgStyled src={'/images/avatars/15.png'} alt='Profile Pic' />
                ) : (
                  <VideoStyled src={blogVideo} alt='Profile Pic' />
                )}

                <div>
                  <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-video'>
                    {t('Upload New Video')}
                    <input
                      hidden
                      type='file'
                      accept='video/*'
                      onChange={handleInputVideoChange}
                      id='account-settings-upload-video'
                    />
                  </ButtonStyled>

                  <ResetButtonStyled color='secondary' variant='tonal' onClick={handleInputVideoReset}>
                    {t('Reset')}
                  </ResetButtonStyled>
                </div>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Controller
                name='title'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label={t('title')}
                    onChange={onChange}
                    required
                    error={Boolean(errors.title)}
                    aria-describedby='validation-basic-title'
                    {...(errors.title && { helperText: t('required') })}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='expert_id'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomAutocomplete
                    value={value}
                    onChange={(e, newValue) => {
                      if (newValue) {
                        setValue('expert_id', newValue)
                        onChange(newValue)
                      } else {
                        setValue('expert_id', null)
                      }
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                    options={experts}
                    getOptionLabel={option => option.first_name} // Render the full name of the user
                    renderInput={params => <CustomTextField {...params} label={t('expert')} />}
                  />
                )}
              />
            </Grid>

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

            <Grid item xs={12}>
              <Box>
                <label>{t('content')} </label>
                <Box sx={{ marginTop: 1 }}>
                  <CkEditorForEdit textEditor={content} setTextEditorVal={setContent} />
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sx={{ alignSelf: 'flex-end' }}>
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

export default BlogsForm
