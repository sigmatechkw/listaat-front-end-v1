import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchMaterialFolderDetails } from 'src/components/MaterialFolders/Details/MaterialFolderDetailsServices'
import MaterialFoldersForm from 'src/components/MaterialFolders/MaterialFoldersForm'

const defaultValues = {
    name: '',
    sort: '',
    active: false,
}

const MaterialFoldersEdit = ({ type, id }) => {
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

    if (!data.sort)
      data.sort = 1

    axios
      .put(`${process.env.NEXT_PUBLIC_API_KEY}material-folders/${id}`, data, {
        headers: {
          Authorization: auth.token
        }
      })
      .then(res => {
        setLoading(false)
        toast.success(t('success'))
        router.push(`/material-folders/details/${id}`)
        reset()
      })
      .catch(error => {
        setLoading(false)
        toast.error(error.response.data.message)
      })
  }

  const fetchMaterialFolderDetails = () => {
    setValue('name', type.name)
    setValue('sort', type.sort)
    setValue('active', type.active)
  }

  useEffect(() => {
    if (id) {
      fetchMaterialFolderDetails()
    }
  }, [id])

  return (
    <Card>
      <MaterialFoldersForm
        type={'edit'}
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        watch={watch}
        setValue={setValue}
        errors={errors}
        title={t('material_folders_edit')}
        loading={loading}
      />
    </Card>
  )
}

export const getServerSideProps = async context => {
  const type = await fetchMaterialFolderDetails(context.params.id, context.req.cookies)

  return {
    props: { type, id: context.params.id }
  }
}

export default MaterialFoldersEdit
