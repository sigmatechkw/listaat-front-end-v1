// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import axios from "axios";
import toast from "react-hot-toast";
import {useSelector} from "react-redux";
import {getCookie} from "cookies-next";
import {AudioRecorder} from "react-audio-voice-recorder";
import {useTranslation} from "react-i18next";

// ** Styled Components
const ChatFormWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2.5),
  boxShadow: theme.shadows[1],
  justifyContent: 'space-between',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper
}))

const Form = styled('form')(({ theme }) => ({
  padding: theme.spacing(0, 5, 5)
}))

const SendMessageForm = ({ selectedChatId, setMessages }) => {
  const {t} = useTranslation()
  const auth = useSelector(state => state.auth)
  const lang = useSelector(state => state.lang)
  const [message, setMessage] = useState('')
  const [audio, setAudio] = useState(null)
  const [loading, setLoading] = useState(false)

  const addAudioElement = (blob) => {
    // blob = blob.slice(0, blob.size, "audio/mpeg")
    const audioFile = new File([blob], "file_name", {type: blob.type})
    console.log(audioFile)
    setAudio(audioFile)
  }

  const handleSendAudio = (blob) => {
    const formData = new FormData()
    const audioFile = new File([blob], "audio", {type: blob.type})
    formData.append('audio', audioFile)
    formData.append('chat_id', selectedChatId)

    handleSendRequest(formData)
  }

  const handleSendMessage = e => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('message', message)
    formData.append('chat_id', selectedChatId)

    handleSendRequest(formData)
  }

  const handleSendRequest = (data) => {
    setLoading(true)

    axios
      .post(`${process.env.NEXT_PUBLIC_API_KEY}live-chats/send-message`, data, {
        headers: {
          'Authorization': getCookie('token') ?? auth.token,
          'Accepted-Language': getCookie('lang') ?? lang ?? 'en'
        }
      })
      .then(res => {
        setLoading(false)
        setMessage('')
        setMessages(prev => [...prev, res.data.data.items])
      })
      .catch(error => {
        setLoading(false)
        console.log(error)
        toast.error(error.response?.data?.message);
      });
  }

  return (
    <Form onSubmit={handleSendMessage} sx={{ position: 'absolute', bottom: 0, width: '100%' }}>
      <ChatFormWrapper>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <CustomTextField
            fullWidth
            autoComplete={'off'}
            value={message}
            placeholder={t('type_your_message_here')}
            onChange={e => setMessage(e.target.value)}
            sx={{
              '& .Mui-focused': { boxShadow: 'none !important' },
              '& .MuiInputBase-input:not(textarea).MuiInputBase-inputSizeSmall': {
                p: theme => theme.spacing(1.875, 2.5)
              },
              '& .MuiInputBase-root': { border: '0 !important' }
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/*<IconButton size='small' sx={{ mr: 3,color: 'text.primary' }}>*/}
          {/*  <Icon icon='tabler:microphone' />*/}
          {/*</IconButton>*/}
          {/*<IconButton size='small' component='label' htmlFor='upload-img' sx={{ mr: 3, color: 'text.primary' }}>*/}
          {/*  <Icon icon='tabler:photo' />*/}
          {/*  <input hidden type='file' id='upload-img' />*/}
          {/*</IconButton>*/}
          <Box sx={{mx: 2}}>
            <AudioRecorder
              onRecordingComplete={handleSendAudio}
              audioTrackConstraints={{
                noiseSuppression: false,
                echoCancellation: false,
                // autoGainControl,
                // channelCount,
                // deviceId,
                // groupId,
                // sampleRate,
                // sampleSize,
              }}
              onNotAllowedOrFound={(err) => console.table(err)}
              // downloadOnSavePress={false}
              // downloadFileExtension="mp3"
              showVisualizer={true}
            />
          </Box>
          <Button type='submit' variant='contained' disabled={loading}>
            {loading ? t('loading') : t('send')}
          </Button>
        </Box>
      </ChatFormWrapper>
    </Form>
  )
}

export default SendMessageForm
