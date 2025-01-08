
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

import { login } from "../../reducers/userSlice";

const Login = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const error = useSelector((state) => state.userStore.error);
    const { register, handleSubmit } = useForm();

    const userLogin = JSON.parse(localStorage.getItem("currentUser"));

    const onSubmit = (data) => {
        setIsSubmitting(true); // ตั้งค่า isSubmitting เป็น true
        dispatch(login(data)); // ส่งข้อมูลไปที่ Redux
    };
    console.log(userLogin, "userLogin userLogin");
    useEffect(() => {
        if (isSubmitting && !error && userLogin.role === "user") { // ตรวจสอบเมื่อไม่มีข้อผิดพลาด
            toast.success("Login success");
            navigate("/");
            setIsSubmitting(false); // รีเซ็ตสถานะการส่งข้อมูล
            console.log("Im USERRRR");
        }
        else if (isSubmitting && !error && userLogin.role === "admin") {
            toast.success("Login success");
            navigate("/admin-create");
            setIsSubmitting(false); // รีเซ็ตสถานะการส่งข้อมูล
        }

        else { // ถ้ามีข้อผิดพลาด
            setIsSubmitting(false); // รีเซ็ตสถานะการส่งข้อมูล
        }
    }, [error, isSubmitting]);

    return (
        <div>
            <section className="w-96 bg-gray-200 mx-auto mt-20 flex flex-col items-center rounded-lg shadow-xl p-4 gap-4">
                <h1 className="text-2xl">Login</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col justify-center gap-4">
                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">Email</span>
                        </div>
                        <input
                            type="email"
                            placeholder="Type here"
                            className="input input-bordered w-full "
                            {...register("email")}
                        />
                    </label>
                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">Password</span>
                        </div>
                        <input
                            type="password"
                            placeholder="Type here"
                            className="input input-bordered w-full "
                            {...register("password")}
                        />
                    </label>
                    {error && <p className="text-red-500 text-sm -mt-2">{error}</p>}
                    <button type="submit" className="btn btn-outline mt-4 w-2/4 mx-auto btn-primary ">
                        Login
                    </button>
                </form>
            </section>
        </div>
    )
}
export default Login