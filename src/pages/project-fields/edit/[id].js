import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchProjectFieldsDetails } from 'src/components/ProjectFields/Details/ProjectFieldsDetailsServices'
import ProjectFieldsForm from 'src/components/ProjectFields/ProjectFieldsForm'

const defaultValues = {
    name: '',
    value: '',
    is_cost_calculated: false,
    project_id: '',
    project_tab_id : '',
    files: []
}

const ProjectFieldsEdit = ({ type, id }) => {
  const auth = useSelector(state => state.auth)
  const lang = useSelector(state => state.lang)
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

  const testBase64 = src => {
    const base64Regex = /^(data:image\/[a-zA-Z]*;base64,)?([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/

    return base64Regex.test(src)
  }


  const onSubmit = data => {
    setLoading(true)

    data.project_tab_id = data.project_tab_id?.id;
    data.project_id = data.project_id?.id;
    

    if(!filesArr){ 
      delete data.files;
    }else{ 
      if(type.files == filesArr){
        delete data.files;
      }else{ 
        data.files = filesArr;
        if(type?.files.length > 0) { 
          data.deleted_files_ids = type?.files.map(file => file?.id);
        }
      }
    }

    console.log(data);

    axios
      .put(`${process.env.NEXT_PUBLIC_API_KEY}project-fields/${id}`, data, {
        headers: {
          Authorization: auth.token
        }
      })
      .then(res => {
        setLoading(false)
        toast.success(t('success'))
        router.push(`/project-fields/details/${id}`)
        reset()
      })
      .catch(error => {
        setLoading(false)
        toast.error(error.response.data.message)
      })
  }

  const fetchProjectTypesDetails = () => {
    setValue('name', type.name)
    setValue('value', type.value)
    setValue('is_cost_calculated', type.is_cost_calculated)
    setValue('project_tab_id', type.project_tab)
    setValue('project_id', type.project)
    setValue('files', type.files)
    setFilesArr(type.files)
    setFieldFiles(type.files)
  }

  useEffect(() => {
    if (id) {
      fetchProjectTypesDetails()
    }
  }, [id])

  return (
    <Card>
      <ProjectFieldsForm
        type={'edit'}
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        watch={watch}
        setValue={setValue}
        errors={errors}
        title={t('project_fields_edit')}
        loading={loading}
        filesArr={filesArr}
        setFilesArr={setFilesArr}
        fieldFiles={fieldFiles}
        setFieldFiles={setFieldFiles}
      />
    </Card>
  )
}

export const getServerSideProps = async context => {
  const type = await fetchProjectFieldsDetails(context.params.id, context.req.cookies)

  return {
    props: { type, id: context.params.id }
  }
}

export default ProjectFieldsEdit
