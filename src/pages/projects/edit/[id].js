import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchProjectsDetails } from 'src/components/Projects/Details/ProjectsDetailsServices'
import ProjectsForm from 'src/components/Projects/ProjectsForm'

const defaultValues = {
  name: '',
  budget : '',
  total_cost: '',
  area : '',
  length : '',
  width: '',
  height: '',
  unit: null,
  project_type_id: null,
  parent_id : null,
  notes: '',
  active: false
}

const ProjectsEdit = ({ type, id }) => {
  const auth = useSelector(state => state.auth)
  const lang = useSelector(state => state.lang)
  const { t } = useTranslation()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [projectImg, setProjectImg] = useState('')
  const [imgSrc, setImgSrc] = useState()

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

    data.parent_id = data.parent_id?.id
    data.user_id = data.user_id?.id
    data.unit = data.unit?.id;

    if(testBase64(imgSrc)){ 
      data.image = imgSrc;
    }else{ 
      delete data.image;
    }

    axios
      .put(`${process.env.NEXT_PUBLIC_API_KEY}projects/${id}`, data, {
        headers: {
          Authorization: auth.token
        }
      })
      .then(res => {
        setLoading(false)
        toast.success(t('success'))
        router.push(`/projects/details/${id}`)
        reset()
      })
      .catch(error => {
        setLoading(false)
        toast.error(error.response.data.message)
      })
  }

  const fetchProjectTypesDetails = () => {
    setValue('name', type.name)
    setValue('budget', type.budget)
    setValue('total_cost', type.total_cost)
    setValue('area', type.area)
    setValue('length', type.length)
    setValue('width', type.width)
    setValue('height', type.height)
    setValue('unit', type.unit)
    setValue('project_type_id', type.project_type)
    setValue('parent_id', type.parent)
    setValue('notes', type.notes)
    setValue('active', type.active)
  }

  useEffect(() => {
    if (id) {
      fetchProjectTypesDetails()
    }
  }, [id])

  return (
    <Card>
      <ProjectsForm
        type={'edit'}
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        watch={watch}
        setValue={setValue}
        errors={errors}
        title={t('project_edit')}
        loading={loading}
        projectImg={projectImg}
        setProjectImg={setProjectImg}
        imgSrc={imgSrc}
        setImgSrc={setImgSrc}
      />
    </Card>
  )
}

export const getServerSideProps = async context => {
  const type = await fetchProjectsDetails(context.params.id, context.req.cookies)

  return {
    props: { type, id: context.params.id }
  }
}

export default ProjectsEdit
