import { useGetProductsPageQuery } from '@/shared/api/storeApi';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/shared/ui/pagination';
import React, { useState } from 'react';

interface PaginationComponentProps {
  page: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
}

export const PaginationSection: React.FC<PaginationComponentProps> = ({
  page,
  handlePrevPage,
  handleNextPage,
}) => {
  const { data, error, isFetching } = useGetProductsPageQuery({
    page: page,
  });
  const totalPages = data?.data.totalPages ? data.data.totalPages : 0;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={handlePrevPage}
            className={`cursor-pointer px-2 ${page === 1 ? 'pointer-events-none opacity-50' : ''}`}
            aria-disabled={page === 1}
            tabIndex={page === 1 ? -1 : undefined}
            isActive={isFetching}
          />
        </PaginationItem>

        <div>{`${page} / ${totalPages}`}</div>

        <PaginationItem>
          <PaginationNext
            onClick={handleNextPage}
            aria-disabled={page === totalPages}
            tabIndex={page === totalPages ? -1 : undefined}
            className={`cursor-pointer px-2 ${page === totalPages ? 'pointer-events-none opacity-50' : ''}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
