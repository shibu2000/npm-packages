import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';

interface ReactCompactPaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
    maxVisiblePages?: number;
    prevLabel?: ReactNode;
    nextLabel?: ReactNode;
}
declare const ReactCompactPagination: ({ totalPages, currentPage, onPageChange, maxVisiblePages, prevLabel, nextLabel, }: ReactCompactPaginationProps) => react_jsx_runtime.JSX.Element | null;

export { ReactCompactPagination, type ReactCompactPaginationProps };
