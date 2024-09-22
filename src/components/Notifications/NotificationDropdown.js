// ** React Imports
import {useState, Fragment, useEffect} from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Badge from '@mui/material/Badge'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import {styled, useTheme} from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MuiMenu from '@mui/material/Menu'
import MuiMenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Components
import PerfectScrollbarComponent from 'react-perfect-scrollbar'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Util Import
import {getInitials} from 'src/@core/utils/get-initials'
import {useInfiniteQuery} from "@tanstack/react-query";
import {fetchNotifications} from "./notificationsServices";
import CustomLoader from "../Shared/CustomLoader";
import axios from "axios";
import {getCookie} from "cookies-next";
import toast from "react-hot-toast";
import {useTranslation} from "react-i18next";
import {useRouter} from "next/router";

// ** Styled Menu component
const Menu = styled(MuiMenu)(({theme}) => ({
  '& .MuiMenu-paper': {
    width: 380,
    overflow: 'hidden',
    marginTop: theme.spacing(4.25),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  '& .MuiMenu-list': {
    padding: 0,
    '& .MuiMenuItem-root': {
      margin: 0,
      borderRadius: 0,
      padding: theme.spacing(4, 6),
      '&:hover': {
        backgroundColor: theme.palette.action.hover
      }
    }
  }
}))

// ** Styled MenuItem component
const MenuItem = styled(MuiMenuItem)(({theme}) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  '&:not(:last-of-type)': {
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}))

// ** Styled PerfectScrollbar component
const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  maxHeight: 349
})

// ** Styled Avatar component
const Avatar = styled(CustomAvatar)({
  width: 38,
  height: 38,
  fontSize: '1.125rem'
})

// ** Styled component for the title in MenuItems
const MenuItemTitle = styled(Typography)({
  fontWeight: 500,
  flex: '1 1 100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
})

// ** Styled component for the subtitle in MenuItems
const MenuItemSubtitle = styled(Typography)({
  flex: '1 1 100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
})

const ScrollWrapper = ({children, hidden}) => {
  if (hidden) {
    return <Box sx={{maxHeight: 349, overflowY: 'auto', overflowX: 'hidden'}}>{children}</Box>
  } else {
    return <PerfectScrollbar options={{wheelPropagation: false, suppressScrollX: true}}>{children}</PerfectScrollbar>
  }
}

const NotificationDropdown = props => {
  // ** Props
  const {settings} = props

  const theme = useTheme()
  const {t} = useTranslation()
  const router = useRouter()
  // ** States
  const [anchorEl, setAnchorEl] = useState(null)

  // ** Hook
  const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'))

  // ** Vars
  const {direction} = settings

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['fetchNotifications'],
    queryFn: fetchNotifications,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage?.current_page,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.current_page < lastPage.last_page ? lastPage?.current_page : undefined;
    },
  })

  const handleDropdownOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = () => {
    setAnchorEl(null)
  }

  const handleNotificationClick = (notification) => {
    handleDropdownClose()
    if (notification.target_type === 10) {
      router.push(`/dream-reports/${notification.target}`)
    } else if (notification.target_type === 3) {
      router.push(`/dreams/${notification.target}`)
    } else if (notification.target_type === 2) {
      router.push(`/blogs/${notification.target}`)
    } else if (notification.target_type === 11) {
      router.push(`/chats?id=${notification.target}`)
    }
  }

  const RenderAvatar = ({notification}) => {
    const {avatarAlt, avatarImg, avatarIcon, avatarText, avatarColor} = notification
    if (avatarImg) {
      return <Avatar alt={avatarAlt} src={avatarImg}/>
    } else if (avatarIcon) {
      return (
        <Avatar skin='light' color={avatarColor}>
          {avatarIcon}
        </Avatar>
      )
    } else {
      return (
        <Avatar skin='light' color={avatarColor}>
          {getInitials(avatarText)}
        </Avatar>
      )
    }
  }

  return (
    <Fragment>
      <IconButton color='inherit' aria-haspopup='true' onClick={handleDropdownOpen} aria-controls='customized-menu'>
        <Badge
          color='error'
          variant='dot'
          // invisible={!data?.items?.length}
          invisible={true}
          sx={{
            '& .MuiBadge-badge': {top: 4, right: 4, boxShadow: theme => `0 0 0 2px ${theme.palette.background.paper}`}
          }}
        >
          <Icon fontSize='1.625rem' icon='tabler:bell'/>
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
        anchorOrigin={{vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left'}}
        transformOrigin={{vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left'}}
      >
        <MenuItem
          disableRipple
          disableTouchRipple
          sx={{cursor: 'default', userSelect: 'auto', backgroundColor: 'transparent !important'}}
        >
          <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
            <Typography variant='h5' sx={{cursor: 'text'}}>
              {t('notifications')}
            </Typography>
            {/*<CustomChip skin='light' size='small' color='primary' label={`${notifications.length} New`} />*/}
          </Box>
        </MenuItem>
        <ScrollWrapper hidden={hidden}>
          {
            status === 'loading' || status === 'pending' ? (
              <CustomLoader/>
            ) : status === 'error' ? (
              <MenuItem disableRipple disableTouchRipple>{error.message}</MenuItem>
            ) : (
              data?.pages.length > 0 ?
                data?.pages.map((page, index) => (
                  page?.items.length > 0 ?
                    page.items.map((notification, index) => (
                      <MenuItem key={index} sx={{display: 'flex', flexDirection: 'column'}} disableRipple disableTouchRipple onClick={() => handleNotificationClick(notification)}>
                        <Box sx={{width: '100%', display: 'flex', alignItems: 'center'}}>
                          {/*<RenderAvatar notification={notification} />*/}
                          <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            p: 3,
                            mx: 1,
                            borderRadius: '50%',
                            backgroundColor: theme.palette.background.default
                          }}>
                            <Icon icon={'tabler:zzz'} fontSize={'1.5rem'}/>
                          </Box>
                          <Box sx={{
                            mr: 4,
                            ml: 2.5,
                            flex: '1 1',
                            display: 'flex',
                            overflow: 'hidden',
                            flexDirection: 'column'
                          }}>
                            <MenuItemTitle>{notification.title}</MenuItemTitle>
                            <MenuItemSubtitle variant='body2'>{notification.body}</MenuItemSubtitle>
                            {/*<MenuItemSubtitle variant='body2' sx={{display: 'flex', justifyContent: 'end', mt: 2}}>{notification.created_at}</MenuItemSubtitle>*/}
                          </Box>
                        </Box>
                        <Box sx={{display: 'flex', justifyContent: 'end', mt: 2, width: '100%'}}>
                          <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                            {notification.created_at}
                          </Typography>
                        </Box>
                      </MenuItem>
                    ))
                  : (
                    <MenuItem key={index} disableRipple disableTouchRipple>
                      {t('no_notifications')}
                    </MenuItem>
                  )
                ))
              : (
                <MenuItem disableRipple disableTouchRipple>
                  {t('no_notifications')}
                </MenuItem>
              )
            )
          }
        </ScrollWrapper>
        <MenuItem
          disableRipple
          disableTouchRipple
          sx={{
            borderBottom: 0,
            cursor: 'default',
            userSelect: 'auto',
            backgroundColor: 'transparent !important',
            borderTop: theme => `1px solid ${theme.palette.divider}`
          }}
        >
          <Button fullWidth variant='contained' onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
            {t('load_more')}
          </Button>
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default NotificationDropdown
