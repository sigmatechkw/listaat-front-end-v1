import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import Typography from '@mui/material/Typography'
import Icon from '../../@core/components/icon'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CustomDataGrid from '../Shared/CustomDataGrid'
import Link from 'next/link'
import { IconButton } from '@mui/material'
import { useRouter } from 'next/router'
import RolesTableHeader from './RolesTableHeader'

const RoleList = ({
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

  const RowOptions = ({ id, editable }) => {
    /*     const handleView = (e) => {
      e.stopPropagation()
      router.push(`/role/${id}`)
    } */

    const handleEdit = e => {
      e.stopPropagation()
      router.push(`/roles/edit/${id}`)
    }

    return (
      <>
        {/*         <IconButton
          color="secondary"
          onClick={(e) => handleView(e , id)}>
          <Icon icon='tabler:eye' fontSize={20}/>
        </IconButton> */}

        {editable == 1 && (
          <IconButton color='warning' onClick={e => handleEdit(e, id)}>
            <Icon icon='tabler:edit' fontSize={20} />
          </IconButton>
        )}
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

    /* {
      flex: 0.175,
      minWidth: 110,
      field: 'phone',
      headerName: t('phone'),
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.phone ? params.row.phone : '-'}
        </Typography>
      )
    }, */

    {
      flex: 0.25,
      minWidth: 120,
      field: 'name',
      headerName: t('name'),

      renderCell: ({ row }) => (
        <Link href={`/users/${row.id}`} target={'_blank'} className={'link text-white'} sx={{ color: 'text.primary' }}>
          <Typography variant='body2' sx={{ color: 'text.primary' }}>
            {row.name}
          </Typography>
        </Link>
      )
    },
    {
      flex: 0.3,
      minWidth: 120,
      field: 'control',
      headerName: t('control'),
      renderCell: ({ row }) => <RowOptions id={row.id} editable={row.editable} />
    }
  ]

  const handleSearch = value => {
    setSearch(value)
  }

  return (
    <div>
      <Card>
        <CardHeader title={t('roles')} />
        <CustomDataGrid
          toolbar={RolesTableHeader}
          toolbarProps={{
            value: search,
            clearSearch: () => setSearch(''),
            onChange: event => handleSearch(event.target.value),
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

export default RoleList
