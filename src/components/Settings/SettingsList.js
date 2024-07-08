import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import Typography from '@mui/material/Typography'
import Icon from '../../@core/components/icon'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CustomDataGrid from '../Shared/CustomDataGrid'
import SettingsListTableHeader from './SettingsListTableHeader'
import { IconButton, styled } from '@mui/material'
import { useRouter } from 'next/router'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 40,
  height: 40,
  marginRight: theme.spacing(6),
  borderRadius: theme.shape.borderRadius
}))

const SettingsList = ({
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

  const handleView = (e, id) => {
    e.stopPropagation()
    router.push(`/settings/${id}`)
  }

  const handleEdit = (e, id) => {
    e.stopPropagation()
    router.push(`/settings/edit/${id}`)
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
      field: 'label',
      headerName: t('label')
    },
    {
      flex: 0.25,
      minWidth: 80,
      field: 'dream',
      headerName: t('value'),
      renderCell: ({ row }) => (
        <>
          {row.type == 'checkbox' && (
            <Typography variant='body2' sx={{ color: 'text.primary' }}>
              {row.value == 1 ? (
                <Icon icon='tabler:circle-check' color='green' fontSize='2rem' />
              ) : (
                <Icon icon='tabler:xbox-x' fontSize='2rem' color='red' />
              )}
            </Typography>
          )}

          {row.type == 'image' && (
            <Typography variant='body2' sx={{ color: 'text.primary', textAlign: 'center' }}>
              <ImgStyled src={row.value} alt='Profile Pic' />
            </Typography>
          )}

          {row.type != 'checkbox' && row.type != 'image' && (
            <Typography variant='body2' sx={{ color: 'text.primary', textAlign: 'center' }}>
              {row.value ? row.value : '-'}
            </Typography>
          )}
        </>
      )
    },
    {
      flex: 0.3,
      minWidth: 120,
      field: 'control',
      headerName: t('control'),
      renderCell: ({ row }) => (
        <div>
          <IconButton color='secondary' onClick={e => handleView(e, row.id)}>
            <Icon icon='tabler:eye' fontSize={20} />
          </IconButton>

          {row.editable == 1 && (
            <>
              <IconButton color='warning' onClick={e => handleEdit(e, row.id)}>
                <Icon icon='tabler:edit' fontSize={20} />
              </IconButton>
            </>
          )}
        </div>
      )
    }
  ]

  const handleSearch = value => {
    setSearchValue(value)
  }

  return (
    <div>
      <Card>
        <CardHeader title={t('settings')} />

        <CustomDataGrid
          toolbar={SettingsListTableHeader}
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

export default SettingsList
