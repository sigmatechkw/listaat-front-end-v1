// ** React Imports
import {useEffect, useState} from 'react'
import {useRouter} from 'next/router';

// ** MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import {DataGrid} from '@mui/x-data-grid'
import Icon from 'src/@core/components/icon'
import toast from 'react-hot-toast'
import Grid from '@mui/material/Grid'

// ** ThirdParty Components
import axios from 'axios'

// ** Custom Components
import FaqsListTableHeader from "../../components/Faqs/FaqsListTableHeader";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import FaqsRowOptions from "../../components/Faqs/FaqsRowOptions";
import {useTranslation} from "react-i18next";
import FaqsActiveChart from "src/components/Faqs/FaqsActiveChart";
import CustomDataGrid from "../../components/Shared/CustomDataGrid";
import SnackbarConfirmActions from "../../components/Shared/SnackbarConfirmActions";
import {useSelector} from "react-redux";
import {getCookie} from "cookies-next";
import {useQueryClient} from "@tanstack/react-query";

const FAQs = () => {
  const auth = useSelector(state => state.auth)
  const lang = useSelector(state => state.lang)
  const queryClient = useQueryClient();
  const {t, i18n} = useTranslation()
  const [total, setTotal] = useState(0)
  const [rows, setRows] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [paginationModel, setPaginationModel] = useState({page: 0, pageSize: 10})
  const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false);
  const [rowSelectionModel, setRowSelectionModel] = useState([])
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [dateRange, setDateRange] = useState('all');

  const columns = [
    {
      flex: 0.1,
      minWidth: 100,
      field: 'id',
      headerName: t('id'),
      renderCell: params => {
        return (
          <Typography variant='body2' sx={{color: 'text.primary'}}>
            {params.row.id}
          </Typography>
        )
      },
    },
    {
      flex: 0.175,
      minWidth: 120,
      field: 'question_ar',
      headerName: t('question_ar'),
      renderCell: params => {
        const {row} = params

        return (
          <Typography variant='body2' sx={{color: 'text.primary'}}>
            {params.row.question_ar}
          </Typography>
        )
      }
    },
    {
      flex: 0.175,
      minWidth: 120,
      field: 'question_en',
      headerName: t('question_en'),
      renderCell: params => {
        return (
          <Typography variant='body2' sx={{color: 'text.primary'}}>
            {params.row.question_en}
          </Typography>
        )
      }
    },
    {
      flex: 0.175,
      minWidth: 110,
      field: 'answer_ar',
      headerName: t('answer_ar'),
      renderCell: params => (
        <Typography variant='body2' sx={{color: 'text.primary'}}>
          {params.row.answer_ar}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 110,
      field: 'answer_en',
      headerName: t('answer_en'),
      renderCell: params => (
        <Typography variant='body2' sx={{color: 'text.primary'}}>
          {params.row.answer_en}
        </Typography>
      )
    },
    {
      flex: 0.125,
      minWidth: 80,
      field: 'order',
      headerName: t('order'),
      renderCell: params => (
        <Typography variant='body2' sx={{color: 'text.primary'}}>
          {params.row.order}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 140,
      field: 'active',
      headerName: t('active'),
      renderCell: params => (
        <Typography variant='body2' sx={{color: 'text.primary'}}>
          {+params.row.active ? <Icon icon='tabler:circle-check' color='green' fontSize='2rem'/> :
            <Icon icon='tabler:xbox-x' fontSize='2rem' color='red'/>}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: t('actions'),
      renderCell: ({row}) => <FaqsRowOptions id={row.id} handleClickDeleteButton={handleClickDeleteButton}/>
    }
  ]

  const fetchTableData = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_KEY}faqs`, {
        params: {
          search: searchValue,
          page: paginationModel.page + 1,
          perPage: paginationModel.pageSize,
          sortType: 'desc',
          sortKey: 'id',
        }
      })
      .then(res => {
        setRows(res.data.data.items)
        setTotal(res.data.data.total)
        queryClient.invalidateQueries({ queryKey: ['fetchFaqStatistics', dateRange] })
      }).catch(e => {
        console.log(e)
      })
  }

  useEffect(() => {
    let searchTimeout = null
    if (searchValue) {
      searchTimeout = setTimeout(() => {
        fetchTableData()
      }, 500)
    } else {
      fetchTableData()
    }

    return () => searchTimeout && clearTimeout(searchTimeout)
  }, [paginationModel, searchValue])


  const handleSearch = value => {
    setSearchValue(value)
  }

  const handleDelete = () => {
    let data = {
      delete_ids: [selectedRowId]
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_API_KEY}faqs/delete`, data, {
        headers: {
          'Authorization': getCookie('token'),
          'Accepted-Language': getCookie('lang') ?? lang ?? 'en'
        }
      })
      .then(res => {
        toast.success(t('success'));
        setSelectedRowId(null)
        setOpenDeleteSnackbar(false)
        fetchTableData();
      })
      .catch(error => {
        toast.error(t('error'));
      });
  }


  const handleClickDeleteButton = (id) => {
    setSelectedRowId(id)
    setOpenDeleteSnackbar(true);
  };

  const handleCloseDeleteSnackbar = () => {
    setSelectedRowId(null)
    setOpenDeleteSnackbar(false);
  };

  return (
    <div>
      <Card>
        <CardHeader title={t('faqs')}/>
        <Grid sx={{marginBlock: 1}} item xs={12} md={6}>
          <FaqsActiveChart dateRange={dateRange} setDateRange={setDateRange} />
        </Grid>
      </Card>
      <Card>
        {/*<CardHeader title={t('faqs')}/>*/}
        <CustomDataGrid
          toolbar={FaqsListTableHeader}
          toolbarProps={{
            value: searchValue,
            clearSearch: () => handleSearch(''),
            onChange: event => handleSearch(event.target.value),
            selectedRows: rowSelectionModel,
            fetchTableData: fetchTableData
          }}
          rows={rows}
          columns={columns}
          total={total}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
          rowSelectionModel={rowSelectionModel}
          setRowSelectionModel={setRowSelectionModel}
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

  export default FAQs
