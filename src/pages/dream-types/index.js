import CustomLoader from "../../components/Shared/CustomLoader";
import {useEffect, useState} from "react";
import {fetchDreamTypes} from "../../components/DreamTypes/dreamTypesServices";
import DreamTypesList from "../../components/DreamTypes/DreamTypesList";


const DreamTypes = () => {
  const [searchValue, setSearchValue] = useState('')
  const [paginationModel, setPaginationModel] = useState({page: 0, pageSize: 10})
  const [sortModel, setSortModel] = useState([])
  const [isActive, setIsActive] = useState('')
  const [isPublic, setIsPublic] = useState('')
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let searchTimeout = null
    if (searchValue) {
      searchTimeout = setTimeout(() => {
        fetchDreamTypes(paginationModel.page, searchValue, sortModel[0]?.field, sortModel[0]?.sort, paginationModel.pageSize, isActive, isPublic, setRows, setLoading)
      }, 500)
    } else {
      fetchDreamTypes(paginationModel.page, searchValue, sortModel[0]?.field, sortModel[0]?.sort, paginationModel.pageSize, isActive, isPublic, setRows, setLoading)
    }

    return () => searchTimeout && clearTimeout(searchTimeout)
  }, [paginationModel, searchValue, sortModel, isActive, isPublic]);


  return (
    loading ?
      <CustomLoader />
      :
      <>
        <DreamTypesList
          data={rows}
          search={searchValue}
          setSearch={setSearchValue}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
          sortModel={sortModel}
          setSortModel={setSortModel}
          isActive={isActive}
          setIsActive={setIsActive}
          isPublic={isPublic}
          setIsPublic={setIsPublic}
          fetchData={() => fetchDreamTypes(paginationModel.page, searchValue, sortModel[0]?.field, sortModel[0]?.sort, paginationModel.pageSize, isActive, isPublic, setRows, setLoading)}
          canExport={false}
        />
      </>
  )
}

export default DreamTypes
