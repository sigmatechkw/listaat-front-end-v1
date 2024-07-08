import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getCookie } from 'cookies-next'
import ContactUsEditForm from 'src/components/contact_us/ContactUsEditForm'

const defaultValues = {
  name: '',
  email: '',
  phone: '',
  phone: '',
  country_id: '',
  message: ''
}

const ContactUsEdit = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { id } = router.query
  const [loading, setLoading] = useState(false)
  const [contactUsImg, setContactUsImg] = useState('')
  const [imgSrc, setImgSrc] = useState('/images/avatars/15.png')

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = data => {
    setLoading(true)
    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_KEY}configurations/${id}`,
        {
          ...data,
          country_id: data.country_id.id
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
        router.push('/contact_us')
        reset()
      })
      .catch(error => {
        setLoading(false)
        toast.error(error.response.data.message)
      })
  }

  const fetchContactUsDetails = () => {
    if (!isNaN(id)) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_KEY}contact-us/${id}`, {
          headers: {
            Authorization: getCookie('token'),
            'Accepted-Language': getCookie('lang') ?? 'en'
          }
        })
        .then(res => {
          const data = res.data.data.items
          reset(data)
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
      fetchContactUsDetails()
    }
  }, [id])

  return (
    <Card>
      <ContactUsEditForm
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

export default ContactUsEdit
