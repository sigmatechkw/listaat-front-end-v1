// ** MUI Imports
import Grid from '@mui/material/Grid'

import UserDetailsLeft from "../../../components/Users/Details/UserDetailsLeft";
import UserDetailsRight from "../../../components/Users/Details/UserDetailsRight";
import {useRouter} from "next/router";
import CustomLoader from "../../../components/Shared/CustomLoader";
import {useQuery} from "@tanstack/react-query";
import {fetchUserDetails} from "../../../components/Users/Details/userDetailsServices";
import toast from "react-hot-toast";

const UserDetails = ({user: initialUserData, id}) => {
  const router = useRouter()

  const { isPending, data: user, error } = useQuery({
    queryKey: ['fetchUserDetails', id],
    queryFn: () => fetchUserDetails(id),
    enabled: !!id,
    initialData: initialUserData
  })

  if (isPending) {
    return <CustomLoader />
  }

  if (error || !user) {
    router.push('/404')

    return
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={5} lg={4} sx={user.roles[0]?.id === 1 ? {m: 'auto'} : {}}>
        <UserDetailsLeft user={user} />
      </Grid>
      {
        user.roles[0]?.id !== 1 &&
          <Grid item xs={12} md={7} lg={8}>
            <UserDetailsRight user={user} />
          </Grid>
      }
    </Grid>
  )
}

export const getServerSideProps = async ({params}) => {
  const user = await fetchUserDetails(params.id)

  return {
    props: {user, id: params.id}
  }
}

export default UserDetails
