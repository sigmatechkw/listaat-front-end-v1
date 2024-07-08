import { useEffect, useState } from 'react'
import CustomLoader from '../../components/Shared/CustomLoader'
import { fetchSms } from 'src/components/sms_methods/fetchSmsService'
import SmsList from 'src/components/sms_methods/SmsList'

const SmsMethods = () => {
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
        fetchSms(
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
      fetchSms(
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
      <SmsList
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
          fetchSms(
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

export default SmsMethods
