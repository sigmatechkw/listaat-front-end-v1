import CustomLoader from '../../components/Shared/CustomLoader'
import { useEffect, useState } from 'react'
import { fetchGallary } from 'src/components/Gallary/GallaryServices'
import GallaryList from 'src/components/Gallary/GallaryList'

const Gallary = () => {
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
        fetchGallary(
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
      fetchGallary(
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
      <GallaryList
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
          fetchGallary(
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

export default Gallary
