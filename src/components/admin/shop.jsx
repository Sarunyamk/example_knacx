import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

import { addProduct, productSchema } from "./../../reducers/productSlice";
import ProductList from "./ProductList";

const Shop = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);
    const [listModal, setListModal] = useState(false);

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { items } = useSelector((state) => state.productStore);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result); // เก็บ Base64
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!image) {
            toast.error("กรุณาอัปโหลดรูปภาพ");
            return;
        }

        const newProduct = {
            title,
            price: parseFloat(price),
            image,
        };
        const { error } = productSchema.validate(newProduct);

        if (error) {
            toast.error(error.details[0].message);
            return;
        }

        // เพิ่ม id ใหม่
        const newId = items.length > 0
            ? Math.max(...items.map((item) => Number(item.id))) + 1
            : 1;

        const productWithId = { ...newProduct, id: newId };

        // Dispatch การเพิ่มสินค้า
        dispatch(addProduct(productWithId));

        // Clear Input Fields
        setTitle("");
        setPrice("");
        setImage(null);
        toast.success("เพิ่มสินค้าเรียบร้อยแล้ว");
        navigate("/shop");


    };


    return (
        <div>
            <div className="flex flex-col items-center justify-center py-20 bg-gray-100 text-center">
                <div className="flex justify-end w-full px-10">
                    <button onClick={() => setListModal(true)} className="btn btn-primary">รายการสินค้าทั้งหมด</button>
                </div>
                {
                    listModal && <ProductList setListModal={setListModal} />
                }
                <div className=" min-w-xl p-8 bg-white shadow-xl rounded-lg">
                    <h1 className="text-3xl font-bold text-blue-500">เพิ่มรายการสินค้า</h1>
                    <form onSubmit={handleSubmit} className=" w-full flex flex-col justify-center gap-2">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">ชื่อสินค้า</span>
                            </div>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="ชื่อสินค้า..."
                                className="input input-bordered w-full"
                            />
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">ราคา</span>
                            </div>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="ราคา..."
                                className="input input-bordered w-full"
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">เลือกไฟล์</span>
                            </div>
                            <input type="file" onChange={handleFileChange} className="file-input file-input-bordered w-full max-w-xs" />
                        </label>
                        {image && (
                            <div className="mt-4">
                                <img
                                    src={image}
                                    className="w-20 h-20 object-cover border rounded-lg shadow-md"
                                />
                            </div>
                        )}

                        <button type="submit" className="btn btn-outline mt-4 w-2/4 mx-auto btn-primary">
                            บันทึก
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Shop;
