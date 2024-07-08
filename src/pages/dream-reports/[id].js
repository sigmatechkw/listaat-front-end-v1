import {useRouter} from "next/router";
import {useQuery} from "@tanstack/react-query";
import CustomLoader from "../../components/Shared/CustomLoader";
import Grid from "@mui/material/Grid";
import {fetchDreamReportDetails} from "../../components/DreamsReports/Details/dreamReportsDetailsServices";
import DreamReportDetails from "../../components/DreamsReports/Details/DreamReportDetails";

const DreamReportDetailsPage = ({report: initialReportData, id}) => {
  const router = useRouter()

  const {isPending, data: report, error} = useQuery({
    queryKey: ['fetchDreamReportDetails', id],
    queryFn: () => fetchDreamReportDetails(id),
    enabled: !!id,
    initialData: initialReportData
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
      <Grid item xs={12} md={5} lg={4} sx={{m: 'auto'}}>
        {
          report &&
            <DreamReportDetails report={report} />
        }
      </Grid>
    </Grid>
  )
}

export const getServerSideProps = async (context) => {
  const report = await fetchDreamReportDetails(context.params.id, context.req.cookies)

  return {
    props: {report, id: context.params.id}
  }
}

export default DreamReportDetailsPage
