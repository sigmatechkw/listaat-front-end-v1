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
  parent_id: '',
  sort: '',
  image : '',
  hint_en : '',
  hint_ar : '',
  next_en : '',
  next_ar : '',
  alt_en : '',
  alt_ar : '',
}

const ProjectTypesEdit = ({ type, id }) => {
  const auth = useSelector(state => state.auth)
  const lang = useSelector(state => state.lang)
  const { t } = useTranslation()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [projectTypeImg, setProjectTypeImg] = useState('')
  const [imgSrc, setImgSrc] = useState('')
  const [parentId , setParentId] = useState('')

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

    if(testBase64(imgSrc)){ 
      data.image = imgSrc;
    }else{ 
      delete data.image;
    }

    data.parent_id = data.parent_id?.id;

    data.name = {
      en: data.name_en,
      ar: data.name_ar
    }

    data.description = {
      en: data.description_en,
      ar: data.description_ar
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
    setValue('name_en', type.name_en)
    setValue('name_ar', type.name_ar)
    setValue('filter_name_en', type.filter_name_en)
    setValue('filter_name_ar', type.filter_name_ar)
    setValue('description_en', type.description_en)
    setValue('description_ar', type.description_ar)
    setValue('is_creation_allowed_directly', type.is_creation_allowed_directly)
    setValue('has_child', type.has_child)
    setValue('should_has_sub_tabs', type.should_has_sub_tabs)
    setValue('active', type.active)
    setValue('sort', type.sort)
    setValue('image' , type.image)
    setImgSrc(type.image)
    setValue('parent_id' , type.parent)
    setValue('hint_en' , type.hint_en)
    setValue('hint_ar' , type.hint_ar)
    setValue('next_en' , type.next_en)
    setValue('next_ar' , type.next_ar)
    setValue('alt_en' , type.alt_en)
    setValue('alt_ar' , type.alt_ar)
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
        imgSrc={imgSrc}
        setImgSrc={setImgSrc}
        projectTypeImg={projectTypeImg}
        setProjectTypeImg={setProjectTypeImg}
        parentId={parentId}
        setParentId={setParentId}
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
