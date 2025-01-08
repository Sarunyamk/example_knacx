import { useSelector } from "react-redux";
import { CSVLink } from "react-csv";

const ExportCSV = () => {

    const items = useSelector((state) => state.productStore.items);

    const headers = [
        { label: "ID", key: "id" },
        { label: "Title", key: "title" },
        { label: "Price", key: "price" },
        { label: "Image", key: "image" },
    ];

    return (
        <div>
            <CSVLink
                data={items}
                headers={headers}
                filename={"products.csv"}
                className="m-2 btn btn-ghost btn-xs"
            >
                ดาวน์โหลดไฟล์
            </CSVLink>
        </div>
    )
}
export default ExportCSV