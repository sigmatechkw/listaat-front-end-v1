import { useRouter } from 'next/router'
import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { getCookie } from 'cookies-next'
import ContactUsForm from 'src/components/contact_us/ContactUsForm'

const defaultValues = {
  name: '',
  email: '',
  phone: '',
  phone: '',
  country_id: '',
  message: ''
}

const ContactUsCreate = () => {
  const { t } = useTranslation()
  const router = useRouter()
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
    const [hour, minute, second] = timePart.split(':').map(part => part.padStart(2, '0')) // Ensure leading zeros

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
  }

  const onSubmit = data => {
    setLoading(true)

    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_KEY}contact-us`,
        {
          ...data,
          //images: contactUsImg,
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
        router.push('/promo_codes')
        reset()
      })
      .catch(error => {
        setLoading(false)
        toast.error(error.response.data.message)
      })
  }

  return (
    <Card>
      <ContactUsForm
        imgSrc={imgSrc}
        contactUsImg={contactUsImg}
        setImgSrc={setImgSrc}
        setContactUsImg={setContactUsImg}
        type={'create'}
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        watch={watch}
        setValue={setValue}
        errors={errors}
        title={t('contact_us')}
        loading={loading}
      />
    </Card>
  )
}

export default ContactUsCreate
