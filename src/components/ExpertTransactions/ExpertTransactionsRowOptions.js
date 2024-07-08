import IconButton from "@mui/material/IconButton";
import {useRouter} from "next/router";
import {Icon} from "@iconify/react";


const ExpertTransactionsRowOptions = ({ id, handleClickDeleteButton, handleClickPayButton }) => {
  const router = useRouter()

  const handlePay = (e) => {
    e.stopPropagation()
    handleClickPayButton(id)
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    handleClickDeleteButton(id)
  }

  return (
    <>
      <IconButton
        color="success"
        onClick={handlePay}>
        <Icon icon='tabler:brand-cashapp' fontSize={20}/>
      </IconButton>
      <IconButton
        color="error"
        onClick={handleDelete}>
        <Icon icon='tabler:trash' fontSize={20}/>
      </IconButton>
    </>
  )
}

export default ExpertTransactionsRowOptions
