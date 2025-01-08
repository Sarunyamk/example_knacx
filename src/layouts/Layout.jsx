import { useState } from "react";
import Navbar from "./Navbar";
import { Outlet } from 'react-router-dom'
import RealTimeChat from "../components/realtime-chat/RealTimeChat";
import { MdOutlineMessage } from "react-icons/md";
const Layout = () => {
    const [isChatOpen, setIsChatOpen] = useState(false)

    return (
        <div>
            <Navbar />
            <Outlet className="relative" />
            <div className="absolute bottom-10 right-10">
                {
                    isChatOpen ? isChatOpen && <RealTimeChat setIsChatOpen={setIsChatOpen} />

                        : <button className="bg-green-700 hover:scale-105 duration-300 w-16 h-16 rounded-full flex justify-center items-center" onClick={() => setIsChatOpen(true)}>
                            <MdOutlineMessage className="w-10 h-10 " />
                        </button>
                }
            </div>

        </div>
    )
}
export default Layout