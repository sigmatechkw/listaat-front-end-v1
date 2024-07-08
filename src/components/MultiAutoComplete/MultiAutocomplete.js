import CustomTextField from 'src/@core/components/mui/text-field'
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'

const MultiAutocomplete = ({ value, label, handleUsersSearch, items, placeholder, required = false, handleChange }) => {
  return (
    <CustomAutocomplete
      value={value}
      onChange={handleChange}
      multiple
      options={items}
      filterSelectedOptions
      id='autocomplete-multiple-outlined'
      getOptionLabel={option => option.first_name + ' ' + option.last_name || ''}
      renderInput={params => (
        <CustomTextField
          {...params}
          label={label + `${required && ' *'}`}
          placeholder={placeholder}
          onChange={e => handleUsersSearch(e.target.value)}
        />
      )}
    />
  )
}

export default MultiAutocomplete
