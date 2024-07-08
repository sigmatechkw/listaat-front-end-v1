import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getCookie } from 'cookies-next'
import BannersEditForm from 'src/components/banners/BannersEditForm'

const defaultValues = {
  name: '',
  type: '',
  target_id: '',
  target_type: '',
  target_ios: false,
  target_android: false,
  target_site: false,
  image_site: '',
  image_ios: '',
  image_android: '',
  start_date: '',
  end_date: '',
  active: '',
  order: '',
  target_site: false,
  url: ''
}

const BannersEdit = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { id } = router.query
  const [loading, setLoading] = useState(false)
  const [allTypes, setAllTypes] = useState([])
  const [active, setActive] = useState(false)
  const [siteImgSrc, setSiteImgSrc] = useState('')
  const [currentType, setCurrentType] = useState('')

  const [androidImageSrc, setAndroidImageSrc] = useState('')
  const [androidImage, setAndroidImage] = useState('')

  const [iosImageSrc, setIosImgSrc] = useState('')
  const [iosImage, setIosImage] = useState('')
  const [endDate, setEndDate] = useState('')
  const [startDate, setStartDate] = useState('')
  const [allTargets, setAllTargets] = useState([])
  const [showTargetItems, setShowTargetItems] = useState(false)
  const [targetItems, setTargetItems] = useState([])
  const [selectedTargetType, setSelectedTargetType] = useState('')

  const [siteImgsSrc, setSiteImgsSrc] = useState([])
  const [siteImgs, setSiteImgs] = useState('')

  const [iosImgsSrc, setIosImgsSrc] = useState([])
  const [iosImgs, setIosImgs] = useState('')

  const [androidImgsSrc, setAndroidImgsSrc] = useState([])
  const [androidImgs, setAndroidImgs] = useState('')

  const [deletedSiteImgs, setDeletedSiteImgs] = useState([])
  const [deletedIosImgs, setDeletedIosImgs] = useState([])

  const [deletedAndroidImgs, setDeletedAndroidImgs] = useState([])

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

    // Extract the year, month, and day
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-indexed, so add 1
    const day = String(date.getDate()).padStart(2, '0')

    // Format the extracted values as "YYYY-MM-DD"
    const formattedDateString = `${year}-${month}-${day}`

    return formattedDateString
  }

  const testBase64 = src => {
    const base64Regex = /^(data:image\/[a-zA-Z]*;base64,)?([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/

    return base64Regex.test(src)
  }

  const onSubmit = data => {
    setLoading(true)

    const {
      image_android,
      target_android,
      type,
      start_date,
      end_date,
      url,
      image_ios,
      target_ios,
      image_site,
      views,
      id,
      clicks,
      images_android,
      images_ios /* target_type */,
      images_site,
      target_type,
      target_site,
      target_id,
      ...rest
    } = data

    if (new Date(startDate) > new Date(endDate)) {
      setLoading(false)
      toast.error(t('The end date must be the date after the start date'))
    } else {
      axios
        .put(
          `${process.env.NEXT_PUBLIC_API_KEY}banners/${id}`,
          {
            ...rest,
            ...(getValues('target_android') && testBase64(androidImageSrc) && { image_android: androidImageSrc }),
            ...(getValues('target_ios') && testBase64(iosImageSrc) && { image_ios: iosImageSrc }),
            ...(getValues('target_site') && testBase64(siteImgSrc) && { image_site: siteImgSrc }),

            ...(startDate && { start_date: formatDate(startDate) }),
            ...(endDate && { end_date: formatDate(endDate) }),

            ...(siteImgsSrc.length != 0 && { images_site: siteImgsSrc }),
            ...(iosImgsSrc.length != 0 && { images_ios: iosImgsSrc }),
            ...(androidImgsSrc.length != 0 && { images_android: androidImgsSrc }),

            type: type.id,
            ...(type.id == 1 && { target_type: target_type.id }),
            ...(type.id == 2 && { url: url }),
            ...(target_id?.id && { target_id: target_id.id }),
            active: +active,

            ...(deletedSiteImgs.length > 0 && { deleted_images_site_ids: deletedSiteImgs }),
            ...(deletedIosImgs.length > 0 && { deleted_images_ios_ids: deletedIosImgs }),
            ...(deletedAndroidImgs.length > 0 && { deleted_images_android_ids: deletedAndroidImgs })
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

  const formatToOriginalDate = dateString => {
    const parsedDate = new Date(dateString.replace(' ', 'T') + 'Z')

    // Convert the Date object to the desired format
    const formattedDateString = parsedDate.toISOString()

    return formattedDateString
  }

  const fetchTargetItems = (target_type, target_id) => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_KEY}targetItems/${target_type.id}`, {
        headers: {
          Authorization: getCookie('token'),
          'Accepted-Language': getCookie('lang') ?? 'en'
        }
      })

      .then(res => {
        const formattedData = res.data.data.items.map(item => {
          return { id: item.id, label: item.name }
        })

        setTargetItems(formattedData)
        setShowTargetItems(true)

        if (target_id) {
          const selectedTargetItem = formattedData.find(i => i.id == target_id)
          setValue('target_id', selectedTargetItem)
        }
        //1dddddddddddddd
        setSelectedTargetType(target_type)
      })
  }

  const fetchAllTargets = (target_type, target_id) => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_KEY}targets`, {
        headers: {
          Authorization: getCookie('token'),
          'Accepted-Language': getCookie('lang') ?? 'en'
        }
      })

      .then(res => {
        const keyValueArray = Object.entries(res.data.data.items)

        const mappedArray = keyValueArray.map(([key, value]) => {
          return { id: key, label: value }
        })

        /* Handle Show Options */
        const selectedTargetType = mappedArray.find(i => i.id == target_type)

        /* Handle Show Options */
        setAllTargets(mappedArray)

        setValue('target_type', selectedTargetType)

        if (target_id) {
          fetchTargetItems(selectedTargetType, target_id)
        }
      })
  }

  const fetchBannersDetails = allType => {
    if (!isNaN(id)) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_KEY}banners/${id}`, {
          headers: {
            Authorization: getCookie('token'),
            'Accepted-Language': getCookie('lang') ?? 'en'
          }
        })
        .then(res => {
          const { start_date, end_date, ...rest } = res.data.data.items

          setSiteImgs(res.data.data.items.images_site)
          setAndroidImgs(res.data.data.items.images_android)
          setIosImgs(res.data.data.items.images_ios)

          console.log(res.data.data.items)
          const filteredType = allType?.filter(item => item.id == res.data.data.items.type)[0]

          setValue('start_date', formatToOriginalDate(start_date))
          setValue('end_date', formatToOriginalDate(end_date))

          setEndDate(formatToOriginalDate(end_date))
          setStartDate(formatToOriginalDate(start_date))

          reset(rest)

          setSiteImgSrc(res.data.data.items.image_site)

          setIosImgSrc(res.data.data.items.image_ios)
          setAndroidImageSrc(res.data.data.items.image_android)

          setCurrentType(filteredType.id)

          if (filteredType.id == 1) {
            fetchAllTargets(res.data.data.items.target_type, res.data.data.items.target_id)
          }

          setValue('type', filteredType)
          setActive(res.data.data.items.active)
        })
        .catch(err => {
          if (err.response) {
            toast.error(err.response.data.message)
          }
        })
    } else {
      router.push('/404')
    }
  }

  const fetchAllTypes = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_KEY}types`, {
        headers: {
          Authorization: getCookie('token'),
          'Accepted-Language': getCookie('lang') ?? 'en'
        }
      })

      .then(res => {
        const keyValueArray = Object.entries(res.data.data.items)

        const mappedArray = keyValueArray.map(([key, value]) => {
          return { id: key, label: value }
        })
        setAllTypes(mappedArray)

        fetchBannersDetails(mappedArray)
      })
  }

  useEffect(() => {
    if (id) {
      fetchAllTypes()
    }
  }, [id])

  return (
    <Card>
      <BannersEditForm
        deletedAndroidImgs={deletedAndroidImgs}
        setDeletedAndroidImgs={setDeletedAndroidImgs}
        deletedSiteImgs={deletedSiteImgs}
        setDeletedSiteImgs={setDeletedSiteImgs}
        deletedIosImgs={deletedIosImgs}
        setDeletedIosImgs={setDeletedIosImgs}
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
        androidImage={androidImage}
        setAndroidImage={setAndroidImage}
        androidImageSrc={androidImageSrc}
        setAndroidImageSrc={setAndroidImageSrc}
        iosImage={iosImage}
        setIosImage={setIosImage}
        iosImageSrc={iosImageSrc}
        setIosImgSrc={setIosImgSrc}
        siteImgSrc={siteImgSrc}
        setSiteImgSrc={setSiteImgSrc}
        currentType={currentType}
        setCurrentType={setCurrentType}
        active={active}
        setActive={setActive}
        allTypes={allTypes}
        getValues={getValues}
        type={'edit'}
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        watch={watch}
        setValue={setValue}
        errors={errors}
        title={t('edit')}
        loading={loading}
        endDate={endDate}
        setEndDate={setEndDate}
        allTargets={allTargets}
        fetchAllTargets={fetchAllTargets}
        showTargetItems={showTargetItems}
        targetItems={targetItems}
        fetchTargetItems={fetchTargetItems}
        startDate={startDate}
        setStartDate={setStartDate}
        selectedTargetType={selectedTargetType}
        setSelectedTargetType={setSelectedTargetType}
        setTargetItems={setTargetItems}
        setShowTargetItems={setShowTargetItems}
      />
    </Card>
  )
}

export default BannersEdit
