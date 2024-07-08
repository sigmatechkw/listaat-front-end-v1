// ** React Imports
import { useState, useEffect } from 'react'


// ** MUI Imports
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Chip from '@mui/material/Chip'
import Badge from '@mui/material/Badge'
import Drawer from '@mui/material/Drawer'
import MuiAvatar from '@mui/material/Avatar'
import ListItem from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemButton from '@mui/material/ListItemButton'
import InputAdornment from '@mui/material/InputAdornment'

// ** Third Party Components
import PerfectScrollbar from 'react-perfect-scrollbar'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// ** Custom Components Import
import CustomAvatar from 'src/@core/components/mui/avatar'
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Chat App Components Imports
import {useInfiniteQuery, useQueryClient} from "@tanstack/react-query";
import {fetchChatsList} from "./chatsServices";
import CustomLoader from "../Shared/CustomLoader";
import Button from "@mui/material/Button";
import {useTranslation} from "react-i18next";

const ScrollWrapper = ({ children, hidden }) => {
  if (hidden) {
    return <Box sx={{ height: '100%', overflow: 'auto' }}>{children}</Box>
  } else {
    return <PerfectScrollbar options={{ wheelPropagation: false }}>{children}</PerfectScrollbar>
  }
}

const ChatSidebarLeft = props => {
  // ** Props
  const {
    hidden,
    mdAbove,
    getInitials,
    sidebarWidth,
    leftSidebarOpen,
    formatDateToMonthShort,
    handleLeftSidebarToggle,
    setSelectedChatId,
    setSelectedChat,
  } = props

  // ** States
  const [search, setSearch] = useState('')
  const [activeChat, setActiveChat] = useState(null)
  const queryClient = useQueryClient()
  const {t} = useTranslation()

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['fetchChatsList'],
    queryFn: (p) => fetchChatsList(p, search),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.current_page < lastPage?.last_page ? lastPage?.current_page : undefined;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })


  const handleChatClick = (chat) => {
    setActiveChat(chat.id)
    setSelectedChatId(chat.id)
    setSelectedChat(chat)
    if (!mdAbove) {
      handleLeftSidebarToggle()
    }
  }

  useEffect(() => {
    let searchTimeout = null
    if (search) {
      searchTimeout = setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['fetchChatsList'] })
      }, 500)
    } else {
      queryClient.invalidateQueries({ queryKey: ['fetchChatsList'] })
    }

    return () => searchTimeout && clearTimeout(searchTimeout)
  }, [search]);

  useEffect(() => {
    let chatsUpdateChannel = null
    setTimeout(() => {
      chatsUpdateChannel = pusher.subscribe(`private-admins-update-chats-list`)
      chatsUpdateChannel.bind('admins-update-chats', async res => {
          queryClient.invalidateQueries({ queryKey: ['fetchChatsList'] })
        })
    }, 50)

    return () => {
      if (chatsUpdateChannel) {
        chatsUpdateChannel.unbind('admins-update-chats')
        chatsUpdateChannel.unsubscribe()
      }
    }
  }, [])

  const renderChats = () => {
    if (status === 'loading' || status === 'pending') {
      return <CustomLoader />
    } else if (status === 'error') {
      return (
        <ListItem>
          <Typography sx={{ color: 'text.secondary' }}>{error.message}</Typography>
        </ListItem>
      )
    } else {
      if (data?.pages.length === 0) {
        return (
          <ListItem>
            <Typography sx={{ color: 'text.secondary' }}>{t('no_chats_found')}</Typography>
          </ListItem>
        )
      } else {

        return data?.pages.map((page, pageIndex) => (
          page?.items.length > 0 &&
            page.items.map((chat, index) => (
              <ListItem key={index} disablePadding sx={{ '&:not(:last-child)': { mb: 1 } }}>
                <ListItemButton
                  disableRipple
                  onClick={() => handleChatClick(chat)}
                  sx={{
                    py: 2,
                    px: 3,
                    width: '100%',
                    borderRadius: 1,
                    alignItems: 'flex-start',
                    '&.MuiListItemButton-root:hover': { backgroundColor: 'action.hover' },
                    ...(activeChat === chat.id && {
                      background: theme =>
                        `linear-gradient(72.47deg, ${theme.palette.primary.main} 22.16%, ${hexToRGBA(
                          theme.palette.primary.main,
                          0.7
                        )} 76.47%) !important`
                    })
                  }}
                >
                  <ListItemAvatar sx={{ m: 0, alignSelf: 'center' }}>
                    <Badge
                      overlap='circular'
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                      }}
                      // badgeContent={
                      //   <Box
                      //     component='span'
                      //     sx={{
                      //       width: 8,
                      //       height: 8,
                      //       borderRadius: '50%',
                      //       color: chat.user.is_online ? 'success.main' : 'secondary.main',
                      //       backgroundColor: chat.user.is_online ? 'success.main' : 'secondary.main',
                      //       boxShadow: theme =>
                      //         `0 0 0 2px ${
                      //           !activeChat === chat.id ? theme.palette.background.paper : theme.palette.common.white
                      //         }`
                      //     }}
                      //   />
                      // }
                    >
                      {chat.user.image ? (
                        <MuiAvatar
                          src={chat.user.image}
                          alt={chat.user.full_name}
                          sx={{
                            width: 38,
                            height: 38,
                            outline: theme => `2px solid ${activeChat === chat.id ? theme.palette.common.white : 'transparent'}`
                          }}
                        />
                      ) : (
                        <CustomAvatar
                          color={'primary'}
                          skin={activeChat === chat.id ? 'light-static' : 'light'}
                          sx={{
                            width: 38,
                            height: 38,
                            fontSize: theme => theme.typography.body1.fontSize,
                            outline: theme => `2px solid ${activeChat === chat.id ? theme.palette.common.white : 'transparent'}`
                          }}
                        >
                          {getInitials(chat.user.full_name)}
                        </CustomAvatar>
                      )}
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    sx={{
                      my: 0,
                      ml: 3,
                      mr: 1.5,
                      '& .MuiTypography-root': { ...(activeChat === chat.id && { color: 'common.white' }) }
                    }}
                    primary={
                      <Typography noWrap variant='h6'>
                        {chat.user.full_name}
                      </Typography>
                    }
                    secondary={
                      <Typography noWrap sx={{ ...(!activeChat === chat.id && { color: 'text.secondary' }) }}>
                        {
                          chat.last_message ?
                            chat.last_message.message ?
                              chat.last_message.message
                            :
                              chat.last_message.audio ?
                                t('sent_audio', {username: chat.last_message.sender.full_name})
                              :
                                null
                          :
                            null
                        }
                      </Typography>
                    }
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-end',
                      flexDirection: 'column',
                      justifyContent: 'flex-start'
                    }}
                  >
                    <Typography
                      variant='body2'
                      sx={{ whiteSpace: 'nowrap', color: activeChat === chat.id ? 'common.white' : 'text.disabled' }}
                    >
                      <>{chat.last_message ? formatDateToMonthShort(chat.last_message.created_at, true) : ''}</>
                    </Typography>
                    {chat.unread_messages_count_for_admin > 0 ? (
                      <Chip
                        color='error'
                        label={chat.unread_messages_count_for_admin}
                        sx={{
                          mt: 0.5,
                          height: 18,
                          fontWeight: 600,
                          fontSize: '0.75rem',
                          '& .MuiChip-label': { pt: 0.25, px: 1.655 }
                        }}
                      />
                    ) : null}
                  </Box>
                </ListItemButton>
              </ListItem>
              ))
        ))
      }
    }
  }

  return (
    <div>
      <Drawer
        open={leftSidebarOpen}
        onClose={handleLeftSidebarToggle}
        variant={mdAbove ? 'permanent' : 'temporary'}
        ModalProps={{
          disablePortal: true,
          keepMounted: true // Better open performance on mobile.
        }}
        sx={{
          zIndex: 7,
          height: '100%',
          display: 'block',
          position: mdAbove ? 'static' : 'absolute',
          '& .MuiDrawer-paper': {
            boxShadow: 'none',
            width: sidebarWidth,
            position: mdAbove ? 'static' : 'absolute',
            borderTopLeftRadius: theme => theme.shape.borderRadius,
            borderBottomLeftRadius: theme => theme.shape.borderRadius
          },
          '& > .MuiBackdrop-root': {
            borderRadius: 1,
            position: 'absolute',
            zIndex: theme => theme.zIndex.drawer - 1
          }
        }}
      >
        <Box
          sx={{
            py: 3,
            px: 5,
            display: 'flex',
            alignItems: 'center',
            borderBottom: theme => `1px solid ${theme.palette.divider}`
          }}
        >
          <CustomTextField
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('search')}
            sx={{ '& .MuiInputBase-root': { borderRadius: '30px !important' } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start' sx={{ color: 'text.secondary' }}>
                  <Icon fontSize='1.25rem' icon='tabler:search' />
                </InputAdornment>
              )
            }}
          />
          {!mdAbove ? (
            <IconButton sx={{ p: 1, ml: 1 }} onClick={handleLeftSidebarToggle}>
              <Icon icon='tabler:x' />
            </IconButton>
          ) : null}
        </Box>

        <Box sx={{ height: `calc(100% - 9.0625rem)` }}>
          <ScrollWrapper hidden={hidden}>
            <Box sx={{ p: theme => theme.spacing(5, 3, 3) }}>
              <Typography variant='h5' sx={{ ml: 3, mb: 3.5, color: 'primary.main' }}>
                {t('chats')}
              </Typography>
              <List sx={{ mb: 5, p: 0 }}>{renderChats()}</List>
            </Box>
          </ScrollWrapper>
          {
            hasNextPage ?
              <Box
                sx={{
                  borderBottom: 0,
                  cursor: 'default',
                  m: 2,
                  backgroundColor: 'transparent !important',
                  borderTop: theme => `1px solid ${theme.palette.divider}`
                }}
              >

                <Button sx={{my: 2}} fullWidth variant='contained' onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
                  {t('load_more')}
                </Button>
              </Box>
            :
              <></>
          }
        </Box>
      </Drawer>

    </div>
  )
}

export default ChatSidebarLeft
