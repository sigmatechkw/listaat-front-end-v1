import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import PaymentsEditForm from 'src/components/payments/PaymentsEditForm'
import { getCookie } from 'cookies-next'

const defaultValues = {
  order: ''
  //active: ''
}

const PaymentsEdit = () => {
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
    reset,
    formState: { errors }
  } = useForm({ defaultValues })

  const testBase64 = src => {
    const base64Regex = /^(data:image\/[a-zA-Z]*;base64,)?([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/

    return base64Regex.test(src)
  }

  const onSubmit = data => {
    setLoading(true)
    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_KEY}payment-methods/${id}`,
        {
          ...data,
          is_active: +active,
          ...(testBase64(imgSrc) && { image: imgSrc })
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
            .then(() => {
              setLoading(false)
              toast.success(t('success'))
              router.push('/payments-methods')
              reset()
            })
            .catch(error => {
              setLoading(false)
              toast.error(error.response.data.message)
            })
        } else {
          setLoading(false)
          toast.success(t('success'))
          router.push('/payments-methods')
          reset()
        }
      })
      .catch(error => {
        setLoading(false)
        toast.error(error.response.data.message)
      })
  }

  const fetchPaymentsDetails = () => {
    if (!isNaN(id)) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_KEY}payment-methods/${id}`, {
          headers: {
            Authorization: getCookie('token'),
            'Accepted-Language': getCookie('lang') ?? 'en'
          }
        })
        .then(res => {
          const data = res.data.data.items

          //setValue('active', data.online == false ? '0' : '1')
          setValue('order', data.order)
          setActive(data.active)
          setImgSrc(data.image)

          const creds = res.data.data.items.credentials
          setCredentials(creds)
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
      fetchPaymentsDetails(id)
    }
  }, [id])

  return (
    <Card>
      <PaymentsEditForm
        credentials={credentials}
        setCredentials={setCredentials}
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

export default PaymentsEdit
