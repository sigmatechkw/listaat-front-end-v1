// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'


// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Utils Imports
import { getInitials } from 'src/@core/utils/get-initials'
import { formatDateToMonthShort } from 'src/@core/utils/format'
import ChatContent from "../../components/Chats/ChatContent";
import {useRouter} from "next/router";
import ChatSidebarLeft from "../../components/Chats/ChatSidebarLeft";

// ** Chat App Components Imports

const Chat = () => {
  const router = useRouter()
  const [selectedChatId, setSelectedChatId] = useState(router.query.id)
  const [selectedChat, setSelectedChat] = useState(null)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)
  const theme = useTheme()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('lg'))
  const { skin } = settings
  const smAbove = useMediaQuery(theme.breakpoints.up('sm'))
  const sidebarWidth = smAbove ? 360 : 300
  const mdAbove = useMediaQuery(theme.breakpoints.up('md'))

  const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen)

  return (
    <Box
      className='app-chat'
      sx={{
        width: '100%',
        display: 'flex',
        borderRadius: 1,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: 'background.paper',
        boxShadow: skin === 'bordered' ? 0 : 6,
        ...(skin === 'bordered' && { border: `1px solid ${theme.palette.divider}` })
      }}
    >
      <ChatSidebarLeft
        hidden={hidden}
        mdAbove={mdAbove}
        getInitials={getInitials}
        sidebarWidth={sidebarWidth}
        leftSidebarOpen={leftSidebarOpen}
        formatDateToMonthShort={formatDateToMonthShort}
        handleLeftSidebarToggle={handleLeftSidebarToggle}
        setSelectedChatId={setSelectedChatId}
        setSelectedChat={setSelectedChat}
      />
      <ChatContent
        hidden={hidden}
        mdAbove={mdAbove}
        getInitials={getInitials}
        handleLeftSidebarToggle={handleLeftSidebarToggle}
        selectedChat={selectedChat}
      />
    </Box>
  )
}
Chat.contentHeightFixed = true

export default Chat
