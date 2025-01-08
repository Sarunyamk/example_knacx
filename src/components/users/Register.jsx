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
        dispatch(registerUser(data));
    };

    useEffect(() => {
        if (isSubmitting && !error) {
            toast.success("ลงทะเบียนเรียบร้อยแล้ว!");
            navigate("/login");
            setIsSubmitting(false);
        }

        if (isSubmitting && error) {
            setIsSubmitting(false);
        }
    }, [error, isSubmitting]);


    return (
        <div>
            <section className="w-96 bg-gray-200 mx-auto mt-10 flex flex-col justify-center items-center rounded-lg shadow-xl p-6 ">
                <h1 className="text-2xl">ลงทะเบียน</h1>
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
                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">ยืนยันรหัสผ่าน</span>
                        </div>
                        <input
                            type="password"
                            placeholder="กรอกรหัสผ่านที่นี่..."
                            className="input input-bordered w-full "
                            {...register("confirmPassword")}
                        />
                    </label>

                    <label class="form-control w-full ">
                        <div class="label">
                            <span class="label-text">สิทธิ์ผู้ใช้งาน</span>
                        </div>
                        <select class="select select-bordered"
                            {...register("role")}>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>

                    </label>
                    {error && <p className="text-red-500 text-sm -mt-2">{error}</p>}
                    <button type="submit" className="btn btn-outline mt-4 w-2/4 mx-auto btn-primary ">
                        ลงทะเบียน
                    </button>
                </form>
            </section>
        </div>
    )
}
export default Register