import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import SettingsEditForm from 'src/components/Settings/SettingsEditForm'
import { getCookie } from 'cookies-next'

const defaultValues = {
  value: ''
}

const SettingEdit = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { id } = router.query
  const [loading, setLoading] = useState(false)
  const [inputType, setinputType] = useState('')
  const [imgSrc, setImgSrc] = useState('/images/avatars/15.png')
  const [imgSrcAsUrl, setImgSrcAsUrl] = useState('')
  const [active, setActive] = useState('')
  const [options, setOptions] = useState([])

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = data => {
    setLoading(true)
    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_KEY}configurations/${id}`,
        {
          ...(inputType == 'image'
            ? { value: imgSrc }
            : inputType == 'checkbox'
            ? { value: active }
            : inputType == 'select'
            ? { value: JSON.stringify(getValues('select')) }
            : data)
          // ((inputType == 'text' || inputType == 'url' || inputType == 'textarea') && data)
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
        router.push('/settings')
        reset()
      })
      .catch(error => {
        setLoading(false)
        toast.error(error.response.data.message)
      })
  }

  const fetchSettingsDetails = () => {
    if (!isNaN(id)) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_KEY}configurations/${id}/show`, {
          headers: {
            Authorization: getCookie('token'),
            'Accepted-Language': getCookie('lang') ?? 'en'
          }
        })
        .then(res => {
          const data = res.data.data.items
          setinputType(data.type)

          if (data.type == 'image') {
            setImgSrc(data.value ? data.value : '/images/avatars/15.png')
          }
          if (data.type == 'checkbox') {
            setActive(data.value)
          } else if (data.type == 'select') {
            setOptions(data.options)
            setValue('select', data.value)
          } else {
            setValue('value', data.value)
          }
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

  useEffect(() => {
    if (id) {
      fetchSettingsDetails()
    }
  }, [id])

  return (
    <Card>
      <SettingsEditForm
        options={options}
        setActive={setActive}
        active={active}
        imgSrcAsUrl={imgSrcAsUrl}
        setImgSrcAsUrl={setImgSrcAsUrl}
        imgSrc={imgSrc}
        setImgSrc={setImgSrc}
        inputType={inputType}
        type={'edit'}
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        watch={watch}
        setValue={setValue}
        errors={errors}
        title={t('edit')}
        loading={loading}
      />
    </Card>
  )
}

export default SettingEdit
