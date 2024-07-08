import { useEffect, useState } from 'react'
import CustomLoader from '../../components/Shared/CustomLoader'
import { fetchPermissions } from 'src/components/permissions/fetchPermissionsService'
import PermissionsList from 'src/components/permissions/PermissionsList'

const Permissions = () => {
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
        fetchPermissions(
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
      fetchPermissions(
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
      <PermissionsList
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
          fetchPermissions(
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

export default Permissions
