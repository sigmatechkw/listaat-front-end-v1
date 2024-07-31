import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import CustomLoader from '../../../components/Shared/CustomLoader'
import Grid from '@mui/material/Grid'
import { fetchProjectsDetails } from '../../../components/Projects/Details/ProjectsDetailsServices'
import ProjectDetails from '../../../components/Projects/Details/ProjectDetails'
import { nanoid } from 'nanoid'

const ProjectDetailsPage = ({ type: initialTypeData, id }) => {
  const router = useRouter()

  const {
    isPending,
    data: type,
    error
  } = useQuery({
    queryKey: ['fetchProjectsDetails', id],
    queryFn: () => fetchProjectsDetails(id),
    enabled: !!id,
    initialData: initialTypeData
  })

  type.item_groups.find(e => e.id == null).id = nanoid();
  
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
        {type && <ProjectDetails type={type} />}
      </Grid>
    </Grid>
  )
}

export const getServerSideProps = async context => {
  const type = await fetchProjectsDetails(context.params.id, context.req.cookies)

  return {
    props: { type, id: context.params.id }
  }
}

export default ProjectDetailsPage
