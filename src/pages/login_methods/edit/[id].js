import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import LoginMethodsEditForm from 'src/components/login_methods/LoginMethodsEditForm'
import { getCookie } from 'cookies-next'

const defaultValues = {
  name_en: '',
  name_ar: '',
  description_ar: '',
  description_en: '',
  active: ''
}

const LoginMethodsEdit = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { id } = router.query
  const [loading, setLoading] = useState(false)
  const [imgSrc, setImgSrc] = useState('/images/avatars/15.png')
  const [active, setActive] = useState(false)

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm({ defaultValues })

  const testBase64 = src => {
    const base64Regex = /^(data:image\/[a-zA-Z]*;base64,)?([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/

    return base64Regex.test(src)
  }

  const onSubmit = data => {
    setLoading(true)

    /*     
    if (testBase64(imgSrc)) { */
    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_KEY}login-methods/${id}`,
        {
          ...data,
          ...(testBase64(imgSrc) && { image: imgSrc }),
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
        router.push('/login_methods')
        reset()
      })
      .catch(error => {
        setLoading(false)
        toast.error(error.response.data.message)
      })
    /* } else {
      setLoading(false)
      toast.error('please upload image')
    } */
  }

  const fetchLoginMethodsDetails = () => {
    if (!isNaN(id)) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_KEY}login-methods/${id}`, {
          headers: {
            Authorization: getCookie('token'),
            'Accepted-Language': getCookie('lang') ?? 'en'
          }
        })
        .then(res => {
          const { description_ar, description_en, image, name_ar, name_en, active } = res.data.data.items
          setValue('description_ar', description_ar)
          setValue('description_en', description_en)
          setImgSrc(image)
          setValue('name_ar', name_ar)
          setValue('name_en', name_en)
          setValue('active', active)
          setActive(active)
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
      fetchLoginMethodsDetails()
    }
  }, [id])

  return (
    <Card>
      <LoginMethodsEditForm
        active={active}
        setActive={setActive}
        imgSrc={imgSrc}
        setImgSrc={setImgSrc}
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

export default LoginMethodsEdit
