import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import Typography from '@mui/material/Typography'
import Icon from '../../@core/components/icon'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CustomDataGrid from '../Shared/CustomDataGrid'
import { IconButton } from '@mui/material'
import { useRouter } from 'next/router'
import BlogsTableHeader from './BlogsTableHeader'
import SnackbarConfirmActions from '../Shared/SnackbarConfirmActions'
import Snackbar from '@mui/material/Snackbar'
import { deleteBlog } from './fetchBlogsService'
import toast from 'react-hot-toast'

const BlogsList = ({
  data,
  search,
  setSearch,
  paginationModel,
  setPaginationModel,
  sortModel,
  setSortModel,
  method,
  setMethod,
  fetchData
}) => {
  const { t } = useTranslation()
  const [rowSelectionModel, setRowSelectionModel] = useState([])
  const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false)
  const [selectedRowId, setSelectedRowId] = useState(null)

  const router = useRouter()

  const handleClickDeleteButton = id => {
    setSelectedRowId(id)
    setOpenDeleteSnackbar(true)
  }

  const handleCloseDeleteSnackbar = () => {
    setSelectedRowId(null)
    setOpenDeleteSnackbar(false)
  }

  const handleDelete = (e, id) => {
    e.stopPropagation()
    deleteBlog([selectedRowId]).then(res => {
      toast.success(t('success'))
      setSelectedRowId(null)
      setOpenDeleteSnackbar(false)
      fetchData()
    })
  }

  const RowOptions = ({ id, handleClickDeleteButton }) => {
    const handleView = e => {
      e.stopPropagation()
      router.push(`/blogs/${id}`)
    }

    const handleEdit = e => {
      e.stopPropagation()
      router.push(`/blogs/edit/${id}`)
    }

    const handleDelete = e => {
      e.stopPropagation()
      handleClickDeleteButton(id)
    }

    return (
      <>
        <IconButton color='secondary' onClick={e => handleView(e, id)}>
          <Icon icon='tabler:eye' fontSize={20} />
        </IconButton>
        <IconButton color='warning' onClick={e => handleEdit(e, id)}>
          <Icon icon='tabler:edit' fontSize={20} />
        </IconButton>
        <IconButton color='error' onClick={e => handleDelete(e, id)}>
          <Icon icon='tabler:trash' fontSize={20} />
        </IconButton>
      </>
    )
  }

  const columns = [
    {
      flex: 0.1,
      minWidth: 80,
      field: 'id',
      headerName: t('id'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.id}
        </Typography>
      )
    },
    {
      flex: 0.35,
      minWidth: 120,
      field: 'title',
      headerName: t('title')
    },
    {
      flex: 0.225,
      minWidth: 80,
      field: 'expert',
      headerName: t('expert'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.expert?.first_name + ' ' + row.expert?.last_name}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 120,
      field: 'likes',
      headerName: t('likes')
    },
    {
      flex: 0.2,
      minWidth: 120,
      field: 'comments_count',
      headerName: t('comments count')
    },

    {
      flex: 0.125,
      minWidth: 80,
      field: 'active',
      headerName: t('active'),
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.active == 1 ? (
            <Icon icon='tabler:circle-check' color='green' fontSize='2rem' />
          ) : (
            <Icon icon='tabler:xbox-x' fontSize='2rem' color='red' />
          )}
        </Typography>
      )
    },

    {
      flex: 0.3,
      minWidth: 120,
      field: 'control',
      headerName: t('control'),
      renderCell: ({ row }) => <RowOptions id={row.id} handleClickDeleteButton={handleClickDeleteButton} />
    }
  ]

  const handleSearch = value => {
    setSearchValue(value)
  }

  return (
    <div>
      <Card>
        <CardHeader title={t('blogs')} />
        <CustomDataGrid
          toolbar={BlogsTableHeader}
          toolbarProps={{
            value: search,
            clearSearch: () => setSearch(''),
            onChange: event => setSearch(event.target.value),
            selectedRows: rowSelectionModel,
            fetchData: fetchData
          }}
          rows={data.items}
          columns={columns}
          total={data.total}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
          rowSelectionModel={rowSelectionModel}
          setRowSelectionModel={setRowSelectionModel}
          sortModel={sortModel}
          setSortModel={setSortModel}
          multiSelection={true}
        />

        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={openDeleteSnackbar}
          onClose={handleCloseDeleteSnackbar}
          message={t('are_you_sure')}
          action={<SnackbarConfirmActions handleConfirm={handleDelete} handleClose={handleCloseDeleteSnackbar} />}
        />
      </Card>
    </div>
  )
}

export default BlogsList
