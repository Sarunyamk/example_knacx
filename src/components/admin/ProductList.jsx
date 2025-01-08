import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';

import { fetchProducts } from '../../reducers/productSlice';
import ExportCSV from './ExportCSV';

const ProductList = ({ setListModal }) => {

    const dispatch = useDispatch();
    const items = useSelector((state) => state.productStore.items);

    useEffect(() => {
        if (items.length === 0) {
            dispatch(fetchProducts());
        }
    }, [dispatch, items.length]);
    console.log("Items in Store:", items); // ดูว่ามีข้อมูลหรือไม่
    console.log("IDs in Items:", items.map((item) => item.id)); // ดูค่า id ทั้งหมด
    console.log("Max ID:", Math.max(...items.map((item) => Number(item.id)))); // ดูค่า id สูงสุด

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="min-w-fit p-10 bg-white shadow-xl rounded-lg flex flex-col gap-4">
                <div className='relative flex justify-center items-center gap-10'>
                    <h1 className="text-3xl text-center font-bold text-blue-500">รายการสินค้า</h1>
                    <div className="absolute right-5 ">
                        <ExportCSV />
                    </div>
                    <button onClick={() => setListModal(false)} className="absolute -right-10 -top-10 text-sm font-bold p-4 duration-300 hover:text-blue-500">X</button>

                </div>
                <div className=' w-full h-[400px]'>
                    {items.length > 0 ? (

                        <div className="overflow-x-auto h-full">
                            <table className="divide-y divide-gray-200 w-full text-center">
                                <thead className="bg-gray-800 text-white text-lg sticky top-0 z-10">
                                    <tr>

                                        <th className="px-6 py-3 uppercase tracking-wider">รหัสสินค้า</th>
                                        <th className="px-6 py-3 uppercase tracking-wider">ชื่อสินค้า</th>
                                        <th className="px-6 py-3 uppercase tracking-wider">ราคา</th>
                                        <th className="px-6 py-3 uppercase tracking-wider">รูปภาพ</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-gray-700 text-white divide-y divide-gray-600">
                                    {items.map((item, index) => (
                                        <tr key={item.id}>

                                            <td className="p-2 whitespace-nowrap">{item.id}</td>
                                            <td className="p-2 whitespace-nowrap">{item.title}</td>
                                            <td className="p-2 whitespace-nowrap">{item.price}</td>
                                            <td className="p-2 whitespace-nowrap">
                                                <img className='w-20 h-20 rounded-xl' src={item.image} alt="" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    ) : (
                        <div className='pt-32'>
                            <p className="text-gray-500 text-2xl">ไม่มีผู้โชคดีในรางวัลนี้</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default ProductList