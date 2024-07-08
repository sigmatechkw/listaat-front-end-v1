import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import PushMessagesEditForm from 'src/components/push_messages/PushMessagesEditForm'
import { getCookie } from 'cookies-next'

const defaultValues = {
  title_en: '',
  title_ar: '',
  body_ar: '',
  body_en: '',
  active: '',
  image: ''
}

const PushMessagesEdit = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { id } = router.query
  const [loading, setLoading] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState([])
  const [imgSrc, setImgSrc] = useState(null)

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm({ defaultValues })

  const testBase64 = imgSrc => {
    const base64Regex = /^(data:image\/[a-zA-Z]*;base64,)?([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/

    return base64Regex.test(imgSrc)
  }

  const onSubmit = data => {
    setLoading(true)

    if (testBase64(imgSrc)) {
      axios
        .put(
          `${process.env.NEXT_PUBLIC_API_KEY}push-message/${id}`,
          {
            ...data,
            users: selectedUsers,
            image: imgSrc,
            users: selectedUsers.map(item => item.id)
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
          router.push('/push_messages')
          reset()
        })
        .catch(error => {
          setLoading(false)
          toast.error(error.response.data.message)
        })
    } else {
      setLoading(false)
      toast.error('please upload image')
    }
  }

  const fetchPushMessagesDetails = () => {
    if (!isNaN(id)) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_KEY}push-message/${id}`, {
          headers: {
            Authorization: getCookie('token'),
            'Accepted-Language': getCookie('lang') ?? 'en'
          }
        })
        .then(res => {
          const { body_ar, body_en, image, title_ar, title_en, active } = res.data.data.items

          setValue('body_ar', body_ar)
          setValue('body_en', body_en)
          setImgSrc(image)
          setValue('title_ar', title_ar)
          setValue('title_en', title_en)
          setValue('active', active)
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
      fetchPushMessagesDetails()
    }
  }, [id])

  return (
    <Card>
      <PushMessagesEditForm
        type={'edit'}
        imgSrc={imgSrc}
        setImgSrc={setImgSrc}
        setSelectedUsers={setSelectedUsers}
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

export default PushMessagesEdit
