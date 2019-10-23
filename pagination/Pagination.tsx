import * as React from 'react';
import Pagination from 'react-bootstrap/Pagination';

interface Props {
  currentPage?: number;
  totalPages: number;
  onPageChange(page): any;
}
let rangePage = 3;
let startPage = 1;
const paddingPage = 5;
const PaginationComponent = (props: Props) => {
  const { currentPage = 1, totalPages, onPageChange } = props;
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const makePageItems = () => {
    const items = [];
    items.push(
      <Pagination.Prev
        disabled={currentPage === 1}
        key="prev"
        onClick={currentPage === 1 ? null : () => onPageChange(prevPage)}
      >
        Prev
      </Pagination.Prev>
    );
    if (totalPages > paddingPage + 2) {
      if (currentPage < paddingPage) {
        rangePage = paddingPage;
        startPage = 1;
      } else {
        rangePage = currentPage === totalPages ? currentPage : currentPage + 1;
        startPage = currentPage > 1 ? currentPage - 1 : currentPage;
        startPage =
          totalPages - currentPage < paddingPage - 1
            ? totalPages - paddingPage + 1
            : startPage;
        rangePage =
          totalPages - currentPage < paddingPage - 1 ? totalPages : rangePage;
        items.push(
          <Pagination.Item key="first" onClick={() => onPageChange(1)}>
            {1}
          </Pagination.Item>
        );
        items.push(<Pagination.Ellipsis key="Ellipsis2" />);
      }

      for (let page = startPage; page <= rangePage; page = page + 1) {
        items.push(
          <Pagination.Item
            key={page}
            active={page === currentPage}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Pagination.Item>
        );
      }
      if (startPage < totalPages - paddingPage + 1) {
        items.push(<Pagination.Ellipsis key="Ellipsis" />);
        items.push(
          <Pagination.Item
            key={totalPages}
            active={totalPages === currentPage}
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </Pagination.Item>
        );
      }
    } else {
      for (let page = 1; page <= totalPages; page = page + 1) {
        items.push(
          <Pagination.Item
            key={page}
            active={page === currentPage}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Pagination.Item>
        );
      }
    }

    items.push(
      <Pagination.Next
        key="next"
        disabled={currentPage === totalPages}
        onClick={
          currentPage === totalPages ? null : () => onPageChange(nextPage)
        }
      >
        Next
      </Pagination.Next>
    );
    return items;
  };
  return <Pagination>{makePageItems()}</Pagination>;
};
export default PaginationComponent;
