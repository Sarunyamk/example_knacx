
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import usePagination from "./usePagination";
import { fetchProducts, deleteProduct } from "./../../reducers/productSlice";
import { addToCart } from "./../../reducers/cartSlice";
import EditProduct from "../admin/EditProduct";


const Pagination = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, loading, error } = useSelector((state) => state.productStore);
    const userLogin = JSON.parse(localStorage.getItem("currentUser"));

    const itemsPerPage = 4;

    const [modalEdit, setModalEdit] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        if (items.length === 0) {
            dispatch(fetchProducts());
        }
    }, [dispatch, items.length]);

    const sortedData = [...items].sort((a, b) => b.id - a.id);
    const { currentData, currentPage, maxPage, nextPage, prevPage, jumpToPage } = usePagination(sortedData, itemsPerPage);

    if (loading) return <Loading />;
    if (error) return <p>Error: {error}</p>;

    const hdlDeleteProduct = (id) => {
        Swal.fire({
            title: "คุณแน่ใจสำหรับการลบสินค้านี้?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ยืนยัน ลบสินค้า",
            cancelButtonText: "ยกเลิก",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteProduct(id));
                Swal.fire({
                    title: "ลบสินค้าเรียบร้อยแล้ว!",
                    icon: "success"
                });
            }
        });
    };

    const handleAddToCart = (product) => {
        if (userLogin) {
            dispatch(addToCart({
                userId: userLogin.id,
                product,
            }));
            toast.success("เพิ่มรายการสินค้าเข้าตะกร้าเรียบร้อยแล้ว!");
        } else {
            toast.error("กรุณา เข้าสู่ระบบ ก่อนสั่งซื้อสินค้า");
            navigate("/login");
        }
    };


    return (
        <div>
            <div className="grid grid-cols-4 gap-8 m-20">
                {currentData().map((item, index) => (
                    <div key={index} className="flex flex-col w-80 h-96 items-center gap-4 justify-center p-4 border-2 rounded-lg shadow-xl">
                        <img src={item.image} className="w-1/2 h-1/2" alt={item.title} />
                        <h1>{item.title}</h1>
                        <h1>{item.price} $</h1>
                        <div className="flex gap-4">
                            {userLogin && userLogin.role === "admin" ? (
                                <div className="flex gap-4 text-sm">
                                    <button
                                        onClick={() => {
                                            setSelectedItem(item);
                                            setModalEdit(true);
                                        }}
                                        className="bg-red-500 text-white p-3 rounded-lg"
                                    >
                                        แก้ไขสินค้า
                                    </button>
                                    <button onClick={() => hdlDeleteProduct(item.id)} className="bg-red-500 text-white p-2 rounded-lg">ลบ</button>
                                </div>
                            ) : (
                                <button onClick={() => handleAddToCart(item)} className="bg-blue-500 text-white p-2 rounded-lg">เพิ่มเข้าตะกร้าสินค้า</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {modalEdit && (
                <EditProduct
                    setModalEdit={setModalEdit}
                    item={selectedItem}
                />
            )}
            <div className="flex justify-center items-center gap-4">
                <button onClick={prevPage} disabled={currentPage === 1} className="p-2 border-2 rounded-lg disabled:opacity-50">
                    ก่อนหน้า
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
                    ถัดไป
                </button>
            </div>
        </div>
    )
}
export default Pagination;

