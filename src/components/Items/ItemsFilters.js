import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import {useTranslation} from "react-i18next";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import CustomTextField from "../../@core/components/mui/text-field";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import {Icon} from "@iconify/react";
import {useCallback, useState} from "react";
import {useInfiniteQuery} from "@tanstack/react-query";
import {fetchUsersInfinityQuery} from "../Projects/projectsServices";
import {debounce} from "lodash";
import CustomAutocomplete from "../../@core/components/mui/autocomplete";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";

const ItemsFilters = ({ isActive, setIsActive, user, setUser }) => {
  const {t} = useTranslation()
  const [searchUsersTerm, setSearchUsersTerm] = useState('');

  const {
    data: users,
    fetchNextPage: fetchUsersNextPage,
    hasNextPage: usersHasNextPage,
    isFetching: usersIsFetching,
    isFetchingNextPage: usersIsFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['fetchUsersInfinityQuery', searchUsersTerm],
    queryFn: fetchUsersInfinityQuery,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.current_page < lastPage.last_page ? lastPage?.current_page + 1 : undefined;
    },
  })

  const usersOptions = users?.pages.flatMap((page) => page.items) || [];

  const loadMoreUsers = () => {
    if (usersHasNextPage) {
      fetchUsersNextPage();
    }
  }

  const handleIsActiveChange = (e) => {
    setIsActive(e.target.value)
  }

  const handleSearchChange = useCallback(debounce((term) => {
    setSearchUsersTerm(term);
  }, 300), []);


  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader title={t('filters')} />
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12} md={3} lg={3}>
            <CustomTextField
              select
              fullWidth
              defaultValue={t('is_active')}
              SelectProps={{
                value: isActive,
                displayEmpty: true,
                onChange: handleIsActiveChange,
                endAdornment: (
                  <IconButton sx={{ mx: 2 }} onClick={() => setIsActive('')}>
                    <Icon icon={'tabler:circle-x'} />
                  </IconButton>
                )
              }}
            >
              <MenuItem value={''}>{t('is_active')}</MenuItem>
              <MenuItem value={1}>{t('yes')}</MenuItem>
              <MenuItem value={0}>{t('no')}</MenuItem>
            </CustomTextField>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <CustomAutocomplete
              autoHighlight
              loading={!users && usersIsFetching}
              sx={{ mb: 6 }}
              id='users-list'
              options={usersOptions}
              ListboxComponent={List}
              ListboxProps={{
                onScroll: (event) => {
                  const listboxNode = event.currentTarget;
                  if (listboxNode.scrollTop + listboxNode.clientHeight >= listboxNode.scrollHeight) {
                    loadMoreUsers();
                  }
                },
              }}
              getOptionLabel={option => option.full_name || ''}
              value={user || null}
              onChange={(e, newValue) => {
                setUser(newValue)
              }}
              onInputChange={(event, newInputValue) => handleSearchChange(newInputValue)}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={params => (
                <CustomTextField {...params} placeholder={t('choose_user')} />
              )}
              renderOption={(props, user) => (
                <ListItem {...props} key={user.id}>
                  <ListItemAvatar>
                    <Avatar src={user.image} alt={user.full_name} sx={{ height: 28, width: 28 }} />
                  </ListItemAvatar>
                  <ListItemText primary={user.full_name} />
                </ListItem>
              )}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ItemsFilters
