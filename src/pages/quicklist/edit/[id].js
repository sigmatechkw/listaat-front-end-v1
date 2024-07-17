import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchQuickListDetails } from 'src/components/QuickList/Details/QuickListDetailsServices'
import QuickListForm from 'src/components/QuickList/QuickListForm'

const defaultValues = {
    name: '',
    qty: '',
    price: '',
    sort: '',
    user_id : false,
}

const QuickListEdit = ({ type, id }) => {
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
      .put(`${process.env.NEXT_PUBLIC_API_KEY}quickList/${id}`, data, {
        headers: {
          Authorization: auth.token
        }
      })
      .then(res => {
        setLoading(false)
        toast.success(t('success'))
        router.push(`/quicklist/details/${id}`)
        reset()
      })
      .catch(error => {
        setLoading(false)
        toast.error(error.response.data.message)
      })
  }

  const fetchQuickListDetails = () => {
    setValue('name', type.name)
    setValue('qty', type.qty)
    setValue('price', type.price)
    setValue('sort', type.sort)
    setValue('user_id', type.user)
  }

  useEffect(() => {
    if (id) {
        fetchQuickListDetails()
    }
  }, [id])

  return (
    <Card>
      <QuickListForm
        type={'edit'}
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        watch={watch}
        setValue={setValue}
        errors={errors}
        title={t('quick_list_edit')}
        loading={loading}
      />
    </Card>
  )
}

export const getServerSideProps = async context => {
  const type = await fetchQuickListDetails(context.params.id, context.req.cookies)

  return {
    props: { type, id: context.params.id }
  }
}

export default QuickListEdit
