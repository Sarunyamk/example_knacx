import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

import { registerUser } from "../../reducers/userSlice";

const Register = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const error = useSelector((state) => state.userStore.error);


    const onSubmit = (data) => {
        setIsSubmitting(true);
        dispatch(registerUser(data)); // ส่งข้อมูลไปที่ Redux
    };

    useEffect(() => {
        if (isSubmitting && !error) { // ตรวจสอบเฉพาะเมื่อมีการกด submit
            toast.success("Register success");
            navigate("/login");
            setIsSubmitting(false); // รีเซ็ตสถานะการส่งข้อมูล
        }

        if (isSubmitting && error) { // ถ้ามี error
            setIsSubmitting(false); // รีเซ็ตสถานะการส่งข้อมูล
        }
    }, [error, isSubmitting]); // ตรวจสอบ error และ navigate ทุกครั้งที่เปลี่ยนค่า


    return (
        <div>
            <section className="w-96 bg-gray-200 mx-auto mt-10 flex flex-col justify-center items-center rounded-lg shadow-xl p-6 ">
                <h1 className="text-2xl">Register</h1>
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
                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">Confirm Password</span>
                        </div>
                        <input
                            type="password"
                            placeholder="Type here"
                            className="input input-bordered w-full "
                            {...register("confirmPassword")}
                        />
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Role</span>
                        </div>
                        <select
                            className="input input-bordered w-full"
                            {...register("role")}
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </label>
                    {error && <p className="text-red-500 text-sm -mt-2">{error}</p>}
                    <button type="submit" className="btn btn-outline mt-4 w-2/4 mx-auto btn-primary ">
                        Register
                    </button>
                </form>
            </section>
        </div>
    )
}
export default Register