import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import Typography from '@mui/material/Typography'
import Icon from '../../@core/components/icon'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CustomDataGrid from '../Shared/CustomDataGrid'
import { IconButton } from '@mui/material'
import { useRouter } from 'next/router'
import SnackbarConfirmActions from '../Shared/SnackbarConfirmActions'
import Snackbar from '@mui/material/Snackbar'
import { deleteContactUs } from './fetchContactUsService'
import toast from 'react-hot-toast'
import ContactUsTableHeader from './ContactUsTableHeader'

const ContactUsList = ({
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

  const handleDelete = () => {
    deleteContactUs([selectedRowId]).then(res => {
      toast.success(t('success'))
      setSelectedRowId(null)
      setOpenDeleteSnackbar(false)
      fetchData()
    })
  }

  const handleClickDeleteButton = id => {
    setSelectedRowId(id)
    setOpenDeleteSnackbar(true)
  }

  const handleCloseDeleteSnackbar = () => {
    setSelectedRowId(null)
    setOpenDeleteSnackbar(false)
  }

  const RowOptions = ({ id, handleClickDeleteButton }) => {
    const handleView = e => {
      e.stopPropagation()
      router.push(`/contact_us/${id}`)
    }

    const handleEdit = e => {
      e.stopPropagation()
      router.push(`/contact_us/edit/${id}`)
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
        {/* <IconButton
          color="warning"
          onClick={ (e) => handleEdit(e , id)}>
          <Icon icon='tabler:edit' fontSize={20}/>
        </IconButton>
        <IconButton color="error"  onClick={ handleDelete}>
          <Icon icon='tabler:trash' fontSize={20}/>
        </IconButton> */}
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
      flex: 0.25,
      minWidth: 120,
      field: 'name',
      headerName: t('name')
    },
    {
      flex: 0.25,
      minWidth: 120,
      field: 'email',
      headerName: t('email')
    },
    {
      flex: 0.25,
      minWidth: 120,
      field: 'phone',
      headerName: t('phone')
    },
    {
      flex: 0.25,
      minWidth: 120,
      field: 'message',
      headerName: t('message')
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
        <CardHeader title={t('contact_us')} />

        <CustomDataGrid
          toolbar={ContactUsTableHeader}
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
          multiSelection={false}
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

export default ContactUsList
