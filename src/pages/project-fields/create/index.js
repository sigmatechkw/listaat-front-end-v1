import { useRouter } from 'next/router'
import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import ProjectFieldsForm from 'src/components/ProjectFields/ProjectFieldsForm'

const defaultValues = {
  name: '',
  value: '',
  is_cost_calculated: false,
  project_id : '',
  project_tab_id : '',
  files : []
}

const ProjectFieldsCreate = () => {
  const auth = useSelector(state => state.auth)
  const { t } = useTranslation()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [filesArr , setFilesArr] = useState([]);
  const [fieldFiles , setFieldFiles] = useState([]);

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

    data.project_tab_id = data.project_tab_id?.id;
    data.project_id = data.project_id?.id;

    if(filesArr){
      data.files = filesArr;
    }else{ 
      delete data.files;
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_API_KEY}project-fields`, data, {
        headers: {
          Authorization: auth.token
        }
      })
      .then(res => {
        setLoading(false)
        toast.success(t('success'))
        router.push('/project-fields')
        reset()
      })
      .catch(error => {
        setLoading(false)
        toast.error(error.response.data.message)
      })
  }

  return (
    <Card>
      <ProjectFieldsForm
        type={'create'}
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        watch={watch}
        setValue={setValue}
        errors={errors}
        title={t('project_fields_create')}
        loading={loading}
        filesArr={filesArr}
        setFilesArr={setFilesArr}
        fieldFiles={fieldFiles}
        setFieldFiles={setFieldFiles}
      />
    </Card>
  )
}

export default ProjectFieldsCreate
