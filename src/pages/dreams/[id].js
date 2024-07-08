import {useRouter} from "next/router";
import {useQuery} from "@tanstack/react-query";
import CustomLoader from "../../components/Shared/CustomLoader";
import {fetchDreamDetails} from "../../components/Dreams/Details/dreamDetailsServices";
import Grid from "@mui/material/Grid";
import DreamDetailsLeft from "../../components/Dreams/Details/DreamDetailsLeft";
import DreamDetailsRight from "../../components/Dreams/Details/DreamDetailsRight";
import axios from "axios";

const DreamDetailsPage = ({dream: initialDreamData, id}) => {
  const router = useRouter()

  const {isPending, data: dream, error} = useQuery({
    queryKey: ['fetchDreamDetails', id],
    queryFn: () => fetchDreamDetails(id),
    enabled: !!id,
    initialData: initialDreamData
  })

  if (isPending) {
    return <CustomLoader/>
  }

  if (error || !dream) {
    router.push('/404')

    return
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={5} lg={4}>
        <DreamDetailsLeft dream={dream}/>
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <DreamDetailsRight dream={dream}/>
      </Grid>
    </Grid>
  )
}

export const getServerSideProps = async ({params}) => {
  const dream = await fetchDreamDetails(params.id)

  return {
    props: {dream, id: params.id}
  }
}

export default DreamDetailsPage
