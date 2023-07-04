import { ArrowLeftOutlined, SettingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function GridFormMainSectionWrapper({
    children,
    formName,
    formId,
    formType,
}) {
    const redirectToFormBuilder = () => {
        window.open(`/element-builder?formId=${formId}&type=${formType}`);
    };
    return (
        <div className="">
            <div className="flex items-center max-w-screen-xl m-auto mb-3 justify-between">
                <Link to={`/reports/${formId}`}>
                    <div className="flex flex-row items-center">
                        <ArrowLeftOutlined />
                        <span className="ml-2"> Report</span>
                    </div>
                </Link>
                <div
                    className="flex flex-row items-center cursor-pointer hover:text-blue-400"
                    onClick={redirectToFormBuilder}
                >
                    <span className="mr-1">Form </span>
                    <SettingOutlined />
                </div>
            </div>
            <div className="flex flex-col justify-center items-center max-w-screen-xl shadow-md m-auto relative bg-white">
                <div className="w-full lg:py-4 md:py-4 md:px-4">
                    <h1 className="text-2xl text-left  m-0">{formName}</h1>
                </div>
                <hr className="w-full" />
                <div className="w-full">{children}</div>
            </div>
        </div>
    );
}
