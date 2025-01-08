import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { removeCart, decrementQuantity, incrementQuantity, clearCart } from "../../reducers/cartSlice";

const CartDetail = ({ setModalCart }) => {

    const userLogin = JSON.parse(localStorage.getItem("currentUser")) || null;

    const userCart = useSelector((state) => {
        console.log("Redux State in useSelector:", state); // ตรวจสอบ state
        if (state.cart && Array.isArray(state.cart) && userLogin) {
            return state.cart.find((cart) => cart.userId === userLogin.id) || {
                items: [],
                totalQuantity: 0,
                totalPrice: 0,
            };
        }
        return {
            items: [],
            totalQuantity: 0,
            totalPrice: 0,
        };
    });



    const dispatch = useDispatch();
    console.log('userCart :>> ', userCart);

    const hdlDeleteItem = (id) => {
        if (userLogin) {
            dispatch(removeCart({ userId: userLogin.id, productId: id }));
            toast.success("ลบรายการสินค้าเรียบร้อย!");
        } else {
            toast.error("ไม่พบข้อมูลผู้ใช้งาน!");
        }
    };

    const hdlDecrement = (productId) => {
        if (userLogin) {
            dispatch(decrementQuantity({ userId: userLogin.id, productId }));
        } else {
            toast.error("ไม่พบข้อมูลผู้ใช้งาน!");
        }
    };

    const hdlIncrement = (productId) => {
        if (userLogin) {
            dispatch(incrementQuantity({ userId: userLogin.id, productId }));
        } else {
            toast.error("ไม่พบข้อมูลผู้ใช้งาน!");
        }
    };

    const hdlCheckout = () => {
        dispatch(clearCart({ userId: userLogin.id })); // ส่งแค่ userId
        toast.success("ชำระเงินเรียบร้อย!");
    };



    return (
        <div>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="min-w-fit p-10 bg-white shadow-xl rounded-lg flex flex-col gap-4">
                    <div className="relative flex justify-center items-center gap-10">
                        <h1 className="text-3xl text-center font-bold text-blue-500">ตะกร้าสินค้า</h1>
                        <button
                            onClick={() => setModalCart(false)}
                            className="absolute -right-10 -top-10 text-sm font-bold p-4 duration-300 hover:text-blue-500"
                        >
                            X
                        </button>
                    </div>
                    <div className="w-[600px] h-[400px] overflow-y-scroll text-black">
                        {userCart?.items.length > 0 ? (
                            userCart.items.map((item) => (
                                <div
                                    key={item.id}
                                    className="w-full h-auto mx-auto border-2 rounded-lg border-[#bfbebe5d] my-2"
                                >
                                    <div className="flex p-6 gap-6">
                                        <div className="w-32 h-32">
                                            <img
                                                className="w-full h-full object-contain"
                                                src={item.image}
                                                alt={item.title}
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-center gap-4">
                                            <h1 className="font-main">{item.title}</h1>
                                            <div className="flex items-baseline gap-5">
                                                <p>ราคา :</p>
                                                <p>{item.price} บาท</p>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <button
                                                    onClick={() => hdlDecrement(item.id)}
                                                    className="w-8 h-8 text-lg hover:scale-105 duration-300 hover:text-blue-500"
                                                >
                                                    -
                                                </button>
                                                <h1 className="font-main w-8 h-8 text-center">
                                                    {item.quantity}
                                                </h1>
                                                <button
                                                    onClick={() => hdlIncrement(item.id)}
                                                    className="w-8 h-8 text-lg hover:scale-105 duration-300 hover:text-blue-500"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex justify-end items-end">
                                            <RiDeleteBinLine
                                                onClick={() => hdlDeleteItem(item.id)}
                                                className="w-8 h-8 hover:text-blue-500 duration-300 text-gray-500 cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex justify-center items-center h-full">
                                <p className="text-center text-lg text-gray-500">ไม่มีสินค้า กรุณาเพิ่มสินค้าในตะกร้า!</p>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-between items-center text-black">
                        <h1>
                            รวมทั้งหมด{" "}
                            <span className="text-blue-500 font-bold">{userCart?.totalQuantity || 0}</span>{" "}
                            รายการ ยอดเงิน{" "}
                            <span className="text-blue-500 font-bold">{userCart?.totalPrice.toFixed(2) || "0.00"}</span>{" "}
                            บาท
                        </h1>
                        {
                            userCart?.items.length > 0 && (
                                <button onClick={hdlCheckout} className="btn btn-primary">
                                    ชำระเงิน
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartDetail;
