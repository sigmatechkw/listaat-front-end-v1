import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import CustomLoader from '../../../components/Shared/CustomLoader'
import Grid from '@mui/material/Grid'
import { fetchProjectTabsDetails } from 'src/components/ProjectTabs/Details/ProjectTabsDetailsServices'
import ProjectTabsDetails from 'src/components/ProjectTabs/Details/ProjectTabsDetails'

const ProjectTabsDetailsPage = ({ type: initialTypeData, id }) => {
  const router = useRouter()

  const {
    isPending,
    data: type,
    error
  } = useQuery({
    queryKey: ['fetchProjectTabsDetails', id],
    queryFn: () => fetchProjectTabsDetails(id),
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
        {type && <ProjectTabsDetails type={type} />}
      </Grid>
    </Grid>
  )
}

export const getServerSideProps = async context => {
  const type = await fetchProjectTabsDetails(context.params.id, context.req.cookies)

  return {
    props: { type, id: context.params.id }
  }
}

export default ProjectTabsDetailsPage
