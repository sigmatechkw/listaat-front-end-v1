import DreamsReportsList from "../../components/DreamsReports/DreamsReportsList";
import CustomLoader from "../../components/Shared/CustomLoader";
import {useEffect, useState} from "react";
import {fetchExpertTransactions} from "../../components/ExpertTransactions/ExpertTransactionsServices";
import ExpertTransactionsList from "../../components/ExpertTransactions/ExpertTransactionsList";
import ExpertTransactionsStatistics from "../../components/ExpertTransactions/ExpertTransactionsStatistics";


const ExpertTransactions = () => {
  const [searchValue, setSearchValue] = useState('')
  const [paginationModel, setPaginationModel] = useState({page: 0, pageSize: 10})
  const [sortModel, setSortModel] = useState([])
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [paid, setPaid] = useState('')
  const [expert, setExpert] = useState('')

  useEffect(() => {
    let searchTimeout = null
    if (searchValue) {
      searchTimeout = setTimeout(() => {
        fetchExpertTransactions(paginationModel.page, searchValue, sortModel[0]?.field, sortModel[0]?.sort, paginationModel.pageSize, paid, expert, setRows, setLoading)
      }, 500)
    } else {
      fetchExpertTransactions(paginationModel.page, searchValue, sortModel[0]?.field, sortModel[0]?.sort, paginationModel.pageSize, paid, expert, setRows, setLoading)
    }

    return () => searchTimeout && clearTimeout(searchTimeout)
  }, [paginationModel, searchValue, sortModel, paid, expert]);


  return (
    loading ?
      <CustomLoader />
    :
      <>
        <ExpertTransactionsStatistics expertId={expert.id} />
        <ExpertTransactionsList
          data={rows}
          search={searchValue}
          setSearch={setSearchValue}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
          sortModel={sortModel}
          setSortModel={setSortModel}
          paid={paid}
          setPaid={setPaid}
          expert={expert}
          setExpert={setExpert}
          fetchData={() => fetchExpertTransactions(paginationModel.page, searchValue, sortModel[0]?.field, sortModel[0]?.sort, paginationModel.pageSize, paid, expert, setRows, setLoading)}
        />
      </>
  )
}

export default ExpertTransactions
