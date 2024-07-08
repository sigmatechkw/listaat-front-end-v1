import React, {useEffect, useState} from 'react';
import {Controller} from 'react-hook-form';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import CustomTextField from 'src/@core/components/mui/text-field';
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import {useTranslation} from "react-i18next";
import CircularProgress from "@mui/material/CircularProgress";
import {useSelector} from "react-redux";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";

const DreamTypesNotesForm = ({note, errors, notes, setValue, handleRemoveNote}) => {
  const {t, i18n} = useTranslation()
  const [currentNote, setCurrentNote] = useState(note)

  const handleChangeTextEn = (e) => {
    setCurrentNote(prev => {
      return {
        ...prev,
        text: {
          en: e.target.value,
          ar: prev.text.ar
        }
      }
    })
  }

  const handleChangeTextAr = (e) => {
    setCurrentNote(prev => {
      return {
        ...prev,
        text: {
          en: prev.text.en,
          ar: e.target.value
        }
      }
    })
  }

  useEffect(() => {
    let updatedNotes = notes.filter(n => n.id !== note.id)
    updatedNotes = [...updatedNotes, currentNote]
    setValue('notes', updatedNotes)
  }, [currentNote])

  return (
    <>
      <Card sx={{mb: 3}}>
        <CardContent>
          <Grid container spacing={4} sx={{display: 'flex', alignItems: 'end'}}>
            <Grid item xs={12} sm={5}>
              <CustomTextField
                fullWidth
                value={currentNote.text.en}
                label={t('text_en')}
                onChange={handleChangeTextEn}
                required
              />
            </Grid>

            <Grid item xs={12} sm={5}>
              <CustomTextField
                fullWidth
                value={currentNote.text.ar}
                label={t('text_ar')}
                onChange={handleChangeTextAr}
                required
              />
            </Grid>

            <Grid item xs={12} sm={2}>
              <Button role='button' variant='contained' color='error' onClick={handleRemoveNote}>
                {t('remove')}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default DreamTypesNotesForm;
