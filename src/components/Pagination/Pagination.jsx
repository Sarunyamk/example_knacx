import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import usePagination from "./usePagination"

import { fetchProducts } from "./../../reducers/productSlice"

const Pagination = () => {

    const dispatch = useDispatch();
    const { items, loading, error } = useSelector((state) => state.productStore);
    const userLogin = JSON.parse(localStorage.getItem("currentUser"));

    const itemsPerPage = 4;

    useEffect(() => {
        if (items.length === 0) {
            dispatch(fetchProducts());
        }
    }, [dispatch, items.length]);


    const { currentData, currentPage, maxPage, nextPage, prevPage, jumpToPage } = usePagination(items, itemsPerPage);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    console.log(userLogin, "user roleee");

    return (
        <div>
            <div className="grid grid-cols-4 gap-8 m-20">
                {currentData().map((item) => (
                    <div key={item.id} className="flex flex-col w-80 h-96 items-center gap-4 justify-center p-4 border-2 rounded-lg shadow-xl">
                        <img src={item.image} className="w-1/2 h-1/2" />
                        <h1>{item.title}</h1>
                        <h1>{item.price} $</h1>
                        <div className="flex gap-4">
                            {
                                userLogin && userLogin.role === "admin" ?
                                    <div className="flex gap-4 text-sm">
                                        <button className="bg-red-500 text-white p-3 rounded-lg">Edit</button>
                                        <button className="bg-red-500 text-white p-2 rounded-lg">Delete</button>
                                    </div>
                                    :
                                    <button className="bg-blue-500 text-white p-2 rounded-lg">Add to Cart</button>
                            }
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center items-center gap-4">
                <button onClick={prevPage} disabled={currentPage === 1} className="p-2 border-2 rounded-lg disabled:opacity-50">
                    Previous
                </button>
                {Array.from({ length: maxPage }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => jumpToPage(i + 1)}
                        className={`p-2 border-2 rounded-lg ${currentPage === i + 1 ? "bg-blue-500 text-white" : ""}`}
                    >
                        {i + 1}
                    </button>
                ))}
                <button onClick={nextPage} disabled={currentPage === maxPage} className="p-2 border-2 rounded-lg disabled:opacity-50">
                    Next
                </button>
            </div>
        </div>
    )
}
export default Pagination