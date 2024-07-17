import CustomLoader from '../../components/Shared/CustomLoader'
import { useEffect, useState } from 'react'
import { fetchProjectTabs } from 'src/components/ProjectTabs/projectTabsServices'
import ProjectTabsList from 'src/components/ProjectTabs/ProjectTabsList'

const ProjectTabs = () => {
  const [searchValue, setSearchValue] = useState('')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [sortModel, setSortModel] = useState([])
  const [isActive, setIsActive] = useState('')
  const [isDefault, setIsDefault] = useState('')
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let searchTimeout = null
    if (searchValue) {
      searchTimeout = setTimeout(() => {
        fetchProjectTabs(
          paginationModel.page,
          searchValue,
          sortModel[0]?.field,
          sortModel[0]?.sort,
          paginationModel.pageSize,
          isActive,
          isDefault,
          setRows,
          setLoading
        )
      }, 500)
    } else {
        fetchProjectTabs(
        paginationModel.page,
        searchValue,
        sortModel[0]?.field,
        sortModel[0]?.sort,
        paginationModel.pageSize,
        isActive,
        isDefault,
        setRows,
        setLoading
      )
    }

    return () => searchTimeout && clearTimeout(searchTimeout)
  }, [paginationModel, searchValue, sortModel, isActive , isDefault])

  return loading ? (
    <CustomLoader />
  ) : (
    <>
      <ProjectTabsList
        data={rows}
        search={searchValue}
        setSearch={setSearchValue}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
        sortModel={sortModel}
        setSortModel={setSortModel}
        isActive={isActive}
        setIsActive={setIsActive}
        isDefault={isDefault}
        setIsDefault={setIsDefault}
        fetchData={() =>
            fetchProjectTabs(
            paginationModel.page,
            searchValue,
            sortModel[0]?.field,
            sortModel[0]?.sort,
            paginationModel.pageSize,
            isActive,
            isDefault,
            setRows,
            setLoading
          )
        }
        canExport={false}
      />
    </>
  )
}

export default ProjectTabs
