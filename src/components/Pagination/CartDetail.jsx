import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from "react-toastify";

import { removeCart, decrementQuantity, incrementQuantity } from "../../reducers/cartSlice";

const CartDetail = ({ setModalCart }) => {
    const userLogin = JSON.parse(localStorage.getItem("currentUser")) || null;
    const dispatch = useDispatch();

    // ดึงข้อมูล userCart จาก Redux state
    const userCart = useSelector((state) => {
        const cart = Array.isArray(state.cart) ? state.cart : []; // ตรวจสอบว่า state.cart เป็น Array
        return cart.find((cartItem) => cartItem.userId === userLogin?.id) || { items: [], totalQuantity: 0, totalPrice: 0 };
    });

    const hdlDeleteItem = (id) => {
        dispatch(removeCart({ userId: userLogin?.id, productId: id })); // ส่ง userId และ productId ไปที่ reducer
        toast.success("ลบรายการสินค้าเรียบร้อย!");
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
                        {userCart.items.length > 0 ? (
                            userCart.items.map((item, index) => (
                                <div
                                    key={index}
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
                                            <div className="flex items-center gap-4 font-bold">
                                                <button
                                                    onClick={() =>
                                                        dispatch(decrementQuantity({
                                                            userId: userLogin?.id,
                                                            productId: item.id,
                                                        }))
                                                    }
                                                    className="w-8 h-8 hover:scale-105 duration-300 hover:text-blue-500 text-lg"
                                                >
                                                    -
                                                </button>
                                                <h1 className="w-8 h-8 text-center">{item.quantity}</h1>
                                                <button
                                                    onClick={() =>
                                                        dispatch(incrementQuantity({
                                                            userId: userLogin?.id,
                                                            productId: item.id,
                                                        }))
                                                    }
                                                    className="w-8 h-8 hover:scale-105 duration-300 hover:text-blue-500 text-lg"
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
                                <p className="text-center text-lg md: text-gray-500">
                                    ไม่มีสินค้า กรุณาเพิ่มสินค้าในตะกร้า!
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-between items-center text-black">
                        <h1>
                            รวมทั้งหมด{" "}
                            <span className="text-blue-500 font-bold">{userCart.totalQuantity}</span> รายการ ยอดเงิน{" "}
                            <span className="text-blue-500 font-bold">
                                {userCart.items.length > 0 ? userCart.totalPrice.toFixed(2) : 0}
                            </span>{" "}
                            บาท
                        </h1>
                        <button>ชำระเงิน</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartDetail;
