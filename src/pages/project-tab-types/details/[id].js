import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import CustomLoader from '../../../components/Shared/CustomLoader'
import Grid from '@mui/material/Grid'
import { fetchProjectTabTypesDetails } from 'src/components/ProjectTabTypes/Details/ProjectTabTypesDetailsServices'
import ProjectTabTypesDetails from 'src/components/ProjectTabTypes/Details/ProjectTabTypesDetails'

const ItemGroupsDetailsPage = ({ type: initialTypeData, id }) => {
  const router = useRouter()

  const {
    isPending,
    data: type,
    error
  } = useQuery({
    queryKey: ['fetchProjectTabTypesDetails', id],
    queryFn: () => fetchProjectTabTypesDetails(id),
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
        {type && <ProjectTabTypesDetails type={type} />}
      </Grid>
    </Grid>
  )
}

export const getServerSideProps = async context => {
  const type = await fetchProjectTabTypesDetails(context.params.id, context.req.cookies)

  return {
    props: { type, id: context.params.id }
  }
}

export default ItemGroupsDetailsPage
