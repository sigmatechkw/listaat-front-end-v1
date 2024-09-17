import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import CustomLoader from '../../../components/Shared/CustomLoader'
import Grid from '@mui/material/Grid'
import { fetchGallaryDetails } from 'src/components/Gallary/Details/GallaryDetailsServices'
import GallaryDetails from 'src/components/Gallary/Details/GallaryDetails'

const GallaryDetailsPage = ({ type: initialTypeData, id }) => {
  const router = useRouter()

  const {
    isPending,
    data: type,
    error
  } = useQuery({
    queryKey: ['fetchGallaryDetails', id],
    queryFn: () => fetchGallaryDetails(id),
    enabled: !!id,
    initialData: initialTypeData
  })

  if (isPending) {
    return <CustomLoader />
  }

  if (error) {
    router.push('/404')

    return
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={12} lg={12} sx={{ m: 'auto' }}>
        {type && <GallaryDetails type={type} />}
      </Grid>
    </Grid>
  )
}

export const getServerSideProps = async context => {
  const type = await fetchGallaryDetails(context.params.id, context.req.cookies)

  return {
    props: { type, id: context.params.id }
  }
}

export default GallaryDetailsPage
