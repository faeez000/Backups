import { Upload, message as popUpMessage, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React from "react";
import FieldWrapper from "./components/FieldWrapper";
import { fileUploadService } from "../../../../shared/infra/service";
import Field from "./Field";

export default class UploadField extends Field {
    constructor(props) {
        super(props, { value: "" });
        this.state = { ...this.state };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.setValue(this.props.value);
    }

    handleValue(value) {
        return !!value ? value : "";
    }

    beforeUpload() {
        return false;
    }

    async handleChange(info) {
        if (info.file.status === "removed") {
            return;
        }
        if (info.file.status !== "uploading") {
            console.log("fileUploading uploading");
            await this.handleUpload(info.file);
        }
    }

    handleUpload = async (file) => {
        const formData = new FormData();

        formData.append(file.name, file);
        const { success, urls, message } =
            await fileUploadService.uploadSingleFile(formData);
        if (success) {
            popUpMessage.success(`${file.name} file uploaded successfully`);
            this.props.handleChange(this.props.fieldId, urls);
        } else popUpMessage.error(`uploading failed ${message}`);
    };

    randomUidGenerator() {
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0)
                .toString(16)
                .substring(1);
        };
        return S4() + S4() + "-" + S4() + "-" + S4();
    }

    replaceAllPercentSymbol(fileNameFromUrl) {
        const searchRegExp = /%/g;
        const replaceWith = " ";
        const result = fileNameFromUrl.replace(searchRegExp, replaceWith);
        return result;
    }

    getFileNameFromUrl(url) {
        const splitedUrl = url.split("/");
        const fileNameFromUrl = splitedUrl[splitedUrl.length - 1];
        const validFileName = this.replaceAllPercentSymbol(fileNameFromUrl);
        return validFileName;
    }

    handleValueOfProps = (value) => {
        /** check how ant design set default value
         * https://ant.design/components/upload/
         * */
        if (!!value) {
            return [
                {
                    uid: this.randomUidGenerator(),
                    name: this.getFileNameFromUrl(value),
                    status: "done",
                    url: value,
                },
            ];
        } else return [];
    };
    render() {
        return (
            <>
                <FieldWrapper>
                    <label
                        className="text-sm color-[#000000d9] mb-1"
                        htmlFor={this.props.fieldProps.id}
                    >
                        {this.props.fieldProps.name}
                    </label>
                    <Upload
                        name={"file"}
                        beforeUpload={this.beforeUpload}
                        onChange={this.handleChange}
                        maxCount={1}
                        style={{ width: "260px" }}
                        defaultFileList={this.handleValueOfProps(
                            this.props.value
                        )}
                    >
                        <Button
                            style={{
                                display: "flex",
                                alignItems: "center",
                                width: "100%",
                            }}
                            icon={<UploadOutlined />}
                        >
                            Click to Upload
                        </Button>
                    </Upload>
                </FieldWrapper>
            </>
        );
    }
}
