import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import CustomLoader from '../../../components/Shared/CustomLoader'
import Grid from '@mui/material/Grid'
import { fetchProjectTypesDetails } from '../../../components/ProjectTypes/Details/ProjectTypesDetailsServices'
import ProjectTypeDetails from '../../../components/ProjectTypes/Details/ProjectTypeDetails'

const ProjectTypeDetailsPage = ({ type: initialTypeData, id }) => {
  const router = useRouter()

  const {
    isPending,
    data: type,
    error
  } = useQuery({
    queryKey: ['fetchProjectTypesDetails', id],
    queryFn: () => fetchProjectTypesDetails(id),
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
      <Grid item xs={12} md={5} lg={4} sx={{ m: 'auto' }}>
        {type && <ProjectTypeDetails type={type} />}
      </Grid>
    </Grid>
  )
}

export const getServerSideProps = async context => {
  const type = await fetchProjectTypesDetails(context.params.id, context.req.cookies)

  return {
    props: { type, id: context.params.id }
  }
}

export default ProjectTypeDetailsPage
