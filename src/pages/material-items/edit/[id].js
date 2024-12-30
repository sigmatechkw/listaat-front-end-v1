import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchMaterialItemDetails } from 'src/components/MaterialItems/Details/MaterialItemDetailsServices'
import MaterialItemForm from 'src/components/MaterialItems/MaterialItemForm'

const defaultValues = {
    name: '',
    user_id: '',
    material_folder_id: '',
    sort: '',
    active: false,
    file : null
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
    data.material_folder_id = data.material_folder_id?.id;

    if(testBase64(imgSrc)){ 
      data.file = imgSrc;
    }else{ 
      delete data.file;
    }

    axios
      .put(`${process.env.NEXT_PUBLIC_API_KEY}material-items/${id}`, data, {
        headers: {
          Authorization: auth.token
        }
      })
      .then(res => {
        setLoading(false)
        toast.success(t('success'))
        router.push(`/material-items/details/${id}`)
        reset()
      })
      .catch(error => {
        setLoading(false)
        toast.error(error.response.data.message)
      })
  }

  const fetchMaterialItemDetails = () => {
    setValue('name', type.name)
    setValue('user_id', type.user)
    setValue('material_folder_id', type.material_folder)
    setValue('sort', type.sort)
    setValue('active', type.active)
    setValue('file' , type?.file)
    setImgSrc(type?.file);
  }

  useEffect(() => {
    if (id) {
      fetchMaterialItemDetails()
    }
  }, [id])

  return (
    <Card>
      <MaterialItemForm
        type={'edit'}
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        watch={watch}
        setValue={setValue}
        errors={errors}
        title={t('material_item_edit')}
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
  const type = await fetchMaterialItemDetails(context.params.id, context.req.cookies)

  return {
    props: { type, id: context.params.id }
  }
}

export default GallaryEdit
