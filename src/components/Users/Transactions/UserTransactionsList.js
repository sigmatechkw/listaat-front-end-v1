import {useEffect, useState} from "react";
import CustomLoader from "../../Shared/CustomLoader";
import TransactionsList from "../../Transactions/TransactionsList";
import {fetchUserTransactions} from "./userTransactionsServices";
import ExpertTransactionsList from "../../ExpertTransactions/ExpertTransactionsList";
import ExpertTransactionsStatistics from "../../ExpertTransactions/ExpertTransactionsStatistics";
import {fetchExpertTransactions} from "../../ExpertTransactions/ExpertTransactionsServices";

const UserTransactionsList = ({ user }) => {
  const [paginationModel, setPaginationModel] = useState({page: 0, pageSize: 10})
  const [sortModel, setSortModel] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [paid, setPaid] = useState('')
  const [method, setMethod] = useState('')
  const [expert, setExpert] = useState(user)
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user.roles[0]?.id === 3) {
      fetchExpertTransactions(paginationModel.page, '', sortModel[0]?.field, sortModel[0]?.sort, paginationModel.pageSize, paid, expert, setRows, setLoading)
    } else {
      fetchUserTransactions(user.id, paginationModel.page, sortModel[0]?.field, sortModel[0]?.sort, paginationModel.pageSize, paid, method, setRows, setLoading)
    }
  }, [paginationModel, sortModel, paid, method]);

  return (
    loading ?
      <CustomLoader />
      :
      <>
        {
          user.roles[0]?.id === 3 ?
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
                disableExpertFilter={true}
                fetchData={() => fetchExpertTransactions(paginationModel.page, '', sortModel[0]?.field, sortModel[0]?.sort, paginationModel.pageSize, paid, expert, setRows, setLoading)}
              />
            </>
          :
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
        }
      </>
  )
}

export default UserTransactionsList
