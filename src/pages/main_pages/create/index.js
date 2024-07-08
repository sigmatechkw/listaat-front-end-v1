import { useRouter } from 'next/router'
import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { getCookie } from 'cookies-next'
import PagesForm from 'src/components/pages/PagesForm'

const defaultValues = {
  title_en: '',
  title_ar: '',
  content_ar: '',
  content_en: '',
  slug: ''
}

const PagesCreate = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [contentAr, setContentAr] = useState([])
  const [contentEn, setContentEn] = useState([])
  const [active, setActive] = useState(false)

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
      .post(
        `${process.env.NEXT_PUBLIC_API_KEY}pages`,
        {
          ...data,
          content_ar: contentAr,
          content_en: contentEn,
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
        router.push('/main_pages')
        reset()
      })
      .catch(error => {
        setLoading(false)
        toast.error(error.response.data.message)
      })
  }

  return (
    <Card>
      <PagesForm
        active={active}
        setActive={setActive}
        type={'create'}
        contentEn={contentEn}
        setContentEn={setContentEn}
        contentAr={contentAr}
        setContentAr={setContentAr}
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        watch={watch}
        setValue={setValue}
        errors={errors}
        title={t('pages')}
        loading={loading}
      />
    </Card>
  )
}

export default PagesCreate
