import React, {useEffect, useState} from 'react'
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CustomDataGrid from "../Shared/CustomDataGrid";
import Snackbar from "@mui/material/Snackbar";
import SnackbarConfirmActions from "../Shared/SnackbarConfirmActions";
import {useTranslation} from "react-i18next";
import Typography from "@mui/material/Typography";
import Icon from "../../@core/components/icon";
import ExpertTransactionsRowOptions from "./ExpertTransactionsRowOptions";
import ExpertTransactionsFilters from "./ExpertTransactionsFilters";
import ExpertTransactionsListTableHeader from "./ExpertTransactionsListTableHeader";
import {deleteExpertTransactions, payExpertTransactions} from "./ExpertTransactionsServices";
import Link from "next/link";

const ExpertTransactionsList = ({ data, search, setSearch, paginationModel, setPaginationModel, sortModel, setSortModel, paid, setPaid, expert, setExpert, fetchData, canExport = false, disableExpertFilter = false }) => {
  const {t} = useTranslation()
  const [total, setTotal] = useState(data.total)
  const [rowSelectionModel, setRowSelectionModel] = useState([])
  const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false);
  const [openPaySnackbar, setOpenPaySnackbar] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);

  const handleDelete = () => {
    deleteExpertTransactions([selectedRowId]).then(res => {
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

  const handlePay = () => {
    payExpertTransactions([selectedRowId]).then(res => {
      setSelectedRowId(null)
      setOpenPaySnackbar(false)
      fetchData()
    })
  }

  const handleClickPayButton = (id) => {
    setSelectedRowId(id)
    setOpenPaySnackbar(true);
  };

  const handleClosePaySnackbar = () => {
    setSelectedRowId(null)
    setOpenPaySnackbar(false);
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
      field: 'expert',
      headerName: t('expert'),
      renderCell: ({row}) => (
        <Link href={`/users/${row.expert?.id}`} target={'_blank'} className={'link'}>{row.expert?.full_name}</Link>
      )
    },
    {
      flex: 0.1,
      minWidth: 50,
      field: 'dream',
      headerName: t('dream'),
      renderCell: ({row}) => (
        <Link href={`/dreams/${row.dream?.id}`} target={'_blank'} className={'link'}>{row.dream?.id}</Link>
      )
    },
    {
      flex: 0.10,
      minWidth: 100,
      field: 'commission_value',
      headerName: t('commission_value'),
      renderCell: ({row}) => (
        <Typography variant='body2' sx={{color: 'text.primary'}}>
          {row.commission_value}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 120,
      field: 'commission_type',
      headerName: t('commission_type'),
      renderCell: ({row}) => (
        <Typography variant='body2' sx={{color: 'text.primary'}}>
          {row.commission_type}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 120,
      field: 'calculated_commission',
      headerName: t('calculated_commission'),
      renderCell: ({row}) => (
        <Typography variant='body2' sx={{color: 'text.primary'}}>
          {row.calculated_commission}
        </Typography>
      )
    },
    {
      flex: 0.10,
      minWidth: 100,
      field: 'paid',
      headerName: t('paid'),
      renderCell: ({row}) => (
        <Typography variant='body2' sx={{color: 'text.primary'}}>
          {row.paid ?
            <Icon icon='tabler:circle-check' color='green' fontSize='2rem'/> :
            <Icon icon='tabler:xbox-x' fontSize='2rem' color='red'/>}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 120,
      field: 'paid_at',
      headerName: t('paid_at'),
      renderCell: ({row}) => (
        <Typography variant='body2' sx={{color: 'text.primary'}}>
          {row.paid_at}
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
      renderCell: ({row}) => <ExpertTransactionsRowOptions id={row.id} handleClickDeleteButton={handleClickDeleteButton} handleClickPayButton={handleClickPayButton}/>
    }
  ]

  useEffect(() => {
    setTotal(data.total)
  }, [data]);

  return (
    <div>
      <ExpertTransactionsFilters
        paid={paid}
        setPaid={setPaid}
        expert={expert}
        setExpert={setExpert}
        disableExpertFilter={disableExpertFilter}
      />
      <Card>
        <CardHeader title={t('expert_transactions')}/>
        <CustomDataGrid
          toolbar={ExpertTransactionsListTableHeader}
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
      <Snackbar
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        open={openPaySnackbar}
        onClose={handleClosePaySnackbar}
        message={t('confirm_payment')}
        action={<SnackbarConfirmActions handleConfirm={handlePay} handleClose={handleClosePaySnackbar}/>}
      />
    </div>
  )
}

export default ExpertTransactionsList
