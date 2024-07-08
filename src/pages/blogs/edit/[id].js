import Card from '@mui/material/Card'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import BlogsEditForm from 'src/components/blogs/BlogsEditForm'
import { getCookie } from 'cookies-next'

const defaultValues = {
  title: '',
  expert_id: null
}

const BlogsEdit = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { id } = router.query
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState(false)
  const [imgSrc, setImgSrc] = useState('/images/avatars/15.png')
  const [videoSrc, setVideoSrc] = useState('/images/avatars/15.png')
  const [active, setActive] = useState(false)
  const [userId, setUserId] = useState('')
  const [blogVideo, setBlogVideo] = useState('')
  const [deletedImgsIds, setDeletedImgsIds] = useState([])
  const [deletedVideoId, setDeletedVideoId] = useState([])

  const [imgId, setImgId] = useState([])
  const [videoId, setVideoId] = useState([])

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

    if (imgSrc != '/images/avatars/15.png' && testBase64(imgSrc)) {
      formData.append('image', imgSrc)
    }

    if (videoSrc != '/images/avatars/15.png' && blogVideo != videoSrc) {
      formData.append('video', videoSrc)
    }
    formData.append('title', data.title)
    formData.append('user_id', data.expert_id.id)
    formData.append('content', content)

    if (active == 0 || active == 1) {
      formData.append('active', +active)
    }

    if (deletedImgsIds.length > 0) {
      deletedImgsIds.forEach(id => {
        formData.append('deleted_images_ids[]', id)
      })
    }

    if (deletedVideoId.length > 0) {
      deletedVideoId.forEach(id => {
        formData.append('deleted_videos_ids[]', id)
      })
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_API_KEY}blogs/${id}`, formData, {
        headers: {
          Authorization: getCookie('token'),
          'Accepted-Language': getCookie('lang') ?? 'en'
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
  }

  const fetchBlogsDetails = () => {
    if (!isNaN(id)) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_KEY}blogs/${id}`, {
          headers: {
            Authorization: getCookie('token'),
            'Accepted-Language': getCookie('lang') ?? 'en'
          }
        })
        .then(res => {
          const { title, expert, content } = res.data.data.items

          setContent(content)
          setValue('expert_id', res.data.data.items.expert)

          if (res.data.data.items.video.length != 0) {
            setVideoSrc(res.data.data.items.video[res.data.data.items.video.length - 1].url)
            setBlogVideo(res.data.data.items.video[res.data.data.items.video.length - 1].url)
            setVideoId(res.data.data.items.video[res.data.data.items.video.length - 1].id)
          }

          if (res.data.data.items.image) {
            setImgSrc(res.data.data.items.image)
            setImgId(res.data.data.items.image_id)
          }

          setActive(res.data.data.items.active)
          setValue('title', title)
          setUserId(expert.id)

          setValue('description_en', description_en)

          //setValue('name_en', name_en)
          //setValue('active', active)
        })
        .catch(err => {
          if (err.response) {
            toast.error(err.response.data.message)
          }
        })
    } else {
      router.push('/404')
    }
  }

  useEffect(() => {
    if (id) {
      fetchBlogsDetails()
    }
  }, [id])

  return (
    <Card>
      <BlogsEditForm
        setBlogVideo={setBlogVideo}
        blogVideo={blogVideo}
        getValues={getValues}
        active={active}
        setActive={setActive}
        userId={userId}
        content={content}
        videoSrc={videoSrc}
        setVideoSrc={setVideoSrc}
        setContent={setContent}
        imgSrc={imgSrc}
        setImgSrc={setImgSrc}
        type={'edit'}
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        watch={watch}
        setValue={setValue}
        errors={errors}
        title={t('edit')}
        loading={loading}
        setImgId={setImgId}
        videoId={videoId}
        imgId={imgId}
        setDeletedImgsIds={setDeletedImgsIds}
        setDeletedVideoId={setDeletedVideoId}
      />
    </Card>
  )
}

export default BlogsEdit
