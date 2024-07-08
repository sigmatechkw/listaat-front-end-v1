// ** React Imports
import {useEffect, useState} from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import Icon from 'src/@core/components/icon'

// ** ThirdParty Components
import axios from 'axios'

// ** Custom Components
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import {getInitials} from 'src/@core/utils/get-initials'
import UsersListTableHeader from "../../components/Users/List/UsersListTableHeader";
import toast from "react-hot-toast";
import {useRouter} from "next/router";
import UsersRowOptions from "../../components/Users/List/UsersRowOptions";
import Snackbar from "@mui/material/Snackbar";
import CustomDataGrid from "../../components/Shared/CustomDataGrid";
import {useTranslation} from "react-i18next";
import SnackbarConfirmActions from "../../components/Shared/SnackbarConfirmActions";
import {deleteUsers} from "../../components/Users/Details/userDetailsServices";
import DreamsFilters from "../../components/Dreams/DreamsFilters";
import UsersFilters from "../../components/Users/List/UsersFilters";
import UsersStatistics from "../../components/Users/List/UsersStatistics";

// ** renders client column

const UsersList = () => {
  const {t} = useTranslation()
  const router = useRouter()

  // ** States
  const [total, setTotal] = useState(0)
  const [rows, setRows] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [paginationModel, setPaginationModel] = useState({page: 0, pageSize: 10})
  const [rowSelectionModel, setRowSelectionModel] = useState([])
  const [sortModel, setSortModel] = useState([])
  const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [role, setRole] = useState('')
  const [active, setActive] = useState('')
  const [employmentStatus, setEmploymentStatus] = useState('')
  const [maritalStatus, setMaritalStatus] = useState('')
  const [gender, setGender] = useState('')
  const [country, setCountry] = useState('')
  const [dreamsCount, setDreamsCount] = useState('')

  const renderClient = params => {
    const {row} = params
    const stateNum = Math.floor(Math.random() * 6)
    const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary']
    const color = states[stateNum]
    const fullName = row.first_name + ' ' + row.last_name
    if (row.image !== null) {
      return <CustomAvatar src={row.image} sx={{mr: 3, width: '1.875rem', height: '1.875rem'}}/>
    } else {
      return (
        <CustomAvatar skin='light' color={color} sx={{mr: 3, fontSize: '.8rem', width: '1.875rem', height: '1.875rem'}}>
          {getInitials(fullName ? fullName : '')}
        </CustomAvatar>
      )
    }
  }

  const columns = [
    {
      flex: 0.1,
      minWidth: 100,
      field: 'id',
      headerName: t('id'),
      renderCell: params => (
        <Typography variant='body2' sx={{color: 'text.primary'}}>
          {params.row.id}
        </Typography>
      )
    },
    {
      flex: 0.25,
      minWidth: 290,
      field: 'first_name',
      headerName: t('name'),
      renderCell: params => {
        const {row} = params

        return (
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            {renderClient(params)}
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
              <Typography noWrap variant='body2' sx={{color: 'text.primary', fontWeight: 600}}>
                {row.first_name} {row.last_name}
              </Typography>
              <Typography noWrap variant='caption'>
                {row.email}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.175,
      minWidth: 120,
      field: 'gender',
      headerName: t('gender'),
      renderCell: params => (
        <Typography variant='body2' sx={{color: 'text.primary'}}>
          {params.row.gender === 1 ? <Icon icon='tabler:man' fontSize='2rem'/> :
            <Icon icon='tabler:woman' fontSize='2rem'/>}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 110,
      field: 'phone',
      headerName: t('phone'),
      renderCell: params => (
        <Typography variant='body2' sx={{color: 'text.primary'}}>
          {params.row.phone}
        </Typography>
      )
    },
    // {
    //   flex: 0.125,
    //   minWidth: 80,
    //   field: 'email_verified',
    //   headerName: t('email_verified'),
    //   renderCell: params => (
    //     <Typography variant='body2' sx={{color: 'text.primary'}}>
    //       {params.row.email_verified === true ? <Icon icon='tabler:circle-check' color='green' fontSize='2rem'/> :
    //         <Icon icon='tabler:xbox-x' fontSize='2rem' color='red'/>}
    //     </Typography>
    //   )
    // },
    // {
    //   flex: 0.125,
    //   minWidth: 80,
    //   field: 'phone_verified',
    //   headerName: t('phone_verified'),
    //   renderCell: params => (
    //     <Typography variant='body2' sx={{color: 'text.primary'}}>
    //       {params.row.phone_verified === true ? <Icon icon='tabler:circle-check' color='green' fontSize='2rem'/> :
    //         <Icon icon='tabler:xbox-x' fontSize='2rem' color='red'/>}
    //     </Typography>
    //   )
    // },
    {
      flex: 0.125,
      minWidth: 80,
      field: 'active',
      headerName: t('active'),
      renderCell: params => (
        <Typography variant='body2' sx={{color: 'text.primary'}}>
          {params.row.active === true ? <Icon icon='tabler:circle-check' color='green' fontSize='2rem'/> :
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
      renderCell: ({row}) => <UsersRowOptions id={row.id} handleClickDeleteButton={handleClickDeleteButton}/>
    }
  ]


  const fetchTableData = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_KEY}users`, {
        params: {
          paginate: 1,
          search: searchValue,
          sortType: sortModel[0]?.sort ?? 'desc',
          sortKey: sortModel[0]?.field ?? 'id',
          page: paginationModel.page + 1,
          perPage: paginationModel.pageSize,
          filters: {
            role,
            active,
            gender,
            employment_status: employmentStatus,
            marital_status: maritalStatus,
            country_id: country,
            dreams_count: dreamsCount,
          }
        }
      })
      .then(res => {
        setTotal(res.data.data.total)
        setRows(res.data.data.items)
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
  }, [paginationModel, searchValue, sortModel, role, active, employmentStatus, maritalStatus, gender, country, dreamsCount])

  const handleSearch = value => {
    setSearchValue(value)
  }

  const handleDelete = () => {
    deleteUsers([selectedRowId]).then(res => {
      toast.success(t('success'));
      setSelectedRowId(null)
      setOpenDeleteSnackbar(false)
      fetchTableData();
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

  return (
    <div>
      <UsersStatistics />
      <UsersFilters
        role={role}
        setRole={setRole}
        active={active}
        setActive={setActive}
        employmentStatus={employmentStatus}
        setEmploymentStatus={setEmploymentStatus}
        maritalStatus={maritalStatus}
        setMaritalStatus={setMaritalStatus}
        gender={gender}
        setGender={setGender}
        country={country}
        setCountry={setCountry}
        dreamsCount={dreamsCount}
        setDreamsCount={setDreamsCount}
      />
      <Card>
        <CardHeader title={t('users')}/>
        <CustomDataGrid
          toolbar={UsersListTableHeader}
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
          sortModel={sortModel}
          setSortModel={setSortModel}
        />
      </Card>
      <Snackbar
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        open={openDeleteSnackbar}
        onClose={handleCloseDeleteSnackbar}
        message={t('are_you_sure')}
        action={<SnackbarConfirmActions handleConfirm={handleDelete} handleClose={handleCloseDeleteSnackbar} />}
      />
    </div>
  )
}

export default UsersList
