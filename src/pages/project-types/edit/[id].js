import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchProjectTypesDetails } from '../../../components/ProjectTypes/Details/ProjectTypesDetailsServices'
import ProjectTypesForm from '../../../components/ProjectTypes/ProjectTypesForm'

const defaultValues = {
  name: '',
  filter_name: '',
  should_has_sub_tabs: false,
  active: false
}

const ProjectTypesEdit = ({ type, id }) => {
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
      .put(`${process.env.NEXT_PUBLIC_API_KEY}project-types/${id}`, data, {
        headers: {
          Authorization: auth.token
        }
      })
      .then(res => {
        setLoading(false)
        toast.success(t('success'))
        router.push(`/project-types/details/${id}`)
        reset()
      })
      .catch(error => {
        setLoading(false)
        toast.error(error.response.data.message)
      })
  }

  const fetchProjectTypesDetails = () => {
    setValue('name', type.name)
    setValue('filter_name', type.filter_name)
    setValue('should_has_sub_tabs', type.should_has_sub_tabs)
    setValue('active', type.active)
  }

  useEffect(() => {
    if (id) {
      fetchProjectTypesDetails()
    }
  }, [id])

  return (
    <Card>
      <ProjectTypesForm
        type={'edit'}
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        watch={watch}
        setValue={setValue}
        errors={errors}
        title={t('project_type_edit')}
        loading={loading}
      />
    </Card>
  )
}

export const getServerSideProps = async context => {
  const type = await fetchProjectTypesDetails(context.params.id, context.req.cookies)

  return {
    props: { type, id: context.params.id }
  }
}

export default ProjectTypesEdit
