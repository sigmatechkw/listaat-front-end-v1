import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CustomDataGrid from '../Shared/CustomDataGrid'
import Snackbar from '@mui/material/Snackbar'
import SnackbarConfirmActions from '../Shared/SnackbarConfirmActions'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import Icon from '../../@core/components/icon'
import { deleteQuickList } from './QuickListServices'
import QuickListListTableHeader from './QuickListListTableHeader'
import QuickListRowOptions from './QuickListRowOptions'

const QuickListList = ({
  data,
  search,
  setSearch,
  paginationModel,
  setPaginationModel,
  sortModel,
  setSortModel,
  fetchData,
  canExport = false
}) => {
  const { t } = useTranslation()
  const [total, setTotal] = useState(data.total)
  const [rowSelectionModel, setRowSelectionModel] = useState([])
  const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false)
  const [selectedRowId, setSelectedRowId] = useState(null)

  const handleDelete = () => {
    deleteQuickList([selectedRowId]).then(res => {
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

  const columns = [
    {
      flex: 0.1,
      minWidth: 50,
      field: 'id',
      headerName: t('id'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.id}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 120,
      field: 'name',
      headerName: t('name'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.name}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 120,
      field: 'qty',
      headerName: t('qty'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.qty}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 120,
      field: 'price',
      headerName: t('price'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.price}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 120,
      field: 'user_id',
      headerName: t('user'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.user?.first_name}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 120,
      field: 'sort',
      headerName: t('sort'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.sort}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 120,
      field: 'created_at',
      headerName: t('created_at'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.created_at}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: t('actions'),
      renderCell: ({ row }) => <QuickListRowOptions id={row.id} handleClickDeleteButton={handleClickDeleteButton} />
    }
  ]

  useEffect(() => {
    setTotal(data.total)
  }, [data])

  return (
    <div>
      <Card>
        <CardHeader title={t('quick_list')} />
        <CustomDataGrid
          toolbar={QuickListListTableHeader}
          toolbarProps={{
            value: search,
            clearSearch: () => setSearch(''),
            onChange: event => setSearch(event.target.value),
            selectedRows: rowSelectionModel,
            fetchData: fetchData,
            canExport: canExport
          }}
          rows={data.items}
          columns={columns}
          total={total}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
          rowSelectionModel={rowSelectionModel}
          setRowSelectionModel={setRowSelectionModel}
          sortModel={sortModel}
          setSortModel={setSortModel}
        />
      </Card>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={openDeleteSnackbar}
        onClose={handleCloseDeleteSnackbar}
        message={t('are_you_sure')}
        action={<SnackbarConfirmActions handleConfirm={handleDelete} handleClose={handleCloseDeleteSnackbar} />}
      />
    </div>
  )
}

export default QuickListList
