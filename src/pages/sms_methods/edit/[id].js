import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import SmsEditForm from 'src/components/sms_methods/SmsEditForm'
import { getCookie } from 'cookies-next'

const defaultValues = {
  name: '',
  description: '',
  active: ''
}

const SmsEdit = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { id } = router.query
  const [loading, setLoading] = useState(false)
  const [imgSrc, setImgSrc] = useState('/images/avatars/15.png')
  const [active, setActive] = useState(false)
  const [credentials, setCredentials] = useState([])

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

    const testBase64 = src => {
      const base64Regex = /^(data:image\/[a-zA-Z]*;base64,)?([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/

      return base64Regex.test(src)
    }

    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_KEY}sms-methods/${id}`,
        {
          ...(imgSrc != '/images/avatars/15.png' && testBase64(imgSrc) && { image: imgSrc }),
          name: data.name,
          description: data.description,
          active: +active
          /*  sms_method_sms_box_gateway_id: data.sms_method_sms_box_gateway_id,
          sms_method_sms_box_password: data.sms_method_sms_box_password,
          sms_method_sms_box_sender_id: data.sms_method_sms_box_sender_id,
          sms_method_sms_box_user_name: data.sms_method_sms_box_user_name */
        },
        {
          headers: {
            Authorization: getCookie('token')
          }
        }
      )
      .then(() => {
        if (credentials.length != 0) {
          axios
            .put(
              `${process.env.NEXT_PUBLIC_API_KEY}method-credentials`,
              {
                credentials: credentials.map(item => {
                  return { id: item.id, value: item.value }
                })
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
              router.push('/sms_methods')
              reset()
            })
            .catch(error => {
              setLoading(false)
              toast.error(error.response.data.message)
            })
        } else {
          setLoading(false)
          toast.success(t('success'))
          router.push('/sms_methods')
          reset()
        }
      })
      .catch(error => {
        setLoading(false)
        toast.error(error.response.data.message)
      })
  }

  const fetchSmsDetails = () => {
    if (!isNaN(id)) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_KEY}sms-methods/${id}`, {
          headers: {
            Authorization: getCookie('token'),
            'Accepted-Language': getCookie('lang') ?? 'en'
          }
        })
        .then(res => {
          reset(res.data.data.items)
          setImgSrc(res.data.data.items.image)
          setActive(res.data.data.items.active)

          const creds = res.data.data.items.credentials
          setCredentials(creds)

          /*  for (let x = 0; x < creds.length; x++) {
            setValue(creds[x].key, creds[x].value ? creds[x].value : creds[x].default_value)
          } */
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
      fetchSmsDetails()
    }
  }, [id])

  return (
    <Card>
      <SmsEditForm
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
        credentials={credentials}
        setCredentials={setCredentials}
      />
    </Card>
  )
}

export default SmsEdit
