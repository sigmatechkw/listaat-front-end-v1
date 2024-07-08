import { useEffect, useState } from 'react'
import CustomLoader from '../../components/Shared/CustomLoader'
import { fetchPushMessages } from 'src/components/push_messages/fetchPushMessagesService'
import PushMessagesList from 'src/components/push_messages/PushMessagesList'

const PushMessages = () => {
  const [method, setMethod] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [sortModel, setSortModel] = useState([])
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let searchTimeout = null
    if (searchValue) {
      searchTimeout = setTimeout(() => {
        fetchPushMessages(
          paginationModel.page,
          searchValue,
          'created_at',
          'desc',
          paginationModel.pageSize,
          setRows,
          setLoading
        )
      }, 500)
    } else {
      fetchPushMessages(
        paginationModel.page,
        searchValue,
        'created_at',
        'desc',
        paginationModel.pageSize,
        setRows,
        setLoading
      )
    }

    return () => searchTimeout && clearTimeout(searchTimeout)
  }, [paginationModel, searchValue, sortModel])

  return loading ? (
    <CustomLoader />
  ) : (
    <>
      <PushMessagesList
        search={searchValue}
        setSearch={setSearchValue}
        data={rows}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
        sortModel={sortModel}
        setSortModel={setSortModel}
        method={method}
        setMethod={setMethod}
        fetchData={() =>
          fetchPushMessages(
            paginationModel.page,
            searchValue,
            'created_at',
            'desc',
            paginationModel.pageSize,
            setRows,
            setLoading
          )
        }
      />
    </>
  )
}

export default PushMessages
