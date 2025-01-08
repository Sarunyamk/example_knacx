import { FixedSizeList } from "react-window";


const VirtualizedList = () => {
    const data = Array.from({ length: 100000 }, (_, index) => `Data Knacx ${index + 1}`);
    const columns = 5;
    const rows = Math.ceil(data.length / columns);

    return (
        <div>
            <h1 className="text-2xl font-bold text-center my-4">รายการ</h1>
            <FixedSizeList
                className="overflow-y-scroll text-xl"
                height={550}
                itemCount={rows} // จำนวนแถวทั้งหมด
                itemSize={50} // ความสูงของแต่ละแถว
                width="100%"
            >
                {({ index, style }) => {
                    const startIndex = index * columns; // เริ่มต้นของแต่ละแถว
                    const rowItems = data.slice(startIndex, startIndex + columns); // ดึงข้อมูลในแถว
                    return (
                        <div style={style} className="flex text-center">
                            {rowItems.map((item, columnIndex) => (
                                <div key={columnIndex} className="w-1/5 p-2 border">
                                    {item}
                                </div>
                            ))}
                        </div>
                    );
                }}
            </FixedSizeList>
        </div>
    )
}
export default VirtualizedList