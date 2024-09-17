import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchGallaryDetails } from 'src/components/Gallary/Details/GallaryDetailsServices'
import GallaryForm from 'src/components/Gallary/GallaryForm'

const defaultValues = {
    name: '',
    user_id: '',
    theme_folder_id: '',
    sort: '',
    active: false,
    image : null
}

const GallaryEdit = ({ type, id }) => {
  const auth = useSelector(state => state.auth)
  const lang = useSelector(state => state.lang)
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

  const testBase64 = src => {
    const base64Regex = /^(data:image\/[a-zA-Z]*;base64,)?([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/

    return base64Regex.test(src)
  }

  const onSubmit = data => {
    setLoading(true)

    data.user_id = data.user_id?.id;
    data.theme_folder_id = data.theme_folder_id?.id;

    if(testBase64(imgSrc)){ 
      data.image = imgSrc;
    }else{ 
      delete data.image;
    }

    axios
      .put(`${process.env.NEXT_PUBLIC_API_KEY}gallary/${id}`, data, {
        headers: {
          Authorization: auth.token
        }
      })
      .then(res => {
        setLoading(false)
        toast.success(t('success'))
        router.push(`/gallary/details/${id}`)
        reset()
      })
      .catch(error => {
        setLoading(false)
        toast.error(error.response.data.message)
      })
  }

  const fetchGallaryDetails = () => {
    setValue('name', type.name)
    setValue('user_id', type.user)
    setValue('theme_folder_id', type.theme_folder)
    setValue('sort', type.sort)
    setValue('active', type.active)
    setValue('image' , type?.image)
    setImgSrc(type?.image);
  }

  useEffect(() => {
    if (id) {
      fetchGallaryDetails()
    }
  }, [id])

  return (
    <Card>
      <GallaryForm
        type={'edit'}
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        watch={watch}
        setValue={setValue}
        errors={errors}
        title={t('gallary_edit')}
        loading={loading}
        imgSrc={imgSrc}
        setImgSrc={setImgSrc}
        gallaryImg={gallaryImg}
        setGallaryImg={setGallaryImg}
      />
    </Card>
  )
}

export const getServerSideProps = async context => {
  const type = await fetchGallaryDetails(context.params.id, context.req.cookies)

  return {
    props: { type, id: context.params.id }
  }
}

export default GallaryEdit
