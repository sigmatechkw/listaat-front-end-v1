import IconButton from '@mui/material/IconButton'
import { useRouter } from 'next/router'
import { Icon } from '@iconify/react'

const DreamsReportsRowOptions = ({ id, handleClickDeleteButton }) => {
  const router = useRouter()

  const handleView = e => {
    e.stopPropagation()
    router.push(`/dream-reports/${id}`)
  }

  const handleDelete = e => {
    e.stopPropagation()
    handleClickDeleteButton(id)
  }

  return (
    <>
      <IconButton color='secondary' onClick={handleView}>
        <Icon icon='tabler:eye' fontSize={20} />
      </IconButton>
      <IconButton color='error' onClick={handleDelete}>
        <Icon icon='tabler:trash' fontSize={20} />
      </IconButton>
    </>
  )
}

export default DreamsReportsRowOptions
