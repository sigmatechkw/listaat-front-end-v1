import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getCookie } from 'cookies-next'
import PagesEditForm from 'src/components/pages/PagesEditForm'

const defaultValues = {
  title_en: '',
  title_ar: '',
  content_ar: '',
  content_en: '',
  slug: '',
  active: ''
}

const MainPagesEdit = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { id } = router.query
  const [loading, setLoading] = useState(false)
  const [contentAr, setContentAr] = useState('')
  const [contentEn, setContentEn] = useState('')
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
      .put(
        `${process.env.NEXT_PUBLIC_API_KEY}pages/${id}`,
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

  const fetchPagesDetails = () => {
    if (!isNaN(id)) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_KEY}pages/${id}`, {
          headers: {
            Authorization: getCookie('token'),
            'Accepted-Language': getCookie('lang') ?? 'en'
          }
        })
        .then(res => {
          reset(res.data.data.items)
          setValue('active', +res.data.data.items.active)
          setContentAr(res.data.data.items.content_ar)
          setContentEn(res.data.data.items.content_en)
          setActive(+res.data.data.items.active)
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
      fetchPagesDetails()
    }
  }, [id])

  return (
    <Card>
      <PagesEditForm
        active={active}
        setActive={setActive}
        contentAr={contentAr}
        setContentAr={setContentAr}
        contentEn={contentEn}
        setContentEn={setContentEn}
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

export default MainPagesEdit
