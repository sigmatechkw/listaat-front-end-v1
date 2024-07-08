import {useEffect, useState} from "react";
import {fetchDreams} from "../../components/Dreams/dreamsServices";
import CustomLoader from "../../components/Shared/CustomLoader";
import DreamsStatistics from "../../components/Dreams/DreamsStatistics";
import DreamsList from "../../components/Dreams/DreamsList";
import TransactionsList from "../../components/Transactions/TransactionsList";
import {fetchTransactions} from "../../components/Transactions/transactionsServices";

const Transactions = () => {
  const [paginationModel, setPaginationModel] = useState({page: 0, pageSize: 10})
  const [sortModel, setSortModel] = useState([])
  const [paid, setPaid] = useState('')
  const [method, setMethod] = useState('')
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTransactions(paginationModel.page, sortModel[0]?.field, sortModel[0]?.sort, paginationModel.pageSize, paid, method, setRows, setLoading)
  }, [paginationModel, sortModel, paid, method]);


  return (
    loading ?
      <CustomLoader />
      :
      <>
        <TransactionsList
          data={rows}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
          sortModel={sortModel}
          setSortModel={setSortModel}
          paid={paid}
          setPaid={setPaid}
          method={method}
          setMethod={setMethod}
        />
      </>
  )
}

export default Transactions
