import { useRouter } from 'next/router'
import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import SettingsEditForm from 'src/components/Settings/SettingsEditForm'
import SettingsForm from 'src/components/Settings/SettingsForm'
import { getCookie } from 'cookies-next'

const defaultValues = {
  label_ar: '',
  label_en: '',
  description: '',
  value: '',
  type: 'text',
  scope: '1',
  group: ''
}

const SettingsCreate = () => {
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
    // Extract the label_ar and label_en fields from data
    const { label_ar, label_en, ...rest } = data

    // Create the combined label field
    const combinedData = {
      ...rest,
      label: {
        en: label_en,
        ar: label_ar
      }
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_API_KEY}configurations`, combinedData, {
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
      <SettingsForm
        type={'create'}
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        watch={watch}
        setValue={setValue}
        errors={errors}
        title={t('settings_create')}
        loading={loading}
      />
    </Card>
  )
}

export default SettingsCreate
