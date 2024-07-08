// ** React Import
import { useEffect } from 'react'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Import
import { useTranslation } from 'react-i18next'

// ** Custom Components Imports
import OptionsMenu from 'src/@core/components/option-menu'
import {useDispatch} from "react-redux";
import {changeLang} from "../../../../store/reducers/langSlice";
import {getCookie, setCookie} from "cookies-next";

const LanguageDropdown = ({ settings, saveSettings }) => {
  // ** Hook
  const { i18n } = useTranslation()
  const dispatch = useDispatch()

  const handleLangItemClick = lang => {
    if (lang === 'en') {
      i18n.changeLanguage('en');
      // localStorage.setItem('lang', 'en');
      setCookie('lang', 'en')
      dispatch(changeLang('en'))
      window.location.reload()
    } else if (lang === 'ar') {
      i18n.changeLanguage('ar');
      // localStorage.setItem('lang', 'ar');
      setCookie('lang', 'ar')
      dispatch(changeLang('ar'))
      window.location.reload()
    }
  }

  // ** Change html `lang` attribute when changing locale
  useEffect(() => {
    document.documentElement.setAttribute('lang', i18n.language)
  }, [i18n.language])

  return (
    <OptionsMenu
      iconButtonProps={{ color: 'inherit' }}
      icon={<Icon fontSize='1.625rem' icon='tabler:language' />}
      menuProps={{ sx: { '& .MuiMenu-paper': { mt: 4.25, minWidth: 130 } } }}
      options={[
        {
          text: 'English',
          menuItemProps: {
            sx: { py: 2 },
            selected: i18n.language === 'en',
            onClick: () => {
              handleLangItemClick('en')
              saveSettings({ ...settings, direction: 'ltr' })
            }
          }
        },
        {
          text: 'Arabic',
          menuItemProps: {
            sx: { py: 2 },
            selected: i18n.language === 'ar',
            onClick: () => {
              handleLangItemClick('ar')
              saveSettings({ ...settings, direction: 'rtl' })
            }
          }
        }
      ]}
    />
  )
}

export default LanguageDropdown
