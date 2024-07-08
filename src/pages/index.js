import CustomGroupedStatisticsCard from "../components/Shared/CustomGroupedStatisticsCard";
import {useQuery} from "@tanstack/react-query";
import {getOnlineUsersStatistics} from "../components/Home/homeServices";
import CustomLoader from "../components/Shared/CustomLoader";
import Box from "@mui/material/Box";
import OnlineUsersStatistics from "../components/Home/OnlineUsersStatistics";

const Home = () => {
  const {isPending, data, error, isFetching} = useQuery({
    queryKey: ['getOnlineUsersStatistics'],
    queryFn: getOnlineUsersStatistics
  })

  if (isFetching || isPending || error)
    return <CustomLoader />

  return (
    <Box>
      <OnlineUsersStatistics data={data} />
    </Box>
  )
}

export default Home
