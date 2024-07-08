import React, {useEffect, useState} from 'react'
import {fetchUserDreams} from "./userDreamsServices";
import CustomLoader from "../../Shared/CustomLoader";
import DreamsList from "../../Dreams/DreamsList";

const UserDreamsList = ({ id, roleId }) => {
  const [searchValue, setSearchValue] = useState('')
  const [paginationModel, setPaginationModel] = useState({page: 0, pageSize: 10})
  const [sortModel, setSortModel] = useState([])
  const [type, setType] = useState('')
  const [status, setStatus] = useState('')
  const [isLate, setIsLate] = useState('')
  const [isPublic, setIsPublic] = useState('')
  const [isPaid, setIsPaid] = useState('')
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let searchTimeout = null
    if (searchValue) {
      searchTimeout = setTimeout(() => {
        fetchUserDreams(id, roleId, paginationModel.page, searchValue, sortModel[0]?.field, sortModel[0]?.sort, paginationModel.pageSize, type, status, isLate, isPublic, isPaid, setRows, setLoading)
      }, 500)
    } else {
      fetchUserDreams(id, roleId, paginationModel.page, searchValue, sortModel[0]?.field, sortModel[0]?.sort, paginationModel.pageSize, type, status, isLate, isPublic, isPaid, setRows, setLoading)
    }

    return () => searchTimeout && clearTimeout(searchTimeout)
  }, [paginationModel, searchValue, sortModel, type, status, isLate, isPublic, isPaid]);

  return (
    loading ?
      <CustomLoader />
      :
      <>
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
          showUserSearch={false}
          fetchData={() => fetchUserDreams(id, paginationModel.page, searchValue, sortModel[0]?.field, sortModel[0]?.sort, paginationModel.pageSize, type, status, isLate, isPublic, isPaid, setRows, setLoading)}
          canExport={false}
        />
      </>
  )
}

export default UserDreamsList
