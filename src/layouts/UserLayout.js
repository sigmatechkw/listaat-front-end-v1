import useMediaQuery from '@mui/material/useMediaQuery'

// ** Layout Imports
// !Do not remove this Layout import
import Layout from 'src/@core/layouts/Layout'

// ** Navigation Imports
import VerticalNavItems from 'src/navigation/vertical'
import HorizontalNavItems from 'src/navigation/horizontal'

// ** Component Import
// Uncomment the below line (according to the layout type) when using server-side menu
// import ServerSideVerticalNavItems from './components/vertical/ServerSideNavItems'
// import ServerSideHorizontalNavItems from './components/horizontal/ServerSideNavItems'

import VerticalAppBarContent from './components/vertical/AppBarContent'
import HorizontalAppBarContent from './components/horizontal/AppBarContent'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'
import {useEffect} from "react";
import Pusher from "pusher-js";
import axios from "axios";
import {useSelector} from "react-redux";
import toast from "react-hot-toast";
import {getCookie} from "cookies-next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Icon} from "@iconify/react";
import {useTheme} from "@mui/material/styles";
import {useRouter} from "next/router";

const UserLayout = ({ children, contentHeightFixed }) => {
  // ** Hooks
  const auth = useSelector(state => state.auth)
  const lang = useSelector(state => state.lang)
  const { settings, saveSettings } = useSettings()
  const theme = useTheme()
  const router = useRouter()

  // ** Vars for server side navigation
  // const { menuItems: verticalMenuItems } = ServerSideVerticalNavItems()
  // const { menuItems: horizontalMenuItems } = ServerSideHorizontalNavItems()
  /**
   *  The below variable will hide the current layout menu at given screen size.
   *  The menu will be accessible from the Hamburger icon only (Vertical Overlay Menu).
   *  You can change the screen size from which you want to hide the current layout menu.
   *  Please refer useMediaQuery() hook: https://mui.com/material-ui/react-use-media-query/,
   *  to know more about what values can be passed to this hook.
   *  ! Do not change this value unless you know what you are doing. It can break the template.
   */
  const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'))
  if (hidden && settings.layout === 'horizontal') {
    settings.layout = 'vertical'
  }

  const handleNotificationClick = (notification, t) => {
    toast.dismiss(t.id)
    if (notification.report) {
      router.push(`/dream-reports/${notification.report.id}`)
    } else if (notification.dream) {
      router.push(`/dreams/${notification.dream.id}`)
    } else if (notification.chat) {
      router.push(`/chats/${notification.chat.id}`)
    }
  }

  const playNotificationSound = () => {
    let url = `${process.env.NEXT_PUBLIC_APP_URL}notifications/consultation.mp3`;
    let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let source = audioCtx.createBufferSource();

    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'arraybuffer';

    xhr.addEventListener('load', function () {
      audioCtx.decodeAudioData(
        xhr.response,
        function (buffer) {
          source.buffer = buffer;
          source.connect(audioCtx.destination);
          source.loop = false;

          // Attempt to resume the AudioContext
          audioCtx.resume().then(function () {
            source.start(0);
          });
        },
        function (error) {
        }
      );
    });

    xhr.send();
  }

  useEffect(() => {
    if (!!!window.pusher) {
      window.pusher = new Pusher(`${process.env.NEXT_PUBLIC_PUSHER_API_KEY}`, {
        cluster: `${process.env.NEXT_PUBLIC_PUSHER_CLUSTER}`,
        authorizer: (channel, options) => {
          return {
            authorize: (socketId, callback) => {
              axios.post(`${process.env.NEXT_PUBLIC_APP_URL}api/broadcasting/auth`, {
                socket_id: socketId,
                channel_name: channel.name
              }, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': auth.token,
                  'Accepted-Language': lang ?? 'en'
                }
              })
                .then(response => {
                  callback(false, response.data);
                })
                .catch(error => {
                  callback(true, error);
                });
            }
          };
        },
      });
    }

    let notificationChannel = pusher.subscribe('private-admins-notification');
    notificationChannel.bind_global((eventName, res) => {
      // toast.dismiss() // To dismiss all previous toasts

      let title = ''
      let body = ''
      if (getCookie('lang') === 'ar') {
        title = res.notification_title_ar
        body = res.notification_body_ar
      } else {
        title = res.notification_title_en
        body = res.notification_body_en
      }
      if (title) {
        toast((t) => {
          return (
            <Box sx={{display: 'flex', alignItems: 'center', ":hover": {cursor: 'pointer'} }} onClick={() => handleNotificationClick(res, t)}>
              <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3, mx: 1, borderRadius: '50%', backgroundColor: theme.palette.background.default}}>
                <Icon icon={'tabler:zzz'} fontSize={'1.5rem'} />
              </Box>
              <Box>
                <Typography variant={'h5'}>{title}</Typography>
                <Typography variant={'h6'}>{body}</Typography>
              </Box>
            </Box>
          )
        },
        {
          duration: 4000
        })
        playNotificationSound()
      }
    })

    return () => {
      notificationChannel.unsubscribe()
    }
  }, []);

  return (
    <Layout
      hidden={hidden}
      settings={settings}
      saveSettings={saveSettings}
      contentHeightFixed={contentHeightFixed}
      verticalLayoutProps={{
        navMenu: {
          navItems: VerticalNavItems()

          // Uncomment the below line when using server-side menu in vertical layout and comment the above line
          // navItems: verticalMenuItems
        },
        appBar: {
          content: props => (
            <VerticalAppBarContent
              hidden={hidden}
              settings={settings}
              saveSettings={saveSettings}
              toggleNavVisibility={props.toggleNavVisibility}
            />
          )
        }
      }}
      {...(settings.layout === 'horizontal' && {
        horizontalLayoutProps: {
          navMenu: {
            navItems: HorizontalNavItems()

            // Uncomment the below line when using server-side menu in horizontal layout and comment the above line
            // navItems: horizontalMenuItems
          },
          appBar: {
            content: () => <HorizontalAppBarContent hidden={hidden} settings={settings} saveSettings={saveSettings} />
          }
        }
      })}
    >
      {children}

    </Layout>
  )
}

export default UserLayout
