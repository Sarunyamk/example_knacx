const Register = () => {
    return (
        <div>
            <section className="w-96 h-96 bg-gray-200 mx-auto mt-20 flex flex-col items-center rounded-lg shadow-xl p-4 gap-4">
                <h1 className="text-2xl">Register</h1>
                <label class="form-control w-full max-w-xs">
                    <div class="label">
                        <span class="label-text">Email</span>
                    </div>
                    <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />

                </label>
            </section>
        </div>
    )
}
export default Register