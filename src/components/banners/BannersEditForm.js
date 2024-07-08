import React, { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CustomTextField from 'src/@core/components/mui/text-field'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import { useTranslation } from 'react-i18next'
import CircularProgress from '@mui/material/CircularProgress'
import DatePicker from 'react-datepicker'
import { useTheme } from '@mui/material/styles'
import { Autocomplete, Box, Checkbox, FormControlLabel, IconButton, Typography, styled } from '@mui/material'
import PickersComponent from 'src/views/forms/form-elements/pickers/PickersCustomInput'
import 'react-datepicker/dist/react-datepicker.css' // Import the default styles for react-datepicker
import Icon from '../../@core/components/icon'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 50,
  height: 50,
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

const BannersEditForm = ({
  type = 'create',
  androidImgsSrc,
  iosImgsSrc,
  iosImgs,
  androidImgs,
  setAndroidImgs,
  setAndroidImgsSrc,
  setSiteImgsSrc,
  siteImgsSrc,
  setIosImgsSrc,
  setSiteImgs,
  setIosImgs,
  allTypes,
  errors,
  control,
  watch,
  active,
  setActive,
  siteImgSrc,
  siteImgs,
  setSiteImgSrc,
  siteImg,
  setSiteImg,
  iosImageSrc,
  setIosImgSrc,
  iosImage,
  setIosImage,
  androidImage,
  setAndroidImage,
  androidImageSrc,
  setAndroidImageSrc,
  setValue,
  onSubmit,
  title,
  loading,
  getValues,
  currentType,
  setCurrentType,
  setEndDate,
  endDate,
  startDate,
  allTargets,
  fetchAllTargets,
  showTargetItems,
  targetItems,
  fetchTargetItems,
  selectedTargetType,
  setSelectedTargetType,
  setStartDate,
  deletedSiteImgs,
  setDeletedSiteImgs,

  deletedIosImgs,
  setDeletedIosImgs,
  setTargetItems,
  deletedAndroidImgs,
  setDeletedAndroidImgs,
  setShowTargetItems
}) => {
  const { t } = useTranslation()

  const [targetSite, setTargetSite] = useState(false)
  const [targetIos, setTargetIos] = useState(false)
  const [targetAndroid, setTargetAndroid] = useState(false)
  const theme = useTheme()
  const { direction } = theme
  const popperPlacement = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

  const handleIsActive = (e, val) => {
    setActive(val)
  }

  useEffect(() => {
    if (getValues('target_site')) {
      setTargetSite(getValues('target_site'))
    }

    if (getValues('target_ios')) {
      setTargetIos(getValues('target_ios'))
    }

    if (getValues('target_android')) {
      setTargetAndroid(getValues('target_android'))
    }
  }, [getValues('target_site'), getValues('target_ios'), getValues('target_android')])

  const handleInputImageChange = (file, type) => {
    if (!type) {
      const reader = new FileReader()
      const { files } = file.target
      if (files && files.length !== 0) {
        reader.onload = () => {
          setSiteImgSrc(reader.result)
        }
        reader.readAsDataURL(files[0])

        if (reader.result !== null) {
          setSiteImg(reader.result)
        }
      }
    } else if (type == 'ios') {
      const reader = new FileReader()
      const { files } = file.target
      if (files && files.length !== 0) {
        reader.onload = () => {
          setIosImgSrc(reader.result)
        }
        reader.readAsDataURL(files[0])
        if (reader.result !== null) {
          setIosImage(reader.result)
        }
      }
    } else {
      const reader = new FileReader()
      const { files } = file.target
      if (files && files.length !== 0) {
        reader.onload = () => {
          setAndroidImageSrc(reader.result)
        }
        reader.readAsDataURL(files[0])
        if (reader.result !== null) {
          setAndroidImage(reader.result)
        }
      }
    }
  }

  const handleInputImagesChange = (event, type1) => {
    console.log(event.target.files)
    console.log(type1)
    const { files } = event.target

    if (files && files.length > 0) {
      const readers = []
      const imageSrcArray = []
      const imageArray = []

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const reader = new FileReader()

        readers.push(
          new Promise((resolve, reject) => {
            reader.onload = () => {
              imageSrcArray.push(reader.result)
              imageArray.push(file)
              resolve()
            }
            reader.onerror = reject
            reader.readAsDataURL(file)
          })
        )
      }

      Promise.all(readers)
        .then(() => {
          if (!type1) {
            setSiteImgsSrc(imageSrcArray)
            setSiteImgs(imageArray)
          } else if (type1 == 'ios') {
            setIosImgsSrc(imageSrcArray)
            setIosImgs(imageArray)
          } else if (type1 == 'android') {
            setAndroidImgsSrc(imageSrcArray)
            setAndroidImgs(imageArray)
          }
        })
        .catch(error => {
          console.error('Error reading files: ', error)
        })
    }
  }

  const handleDeleteImg = (e, id, type, notHaveId) => {
    e.stopPropagation()

    if (!type) {
      if (notHaveId >= 0) {
        setSiteImgs(siteImgs.filter((item, i) => i != notHaveId))
        setSiteImgsSrc(siteImgsSrc.filter((item, i) => i != notHaveId))
      } else {
        setDeletedSiteImgs([...deletedSiteImgs, id])
        setSiteImgs(siteImgs.filter(item => item.id != id))
      }
    } else if (type == 'ios') {
      if (notHaveId >= 0) {
        setIosImgs(iosImgs.filter((item, i) => i != notHaveId))
        setIosImgsSrc(iosImgsSrc.filter((item, i) => i != notHaveId))
      } else {
        setDeletedIosImgs([...deletedIosImgs, id])
        setIosImgs(iosImgs.filter(item => item.id != id))
      }
    } else {
      if (notHaveId >= 0) {
        setAndroidImgs(androidImgs.filter((item, i) => i != notHaveId))
        setAndroidImgsSrc(androidImgsSrc.filter((item, i) => i != notHaveId))
      } else {
        setDeletedAndroidImgs([...deletedAndroidImgs, id])
        setAndroidImgs(androidImgs.filter(item => item.id != id))
      }
    }
  }

  const handleTargetSite = (e, val) => {
    setTargetSite(val)
    setValue('target_site', val)

    if (!val) {
      setTargetSite(false)
      setValue('image_site', '')
    }
  }

  const handleTargetIos = (e, val) => {
    setTargetIos(val)

    if (!val) {
      setTargetIos(false)
      setValue('image_ios', '')
    }
  }

  const handleTargetAndroid = (e, val) => {
    setTargetAndroid(val)

    if (!val) {
      setTargetAndroid(false)
      setValue('image_android', '')
    }
  }

  const handleInputImageReset = type => {
    if (type == 'site') {
      setSiteImgSrc('')
    } else if (type == 'ios') {
      setIosImage('')
      setIosImgSrc('')
    } else {
      setAndroidImage('')
      setAndroidImageSrc('')
    }
  }

  const handleInputImagesReset = type => {
    if (!type) {
      setSiteImgs([])
      setSiteImgsSrc([])
    } else if (type == 'ios') {
      setIosImgs([])
      setIosImgsSrc([])
    } else if (type == 'android') {
      setAndroidImgs([])
      setAndroidImgsSrc([])
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
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    inputProps={{ minLength: 3 }}
                    fullWidth
                    value={value}
                    label={t('name')}
                    onChange={onChange}
                    required
                    error={Boolean(errors.name)}
                    aria-describedby='validation-basic-name'
                    {...(errors.name && { helperText: t('required') })}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='type'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <Autocomplete
                    value={value}
                    onChange={(e, newValue) => {
                      setValue('type', newValue)
                      if (newValue?.id == 1) {
                        fetchAllTargets(newValue.id)
                      } else {
                        setValue('target_id', '')
                        setValue('target_type', '')
                      }
                      setCurrentType(newValue?.id)
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    options={allTypes}
                    renderInput={params => <CustomTextField {...params} label={t('type')} />}
                  />
                )}
              />
            </Grid>

            {currentType == 2 && (
              <Grid item xs={6}>
                <Controller
                  name='url'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      inputProps={{ minLength: 3 }}
                      fullWidth
                      value={value}
                      label={t('url')}
                      onChange={onChange}
                      required
                      error={Boolean(errors.url)}
                      aria-describedby='validation-basic-url'
                      {...(errors.url && { helperText: t('required') })}
                    />
                  )}
                />
              </Grid>
            )}

            {currentType == 1 && (
              <Grid item xs={12} sm={6}>
                <Controller
                  name='target_type'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <>
                      <Autocomplete
                        value={value}
                        onChange={(e, newValue) => {
                          if (newValue) {
                            setValue('target_type', newValue)
                            setSelectedTargetType(newValue)
                            fetchTargetItems(newValue)
                          } else {
                            setValue('target_type', '')
                            setSelectedTargetType('')
                            setTargetItems([])
                            setShowTargetItems(false)
                          }

                          setValue('target_id', '')
                        }}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        options={allTargets}
                        renderInput={params => <CustomTextField {...params} label={t('target type')} />}
                      />
                    </>
                  )}
                />
              </Grid>
            )}

            {currentType == 1 && showTargetItems && (
              <Grid item xs={12} sm={6}>
                <Controller
                  name='target_id'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <>
                      <Autocomplete
                        value={value}
                        onChange={(e, newValue) => {
                          setValue('target_id', newValue)
                        }}
                        isOptionEqualToValue={(option, value) => option.id == value.id}
                        options={targetItems}
                        renderInput={params => <CustomTextField {...params} label={t(selectedTargetType.label)} />}
                      />
                    </>
                  )}
                />
              </Grid>
            )}

            <Grid item container spacing={4} sx={{ alignItems: 'center', justifyContent: 'space-between' }} xs={12}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name='start_date'
                  control={control}
                  render={({ field: { value } }) => (
                    <>
                      <DatePicker
                        minDate={new Date()}
                        selected={value ? value : startDate ? new Date(startDate) : new Date()}
                        showTimeSelect={false}
                        dateFormat='MM/dd/yyyy'
                        popperPlacement={popperPlacement} // Set the popperPlacement if needed
                        /* onChange={newValue => setValue('start_date', newValue)} */
                        onChange={newValue => setStartDate(newValue)}
                        customInput={<PickersComponent label={t('start date')} />}
                      />
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name='end_date'
                  control={control}
                  render={({ field: { value } }) => (
                    <>
                      <DatePicker
                        minDate={new Date().setDate(new Date().getDate() + 1)}
                        selected={value ? value : endDate ? new Date(endDate) : new Date()}
                        showTimeSelect={false}
                        dateFormat='MM/dd/yyyy'
                        popperPlacement={popperPlacement} // Set the popperPlacement if needed
                        onChange={newValue => {
                          //setValue('end_date', newValue)
                          setEndDate(newValue)
                        }}
                        customInput={<PickersComponent label={t('end date')} />}
                      />
                    </>
                  )}
                />
              </Grid>
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

            <Grid item xs={6}>
              <Controller
                name='order'
                control={control}
                rules={{ required: false }}
                render={({ field: { value, onChange } }) => (
                  <>
                    <CustomTextField
                      fullWidth
                      type='number'
                      value={value}
                      label={t('order')}
                      onChange={onChange}
                      error={Boolean(errors.order)}
                      aria-describedby='validation-basic-order'
                    />
                  </>
                )}
              />
            </Grid>

            <Grid container sx={{ mt: 10, px: 4 }}>
              <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                <Box>
                  <FormControlLabel
                    label={t('target site')}
                    control={
                      <Checkbox
                        checked={targetSite}
                        onChange={(e, v) => {
                          handleTargetSite(e, v)
                          setValue('target_site', v)
                        }}
                        name='target site'
                      />
                    }
                  />
                </Box>

                <Box>
                  {(targetSite || getValues('image_site')) && (
                    <>
                      <Box sx={{ display: 'flex', gap: 4 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {/* {
                    siteImgsSrc.length > 0 && siteImgsSrc?.map(img => <ImgStyled key={Math.random()} src={img} alt='Profile Pic' />)
                  } */}
                            <Box
                              sx={{ border: `1px solid ${theme.palette.secondary.another}`, p: 3, borderRadius: '5px' }}
                            >
                              <ButtonStyled component='label' variant='contained' htmlFor='site-images'>
                                {t('Upload Site images')}
                                <input
                                  hidden
                                  multiple
                                  type='file'
                                  accept='image/png, image/jpeg'
                                  onChange={handleInputImagesChange}
                                  id='site-images'
                                />
                              </ButtonStyled>
                              <ResetButtonStyled
                                color='secondary'
                                variant='tonal'
                                onClick={() => handleInputImagesReset(false)}
                              >
                                {t('Reset')}
                              </ResetButtonStyled>
                            </Box>
                          </Box>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {/* <ImgStyled src={siteImgSrc ? siteImgSrc : getValues('image_site')} alt='Profile Pic' /> */}
                          <Box
                            sx={{ border: `1px solid ${theme.palette.secondary.another}`, p: 3, borderRadius: '5px' }}
                          >
                            <ButtonStyled component='label' variant='contained' htmlFor='site-image'>
                              {t('Upload Site image')}
                              <input
                                hidden
                                type='file'
                                value={siteImg}
                                accept='image/png, image/jpeg'
                                onChange={handleInputImageChange}
                                id='site-image'
                              />
                            </ButtonStyled>
                            <ResetButtonStyled
                              color='secondary'
                              variant='tonal'
                              onClick={() => handleInputImageReset('site')}
                            >
                              {t('Reset')}
                            </ResetButtonStyled>
                          </Box>
                        </Box>
                      </Box>
                    </>
                  )}
                </Box>
              </Grid>

              {(siteImgSrc || siteImgsSrc) && (
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    mt: 6,
                    background: theme.palette.secondary.another,
                    p: 8,
                    borderRadius: 2
                  }}
                >
                  {siteImgSrc ? <ImgStyled src={siteImgSrc} alt='Profile Pic' /> : 'no site image'}

                  {siteImgs.length > 0 &&
                    siteImgs?.map((im, index) => (
                      <Box sx={{ display: 'flex', flexDirection: 'column', position: 'relative' }} key={im.id}>
                        <IconButton
                          color='error'
                          onClick={e => handleDeleteImg(e, im.id, false, im.url ? -1 : index)}
                          sx={{ alignSelf: 'flex-end', position: 'absolute', top: -25, right: 0 }}
                        >
                          <Icon icon='tabler:trash' fontSize={20} />
                        </IconButton>
                        <ImgStyled src={im?.url ? im?.url : siteImgsSrc[index]} alt='Profile Pic' />
                      </Box>
                    ))}
                </Grid>
              )}

              <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', gap: 4, mt: 6 }}>
                <Box>
                  <FormControlLabel
                    label={t('target ios')}
                    control={
                      <Checkbox
                        checked={targetIos}
                        onChange={(e, v) => {
                          handleTargetIos(e, v)
                          setValue('target_ios', v)
                        }}
                        name='target ios'
                      />
                    }
                  />
                </Box>
                <Box>
                  {(targetIos || getValues('image_ios')) && (
                    <>
                      <Box sx={{ display: 'flex', gap: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {/* {
                    siteImgsSrc.length > 0 && siteImgsSrc?.map(img => <ImgStyled key={Math.random()} src={img} alt='Profile Pic' />)
                  } */}
                          <Box
                            sx={{ border: `1px solid ${theme.palette.secondary.another}`, p: 3, borderRadius: '5px' }}
                          >
                            <ButtonStyled component='label' variant='contained' htmlFor='ios-images'>
                              {t('Upload ios images')}
                              <input
                                hidden
                                multiple
                                type='file'
                                accept='image/png, image/jpeg'
                                onChange={event => handleInputImagesChange(event, 'ios')}
                                id='ios-images'
                              />
                            </ButtonStyled>
                            <ResetButtonStyled
                              color='secondary'
                              variant='tonal'
                              onClick={() => handleInputImagesReset('ios')}
                            >
                              {t('Reset')}
                            </ResetButtonStyled>
                          </Box>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {/* <ImgStyled src={iosImageSrc ? iosImageSrc : getValues('image_ios')} alt='Profile Pic' /> */}
                            <Box
                              sx={{ border: `1px solid ${theme.palette.secondary.another}`, p: 3, borderRadius: '5px' }}
                            >
                              <ButtonStyled component='label' variant='contained' htmlFor='ios-image'>
                                {t('Upload ios Photo')}
                                <input
                                  hidden
                                  type='file'
                                  value={iosImage}
                                  accept='image/png, image/jpeg'
                                  onChange={file => handleInputImageChange(file, 'ios')}
                                  id='ios-image'
                                />
                              </ButtonStyled>
                              <ResetButtonStyled
                                color='secondary'
                                variant='tonal'
                                onClick={() => handleInputImageReset('ios')}
                              >
                                {t('Reset')}
                              </ResetButtonStyled>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </>
                  )}
                </Box>
              </Grid>

              {(iosImageSrc || iosImgsSrc) && (
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    mt: 6,
                    background: theme.palette.secondary.another,
                    p: 8,
                    borderRadius: 2
                  }}
                >
                  {iosImageSrc ? <ImgStyled src={iosImageSrc} alt='Profile Pic' /> : 'no site image'}

                  {iosImgs.length > 0 &&
                    iosImgs?.map((im, index) => (
                      <Box sx={{ display: 'flex', flexDirection: 'column', position: 'relative' }} key={im.id}>
                        <IconButton
                          color='error'
                          onClick={e => handleDeleteImg(e, im.id, 'ios', im.url ? -1 : index)}
                          sx={{ alignSelf: 'flex-end', position: 'absolute', top: -25, right: 0 }}
                        >
                          <Icon icon='tabler:trash' fontSize={20} />
                        </IconButton>
                        <ImgStyled src={im?.url ? im?.url : iosImgsSrc[index]} alt='Profile Pic' />
                      </Box>
                    ))}
                </Grid>
              )}

              <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', gap: 4, mt: 6 }}>
                <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                  <Box>
                    <FormControlLabel
                      label={t('target android')}
                      control={
                        <Checkbox
                          checked={targetAndroid}
                          onChange={(e, v) => {
                            handleTargetAndroid(e, v)
                            setValue('target_android', v)
                          }}
                          name='target android'
                        />
                      }
                    />
                  </Box>

                  <Box>
                    {(targetAndroid || getValues('image_android')) && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {/* {
                    siteImgsSrc.length > 0 && siteImgsSrc?.map(img => <ImgStyled key={Math.random()} src={img} alt='Profile Pic' />)
                  } */}
                          <Box
                            sx={{ border: `1px solid ${theme.palette.secondary.another}`, p: 3, borderRadius: '5px' }}
                          >
                            <ButtonStyled component='label' variant='contained' htmlFor='android-images'>
                              {t('Upload Android images')}
                              <input
                                hidden
                                multiple
                                type='file'
                                accept='image/png, image/jpeg'
                                onChange={event => handleInputImagesChange(event, 'android')}
                                id='android-images'
                              />
                            </ButtonStyled>
                            <ResetButtonStyled
                              color='secondary'
                              variant='tonal'
                              onClick={() => handleInputImagesReset('android')}
                            >
                              {t('Reset')}
                            </ResetButtonStyled>
                          </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          {/* <ImgStyled src={androidImageSrc ? androidImageSrc:getValues('image_android')} alt='Profile Pic' /> */}
                          <Box
                            sx={{ border: `1px solid ${theme.palette.secondary.another}`, p: 3, borderRadius: '5px' }}
                          >
                            <ButtonStyled component='label' variant='contained' htmlFor='android-image'>
                              {t('Upload Android Photo')}
                              <input
                                hidden
                                type='file'
                                value={androidImage}
                                accept='image/png, image/jpeg'
                                onChange={file => handleInputImageChange(file, 'android')}
                                id='android-image'
                              />
                            </ButtonStyled>
                            <ResetButtonStyled
                              color='secondary'
                              variant='tonal'
                              onClick={() => handleInputImageReset('android')}
                            >
                              {t('Reset')}
                            </ResetButtonStyled>
                          </Box>
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Grid>

              {(androidImageSrc || androidImgsSrc) && (
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    mt: 6,
                    background: theme.palette.secondary.another,
                    p: 8,
                    borderRadius: 2
                  }}
                >
                  {androidImageSrc ? <ImgStyled src={androidImageSrc} alt='Profile Pic' /> : 'no site image'}

                  {androidImgs.length > 0 &&
                    androidImgs?.map((im, index) => (
                      <Box sx={{ display: 'flex', flexDirection: 'column', position: 'relative' }} key={im.id}>
                        <IconButton
                          color='error'
                          onClick={e => handleDeleteImg(e, im.id, 'android', im.url ? -1 : index)}
                          sx={{ alignSelf: 'flex-end', position: 'absolute', top: -25, right: 0 }}
                        >
                          <Icon icon='tabler:trash' fontSize={20} />
                        </IconButton>
                        <ImgStyled src={im?.url ? im?.url : androidImgsSrc[index]} alt='Profile Pic' />
                      </Box>
                    ))}
                </Grid>
              )}
            </Grid>

            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'between', alignItems: 'end' }}></Grid>

                <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'between', alignItems: 'end' }}></Grid>

                <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'between', alignItems: 'end' }}></Grid>
              </Grid>
            </Grid>

            <Grid item xs={6}></Grid>
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

export default BannersEditForm
