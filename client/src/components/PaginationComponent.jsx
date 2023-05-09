import { useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { useDispatch } from 'react-redux';
import { useGetPaginationProductsQuery } from '../features/product/productApi';
import { setPaginateProductLists } from '../features/product/productSlice';

function PaginationComponent() {
  const [page, setPage] = useState(1);
  const [countPage, setCountPage] = useState(0);

  const { data: response } = useGetPaginationProductsQuery(page);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPaginateProductLists(response?.products));
  }, [response]);

  useEffect(() => {
    if (response) {
      setCountPage(Math.ceil(response.pageCount));
    }
  }, [response]);

  const handlePrev = () => {
    setPage((p) => {
      if (p === 1) return 1;
      return p - 1;
    });
  };

  const handleNext = () => {
    setPage((p) => {
      if (p === countPage) return p;
      return p + 1;
    });
  };

  return (
    <Pagination className="d-flex align-items-center justify-content-start">
      <Pagination.First
        id="pagination_button"
        onClick={handlePrev}
        disabled={page === 1}
      >
        Previous
      </Pagination.First>
      <Pagination.Last
        id="pagination_button"
        onClick={handleNext}
        disabled={page === countPage}
      >
        Next
      </Pagination.Last>
    </Pagination>
  );
}

export default PaginationComponent;
