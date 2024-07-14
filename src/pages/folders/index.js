import CustomLoader from '../../components/Shared/CustomLoader'
import { useEffect, useState } from 'react'
import { fetchFolders } from 'src/components/Folders/FoldersServices'
import FoldersList from 'src/components/Folders/FoldersList'

const Folders = () => {
  const [searchValue, setSearchValue] = useState('')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [sortModel, setSortModel] = useState([])
  const [isActive, setIsActive] = useState('')
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let searchTimeout = null
    if (searchValue) {
      searchTimeout = setTimeout(() => {
        fetchFolders(
          paginationModel.page,
          searchValue,
          sortModel[0]?.field,
          sortModel[0]?.sort,
          paginationModel.pageSize,
          isActive,
          setRows,
          setLoading
        )
      }, 500)
    } else {
        fetchFolders(
        paginationModel.page,
        searchValue,
        sortModel[0]?.field,
        sortModel[0]?.sort,
        paginationModel.pageSize,
        isActive,
        setRows,
        setLoading
      )
    }

    return () => searchTimeout && clearTimeout(searchTimeout)
  }, [paginationModel, searchValue, sortModel, isActive])

  return loading ? (
    <CustomLoader />
  ) : (
    <>
      <FoldersList
        data={rows}
        search={searchValue}
        setSearch={setSearchValue}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
        sortModel={sortModel}
        setSortModel={setSortModel}
        isActive={isActive}
        setIsActive={setIsActive}
        fetchData={() =>
            fetchFolders(
            paginationModel.page,
            searchValue,
            sortModel[0]?.field,
            sortModel[0]?.sort,
            paginationModel.pageSize,
            isActive,
            setRows,
            setLoading
          )
        }
        canExport={false}
      />
    </>
  )
}

export default Folders