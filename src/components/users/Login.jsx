
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
        setIsSubmitting(true);
        dispatch(login(data));
    };
    console.log(userLogin, "userLogin userLogin");
    useEffect(() => {
        if (isSubmitting && !error && userLogin.role === "user") {
            toast.success("เข้าสู่ระบบเรียบร้อยแล้ว!");
            navigate("/");
            setIsSubmitting(false);
        }
        else if (isSubmitting && !error && userLogin.role === "admin") {
            toast.success("เข้าสู่ระบบเรียบร้อยแล้ว!");
            navigate("/admin-create");
            setIsSubmitting(false);
        }

        else {
            setIsSubmitting(false);
        }
    }, [error, isSubmitting]);

    return (
        <div>
            <section className="w-96 bg-gray-200 mx-auto mt-20 flex flex-col items-center rounded-lg shadow-xl p-4 gap-4">
                <h1 className="text-2xl">เข้าสู่ระบบ</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col justify-center gap-4">
                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">อีเมล</span>
                        </div>
                        <input
                            type="email"
                            placeholder="กรอกอีเมลที่นี่..."
                            className="input input-bordered w-full "
                            {...register("email")}
                        />
                    </label>
                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">รหัสผ่าน</span>
                        </div>
                        <input
                            type="password"
                            placeholder="กรอกรหัสผ่านที่นี่..."
                            className="input input-bordered w-full "
                            {...register("password")}
                        />
                    </label>
                    {error && <p className="text-red-500 text-sm -mt-2">{error}</p>}
                    <button type="submit" className="btn btn-outline mt-4 w-2/4 mx-auto btn-primary ">
                        เข้าสู่ระบบ
                    </button>
                </form>
            </section>
        </div>
    )
}
export default Login