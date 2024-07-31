import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchItemGroupsDetails } from 'src/components/ItemGroups/Details/ItemGroupsDetailsServices'
import ItemGroupsForm from 'src/components/ItemGroups/ItemGroupsForm'

const defaultValues = {
    name: '',
    user_id: '',
    sort: '',
    active: false
}

const ItemGroupsEdit = ({ type, id }) => {
  const auth = useSelector(state => state.auth)
  const lang = useSelector(state => state.lang)
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

    data.user_id = data.user_id?.id;

    axios
      .put(`${process.env.NEXT_PUBLIC_API_KEY}item-groups/${id}`, data, {
        headers: {
          Authorization: auth.token
        }
      })
      .then(res => {
        setLoading(false)
        toast.success(t('success'))
        router.push(`/item-groups/details/${id}`)
        reset()
      })
      .catch(error => {
        setLoading(false)
        toast.error(error.response.data.message)
      })
  }

  const fetchItemGroupsDetails = () => {
    setValue('name', type.name)
    setValue('user_id', type.user)
    setValue('sort', type.sort)
    setValue('active', type.active)
  }

  useEffect(() => {
    if (id) {
      fetchItemGroupsDetails()
    }
  }, [id])

  return (
    <Card>
      <ItemGroupsForm
        type={'edit'}
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        watch={watch}
        setValue={setValue}
        errors={errors}
        title={t('item_groups_edit')}
        loading={loading}
      />
    </Card>
  )
}

export const getServerSideProps = async context => {
  const type = await fetchItemGroupsDetails(context.params.id, context.req.cookies)

  return {
    props: { type, id: context.params.id }
  }
}

export default ItemGroupsEdit
