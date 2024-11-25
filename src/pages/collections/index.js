import CustomLoader from '../../components/Shared/CustomLoader'
import { useEffect, useState } from 'react'
import { fetchCollections } from 'src/components/Collections/CollectionsServices'
import CollectionsList from 'src/components/Collections/CollectionsList'

const Collections = () => {
  const [searchValue, setSearchValue] = useState('')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [sortModel, setSortModel] = useState([])
  const [isActive, setIsActive] = useState('')
  const [user, setUser] = useState(null)
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let searchTimeout = null
    if (searchValue) {
      searchTimeout = setTimeout(() => {
        fetchCollections(
          paginationModel.page,
          searchValue,
          sortModel[0]?.field,
          sortModel[0]?.sort,
          paginationModel.pageSize,
          isActive,
          user,
          setRows,
          setLoading
        )
      }, 500)
    } else {
      fetchCollections(
        paginationModel.page,
        searchValue,
        sortModel[0]?.field,
        sortModel[0]?.sort,
        paginationModel.pageSize,
        isActive,
        user,
        setRows,
        setLoading
      )
    }

    return () => searchTimeout && clearTimeout(searchTimeout)
  }, [paginationModel, searchValue, sortModel, isActive, user])

  return loading ? (
    <CustomLoader />
  ) : (
    <>
      <CollectionsList
        data={rows}
        search={searchValue}
        setSearch={setSearchValue}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
        sortModel={sortModel}
        setSortModel={setSortModel}
        isActive={isActive}
        setIsActive={setIsActive}
        user={user}
        setUser={setUser}
        fetchData={() =>
          fetchCollections(
            paginationModel.page,
            searchValue,
            sortModel[0]?.field,
            sortModel[0]?.sort,
            paginationModel.pageSize,
            isActive,
            user,
            setRows,
            setLoading
          )
        }
        canExport={false}
      />
    </>
  )
}

export default Collections
