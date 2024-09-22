import IconButton from "@mui/material/IconButton";
import {useRouter} from "next/router";
import {Icon} from "@iconify/react";


const ProjectTabTypesRowOptions = ({ id }) => {
  const router = useRouter()

  const handleView = (e) => {
    e.stopPropagation()
    router.push(`/project-tab-types/details/${id}`)
  }

  const handleEdit = (e) => {
    e.stopPropagation()
    router.push(`/project-tab-types/edit/${id}`)
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
    </>
  )
}

export default ProjectTabTypesRowOptions
