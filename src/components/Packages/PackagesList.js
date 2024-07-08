import React, {useEffect, useState} from 'react'
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CustomDataGrid from "../Shared/CustomDataGrid";
import Snackbar from "@mui/material/Snackbar";
import SnackbarConfirmActions from "../Shared/SnackbarConfirmActions";
import {useTranslation} from "react-i18next";
import Typography from "@mui/material/Typography";
import Icon from "../../@core/components/icon";
import {deletePackages} from "./packagesServices";
import PackagesRowOptions from "./PackagesRowOptions";
import PackagesFilters from "./PackagesFilters";
import PackagesListTableHeader from "./PackagesListTableHeader";

const PackagesList = ({ data, search, setSearch, paginationModel, setPaginationModel, sortModel, setSortModel, isActive, setIsActive, fetchData, canExport = false }) => {
  const {t} = useTranslation()
  const [total, setTotal] = useState(data.total)
  const [rowSelectionModel, setRowSelectionModel] = useState([])
  const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);

  const handleDelete = () => {
    deletePackages([selectedRowId]).then(res => {
      setSelectedRowId(null)
      setOpenDeleteSnackbar(false)
      fetchData()
    })
  }

  const handleClickDeleteButton = (id) => {
    setSelectedRowId(id)
    setOpenDeleteSnackbar(true);
  };

  const handleCloseDeleteSnackbar = () => {
    setSelectedRowId(null)
    setOpenDeleteSnackbar(false);
  };

  const columns = [
    {
      flex: 0.1,
      minWidth: 50,
      field: 'id',
      headerName: t('id'),
      renderCell: ({row}) => (
        <Typography variant='body2' sx={{color: 'text.primary'}}>
          {row.id}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 120,
      field: 'name',
      headerName: t('name'),
      renderCell: ({row}) => (
        <Typography variant='body2' sx={{color: 'text.primary'}}>
          {row.name}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 120,
      field: 'price',
      headerName: t('price'),
      renderCell: ({row}) => (
        <Typography variant='body2' sx={{color: 'text.primary'}}>
          {row.price}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 120,
      field: 'balance',
      headerName: t('balance'),
      renderCell: ({row}) => (
        <Typography variant='body2' sx={{color: 'text.primary'}}>
          {row.balance}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 120,
      field: 'discount',
      headerName: t('discount'),
      renderCell: ({row}) => (
        <Typography variant='body2' sx={{color: 'text.primary'}}>
          {row.discount}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 120,
      field: 'order',
      headerName: t('order'),
      renderCell: ({row}) => (
        <Typography variant='body2' sx={{color: 'text.primary'}}>
          {row.order}
        </Typography>
      )
    },
    {
      flex: 0.10,
      minWidth: 100,
      field: 'active',
      headerName: t('is_active'),
      renderCell: ({row}) => (
        <Typography variant='body2' sx={{color: 'text.primary'}}>
          {row.active ?
            <Icon icon='tabler:circle-check' color='green' fontSize='2rem'/> :
            <Icon icon='tabler:xbox-x' fontSize='2rem' color='red'/>}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 120,
      field: 'created_at',
      headerName: t('created_at'),
      renderCell: ({row}) => (
        <Typography variant='body2' sx={{color: 'text.primary'}}>
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
      renderCell: ({row}) => <PackagesRowOptions id={row.id} handleClickDeleteButton={handleClickDeleteButton}/>
    }
  ]

  useEffect(() => {
    setTotal(data.total)
  }, [data]);

  return (
    <div>
      <PackagesFilters
        isActive={isActive}
        setIsActive={setIsActive}
      />
      <Card>
        <CardHeader title={t('packages')}/>
        <CustomDataGrid
          toolbar={PackagesListTableHeader}
          toolbarProps={{
            value: search,
            clearSearch: () => setSearch(''),
            onChange: event => setSearch(event.target.value),
            selectedRows: rowSelectionModel,
            fetchData: fetchData,
            canExport: canExport,
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
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        open={openDeleteSnackbar}
        onClose={handleCloseDeleteSnackbar}
        message={t('are_you_sure')}
        action={<SnackbarConfirmActions handleConfirm={handleDelete} handleClose={handleCloseDeleteSnackbar}/>}
      />
    </div>
  )
}

export default PackagesList
