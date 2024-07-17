import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchProjectTabsDetails } from 'src/components/ProjectTabs/Details/ProjectTabsDetailsServices'
import ProjecTabsForm from 'src/components/ProjectTabs/ProjectTabsForm'

const defaultValues = {
  name : "",
  user_id : "",
  parent_id : "",
  project_type_id: "",
  project_id: "",
  is_default : false,
  is_dimensional_info : false,
  is_text_info : false,
  is_numerical : false,
  is_details : false,
  is_breakdown: false,
  active : false
}

const ProjectTabsEdit = ({ type, id }) => {
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
    data.parent_id = data.parent_id?.id;
    data.project_type_id = data.project_type_id?.id;  
    
    axios
      .put(`${process.env.NEXT_PUBLIC_API_KEY}project-tabs/${id}`, data, {
        headers: {
          Authorization: auth.token
        }
      })
      .then(res => {
        setLoading(false)
        toast.success(t('success'))
        router.push(`/project-tabs/details/${id}`)
        reset()
      })
      .catch(error => {
        setLoading(false)
        toast.error(error.response.data.message)
      })
  }

  const fetchProjectTabsDetails = () => {
    setValue('name', type.name)
    setValue('user_id', type.user)
    setValue('parent_id', type.parent)
    setValue('project_type_id', type.project_type[0])
    setValue('is_default', type.is_default)
    setValue('is_dimensional_info', type.is_dimensional_info)
    setValue('is_text_info', type.is_text_info)
    setValue('is_numerical', type.is_numerical)
    setValue('is_details', type.is_details)
    setValue('is_breakdown', type.is_breakdown)
    setValue('active', type.active)
  }

  useEffect(() => {
    if (id) {
        fetchProjectTabsDetails()
    }
  }, [id])

  return (
    <Card>
      <ProjecTabsForm
        type={'edit'}
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        watch={watch}
        setValue={setValue}
        errors={errors}
        title={t('project_tab_edit')}
        loading={loading}
      />
    </Card>
  )
}

export const getServerSideProps = async context => {
  const type = await fetchProjectTabsDetails(context.params.id, context.req.cookies)

  return {
    props: { type, id: context.params.id }
  }
}

export default ProjectTabsEdit
