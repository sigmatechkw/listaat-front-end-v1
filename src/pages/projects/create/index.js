import { useRouter } from 'next/router'
import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import ProjectsForm from '../../../components/Projects/ProjectsForm'

const defaultValues = {
  name: '',
  budget : '',
  total_cost: '',
  area : '',
  length : '',
  width: '',
  height: '',
  project_type_id: null,
  parent_id : null,
  user_id : null,
  notes: '',
  active: false
}

const ProjectsCreate = () => {
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

    data.project_type_id = data.project_type_id.id
    data.parent_id = data.parent_id?.id
    data.user_id = data.user_id?.id

    axios
      .post(`${process.env.NEXT_PUBLIC_API_KEY}projects`, data, {
        headers: {
          Authorization: auth.token
        }
      })
      .then(res => {
        setLoading(false)
        toast.success(t('success'))
        router.push('/projects')
        reset()
      })
      .catch(error => {
        setLoading(false)
        toast.error(error.response.data.message)
      })
  }

  return (
    <Card>
      <ProjectsForm
        type={'create'}
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        watch={watch}
        setValue={setValue}
        errors={errors}
        title={t('project_create')}
        loading={loading}
      />
    </Card>
  )
}

export default ProjectsCreate
