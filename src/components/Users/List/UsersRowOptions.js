import IconButton from "@mui/material/IconButton";
import Icon from "../../../@core/components/icon";
import {useRouter} from "next/router";


const UsersRowOptions = ({ id, handleClickDeleteButton }) => {
  const router = useRouter()

  const handleView = (e) => {
    e.stopPropagation()
    router.push(`/users/${id}`)
  }

  const handleEdit = (e) => {
    e.stopPropagation()
    router.push(`/users/edit/${id}`)
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    handleClickDeleteButton(id)
  }

  return (
    <>
      <IconButton
        color="secondary"
        onClick={handleView}>
        <Icon icon='tabler:eye' fontSize={20}/>
      </IconButton>
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

export default UsersRowOptions
