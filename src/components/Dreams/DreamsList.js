import React, {useEffect, useState} from 'react'
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CustomDataGrid from "../Shared/CustomDataGrid";
import Snackbar from "@mui/material/Snackbar";
import SnackbarConfirmActions from "../Shared/SnackbarConfirmActions";
import {useTranslation} from "react-i18next";
import Typography from "@mui/material/Typography";
import Icon from "../../@core/components/icon";
import DreamsListTableHeader from "./DreamsListTableHeader";
import DreamsRowOptions from "./DreamsRowOptions";
import {deleteDreams} from "./dreamsServices";
import DreamsFilters from "./DreamsFilters";
import Link from "next/link";
import {DREAM_STATUS} from "../../constants/constants";

const DreamsList = ({ data, search, setSearch, paginationModel, setPaginationModel, sortModel, setSortModel, type, setType, status, setStatus, isLate, setIsLate, isPublic, isPaid, setIsPaid, setIsPublic, showUserSearch = true, user = '', setUser, fetchData, canExport = false }) => {
  const {t} = useTranslation()
  const [total, setTotal] = useState(data.total)
  const [rowSelectionModel, setRowSelectionModel] = useState([])
  const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false)
  const [selectedRowId, setSelectedRowId] = useState(null)

  const handleDelete = () => {
    deleteDreams([selectedRowId]).then(res => {
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
      flex: 0.175,
      minWidth: 120,
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
      field: 'title',
      headerName: t('title'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.title}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 120,
      field: 'user',
      sortable: false,
      headerName: t('user'),
      renderCell: ({row}) => (
        <Link href={`/users/${row.user?.id}`} target={'_blank'} className={'link'}>{row.user?.full_name}</Link>
      )
    },
    {
      flex: 0.175,
      minWidth: 120,
      sortable: false,
      field: 'expert',
      headerName: t('expert'),
      renderCell: ({row}) => (
        row.expert &&
          <Link href={`/users/${row.expert?.id}`} target={'_blank'} className={'link'}>{row.expert?.full_name}</Link>
      )
    },
    {
      flex: 0.175,
      minWidth: 120,
      sortable: false,
      field: 'type',
      headerName: t('type'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.type?.name}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 120,
      sortable: false,
      field: 'status',
      headerName: t('status'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {DREAM_STATUS[row.status]}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 120,
      field: 'final_price',
      headerName: t('final_price'),
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.final_price}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 120,
      sortable: false,
      field: 'paid',
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
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: t('actions'),
      renderCell: ({ row }) => <DreamsRowOptions id={row.id} handleClickDeleteButton={handleClickDeleteButton} />
    }
  ]

  useEffect(() => {
    setTotal(data.total)
  }, [data]);

  return (
    <div>
      <DreamsFilters
        type={type}
        setType={setType}
        status={status}
        setStatus={setStatus}
        isLate={isLate}
        setIsLate={setIsLate}
        isPublic={isPublic}
        setIsPublic={setIsPublic}
        isPaid={isPaid}
        setIsPaid={setIsPaid}
      />
      <Card>
        <CardHeader title={t('dreams')} />
        <CustomDataGrid
          toolbar={DreamsListTableHeader}
          toolbarProps={{
            value: search,
            clearSearch: () => setSearch(''),
            onChange: event => setSearch(event.target.value),
            showUserSearch: showUserSearch,
            user: user,
            onUserChange: event => setUser(event.target.value),
            clearUserSearch: () => setUser(''),
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

export default DreamsList
