import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getCookie } from 'cookies-next'
import CountriesEditForm from 'src/components/countries/CountriesEditForm'

const defaultValues = {
  active: ''
}

const CountriesEdit = () => {
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


  const onSubmit = data => {
    setLoading(true)
    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_KEY}countries/${id}/toggle-active`,
        {
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
        router.push('/countries')
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

  const fetchCountriesDetails = () => {
    if (!isNaN(id)) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_KEY}countries/${id}`, {
          headers: {
            Authorization: getCookie('token'),
            'Accepted-Language': getCookie('lang') ?? 'en'
          }
        })
        .then(res => {
          const { active } = res.data.data.items

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
        fetchCountriesDetails()
    }
  }, [id])

  return (
    <Card>
      <CountriesEditForm
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

export default CountriesEdit
