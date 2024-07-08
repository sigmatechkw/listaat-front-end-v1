// ** React Imports
import {Fragment, useEffect, useState} from 'react'

// ** MUI Imports
import Badge from '@mui/material/Badge'
import MuiAvatar from '@mui/material/Avatar'
import {styled} from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Import
import ChatLog from './ChatLog'
import CustomAvatar from 'src/@core/components/mui/avatar'
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {fetchChatMessages, readChatMessages} from "./chatsServices";
import CustomLoader from "../Shared/CustomLoader";
import ListItem from "@mui/material/ListItem";
import SendMsgForm from "./SendMessageForm";
import {useTranslation} from "react-i18next";

const ChatContent = props => {
  // ** Props
  const {
    hidden,
    mdAbove,
    getInitials,
    handleLeftSidebarToggle,
    selectedChat,
  } = props

  const queryClient = useQueryClient()
  const {t} = useTranslation()
  const [messages, setMessages] = useState([])

  const {
    data,
    error,
    isPending,
  } = useQuery({
    queryKey: ['fetchChatMessages', selectedChat?.id],
    queryFn: () => fetchChatMessages(selectedChat?.id),
    enabled: !!selectedChat?.id,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  const handleStartConversation = () => {
    if (!mdAbove) {
      handleLeftSidebarToggle()
    }
  }

  useEffect(() => {
    if (!isPending) {
      setMessages(data)
      let unreadMessages = data.filter(message => !message.read && message.sender.id === selectedChat.user.id)
      if (unreadMessages.length > 0) {
        readChatMessages(selectedChat?.id)
      }
    }
  }, [data, isPending]);

  useEffect(() => {
    let chatChannel = null
    let chatReadChannel = null

    if (selectedChat) {
      chatChannel = pusher.subscribe(`private-chat.${selectedChat.id}`)
      chatChannel.bind('admin-chat-new-message', async res => {
        setMessages(prev => [...prev, res.message])
      })

      chatReadChannel = pusher.subscribe(`private-chat.read.${selectedChat.id}`)
      chatReadChannel.bind('read-chat', async res => {
        queryClient.invalidateQueries({ queryKey: ['fetchChatMessages', selectedChat.id] })
      })

    }

    return () => {
      if (chatChannel) {
        chatChannel.unbind('admin-chat-new-message')
        chatChannel.unsubscribe()
      }
      if (chatReadChannel) {
        chatReadChannel.unbind('read-chat')
        chatReadChannel.unsubscribe()
      }
    }
  }, [selectedChat])

  const renderContent = () => {
    if (isPending || error) {
      return (
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <CustomLoader />
        </Box>
      )
    } else {
      return (
        <Box
          sx={{
            width: 0,
            flexGrow: 1,
            height: '100%',
            backgroundColor: 'action.hover',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              px: 5,
              py: 3.1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'background.paper',
              borderBottom: theme => `1px solid ${theme.palette.divider}`
            }}
          >
            <Box sx={{display: 'flex', alignItems: 'center'}}>
              {mdAbove ? null : (
                <IconButton onClick={handleLeftSidebarToggle} sx={{mr: 2}}>
                  <Icon icon='tabler:menu-2'/>
                </IconButton>
              )}
              <Box
                onClick={() => window.open(`/users/${selectedChat.user?.id}`, '_blank')}
                sx={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}
              >
                <Badge
                  overlap='circular'
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  sx={{mr: 3}}
                  // badgeContent={
                  //   <Box
                  //     component='span'
                  //     sx={{
                  //       width: 8,
                  //       height: 8,
                  //       borderRadius: '50%',
                  //       color: selectedChat.user.is_online ? 'success.main' : 'secondary.main',
                  //       backgroundColor: selectedChat.user.is_online ? 'success.main' : 'secondary.main',
                  //       boxShadow: theme => `0 0 0 2px ${theme.palette.background.paper}`,
                  //     }}
                  //   />
                  // }
                >
                  {selectedChat.user.image ? (
                    <MuiAvatar
                      sx={{width: 38, height: 38}}
                      src={selectedChat.user.image}
                      alt={selectedChat.user.full_name}
                    />
                  ) : (
                    <CustomAvatar
                      skin='light'
                      color={'primary'}
                      sx={{width: 38, height: 38, fontSize: theme => theme.typography.body1.fontSize}}
                    >
                      {getInitials(selectedChat.user.full_name)}
                    </CustomAvatar>
                  )}
                </Badge>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                  <Typography variant='h6'>{selectedChat.user.full_name}</Typography>
                  {/*<Typography sx={{color: 'text.disabled'}}>{selectedChat.user.roles[0]?.name}</Typography>*/}
                </Box>
              </Box>
            </Box>
          </Box>

          {
            data.length > 0 ?
              <ChatLog hidden={hidden} selectedChat={selectedChat} messages={messages} />
            :
              <ListItem sx={{display: 'flex', alignItems: 'center', height: '60%'}}>
                <Typography sx={{color: 'text.secondary', margin: 'auto'}}>{t('no_messages')}</Typography>
              </ListItem>
          }

          <SendMsgForm selectedChatId={selectedChat.id} setMessages={setMessages} />
        </Box>
      )
    }
  }

  if (selectedChat) {
    return renderContent()
  } else {
    return <></>
  }
}

export default ChatContent
