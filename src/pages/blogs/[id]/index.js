import Grid from '@mui/material/Grid'
import { useRouter } from 'next/router'
import CustomLoader from '../../../components/Shared/CustomLoader'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import BlogsDetails from 'src/components/blogs/Details/BlogsDetails'
import { fetchBlogsDetails } from 'src/components/blogs/Details/BlogsServices'

const BlogsListDetails = () => {
  const router = useRouter()
  const { id } = router.query

  const { isPending, data, error } = useQuery({
    queryKey: ['fetchBlogsDetails', id],
    queryFn: () => fetchBlogsDetails(id),
    enabled: !!id
  })

  if (isPending) {
    return <CustomLoader />
  }

  if (error) {
    toast.error(error.response.data.message)
    router.push('/404')

    return
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <BlogsDetails data={data} />
      </Grid>
    </Grid>
  )
}

export default BlogsListDetails
