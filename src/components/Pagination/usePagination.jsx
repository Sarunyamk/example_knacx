import { useState } from "react";

const usePagination = (data, itemsPerPage) => {

    const [currentPage, setCurrentPage] = useState(1);

    const maxPage = Math.ceil(data.length / itemsPerPage);

    const currentData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    };

    const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, maxPage));
    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const jumpToPage = (page) => setCurrentPage(() => Math.max(1, Math.min(page, maxPage)));


    return { currentData, currentPage, maxPage, nextPage, prevPage, jumpToPage };
}
export default usePagination