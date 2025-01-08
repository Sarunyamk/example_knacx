import { FixedSizeList } from "react-window";


const VirtualizedList = () => {
    const data = Array.from({ length: 100000 }, (_, index) => `Data Knacx ${index + 1}`);

    return (
        <div>
            <h1 className="text-2xl font-bold text-center my-10">รายการ</h1>
            <FixedSizeList
                className="h-screen overflow-y-scroll bg-red-400 text-xl"
                height={550}
                itemCount={data.length}
                itemSize={50}
                width="100%"
            >
                {({ index, style }) => (
                    <div style={style} className="flex flex-wrap text-center">
                        <div className="w-1/5 p-2">{data[index * 5]}</div>
                        <div className="w-1/5 p-2">{data[index * 5 + 1]}</div>
                        <div className="w-1/5 p-2">{data[index * 5 + 2]}</div>
                        <div className="w-1/5 p-2">{data[index * 5 + 3]}</div>
                        <div className="w-1/5 p-2">{data[index * 5 + 4]}</div>
                    </div>)}
            </FixedSizeList></div>
    )
}
export default VirtualizedList