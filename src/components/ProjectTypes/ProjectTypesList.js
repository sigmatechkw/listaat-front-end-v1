import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CustomDataGrid from '../Shared/CustomDataGrid'
import Snackbar from '@mui/material/Snackbar'
import SnackbarConfirmActions from '../Shared/SnackbarConfirmActions'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import Icon from '../../@core/components/icon'
import { deleteProjectTypes } from '../ProjectTabs/projectTypesServices'
import ProjectTypesRowOptions from './ProjectTypesRowOptions'
import ProjectTypesFilters from './ProjectTypesFilters'
import ProjectTypesListTableHeader from './ProjectTypesListTableHeader'

const ProjectTypesList = ({
  data,
  search,
  setSearch,
  paginationModel,
  setPaginationModel,
  sortModel,
  setSortModel,
  isActive,
  setIsActive,
  isShouldHasSubTabs,
  setIsShouldHasSubTabs,
  fetchData,
  canExport = false
}) => {
  const { t } = useTranslation()
  const [total, setTotal] = useState(data.total)
  const [rowSelectionModel, setRowSelectionModel] = useState([])
  const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false)
  const [selectedRowId, setSelectedRowId] = useState(null)

  const handleDelete = () => {
    deleteProjectTypes([selectedRowId]).then(res => {
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
      field: 'filter_name',
      headerName: t('filter_name'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.filter_name}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 100,
      field: 'should_has_sub_tabs',
      headerName: t('should_has_sub_tabs'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.should_has_sub_tabs ? (
            <Icon icon='tabler:circle-check' color='green' fontSize='2rem' />
          ) : (
            <Icon icon='tabler:xbox-x' fontSize='2rem' color='red' />
          )}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'active',
      headerName: t('is_active'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.active ? (
            <Icon icon='tabler:circle-check' color='green' fontSize='2rem' />
          ) : (
            <Icon icon='tabler:xbox-x' fontSize='2rem' color='red' />
          )}
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
      renderCell: ({ row }) => <ProjectTypesRowOptions id={row.id} handleClickDeleteButton={handleClickDeleteButton} />
    }
  ]

  useEffect(() => {
    setTotal(data.total)
  }, [data])

  return (
    <div>
      <ProjectTypesFilters
        isActive={isActive}
        setIsActive={setIsActive}
        isShouldHasSubTabs={isShouldHasSubTabs}
        setIsShouldHasSubTabs={setIsShouldHasSubTabs}
      />
      <Card>
        <CardHeader title={t('project_types')} />
        <CustomDataGrid
          toolbar={ProjectTypesListTableHeader}
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

export default ProjectTypesList
