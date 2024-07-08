import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import { useQuery } from '@tanstack/react-query'
import { fetchDreamComments } from './dreamDetailsServices'
import CustomLoader from '../../Shared/CustomLoader'
import DreamChat from './DreamChat'

const DreamDetailsRight = ({ dream }) => {
  const { isPending, data, error } = useQuery({
    queryKey: ['fetchDreamComments', dream.id],
    queryFn: () => fetchDreamComments(dream.id),
    refetchOnWindowFocus: false
  })

  if (isPending) {
    return <CustomLoader />
  }

  return (
    <Card>
      <CardContent>
        <DreamChat dream={dream} data={data} />
      </CardContent>
    </Card>
  )
}

export default DreamDetailsRight
