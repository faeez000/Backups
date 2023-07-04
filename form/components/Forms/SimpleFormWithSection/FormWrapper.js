import { ArrowLeftOutlined, SettingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function FormWrapper({
    formName,
    formId,
    children,
    isMasterModalForm,
    formType,
}) {
    const redirectToFormBuilder = () => {
        window.open(`/element-builder?formId=${formId}&type=${formType}`);
    };
    return (
        <div className="">
            <div className="flex items-center max-w-screen-3xl m-auto mb-2 justify-between">
                {!isMasterModalForm && (
                    <Link to={`/reports/${formId}`}>
                        <div className="flex flex-row items-center">
                            <ArrowLeftOutlined />
                            <span className="ml-2"> Report</span>
                        </div>
                    </Link>
                )}
                <div
                    className="flex flex-row items-center cursor-pointer hover:text-blue-400"
                    onClick={redirectToFormBuilder}
                >
                    <span className="mr-1">Form </span>
                    <SettingOutlined />
                </div>
            </div>
            <div className="flex flex-col justify-center items-center max-w-screen-3xl m-auto border bg-white">
                <div className="w-full p-2 ">
                    <h1 className="text-2xl text-left m-0">{formName}</h1>
                </div>
                <div className="w-full">
                    <hr />
                </div>
                <div className="w-full p-2">
                    <div>{children}</div>
                </div>
            </div>
        </div>
    );
}
