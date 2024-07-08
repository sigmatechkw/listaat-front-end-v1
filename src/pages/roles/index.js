import { useEffect, useState } from 'react'
import CustomLoader from '../../components/Shared/CustomLoader'
import { fetchRoles } from 'src/components/roles/fetchRolesService'
import RoleList from 'src/components/roles/RoleList'

const Roles = () => {
  const [method, setMethod] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [sortModel, setSortModel] = useState([])
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let searchTimeout = null
    if (searchValue) {
      searchTimeout = setTimeout(() => {
        fetchRoles(
          paginationModel.page,
          searchValue,
          sortModel[0]?.field,
          sortModel[0]?.sort,
          paginationModel.pageSize,
          setRows,
          setLoading
        )
      }, 500)
    } else {
      fetchRoles(
        paginationModel.page,
        searchValue,
        sortModel[0]?.field,
        sortModel[0]?.sort,
        paginationModel.pageSize,
        setRows,
        setLoading
      )
    }

    return () => searchTimeout && clearTimeout(searchTimeout)
  }, [paginationModel, searchValue, sortModel])

  return loading ? (
    <CustomLoader />
  ) : (
    <>
      <RoleList
        search={searchValue}
        setSearch={setSearchValue}
        data={rows}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
        sortModel={sortModel}
        setSortModel={setSortModel}
        method={method}
        setMethod={setMethod}
        fetchData={() =>
          fetchRoles(
            paginationModel.page,
            searchValue,
            sortModel[0]?.field,
            sortModel[0]?.sort,
            paginationModel.pageSize,
            setRows,
            setLoading
          )
        }
      />
    </>
  )
}

export default Roles
