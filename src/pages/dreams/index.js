import DreamsList from "../../components/Dreams/DreamsList";
import CustomLoader from "../../components/Shared/CustomLoader";
import {useEffect, useState} from "react";
import {fetchDreams} from "../../components/Dreams/dreamsServices";
import DreamsStatistics from "../../components/Dreams/DreamsStatistics";


const Dreams = () => {
  const [searchValue, setSearchValue] = useState('')
  const [paginationModel, setPaginationModel] = useState({page: 0, pageSize: 10})
  const [sortModel, setSortModel] = useState([])
  const [type, setType] = useState('')
  const [status, setStatus] = useState('')
  const [isLate, setIsLate] = useState('')
  const [isPublic, setIsPublic] = useState('')
  const [isPaid, setIsPaid] = useState('')
  const [user, setUser] = useState('')
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let searchTimeout = null
    if (searchValue || user) {
      searchTimeout = setTimeout(() => {
        fetchDreams(paginationModel.page, searchValue, sortModel[0]?.field, sortModel[0]?.sort, paginationModel.pageSize, type, status, isLate, isPublic, isPaid, user, setRows, setLoading)
      }, 500)
    } else {
      fetchDreams(paginationModel.page, searchValue, sortModel[0]?.field, sortModel[0]?.sort, paginationModel.pageSize, type, status, isLate, isPublic, isPaid, user, setRows, setLoading)
    }

    return () => searchTimeout && clearTimeout(searchTimeout)
  }, [paginationModel, searchValue, sortModel, type, status, isLate, isPublic, isPaid, user]);


  return (
    loading ?
      <CustomLoader />
    :
      <>
        <DreamsStatistics />
        <DreamsList
          data={rows}
          search={searchValue}
          setSearch={setSearchValue}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
          sortModel={sortModel}
          setSortModel={setSortModel}
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
          user={user}
          setUser={setUser}
          fetchData={() => fetchDreams(paginationModel.page, searchValue, sortModel[0]?.field, sortModel[0]?.sort, paginationModel.pageSize, type, status, isLate, isPublic, isPaid, user, setRows, setLoading)}
        />
      </>
  )
}

export default Dreams
