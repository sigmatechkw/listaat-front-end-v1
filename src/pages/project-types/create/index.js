import { useRouter } from 'next/router'
import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import ProjectTypesForm from '../../../components/ProjectTypes/ProjectTypesForm'

const defaultValues = {
  name_en: '',
  name_ar: '',
  filter_name_en: '',
  filter_name_ar: '',
  description_en: '',
  description_ar: '',
  is_creation_allowed_directly: false,
  has_child: false,
  should_has_sub_tabs: false,
  active: false,
  sort: '',
  parent_id: '',
  image : '',
  parent_id: '',
  hint_en : '',
  hint_ar : '',
  next_en : '',
  next_ar : '',
  alt_en : '',
  alt_ar : '',
}

const ProjectTypesCreate = () => {
  const auth = useSelector(state => state.auth)
  const { t } = useTranslation()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [projectTypeImg, setProjectTypeImg] = useState('')
  const [imgSrc, setImgSrc] = useState('')

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

    data.image = imgSrc;
    data.parent_id = data.parent_id?.id;

    
    data.name = {
      en: data.name_en,
      ar: data.name_ar
    }

    data.description = {
      en: data.description_en,
      ar: data.description_ar
    }

    data.filter_name = {
      en: data.filter_name_en,
      ar: data.filter_name_ar
    }

    data.hint = {
      en: data.hint_en,
      ar: data.hint_ar
    }

    data.next = {
      en: data.next_en,
      ar: data.next_ar
    }

    data.alt = {
      en: data.alt_en,
      ar: data.alt_ar
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_API_KEY}project-types`, data, {
        headers: {
          Authorization: auth.token
        }
      })
      .then(res => {
        setLoading(false)
        toast.success(t('success'))
        router.push('/project-types')
        reset()
      })
      .catch(error => {
        setLoading(false)
        toast.error(error.response.data.message)
      })
  }

  return (
    <Card>
      <ProjectTypesForm
        type={'create'}
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        watch={watch}
        setValue={setValue}
        errors={errors}
        title={t('project_type_create')}
        loading={loading}
        imgSrc={imgSrc}
        setImgSrc={setImgSrc}
        projectTypeImg={projectTypeImg}
        setProjectTypeImg={setProjectTypeImg}
      />
    </Card>
  )
}

export default ProjectTypesCreate
