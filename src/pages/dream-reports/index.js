import DreamsReportsList from "../../components/DreamsReports/DreamsReportsList";
import CustomLoader from "../../components/Shared/CustomLoader";
import {useEffect, useState} from "react";
import {fetchDreamsReports} from "../../components/DreamsReports/dreamsReportsServices";


const DreamsReports = () => {
  const [searchValue, setSearchValue] = useState('')
  const [paginationModel, setPaginationModel] = useState({page: 0, pageSize: 10})
  const [sortModel, setSortModel] = useState([])
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let searchTimeout = null
    if (searchValue) {
      searchTimeout = setTimeout(() => {
        fetchDreamsReports(paginationModel.page, searchValue, sortModel[0]?.field, sortModel[0]?.sort, paginationModel.pageSize, setRows, setLoading)
      }, 500)
    } else {
      fetchDreamsReports(paginationModel.page, searchValue, sortModel[0]?.field, sortModel[0]?.sort, paginationModel.pageSize, setRows, setLoading)
    }

    return () => searchTimeout && clearTimeout(searchTimeout)
  }, [paginationModel, searchValue, sortModel]);


  return (
    loading ?
      <CustomLoader />
    :
      <>
        <DreamsReportsList
          data={rows}
          search={searchValue}
          setSearch={setSearchValue}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
          sortModel={sortModel}
          setSortModel={setSortModel}
          fetchData={() => fetchDreamsReports(paginationModel.page, searchValue, sortModel[0]?.field, sortModel[0]?.sort, paginationModel.pageSize, setRows, setLoading)}
        />
      </>
  )
}

export default DreamsReports
