import React from 'react'
import {DataGrid} from "@mui/x-data-grid";
import {useTranslation} from "react-i18next";

const CustomDataGrid = ({toolbar, toolbarProps, rows, columns, total, paginationModel, setPaginationModel, rowSelectionModel, setRowSelectionModel, sortModel = undefined, setSortModel = undefined, multiSelection = true}) => {
  const {t} = useTranslation()

  return (
    <DataGrid
      autoHeight
      pagination
      rows={rows}
      rowCount={total}
      columns={columns}
      checkboxSelection={multiSelection}
      sortingMode={sortModel ? 'server' : 'client'}
      sortModel={sortModel}
      onSortModelChange={setSortModel}
      paginationMode='server'
      pageSizeOptions={[10, 25, 50]}
      paginationModel={paginationModel}
      slots={{toolbar: toolbar}}
      onPaginationModelChange={setPaginationModel}
      rowSelectionModel={rowSelectionModel}
      onRowSelectionModelChange={setRowSelectionModel}
      slotProps={{
        baseButton: {
          size: 'medium',
          variant: 'tonal'
        },
        toolbar: toolbarProps
      }}
      disableColumnFilter={true}
      localeText={{
        MuiTablePagination: {
          labelDisplayedRows: ({from, to, count}) => t('pagination_displayed_rows', {from, to, count}),
          labelRowsPerPage: t('rows_per_page')
        },
        noRowsLabel: t('no_rows'),
        noResultsOverlayLabel: t('no_rows'),
        columnMenuSortAsc: t('sort_by_asc'),
        columnMenuSortDesc: t('sort_by_desc'),
        columnMenuFilter: t('filter'),
        columnMenuLabel: t('menu'),
        columnMenuHideColumn: t('hide_column'),
        columnMenuManageColumns: t('manage_columns'),
        columnHeaderSortIconLabel: t('sort'),
        columnMenuUnsort: t('unsort'),
      }}
    />
  )
}

export default CustomDataGrid
