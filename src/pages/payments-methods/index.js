import { useEffect, useState } from 'react'
import CustomLoader from '../../components/Shared/CustomLoader'
import { fetchPayments } from 'src/components/payments/fetchPaymentsService'
import PaymentsList from 'src/components/payments/PaymentsList'

const PaymentsMethods = () => {
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
        fetchPayments(
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
      fetchPayments(
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
      <PaymentsList
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
          fetchPayments(
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

export default PaymentsMethods
