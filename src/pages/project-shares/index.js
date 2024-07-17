import CustomLoader from '../../components/Shared/CustomLoader'
import { useEffect, useState } from 'react'
import { fetchProjectShares } from 'src/components/ProjectShares/ProjectSharesServices'
import ProjectSharesList from 'src/components/ProjectShares/ProjectSharesList'

const ProjectShares = () => {
  const [searchValue, setSearchValue] = useState('')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [sortModel, setSortModel] = useState([])
  const [isSent, setIsSent] = useState('')
  const [isAccepted, setIsAccepted] = useState('')
  const [isCopy, setIsCopy] = useState('')
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let searchTimeout = null
    if (searchValue) {
      searchTimeout = setTimeout(() => {
        fetchProjectShares(
          paginationModel.page,
          searchValue,
          sortModel[0]?.field,
          sortModel[0]?.sort,
          paginationModel.pageSize,
          isSent,
          isAccepted,
          isCopy,
          setRows,
          setLoading
        )
      }, 500)
    } else {
        fetchProjectShares(
        paginationModel.page,
        searchValue,
        sortModel[0]?.field,
        sortModel[0]?.sort,
        paginationModel.pageSize,
        isSent,
        isAccepted,
        isCopy,
        setRows,
        setLoading
      )
    }

    return () => searchTimeout && clearTimeout(searchTimeout)
  }, [paginationModel, searchValue, sortModel, isSent , isAccepted , isCopy])

  return loading ? (
    <CustomLoader />
  ) : (
    <>
      <ProjectSharesList
        data={rows}
        search={searchValue}
        setSearch={setSearchValue}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
        sortModel={sortModel}
        setSortModel={setSortModel}
        isSent={isSent}
        setIsSent={setIsSent}
        isAccepted={isAccepted}
        setIsAccepted={setIsAccepted}
        isCopy={isCopy}
        setIsCopy={setIsCopy}
        fetchData={() =>
            fetchProjectShares(
            paginationModel.page,
            searchValue,
            sortModel[0]?.field,
            sortModel[0]?.sort,
            paginationModel.pageSize,
            isSent,
            isAccepted,
            isCopy,
            setRows,
            setLoading
          )
        }
        canExport={false}
      />
    </>
  )
}

export default ProjectShares
