import { useState } from "react";

export const usePaginationParams = (initialPage = 1, initialLimit = 10) => {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const resetPagination = () => {
    setPage(initialPage);
    setLimit(initialLimit);
  };

  return { page, setPage, limit, setLimit, resetPagination };
};
