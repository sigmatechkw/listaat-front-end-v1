import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchCollectionsDetails } from 'src/components/Collections/Details/CollectionsDetailsServices';
import CollectionsForm from 'src/components/Collections/CollectionsForm'

const defaultValues = {
  name: '',
  user_id: '',
  parent_id: '',
  type: '',
  active: false
}

const CollectionEdit = ({ type, id }) => {
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
    data.parent_id = data.parent_id?.id
    data.type = data.type?.id;

    axios
      .put(`${process.env.NEXT_PUBLIC_API_KEY}collections/${id}`, data, {
        headers: {
          Authorization: auth.token
        }
      })
      .then(res => {
        setLoading(false)
        toast.success(t('success'))
        router.push(`/collections/details/${id}`)
        reset()
      })
      .catch(error => {
        setLoading(false)
        toast.error(error.response.data.message)
      })
  }

  const fetchCollectionsDetails = () => {
    setValue('name', type.name)
    setValue('user_id', type.user)
    setValue('parent_id', type.parent)
    setValue('type', type.type)
    setValue('active', type.active)
    console.log(type);
  }

  useEffect(() => {
    if (id) {
        fetchCollectionsDetails()
    }
  }, [id])

  return (
    <Card>
      <CollectionsForm
        type={'edit'}
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        watch={watch}
        setValue={setValue}
        errors={errors}
        title={t('collection_edit')}
        loading={loading}
      />
    </Card>
  )
}

export const getServerSideProps = async context => {
  const type = await fetchCollectionsDetails(context.params.id, context.req.cookies)

  return {
    props: { type, id: context.params.id }
  }
}

export default CollectionEdit
