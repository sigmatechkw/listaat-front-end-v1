import { useRouter } from 'next/router'
import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { getCookie } from 'cookies-next'
import BannersForm from 'src/components/banners/BannersForm'

const defaultValues = {
  name: '',
  type: '',
  target_id: '',
  target_type: '',
  target_type: '',
  target_type: '',
  target_ios: false,
  target_android: false,
  target_site: false,
  image_site: '',
  image_ios: '',
  image_android: '',
  start_date: null,
  end_date: new Date().setDate(new Date().getDate() + 1),
  active: '',
  order: '',
  target_site: false
}

const BannersCreate = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [siteImgSrc, setSiteImgSrc] = useState('')
  const [siteImg, setSiteImg] = useState('')

  const [iosImageSrc, setIosImgSrc] = useState('') // /images/avatars/15.png
  const [iosImage, setIosImage] = useState('')

  const [androidImageSrc, setAndroidImageSrc] = useState('')
  const [androidImage, setAndroidImage] = useState('')
  const [active, setActive] = useState(true)

  const [siteImgsSrc, setSiteImgsSrc] = useState([])
  const [siteImgs, setSiteImgs] = useState('')

  const [iosImgsSrc, setIosImgsSrc] = useState([])
  const [iosImgs, setIosImgs] = useState('')

  const [androidImgsSrc, setAndroidImgsSrc] = useState([])
  const [androidImgs, setAndroidImgs] = useState('')

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors }
  } = useForm({ defaultValues })

  const formatDate = dateString => {
    const date = new Date(dateString)

    const formattedDate = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false // Use 24-hour format
    }).format(date)

    // Manually construct the "Y-m-d H:i:s" format
    const [datePart, timePart] = formattedDate.split(', ') // Split date and time parts
    const [month, day, year] = datePart.split('/').map(part => part.padStart(2, '0')) // Ensure leading zeros

    return `${year}-${month}-${day}`
  }

  const onSubmit = data => {
    const {
      /* target_id , */ target_type,
      start_date,
      end_date,
      type,
      image_site,
      image_ios,
      image_android,
      url,
      ...rest
    } = data
    setLoading(true)

    // Convert strings to Date objects
    const startDate = new Date(start_date)
    const endDate = new Date(end_date)

    // Compare the dates
    if (endDate < startDate) {
      toast.error('End Date Must Be After Start Date')
      setLoading(false)
    } else {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_KEY}banners`,
          {
            ...rest,

            type: data.type.id,
            start_date: formatDate(start_date),
            end_date: formatDate(end_date),

            ...(type?.id && { target_type: type.id }),
            ...(getValues('target_id')?.id != '' && { target_id: getValues('target_id').id }),
            ...(siteImgSrc != '' && { image_site: siteImgSrc }),
            ...(iosImageSrc != '' && { image_ios: iosImageSrc }),
            ...(androidImageSrc != '' && { image_android: androidImageSrc }),

            ...(siteImgsSrc.length != 0 && { images_site: siteImgsSrc }),

            ...(iosImgsSrc.length != 0 && { images_ios: iosImgsSrc }),
            ...(androidImgsSrc.length != 0 && { images_android: androidImgsSrc }),

            ...(type.id == 2 && { url: url }),
            ...(type.id == 1 && { target_type: target_type.id }),
            active: +active
          },

          {
            headers: {
              Authorization: getCookie('token')
            }
          }
        )
        .then(res => {
          setLoading(false)
          toast.success(t('success'))
          router.push('/banners')
          reset()
        })
        .catch(error => {
          setLoading(false)
          toast.error(error.response.data.message)
        })
    }
  }

  const [,] = useState([])
  const [,] = useState('')

  return (
    <Card>
      <BannersForm
        getValues={getValues}
        siteImgs={siteImgs}
        setSiteImgs={setSiteImgs}
        siteImgsSrc={siteImgsSrc}
        setSiteImgsSrc={setSiteImgsSrc}
        iosImgsSrc={iosImgsSrc}
        setIosImgsSrc={setIosImgsSrc}
        iosImgs={iosImgs}
        setIosImgs={setIosImgs}
        androidImgsSrc={androidImgsSrc}
        setAndroidImgsSrc={setAndroidImgsSrc}
        androidImgs={androidImgs}
        setAndroidImgs={setAndroidImgs}
        active={active}
        setActive={setActive}
        iosImageSrc={iosImageSrc}
        setIosImgSrc={setIosImgSrc}
        iosImage={iosImage}
        setIosImage={setIosImage}
        androidImage={androidImage}
        setAndroidImage={setAndroidImage}
        androidImageSrc={androidImageSrc}
        setAndroidImageSrc={setAndroidImageSrc}
        siteImgSrc={siteImgSrc}
        setSiteImgSrc={setSiteImgSrc}
        siteImg={siteImg}
        setSiteImg={setSiteImg}
        type={'create'}
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        watch={watch}
        setValue={setValue}
        errors={errors}
        title={t('banners')}
        loading={loading}
      />
    </Card>
  )
}

export default BannersCreate
