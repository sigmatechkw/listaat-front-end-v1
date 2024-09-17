import { useRouter } from 'next/router'
import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import GallaryForm from 'src/components/Gallary/GallaryForm'

const defaultValues = {
  name: '',
  user_id: '',
  theme_folder_id: '',
  sort: '',
  active: false,
  image : null
}

const GallaryCreate = () => {
  const auth = useSelector(state => state.auth)
  const { t } = useTranslation()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [gallaryImg, setGallaryImg] = useState('')
  const [imgSrc, setImgSrc] = useState('')

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

    data.user_id = data.user_id?.id;
    data.theme_folder_id = data.theme_folder_id?.id;

    if(imgSrc){
      data.image = imgSrc;
    }else{ 
      delete data.image;
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_API_KEY}gallary`, data, {
        headers: {
          Authorization: auth.token
        }
      })
      .then(res => {
        setLoading(false)
        toast.success(t('success'))
        router.push('/gallary')
        reset()
      })
      .catch(error => {
        setLoading(false)
        toast.error(error.response.data.message)
      })
  }

  return (
    <Card>
      <GallaryForm
        type={'create'}
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        watch={watch}
        setValue={setValue}
        errors={errors}
        title={t('gallary_create')}
        loading={loading}
        imgSrc={imgSrc}
        setImgSrc={setImgSrc}
        gallaryImg={gallaryImg}
        setGallaryImg={setGallaryImg}
      />
    </Card>
  )
}

export default GallaryCreate
