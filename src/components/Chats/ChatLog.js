// ** React Imports
import {useRef, useEffect, useState} from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import {styled} from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Components
import PerfectScrollbarComponent from 'react-perfect-scrollbar'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Imports
import {getInitials} from 'src/@core/utils/get-initials'

const PerfectScrollbar = styled(PerfectScrollbarComponent)(({theme}) => ({
  padding: theme.spacing(5)
}))

const ChatLog = ({selectedChat, messages}) => {
  const chatArea = useRef(null)

  // ** Scroll to chat bottom
  const scrollToBottom = () => {
    if (chatArea.current) {
      chatArea.current._container.scrollTop = chatArea.current._container.scrollHeight
    }
  }

  const renderMsgFeedback = (isSender, read) => {
    if (isSender) {
      if (!read) {
        return (
          <Box component='span' sx={{display: 'flex', '& svg': {mr: 1.5, color: 'text.secondary'}}}>
            <Icon icon='tabler:check' fontSize='1.125rem'/>
          </Box>
        )
      } else {
        return (
          <Box
            component='span'
            sx={{
              display: 'flex',
              '& svg': {mr: 1.5, color: read ? 'success.main' : 'text.secondary'}
            }}
          >
            <Icon icon='tabler:checks' fontSize='1.125rem'/>
          </Box>
        )
      }
    }
  }

  useEffect(() => {
    if (messages && messages.length) {
      scrollToBottom()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages])

  // ** Renders user chat
  const renderChats = () => {
    return messages.map((item, index) => {
      const isUser = item.sender.id === selectedChat.user.id

      return (
        <Box
          key={index}
          sx={{
            display: 'flex',
            flexDirection: isUser ? 'row' : 'row-reverse',
            mb: index !== messages.length - 1 ? 4 : undefined
          }}
        >
          <div>
            {item.sender.image ? (
              <CustomAvatar
                src={item.sender.image}
                alt={item.sender.full_name}
                sx={{width: 32, height: 32, mb: 4, ml: !isUser ? 3 : undefined, mr: isUser ? 3 : undefined}}
              />
            ) : (
              <CustomAvatar
                skin='light'
                color={'primary'}
                sx={{width: 32, height: 32, mb: 4, ml: !isUser ? 3 : undefined, mr: isUser ? 3 : undefined}}
              >
                {getInitials(item.sender.full_name)}
              </CustomAvatar>
            )}
          </div>

          <Box className='chat-body' sx={{maxWidth: ['calc(100% - 5.75rem)', '75%', '65%']}}>
            <Box key={item.id} sx={{'&:not(:last-of-type)': {mb: 3}}}>
              <div>
                {item.audio ? (
                  <audio controls>
                    <source src={item.audio}/>
                  </audio>
                ) : (
                  <Typography
                    sx={{
                      boxShadow: 1,
                      borderRadius: 1,
                      maxWidth: '100%',
                      width: 'fit-content',
                      wordWrap: 'break-word',
                      p: theme => theme.spacing(2.25, 4),
                      ml: !isUser ? 'auto' : undefined,
                      borderTopLeftRadius: isUser ? 0 : undefined,
                      borderTopRightRadius: !isUser ? 0 : undefined,
                      color: !isUser ? 'common.white' : 'text.primary',
                      backgroundColor: !isUser ? 'primary.main' : 'background.paper'
                    }}
                  >
                    {item.message}
                  </Typography>
                )}
              </div>
              <Box
                sx={{
                  mt: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: !isUser ? 'flex-end' : 'flex-start'
                }}
              >
                {renderMsgFeedback(!isUser, item.read)}
                <Typography variant='body2' sx={{color: 'text.disabled'}}>
                  {item.created_at}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      )
    })
  }

  const ScrollWrapper = ({children}) => {
    return (
      <PerfectScrollbar ref={chatArea} options={{wheelPropagation: false}}>
        {children}
      </PerfectScrollbar>
    )
  }

  return (
    <Box sx={{height: '80%'}}>
      <ScrollWrapper>{renderChats()}</ScrollWrapper>
    </Box>
  )
}

export default ChatLog
