import CustomLoader from '../../components/Shared/CustomLoader'
import { useEffect, useState } from 'react'
import { fetchProjectTypes } from 'src/components/ProjectTypes/projectTypesServices'
import ProjectTypesList from '../../components/ProjectTypes/ProjectTypesList'

const ProjectTypes = () => {
  const [searchValue, setSearchValue] = useState('')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [sortModel, setSortModel] = useState([])
  const [isActive, setIsActive] = useState('')
  const [isShouldHasSubTabs, setIsShouldHasSubTabs] = useState('')
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let searchTimeout = null
    if (searchValue) {
      searchTimeout = setTimeout(() => {
        fetchProjectTypes(
          paginationModel.page,
          searchValue,
          sortModel[0]?.field,
          sortModel[0]?.sort,
          paginationModel.pageSize,
          isActive,
          isShouldHasSubTabs,
          setRows,
          setLoading
        )
      }, 500)
    } else {
      fetchProjectTypes(
        paginationModel.page,
        searchValue,
        sortModel[0]?.field,
        sortModel[0]?.sort,
        paginationModel.pageSize,
        isActive,
        isShouldHasSubTabs,
        setRows,
        setLoading
      )
    }

    return () => searchTimeout && clearTimeout(searchTimeout)
  }, [paginationModel, searchValue, sortModel, isActive, isShouldHasSubTabs])

  return loading ? (
    <CustomLoader />
  ) : (
    <>
      <ProjectTypesList
        data={rows}
        search={searchValue}
        setSearch={setSearchValue}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
        sortModel={sortModel}
        setSortModel={setSortModel}
        isActive={isActive}
        setIsActive={setIsActive}
        isShouldHasSubTabs={isShouldHasSubTabs}
        setIsShouldHasSubTabs={setIsShouldHasSubTabs}
        fetchData={() =>
          fetchProjectTypes(
            paginationModel.page,
            searchValue,
            sortModel[0]?.field,
            sortModel[0]?.sort,
            paginationModel.pageSize,
            isActive,
            isShouldHasSubTabs,
            setRows,
            setLoading
          )
        }
        canExport={false}
      />
    </>
  )
}

export default ProjectTypes
