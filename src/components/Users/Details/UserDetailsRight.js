// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import MuiTab from '@mui/material/Tab'
import MuiTabList from '@mui/lab/TabList'
import CircularProgress from '@mui/material/CircularProgress'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Demo Components Imports
import UserViewBilling from 'src/views/apps/user/view/UserViewBilling'
import UserViewAccount from 'src/views/apps/user/view/UserViewAccount'
import UserViewSecurity from 'src/views/apps/user/view/UserViewSecurity'
import UserViewConnection from 'src/views/apps/user/view/UserViewConnection'
import UserViewNotification from 'src/views/apps/user/view/UserViewNotification'
import {useTranslation} from "react-i18next";
import CustomLoader from "../../Shared/CustomLoader";
import UserDreamsList from "../Dreams/UserDreamsList";
import UserTransactionsList from "../Transactions/UserTransactionsList";

// ** Styled Tab component
const Tab = styled(MuiTab)(({ theme }) => ({
  flexDirection: 'row',
  '& svg': {
    marginBottom: '0 !important',
    marginRight: theme.spacing(1.5)
  }
}))

const TabList = styled(MuiTabList)(({ theme }) => ({
  borderBottom: '0 !important',
  '&, & .MuiTabs-scroller': {
    boxSizing: 'content-box',
    padding: theme.spacing(1.25, 1.25, 2),
    margin: `${theme.spacing(-1.25, -1.25, -2)} !important`
  },
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .Mui-selected': {
    boxShadow: theme.shadows[2],
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`
  },
  '& .MuiTab-root': {
    lineHeight: 1,
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      color: theme.palette.primary.main
    }
  }
}))

const UserDetailsRight = ({ user }) => {
  const {t} = useTranslation()

  // ** State
  const [activeTab, setActiveTab] = useState('dreams')
  const [isLoading, setIsLoading] = useState(false)

  // ** Hooks
  const router = useRouter()

  const handleChange = (event, value) => {
    setActiveTab(value)
  }

  // useEffect(() => {
  //   if (tab && tab !== activeTab) {
  //     setActiveTab(tab)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [tab])

  return (
    <TabContext value={activeTab}>
      <TabList
        variant='scrollable'
        scrollButtons='auto'
        onChange={handleChange}
        aria-label='forced scroll tabs example'
        sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
      >
        <Tab value='dreams' label={t('dreams')} icon={<Icon fontSize='1.125rem' icon='tabler:zzz' />} />
        <Tab value='transactions' label={t('transactions')} icon={<Icon fontSize='1.125rem' icon='tabler:currency-dollar' />} />
      </TabList>
      <Box sx={{ mt: 4 }}>
        {isLoading ? (
          <CustomLoader />
        ) : (
          <>
            <TabPanel sx={{ p: 0 }} value='dreams'>
              <UserDreamsList id={user.id} roleId={user.roles[0]?.id} />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value='transactions'>
              <UserTransactionsList user={user} />
            </TabPanel>
          </>
        )}
      </Box>
    </TabContext>
  )
}

export default UserDetailsRight
