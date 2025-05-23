import React from 'react';
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
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'
import {useSelector} from "react-redux";
import Divider from "@mui/material/Divider";
import { useState , useEffect } from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { Autocomplete, TextField, Chip } from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchItemsInfinityQuery } from '../Items/itemsServices';
import { fetchProjectsInfinityQuery } from '../Projects/projectsServices';
import { fetchItemGroupsInfinityQuery } from '../ItemGroups/ItemGroupsServices';


const ItemProjectForm = ({type = 'create', errors, control, watch, setValue, onSubmit, title, loading}) => {
  const {t, i18n} = useTranslation()
  const [searchProjectsTerm, setSearchProjectsTerm] = useState('');
  const [searchItemGroupsTerm, setSearchItemGroupsTerm] = useState('');
  const [searchItemsTerm, setSearchItemsTerm] = useState('');
 
  const {
    data : projects,
    fetchNextPage : fetchProjectsNextPage,
    hasNextPage : projectsHasNextPage,
    isFetching : projectsIsFetching,
    isFetchingNextPage : projectsIsFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['fetchProjectsInfinityQuery', searchProjectsTerm],
    queryFn: fetchProjectsInfinityQuery,
     getNextPageParam: (lastPage, allPages) => {
      return lastPage.current_page < lastPage.last_page ? lastPage?.current_page + 1 : undefined;
    },
  });

  const {
    data : itemGroups,
    fetchNextPage : fetchItemGroupsNextPage,
    hasNextPage : itemGroupsHasNextPage,
    isFetching : itemGroupsIsFetching,
    isFetchingNextPage : itemGroupsIsFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['fetchItemGroupsInfinityQuery', searchItemGroupsTerm],
    queryFn: fetchItemGroupsInfinityQuery,
     getNextPageParam: (lastPage, allPages) => {
      return lastPage.current_page < lastPage.last_page ? lastPage?.current_page + 1 : undefined;
    },
  });

  const {
    data : items,
    fetchNextPage : fetchItemsNextPage,
    hasNextPage : itemsHasNextPage,
    isFetching : itemsIsFetching,
    isFetchingNextPage : itemsIsFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['fetchItemsInfinityQuery', searchItemsTerm],
    queryFn: fetchItemsInfinityQuery,
     getNextPageParam: (lastPage, allPages) => {
      return lastPage.current_page < lastPage.last_page ? lastPage?.current_page + 1 : undefined;
    },
  });

  const loadMoreProjects = () => {
    if (projectsHasNextPage) {
      fetchProjectsNextPage();
    }
  };

  const loadMoreItemGroups = () => {
    if (itemGroupsHasNextPage) {
      fetchItemGroupsNextPage();
    }
  };

  const loadMoreItems = () => {
    if (itemsHasNextPage) {
      fetchItemsNextPage();
    }
  };

  const projectsOptions = projects?.pages.flatMap((page) => page.items) || [];  
  const itemGroupsOptions = itemGroups?.pages.flatMap((page) => page.items) || [];  
  const itemsOptions = items?.pages.flatMap((page) => page.items) || []; 
  
  return (
    <>
      <CardHeader title={title} />
      <CardContent>
        <form onSubmit={onSubmit}>
          <Grid container spacing={4}>

            <Grid item xs={12} sm={6}>
              <Controller
                name='item_group_id'
                control={control}
                rules={{ required: false }}
                render={({ field: { value, onChange } }) => (
                  <CustomAutocomplete
                    value={value}
                    loading={itemGroupsIsFetching || itemGroupsIsFetchingNextPage}
                    ListboxProps={{
                      onScroll: (event) => {
                        const listboxNode = event.currentTarget;
                        if (listboxNode.scrollTop + listboxNode.clientHeight >= listboxNode.scrollHeight) {
                          loadMoreItemGroups();
                        }
                      },
                    }}
                    onInputChange={(e , val) => setSearchItemGroupsTerm(val)}
                    onChange={(e, newValue) => {
                      if (newValue) {
                        setValue('item_group_id', newValue)
                        onChange(newValue)
                      } else {
                        setValue('item_group_id', null)
                      }
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                    options={itemGroupsOptions}
                    getOptionLabel={option => option.name || ''}
                    renderInput={params => <CustomTextField {...params}
                     label={t('item_groups')} />}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='project_id'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomAutocomplete
                    value={value}
                    loading={projectsIsFetching || projectsIsFetchingNextPage}
                    ListboxProps={{
                      onScroll: (event) => {
                        const listboxNode = event.currentTarget;
                        if (listboxNode.scrollTop + listboxNode.clientHeight >= listboxNode.scrollHeight) {
                          loadMoreProjects();
                        }
                      },
                    }}
                    onInputChange={(e , val) => setSearchProjectsTerm(val)}
                    onChange={(e, newValue) => {
                      if (newValue) {
                        setValue('project_id', newValue)
                        onChange(newValue)
                      } else {
                        setValue('project_id', null)
                      }
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                    options={projectsOptions}
                    getOptionLabel={option => option.name || ''}
                    renderInput={params => <CustomTextField required {...params}
                     label={t('project')} />}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='item_ids'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                   <Autocomplete
                    multiple
                    name='item_ids'
                    options={itemsOptions}
                    getOptionLabel={(option) => option.name}
                    onInputChange={(e , val) => setSearchItemsTerm(val)}
                    loading={itemsIsFetching || itemsIsFetchingNextPage}
                    ListboxProps={{
                      onScroll: (event) => {
                        const listboxNode = event.currentTarget;
                        if (listboxNode.scrollTop + listboxNode.clientHeight >= listboxNode.scrollHeight) {
                          loadMoreItems();
                        }
                      },
                    }}
                    value={value}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        setValue('item_ids', newValue)
                        onChange(newValue)
                      } else {
                        setValue('item_ids', null)
                      }
                    }}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          key={index}
                          variant="outlined"
                          label={option.name}
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <CustomTextField
                      {...params}
                      variant="outlined"
                      label={t('items')}
                      placeholder="Options"
                    />
                    )}
                  /> 
                  )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='sort'
                control={control}
                rules={{required: false}}
                render={({field: {value, onChange}}) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label={t('sort')}
                    onChange={onChange}
                    error={Boolean(errors.sort)}
                    aria-describedby='validation-basic-sort'
                    {...(errors.sort && {helperText: t('required')})}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: theme => `${theme.spacing(2)} !important` }} />
            </Grid>

            <Grid item xs={12}>
              <Button type='submit' variant='contained' disabled={loading}>
                {
                  loading ?
                    <CircularProgress size={'1.5rem'} />
                    :
                    t('save')
                }
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </>
  );
};

export default ItemProjectForm;
