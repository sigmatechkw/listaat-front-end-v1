// ** MUI Imports
import Box from '@mui/material/Box'

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import LanguageDropdown from 'src/@core/layouts/components/shared-components/LanguageDropdown'
import NotificationDropdown from 'src/components/Notifications/NotificationDropdown'

// ** Hook Import
import { useAuth } from 'src/hooks/useAuth'

const AppBarContent = props => {
  // ** Props
  const { hidden, settings, saveSettings } = props

  // ** Hook
  const auth = useAuth()

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {/*{auth.user && <Autocomplete hidden={hidden} settings={settings} />}*/}
      <LanguageDropdown settings={settings} saveSettings={saveSettings} />
      <ModeToggler settings={settings} saveSettings={saveSettings} />
      {auth.user && (
        <>
          {/*<ShortcutsDropdown settings={settings} shortcuts={shortcuts} />*/}
          <NotificationDropdown settings={settings} />
          <UserDropdown settings={settings} />
        </>
      )}
    </Box>
  )
}

export default AppBarContent
