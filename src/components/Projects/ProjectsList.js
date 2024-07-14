import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CustomDataGrid from '../Shared/CustomDataGrid'
import Snackbar from '@mui/material/Snackbar'
import SnackbarConfirmActions from '../Shared/SnackbarConfirmActions'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import Icon from '../../@core/components/icon'
import ProjectsRowOptions from './ProjectsRowOptions'
import ProjectsFilters from './ProjectsFilters'
import ProjectsListTableHeader from './ProjectsListTableHeader'
import { deleteProjects } from './projectsServices'

const ProjectsList = ({
  data,
  search,
  setSearch,
  paginationModel,
  setPaginationModel,
  sortModel,
  setSortModel,
  isActive,
  setIsActive,
  fetchData,
  canExport = false
}) => {
  const { t } = useTranslation()
  const [total, setTotal] = useState(data.total)
  const [rowSelectionModel, setRowSelectionModel] = useState([])
  const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false)
  const [selectedRowId, setSelectedRowId] = useState(null)

  const handleDelete = () => {
    deleteProjects([selectedRowId]).then(res => {
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
      flex: 0.1,
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
      flex: 0.1,
      minWidth: 120,
      field: 'budget',
      headerName: t('budget'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.budget}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 120,
      field: 'total_cost',
      headerName: t('total_cost'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.total_cost}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 120,
      field: 'area',
      headerName: t('area'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.area}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 120,
      field: 'length',
      headerName: t('length'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.length}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 120,
      field: 'width',
      headerName: t('width'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.width}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 120,
      field: 'height',
      headerName: t('height'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.height}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 150,
      field: 'project_type',
      headerName: t('project_type'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.project_type.name}
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
      minWidth: 140,
      sortable: false,
      field: 'actions',
      headerName: t('actions'),
      renderCell: ({ row }) => <ProjectsRowOptions id={row.id} handleClickDeleteButton={handleClickDeleteButton} />
    }
  ]

  useEffect(() => {
    setTotal(data.total)
  }, [data])

  return (
    <div>
      <ProjectsFilters
        isActive={isActive}
        setIsActive={setIsActive}
      />
      <Card>
        <CardHeader title={t('projects')} />
        <CustomDataGrid
          toolbar={ProjectsListTableHeader}
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

export default ProjectsList
