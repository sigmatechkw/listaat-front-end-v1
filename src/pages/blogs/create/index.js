import { useRouter } from 'next/router'
import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import BlogsForm from 'src/components/blogs/BlogsForm'
import { useSelector } from 'react-redux'

const defaultValues = {
  title: '',
  //user_id: null,
  expert_id: null
}

const BlogsCreate = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [blogImg, setBlogImg] = useState('')
  const [imgSrc, setImgSrc] = useState('/images/avatars/15.png')
  const [content, setContent] = useState('')
  const [active, setActive] = useState(false)

  const [blogVideo, setBlogVideo] = useState('')
  const [videoSrc, setVideoSrc] = useState()
  const auth = useSelector(state => state.auth)

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors }
  } = useForm({ defaultValues })

  const testBase64 = src => {
    const base64Regex = /^(data:image\/[a-zA-Z]*;base64,)?([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/

    return base64Regex.test(src)
  }

  const onSubmit = data => {
    setLoading(true)

    const formData = new FormData()

    if (imgSrc != '/images/avatars/15.png') {
      formData.append('image', imgSrc)
    }

    if (videoSrc != '/images/avatars/15.png' && videoSrc) {
      formData.append('video', videoSrc)
    }
    formData.append('title', data.title)
    formData.append('user_id', data.expert_id.id)
    formData.append('content', content)

    if (active == 0 || active == 1) {
      formData.append('active', +active)
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_API_KEY}blogs`, formData, {
        headers: {
          Authorization: auth.token
        }
      })
      .then(res => {
        setLoading(false)
        toast.success(t('success'))
        router.push('/blogs')
        reset()
      })
      .catch(error => {
        setLoading(false)
        toast.error(error.response.data.message)
      })
    /* } else {
      setLoading(false)
      toast.error('please upload image');
    } */
  }

  return (
    <Card>
      <BlogsForm
        active={active}
        setActive={setActive}
        getValues={getValues}
        videoSrc={videoSrc}
        setVideoSrc={setVideoSrc}
        blogVideo={blogVideo}
        setBlogVideo={setBlogVideo}
        type={'create'}
        imgSrc={imgSrc}
        setImgSrc={setImgSrc}
        blogImg={blogImg}
        setBlogImg={setBlogImg}
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        watch={watch}
        setValue={setValue}
        errors={errors}
        title={t('blogs')}
        loading={loading}
        content={content}
        setContent={setContent}
      />
    </Card>
  )
}

export default BlogsCreate
