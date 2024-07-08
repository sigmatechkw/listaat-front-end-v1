import Grid from '@mui/material/Grid'
import {useRouter} from "next/router";
import CustomLoader from "../../components/Shared/CustomLoader";
import {useQuery} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {fetchTransactionDetails} from "../../components/Transactions/transactionsServices";
import TransactionDetails from "../../components/Transactions/TransactionDetails";

const TransactionDetailsPage = () => {
  const router = useRouter()
  const {id} = router.query

  const { isPending, data, error } = useQuery({
    queryKey: ['fetchTransactionDetails', id],
    queryFn: () => fetchTransactionDetails(id),
    enabled: !!id,
  })

  if (isPending) {
    return <CustomLoader />
  }

  if (error) {
    toast.error(error.response.data.message)
    router.push('/404')

    return
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} >
        <TransactionDetails data={data} />
      </Grid>

    </Grid>
  )
}

export const getServerSideProps = async (context) => {
  const transaction = await fetchTransactionDetails(context.params.id, context.req.cookies)

  return {
    props: {transaction, id: context.params.id}
  }
}

export default TransactionDetailsPage
