import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchProjectTabTypesDetailsToEdit } from 'src/components/ProjectTabTypes/Details/ProjectTabTypesDetailsServices'
import ProjectTabTypesForm from 'src/components/ProjectTabTypes/ProjectTabTypesForm'

const defaultValues = {
    name_en: '',
    name_ar: '',
    description_en: '',
    description_ar: '',
    hint_en: '',
    hint_ar: '',
    sort: '',
    active: false,
    image : ''
}

const ProjectTabTypesEdit = ({ type, id }) => {
  const auth = useSelector(state => state.auth)
  const lang = useSelector(state => state.lang)
  const { t } = useTranslation()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [projectTabTypeImg, setProjectTabTypeImg] = useState('')
  const [imgSrc, setImgSrc] = useState('')

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

    if(testBase64(imgSrc)){ 
      data.image = imgSrc;
    }else{ 
      delete data.image;
    }


    axios
      .put(`${process.env.NEXT_PUBLIC_API_KEY}project-tab-type/${id}`, data, {
        headers: {
          Authorization: auth.token
        }
      })
      .then(res => {
        setLoading(false)
        toast.success(t('success'))
        router.push(`/project-tab-types/details/${id}`)
        reset()
      })
      .catch(error => {
        setLoading(false)
        toast.error(error.response.data.message)
      })
  }

  const fetchProjectTabTypesDetailsToEdit = () => {
    setValue('name_en', type.name_en)
    setValue('name_ar', type.name_ar)
    setValue('description_en', type.description_en)
    setValue('description_ar', type.description_ar)
    setValue('hint_en', type.hint_en)
    setValue('hint_ar', type.hint_ar)
    setValue('sort', type.sort)
    setValue('active', type.active)
    setValue('image' , type?.image)
    setImgSrc(type?.image);
  }

  useEffect(() => {
    if (id) {
      fetchProjectTabTypesDetailsToEdit()
    }
  }, [id])

  return (
    <Card>
      <ProjectTabTypesForm
        type={'edit'}
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        watch={watch}
        setValue={setValue}
        errors={errors}
        title={t('project_tab_types_edit')}
        loading={loading}
        imgSrc={imgSrc}
        setImgSrc={setImgSrc}
        projectTabTypeImg={projectTabTypeImg}
        setProjectTabTypeImg={setProjectTabTypeImg}
      />
    </Card>
  )
}

export const getServerSideProps = async context => {
  const type = await fetchProjectTabTypesDetailsToEdit(context.params.id, context.req.cookies)

  return {
    props: { type, id: context.params.id }
  }
}

export default ProjectTabTypesEdit
