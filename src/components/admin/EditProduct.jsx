import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';

import { editProduct, productSchema } from "./../../reducers/productSlice";

const EditProduct = ({ setModalEdit, item }) => {

    const dispatch = useDispatch();
    const [title, setTitle] = useState(item.title);
    const [price, setPrice] = useState(item.price);
    const [image, setImage] = useState(item.image);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
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

        const editProductForm = { id: item.id, title, price, image }
        const { error } = productSchema.validate(editProductForm);

        if (error) {
            toast.error(error.details[0].message);
            return;
        }

        dispatch(editProduct(editProductForm));

        toast.success("อัพเดทข้อมูลเรียบร้อยแล้ว");
        setModalEdit(false); // ปิด Modal หลังจากแก้ไขสำเร็จ
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="max-w-lg p-8 bg-white shadow-xl rounded-lg">
                <h1 className="text-3xl text-center font-bold text-blue-500">แก้ไขรายการ</h1>
                <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center gap-4">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">ชื่อสินค้า</span>
                        </div>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="input input-bordered w-full bg-gray-100 border-gray-300 text-gray-800"
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
                            className="input input-bordered w-full bg-gray-100 border-gray-300 text-gray-800"
                        />
                    </label>
                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">รูปภาพ</span>
                        </div>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="file-input file-input-bordered w-full bg-gray-100 border-gray-300 text-gray-800 "
                        />
                    </label>
                    {image && (
                        <div className="mt-2">
                            <img
                                src={image}
                                className="w-20 h-20 object-cover border rounded-lg shadow-md"
                            />
                        </div>
                    )}
                    <div className="flex justify-between ">
                        <button
                            type="button"
                            className="btn btn-outline btn-error"
                            onClick={() => setModalEdit(false)}
                        >
                            ยกเลิก
                        </button>
                        <button type="submit" className="btn btn-outline btn-primary">
                            บันทึก
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default EditProduct