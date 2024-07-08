import { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Icon from '../../../@core/components/icon'
import CustomAvatar from '../../../@core/components/mui/avatar'
import { getInitials } from '../../../@core/utils/get-initials'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import PerfectScrollbarComponent from 'react-perfect-scrollbar'
import Pusher from 'pusher-js'
import axios from 'axios'

const PerfectScrollbar = styled(PerfectScrollbarComponent)(({ theme }) => ({
  padding: theme.spacing(5)
}))

const DreamChat = ({ dream, data }) => {
  const chatArea = useRef(null)
  const [messages, setMessages] = useState(data.items)

  // ** Scroll to chat bottom
  const scrollToBottom = () => {
    if (chatArea.current) {
      chatArea.current._container.scrollTop = chatArea.current._container.scrollHeight
    }
  }

  const renderMsgFeedback = (isSender, feedback) => {
    if (isSender) {
      if (feedback.isSent && !feedback.isDelivered) {
        return (
          <Box component='span' sx={{ display: 'flex', '& svg': { mr: 1.5, color: 'text.secondary' } }}>
            <Icon icon='tabler:check' fontSize='1.125rem' />
          </Box>
        )
      } else if (feedback.isSent && feedback.isDelivered) {
        return (
          <Box
            component='span'
            sx={{
              display: 'flex',
              '& svg': { mr: 1.5, color: feedback.isSeen ? 'success.main' : 'text.secondary' }
            }}
          >
            <Icon icon='tabler:checks' fontSize='1.125rem' />
          </Box>
        )
      } else {
        return null
      }
    }
  }

  useEffect(() => {
    let dreamChannel = pusher.subscribe(`private-dream.${dream.id}`)
    dreamChannel.bind('dream-message-sent', async res => {
      setMessages(prev => [...prev, res.comment])
    })

    return () => {
      dreamChannel.unbind('dream-message-sent')
      dreamChannel.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (messages && messages.length) {
      scrollToBottom()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages])

  // ** Renders user chat
  const renderChats = () => {
    return messages.map((item, index) => {
      const isExpert = item.user.id !== dream.user?.id

      return (
        <Box
          key={index}
          sx={{
            display: 'flex',
            flexDirection: !isExpert ? 'row' : 'row-reverse',
            mb: index !== messages.length - 1 ? 4 : undefined
          }}
        >
          <div>
            {item.user.image ? (
              <CustomAvatar
                src={item.user.image}
                alt={item.user.full_name}
                sx={{ width: 32, height: 32, mb: 4, ml: isExpert ? 3 : undefined, mr: !isExpert ? 3 : undefined }}
              />
            ) : (
              <CustomAvatar
                skin='light'
                color={'primary'}
                sx={{ width: 32, height: 32, mb: 4, ml: isExpert ? 3 : undefined, mr: !isExpert ? 3 : undefined }}
              >
                {getInitials(item.user.full_name)}
              </CustomAvatar>
            )}
          </div>

          <Box className='chat-body' sx={{ maxWidth: ['calc(100% - 5.75rem)', '75%', '65%'] }}>
            <Box key={item.id} sx={{ '&:not(:last-of-type)': { mb: 3 } }}>
              <div>
                {item.audio ? (
                  <audio controls>
                    <source src={item.audio} />
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
                      ml: isExpert ? 'auto' : undefined,
                      borderTopLeftRadius: !isExpert ? 0 : undefined,
                      borderTopRightRadius: isExpert ? 0 : undefined,
                      color: isExpert ? 'common.white' : 'text.primary',
                      backgroundColor: isExpert ? 'primary.main' : 'background.paper'
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
                  justifyContent: isExpert ? 'flex-end' : 'flex-start'
                }}
              >
                {/*{renderMsgFeedback(isExpert, chat.feedback)}*/}
                <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                  {item.created_at}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      )
    })
  }

  const ScrollWrapper = ({ children }) => {
    return (
      <PerfectScrollbar ref={chatArea} options={{ wheelPropagation: false }}>
        {children}
      </PerfectScrollbar>
    )
  }

  return (
    <Box sx={{ height: '700px' }}>
      <ScrollWrapper>{renderChats()}</ScrollWrapper>
    </Box>
  )
}

export default DreamChat
