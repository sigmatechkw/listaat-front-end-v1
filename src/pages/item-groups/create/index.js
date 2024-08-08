import { useRouter } from 'next/router'
import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import ItemGroupsForm from 'src/components/ItemGroups/ItemGroupsForm'

const defaultValues = {
  name: '',
  user_id: '',
  sort: '',
  active: false
}

const ItemGroupsCreate = () => {
  const auth = useSelector(state => state.auth)
  const { t } = useTranslation()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [itemGroupImg, setItemGroupImg] = useState('')
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

    if(imgSrc){
      data.image = imgSrc;
    }else{ 
      delete data.image;
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_API_KEY}item-groups`, data, {
        headers: {
          Authorization: auth.token
        }
      })
      .then(res => {
        setLoading(false)
        toast.success(t('success'))
        router.push('/item-groups')
        reset()
      })
      .catch(error => {
        setLoading(false)
        toast.error(error.response.data.message)
      })
  }

  return (
    <Card>
      <ItemGroupsForm
        type={'create'}
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        watch={watch}
        setValue={setValue}
        errors={errors}
        title={t('item_groups_create')}
        loading={loading}
        imgSrc={imgSrc}
        setImgSrc={setImgSrc}
        itemGroupImg={itemGroupImg}
        setItemGroupImg={setItemGroupImg}
      />
    </Card>
  )
}

export default ItemGroupsCreate
