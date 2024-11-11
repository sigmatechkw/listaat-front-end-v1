import { useRouter } from 'next/router'
import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import ProjecTabsForm from 'src/components/ProjectTabs/ProjectTabsForm'

const defaultValues = {
  name_en : "",
  name_ar : "",
  user_id : "",
  parent_id : "",
  project_type_id: [],
  type: "",
  project_id: "",
  is_default : false,
  is_dimensional_info : false,
  is_text_info : false,
  is_numerical : false,
  is_details : false,
  is_breakdown: false,
  active : false
}

const ProjectTabsCreate = () => {
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

    data.user_id = data.user_id?.id;
    data.parent_id = data.parent_id?.id;
    data.project_type_id = data.project_type_id.map(item => item = item.id);
    data.project_id = data.project_id?.id;
    data.type = data.type?.id;

    data.name = { 
      en : data.name_en,
      ar : data.name_ar
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_API_KEY}project-tabs`, data, {
        headers: {
          Authorization: auth.token
        }
      })
      .then(res => {
        setLoading(false)
        toast.success(t('success'))
        router.push('/project-tabs')
        reset()
      })
      .catch(error => {
        setLoading(false)
        toast.error(error.response.data.message)
      })
  }

  return (
    <Card>
      <ProjecTabsForm
        type={'create'}
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        watch={watch}
        setValue={setValue}
        errors={errors}
        title={t('project_tab_create')}
        loading={loading}
      />
    </Card>
  )
}

export default ProjectTabsCreate
