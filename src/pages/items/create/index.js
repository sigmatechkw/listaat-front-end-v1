import { useRouter } from 'next/router'
import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import ItemsForm from 'src/components/Items/ItemsForm'

const defaultValues = {
  name: '',
  cost : '',
  user_id : '',
  item_group_id: '',
  country_id: '',
  extra_cost: '',
  width: '',
  height: '',
  length: '',
  unit: '',
  notes: '',
  source: '',
  image: '/images/avatars/15.png',
  active: false
}

const ItemsCreate = () => {
  const auth = useSelector(state => state.auth)
  const { t } = useTranslation()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [itemImg, setItemImg] = useState('')
  const [imgSrc, setImgSrc] = useState('/images/avatars/15.png')


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
    
    data.image = imgSrc;
    axios
      .post(`${process.env.NEXT_PUBLIC_API_KEY}items`, data, {
        headers: {
          Authorization: auth.token
        }
      })
      .then(res => {
        setLoading(false)
        toast.success(t('success'))
        router.push('/items')
        reset()
      })
      .catch(error => {
        setLoading(false)
        console.log(error);
        toast.error(error.response.data.message)
      })
  }

  return (
    <Card>
      <ItemsForm
        type={'create'}
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        watch={watch}
        setValue={setValue}
        errors={errors}
        itemImg={itemImg}
        setItemImg={setItemImg}
        imgSrc={imgSrc}
        setImgSrc={setImgSrc}
        title={t('item_create')}
        loading={loading}
      />
    </Card>
  )
}

export default ItemsCreate
