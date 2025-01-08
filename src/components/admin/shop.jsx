import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "./../../reducers/productSlice";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import ProductList from "./ProductList";

const Shop = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);

    const [listModal, setListModal] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const items = useSelector((state) => state.productStore.items);

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
    console.log(items, "item stroe");
    const handleSubmit = (e) => {
        e.preventDefault();
        const newId = items.length > 0
            ? Math.max(...items.map((item) => Number(item.id))) + 1
            : 1;

        const newProduct = {
            id: newId, // ใช้ id ใหม่
            title,
            price: parseFloat(price),
            image,
        };



        dispatch(addProduct(newProduct));

        setTitle("");
        setPrice("");
        setImage(null);

        toast.success("Product added!");
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
                                <span className="label-text">Title</span>
                            </div>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Type here"
                                className="input input-bordered w-full"
                            />
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Price</span>
                            </div>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Type here"
                                className="input input-bordered w-full"
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Pick a file</span>
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
                            Submit
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Shop;
