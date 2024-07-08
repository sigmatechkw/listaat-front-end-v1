import {useRouter} from "next/router";
import {useQuery} from "@tanstack/react-query";
import CustomLoader from "../../../components/Shared/CustomLoader";
import Grid from "@mui/material/Grid";
import {fetchPackagesDetails} from "../../../components/Packages/Details/packagesDetailsServices";
import PackageDetails from "../../../components/Packages/Details/PackageDetails";

const PackageDetailsPage = ({packageDetails: initialPackageData, id}) => {
  const router = useRouter()

  const {isPending, data: packageDetails, error} = useQuery({
    queryKey: ['fetchPackagesDetails', id],
    queryFn: () => fetchPackagesDetails(id),
    enabled: !!id,
    initialData: initialPackageData
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
          packageDetails &&
            <PackageDetails packageDetails={packageDetails} />
        }
      </Grid>
    </Grid>
  )
}

export const getServerSideProps = async (context) => {
  const packageDetails = await fetchPackagesDetails(context.params.id, context.req.cookies)

  return {
    props: {packageDetails, id: context.params.id}
  }
}

export default PackageDetailsPage
