import { useRouter } from 'next/router'
import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import MaterialItemForm from 'src/components/MaterialItems/MaterialItemForm'

const defaultValues = {
  name: '',
  user_id: '',
  material_folder_id: '',
  sort: '',
  active: false,
  file : null
}

const MaterialItemCreate = () => {
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
    data.material_folder_id = data.material_folder_id?.id;

    if(imgSrc){
      data.file = imgSrc;
    }else{ 
      delete data.file;
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_API_KEY}material-items`, data, {
        headers: {
          Authorization: auth.token
        }
      })
      .then(res => {
        setLoading(false)
        toast.success(t('success'))
        router.push('/material-items')
        reset()
      })
      .catch(error => {
        setLoading(false)
        toast.error(error.response.data.message)
      })
  }

  return (
    <Card>
      <MaterialItemForm
        type={'create'}
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        watch={watch}
        setValue={setValue}
        errors={errors}
        title={t('material_item_create')}
        loading={loading}
        imgSrc={imgSrc}
        setImgSrc={setImgSrc}
        gallaryImg={gallaryImg}
        setGallaryImg={setGallaryImg}
      />
    </Card>
  )
}

export default MaterialItemCreate
