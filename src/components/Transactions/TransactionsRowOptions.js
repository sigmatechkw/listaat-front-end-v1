import IconButton from "@mui/material/IconButton";
import Icon from "../../@core/components/icon";
import {useRouter} from "next/router";


const TransactionsRowOptions = ({ id }) => {
  const router = useRouter()

  const handleView = (e) => {
    e.stopPropagation()
    router.push(`/transactions/${id}`)
  }

  return (
    <>
      <IconButton
        color="secondary"
        onClick={handleView}>
        <Icon icon='tabler:eye' fontSize={20}/>
      </IconButton>
    </>
  )
}

export default TransactionsRowOptions
