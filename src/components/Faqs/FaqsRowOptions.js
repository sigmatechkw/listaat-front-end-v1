import IconButton from "@mui/material/IconButton";
import Icon from "../../@core/components/icon";
import {useRouter} from "next/router";

const FaqsRowOptions = ({id, handleClickDeleteButton}) => {
  const router = useRouter()

  const handleEdit = (e) => {
    e.stopPropagation()
    router.push(`/faqs/edit/${id}`)
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    handleClickDeleteButton(id)
  }

  return (
    <>
      <IconButton
        color="warning"
        onClick={handleEdit}>
        <Icon icon='tabler:edit' fontSize={20}/>
      </IconButton>
      <IconButton
        color="error"
        onClick={handleDelete}>
        <Icon icon='tabler:trash' fontSize={20}/>
      </IconButton>
    </>
  )
}

export default FaqsRowOptions
