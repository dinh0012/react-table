import * as React from 'react';
import Pagination from 'components/pagination/Pagination';
import * as css from './table.scss';
type Func = (...p) => any;

export interface Column {
  Header: string | Func;
  Cell?: string | Func;
  width?: number;
  className?: string | Func;
  accessor: string | Func;
  sortable?: boolean;
  hasTooltip?: boolean;
  defaultValue?: string;
}

interface Props {
  columns: Column[];
  data: any[];
  dataType?: any;
  dateExtraType?: any;

  dataExtra?: any[];
  className?: string;
  pagination?: any;
  dataParams?: any;
  rowSelected?: any;
  isShowPagination?: boolean;
  totalPages?: number;

  handleClickRow?(p, e): void;
  handleContextMenuRow?(p, e): void;
  handleDoubleClickRow?(p, e): void;
  fetchData?(p): void;
  callbackAction?(p): void;
}
const Table = (props: Props) => {
  const {
    columns,
    dataParams = {},
    fetchData,
    rowSelected = {},
    handleClickRow,
    handleContextMenuRow,
    handleDoubleClickRow,
    dataExtra = [],
    callbackAction,
    data,
    isShowPagination = false,
    totalPages,
    className = '',
    dataType = '',
    dateExtraType = ''
  } = props;
  const [ sort, setSort ] = React.useState('');
  const [ sortDirection, setSortDirection ] = React.useState(false);
  const active = sortDirection ? '-asc icon-sortdown' : '-desc icon-sortup';

  const handleSort = (name) => {
    let column = sortDirection ? name : `-${name}`;
    if (sort === name) {
      column = !sortDirection ? name : `-${name}`;
      setSortDirection(!sortDirection);
    }
    setSort(name);
    fetchData && fetchData({ ...dataParams, sort: column });
    callbackAction && callbackAction({ ...dataParams, sort: column });
  };

  const handlePageChange = (page) => {
    fetchData && fetchData({ ...dataParams, page });
    callbackAction && callbackAction({ ...dataParams, page });
  };

  const renderData = (data, dataType) => {
    return data.map((item, row) => {
      const itemRow = { ...item, index: row + 1, type: dataType };
      const isActive = rowSelected.id === itemRow.id;
      return (
        <div
          className={`tb-tr ${isActive ? 'node-active' : ''}`}
          key={row}
          data-id={itemRow.id}
          onClick={(e) => {
            e.preventDefault();
            return (
              handleClickRow &&
              handleClickRow(itemRow, { ...e, rowData: itemRow })
            );
          }}
          onDoubleClick={(e) => {
            e.preventDefault();
            return (
              handleDoubleClickRow &&
              handleDoubleClickRow(itemRow, { ...e, rowData: itemRow })
            );
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            return (
              handleContextMenuRow &&
              handleContextMenuRow(itemRow, { ...e, rowData: itemRow })
            );
          }}
        >
          {columns.map((col: Column, index) => {
            const {
              className = '',
              width,
              Cell = '',
              accessor,
              hasTooltip = false
            } = col;
            const style = width
              ? { width: `${width}px`, left: width, flex: `0 0 ${width}px` }
              : { flex: '1 1 auto' };
            const actualValue =
              typeof accessor === 'string'
                ? itemRow[accessor]
                : itemRow[accessor(itemRow)];
            const value =
              (Cell && typeof Cell !== 'string' && Cell(itemRow)) ||
              (Cell && typeof Cell !== 'string' && Cell(itemRow) && Cell) ||
              actualValue;
            const cls =
              (className &&
                typeof className !== 'string' &&
                className(itemRow)) ||
              className;

            return (
              <div
                key={index}
                className={`tb-td ${cls}`}
                title={`${hasTooltip ? (value ? value : '') : ''}`}
                style={style}
              >
                {value}
              </div>
            );
          })}
        </div>
      );
    });
  };
  return (
    <>
      <div className={`${css.tbTable} ${className}`}>
        <div className="tb-head">
          <div className="tb-tr">
            {columns.map((col: Column, index) => {
              const {
                className = '',
                width,
                sortable = true,
                hasTooltip = false
              } = col;
              const classSort = sortable ? 'col-sort' : '';
              const classDirection = `sort${
                col.accessor === sort ? active : ''
              }`;
              const style = width
                ? { width: `${width}px`, left: width, flex: `0 0 ${width}px ` }
                : { flex: '1 1' };
              const headerValue =
                typeof col.Header !== 'string' ? col.Header() : col.Header;
              return (
                <div
                  key={index}
                  title={`${
                    hasTooltip ? (headerValue ? headerValue : '') : ''
                  }`}
                  className={`${className} ${classSort} ${classDirection} tb-th`}
                  style={style}
                  onClick={() => sortable && handleSort(col.accessor)}
                >
                  {headerValue}
                </div>
              );
            })}
          </div>
        </div>
        <div className="tb-body">
          {Boolean(data.length) && renderData(data, dataType)}
          {Boolean(dataExtra.length) && renderData(dataExtra, dateExtraType)}
          {!Boolean(dataExtra.length) && !Boolean(data.length) && (
            <div className="tb-tr">
              <div className="tb-td text-center">No data found.</div>
            </div>
          )}
        </div>
      </div>
      {isShowPagination && (
        <Pagination totalPages={totalPages} onPageChange={handlePageChange} />
      )}
    </>
  );
};
export default Table;
