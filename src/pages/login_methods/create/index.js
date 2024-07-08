import { useRouter } from 'next/router'
import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import LoginMethodsForm from 'src/components/login_methods/LoginMethodsForm'
import { getCookie } from 'cookies-next'

const defaultValues = {
  name_ar: '',
  name_en: '',
  description_ar: '',
  description_en: '',
  code: '',
  start_date: new Date(),
  end_date: null,
  first_order_only: '',
  min_order_amount: '',
  max_applied_amount: '',
  amount: '',
  applied_users_type: '',
  //usage_type: '',
  //promo_type: '',
  active: ''
}

const LoginMethodsCreate = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

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
      .post(`${process.env.NEXT_PUBLIC_API_KEY}promo-codes`, data, {
        headers: {
          Authorization: getCookie('token')
        }
      })
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

  return (
    <Card>
      <LoginMethodsForm
        type={'create'}
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        watch={watch}
        setValue={setValue}
        errors={errors}
        title={t('login_methods')}
        loading={loading}
      />
    </Card>
  )
}

export default LoginMethodsCreate
