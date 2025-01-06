import axios from 'axios'
import { useEffect, useState } from "react"

import usePagination from "./usePagination"

const Pagination = () => {

    const [data, setData] = useState([])
    const itemsPerPage = 3;

    const getData = async () => {
        try {
            const resp = await axios.get('https://fakestoreapi.com/products')
            setData(resp.data)
            console.log(resp.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const { currentData, currentPage, maxPage, nextPage, prevPage, jumpToPage } = usePagination(data, itemsPerPage);

    return (
        <div>
            <div className="grid grid-cols-3 gap-10 m-20">
                {currentData().map((item, index) => (
                    <div key={index} className="flex flex-col items-center gap-4 justify-center w-96 h-96 p-4 border-2 shadow-xl">
                        <img src={item.image} className="w-64 h-64" alt={item.title} />
                        <h1>{item.title}</h1>
                    </div>
                ))}
            </div>
            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-4">
                <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="p-2 border-2 rounded-lg disabled:opacity-50"
                >
                    Previous
                </button>
                {Array.from({ length: maxPage }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => jumpToPage(i + 1)}
                        className={`p-2 border-2 rounded-lg ${currentPage === i + 1 ? 'bg-blue-500 text-white' : ''}`}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    onClick={nextPage}
                    disabled={currentPage === maxPage}
                    className="p-2 border-2 rounded-lg disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    )
}
export default Pagination