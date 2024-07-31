import { useRouter } from 'next/router'
import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import ItemProjectForm from 'src/components/ItemProject/ItemProjectForm'

const defaultValues = {
  project_id: '',
  item_group_id: '',
  item_id: '',
  qty: '',
  sort: '',
}

const ItemProjectCreate = () => {
  const auth = useSelector(state => state.auth)
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

    data.project_id = data.project_id?.id;
    data.item_group_id = data.item_group_id?.id;
    data.item_id = data.item_id?.id;

    axios
      .post(`${process.env.NEXT_PUBLIC_API_KEY}project-items`, data, {
        headers: {
          Authorization: auth.token
        }
      })
      .then(res => {
        setLoading(false)
        toast.success(t('success'))
        router.push('/item-project')
        reset()
      })
      .catch(error => {
        setLoading(false)
        toast.error(error.response.data.message)
      })
  }

  return (
    <Card>
      <ItemProjectForm
        type={'create'}
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        watch={watch}
        setValue={setValue}
        errors={errors}
        title={t('item_project_create')}
        loading={loading}
      />
    </Card>
  )
}

export default ItemProjectCreate
