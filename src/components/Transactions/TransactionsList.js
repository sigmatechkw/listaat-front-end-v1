import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import Icon from "../../@core/components/icon";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CustomDataGrid from "../Shared/CustomDataGrid";
import TransactionsFilters from "./TransactionsFilters";
import Link from "next/link";
import TransactionsRowOptions from "./TransactionsRowOptions";

const TransactionsList = ({
  data,
  paginationModel,
  setPaginationModel,
  sortModel,
  setSortModel,
  paid,
  setPaid,
  method,
  setMethod
}) => {
  const { t } = useTranslation()
  const [total, setTotal] = useState(data.total)
  const [rowSelectionModel, setRowSelectionModel] = useState([])

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
      flex: 0.175,
      minWidth: 120,
      sortable: false,
      field: 'user',
      headerName: t('user'),
      renderCell: ({row}) => (
        <Link href={`/users/${row.user?.id}`} target={'_blank'} className={'link'}>{row.user?.full_name}</Link>
      )
    },
    {
      flex: 0.25,
      minWidth: 200,
      sortable: false,
      field: 'payment_name',
      headerName: t('payment_for'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.payment_name}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 80,
      field: 'amount',
      headerName: t('amount'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.amount} {t('kwd')}
        </Typography>
      )
    },
    {
      flex: 0.25,
      minWidth: 200,
      sortable: false,
      field: 'method',
      headerName: t('payment method'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.method?.name}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 80,
      field: 'is_paid',
      headerName: t('paid'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.paid ? (
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
      renderCell: ({ row }) => <TransactionsRowOptions id={row.id} />
    }
  ]

  useEffect(() => {
    setTotal(data.total)
  }, [data]);

  return (
    <div>
      <TransactionsFilters paid={paid} setPaid={setPaid} method={method} setMethod={setMethod} />
      <Card>
        <CardHeader title={t('transactions')} />
        <CustomDataGrid
          rows={data.items}
          columns={columns}
          total={total}
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

export default TransactionsList
