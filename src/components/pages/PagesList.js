import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import Typography from '@mui/material/Typography'
import Icon from '../../@core/components/icon'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CustomDataGrid from '../Shared/CustomDataGrid'
import { IconButton } from '@mui/material'
import { useRouter } from 'next/router'
import PagesTableHeader from './PagesTableHeader'

const PagesList = ({
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

  const router = useRouter()

  const RowOptions = ({ id }) => {
    const handleView = e => {
      e.stopPropagation()
      router.push(`/main_pages/${id}`)
    }

    const handleEdit = e => {
      e.stopPropagation()
      router.push(`/main_pages/edit/${id}`)
    }

    return (
      <>
        <IconButton color='secondary' onClick={e => handleView(e, id)}>
          <Icon icon='tabler:eye' fontSize={20} />
        </IconButton>
        <IconButton color='warning' onClick={e => handleEdit(e, id)}>
          <Icon icon='tabler:edit' fontSize={20} />
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
      flex: 0.25,
      minWidth: 120,
      field: 'title',
      headerName: t('title')
    },
    {
      flex: 0.25,
      minWidth: 120,
      field: 'slug',
      headerName: t('slug')
    },
    {
      flex: 0.225,
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
      renderCell: ({ row }) => <RowOptions id={row.id} />
    }
  ]

  return (
    <div>
      <Card>
        <CardHeader title={t('pages')} />

        <CustomDataGrid
          toolbar={PagesTableHeader}
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
      </Card>
    </div>
  )
}

export default PagesList
