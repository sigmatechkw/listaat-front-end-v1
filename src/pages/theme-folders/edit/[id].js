import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchThemeFolderDetails } from 'src/components/ThemeFolders/Details/ThemeFolderDetailsServices'
import ThemeFoldersForm from 'src/components/ThemeFolders/ThemeFoldersForm'

const defaultValues = {
    name: '',
    sort: '',
    active: false,
}

const ThemeFoldersEdit = ({ type, id }) => {
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

    axios
      .put(`${process.env.NEXT_PUBLIC_API_KEY}theme-folders/${id}`, data, {
        headers: {
          Authorization: auth.token
        }
      })
      .then(res => {
        setLoading(false)
        toast.success(t('success'))
        router.push(`/theme-folders/details/${id}`)
        reset()
      })
      .catch(error => {
        setLoading(false)
        toast.error(error.response.data.message)
      })
  }

  const fetchThemeFolderDetails = () => {
    setValue('name', type.name)
    setValue('sort', type.sort)
    setValue('active', type.active)
  }

  useEffect(() => {
    if (id) {
      fetchThemeFolderDetails()
    }
  }, [id])

  return (
    <Card>
      <ThemeFoldersForm
        type={'edit'}
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        watch={watch}
        setValue={setValue}
        errors={errors}
        title={t('theme_folders_edit')}
        loading={loading}
      />
    </Card>
  )
}

export const getServerSideProps = async context => {
  const type = await fetchThemeFolderDetails(context.params.id, context.req.cookies)

  return {
    props: { type, id: context.params.id }
  }
}

export default ThemeFoldersEdit
