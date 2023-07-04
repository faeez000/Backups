import React, { useState } from "react";

import { Input, Button, Select, Upload, message } from "antd";
import { Country, State, City } from "country-state-city";
import { fileUploadService } from "../../../shared/infra/service";
import { UploadOutlined } from "@ant-design/icons";
import CompanyInfoModel from "../domain/CompanyInfoModel";

function AddCompanyInfo({ submitFormFunction }) {
    const { TextArea } = Input;
    const [countries, setCountries] = useState(Country.getAllCountries());
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState();
    const [selectedState, setSelectedState] = useState();
    const [selectedCity, setSelectedCity] = useState();
    const [imageUpload, setImageUpload] = useState([
        {
            uid: "",
            // name: comapnyDetails.Logo,
            status: "",
            url: "",
        },
    ]);
    const [bankIFSC, setBankIFSC] = useState();
    const [bankName, setBankName] = useState();
    const [bankAccNo, setBankAccNo] = useState();
    const [GSTIn, setGSTIn] = useState();
    const [termsAndCondition, setTermsAndCondition] = useState();
    const [email, setEmail] = useState();
    const [contactNo, setContactNo] = useState();
    const [companyName, setCompanyName] = useState();
    const [companyAddress, setComapnyAddres] = useState();
    const [countryCode, setCountryCode] = useState();
    const [stateCode, setStateCode] = useState();
    const handleCountryChange = (value, e) => {
        setStates(State.getStatesOfCountry(e.countrycode));
        setCountryCode(e.countrycode);
        setSelectedCountry(value);
    };

    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

    const handleStateChange = (value, e) => {
        setCities(City.getCitiesOfState(e.countrycode, e.statecode));
        setStateCode(e.statecode);
        setSelectedState(value);
    };

    const handleCityChange = (value) => {
        setSelectedCity(value);
    };
    const handleBankAccNo = (e) => {
        setBankAccNo(e.target.value);
    };
    const handleCompanyName = (e) => {
        setCompanyName(e.target.value);
    };
    const handleEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleCompanyAddress = (e) => {
        setComapnyAddres(e.target.value);
    };
    const handleContactNo = (e) => {
        setContactNo(e.target.value);
    };
    const handleBankIFSC = (e) => {
        setBankIFSC(e.target.value);
    };
    const handleBankName = (e) => {
        setBankName(e.target.value);
    };
    const handleGSTIN = (e) => {
        setGSTIn(e.target.value);
    };
    const handleTermsAndCondition = (e) => {
        setTermsAndCondition(e.target.value);
    };
    const handleImageChange = async (file) => {
        const formData = new FormData();
        formData.append(file.file.name, file.file);

        const { success, urls } = await fileUploadService.uploadSingleFile(
            formData
        );
        if (success) {
            if (!allowedExtensions.exec(urls)) {
                message.error("Invalid file type");
                return;
            }
            setImageUpload([
                {
                    uid: "-1",
                    // name: file.file.name,
                    status: "done",
                    url: urls,
                },
            ]);
        }
        message.error("Invalid file type");
        return;
    };
    const beforeUpload = () => {
        return false;
    };

    const handleSubmit = () => {
        const companyInfoModel = new CompanyInfoModel(
            companyName,
            companyAddress,
            contactNo,
            imageUpload[0].url,
            email,
            selectedCountry,
            selectedState,
            selectedCity,
            bankName,
            bankAccNo,
            bankIFSC,
            termsAndCondition,
            GSTIn,
            countryCode,
            stateCode
        );
        submitFormFunction(companyInfoModel);
    };

    const styleShadow = {
        boxShadow: "rgba(149, 157, 165, 0.1) 0px 8px 20px",
    };
    const { Option } = Select;
    return (
        <div className="flex justify-center h-full p-6 items-center">
            <div
                className="w-[56rem] text-xs font-medium text-gray-500 max-w-full p-10 bg-white border overflow-auto "
                style={styleShadow}
            >
                <div className="text-center md:text-left text-[#515151] text-2xl md:text-3xl pb-4 mb-3 font-semibold  ">
                    Company Information
                </div>

                <div className="mb-5">
                    <label>Company Name :</label>
                    <Input
                        value={companyName}
                        onChange={handleCompanyName}
                        className="mt-2"
                    />
                </div>
                <div className="mb-5">
                    <label>Company Address :</label>
                    <TextArea
                        value={companyAddress}
                        onChange={handleCompanyAddress}
                        className="mt-2"
                    />
                </div>
                <div className="mb-5">
                    <label>Contact No :</label>
                    <Input
                        type="tel"
                        maxLength={13}
                        value={contactNo}
                        onChange={handleContactNo}
                        className="mt-2"
                    />
                </div>
                <div className="mb-5">
                    <label className="pr-3">Logo :</label>

                    <Upload
                        showUploadList={{
                            showRemoveIcon: false,
                            showPreviewIcon: true,
                        }}
                        beforeUpload={beforeUpload}
                        onChange={handleImageChange}
                        fileList={imageUpload}
                        listType="picture"
                        maxCount={1}
                        className="upload-list-inline-logo"
                    >
                        <Button style={{}} icon={<UploadOutlined />}>
                            Click to Upload
                        </Button>
                    </Upload>

                    {/* <input type="file" className=" bg-white max-w-[20rem]" /> */}
                </div>
                <div className="mb-5">
                    <label>Email :</label>
                    <Input
                        type="email"
                        value={email}
                        onChange={handleEmail}
                        className="mt-2"
                    />
                </div>
                <div className="mb-5 flex flex-wrap justify-between  md:space-y-0 space-x-0">
                    <div className="flex flex-col ">
                        <label>Country :</label>
                        <Select
                            // defaultValue={selectedCountry}
                            className="mt-2"
                            onChange={handleCountryChange}
                            style={{ width: 220 }}
                            showSearch
                            filterOption={(input, option) =>
                                option.children
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                        >
                            {countries.map((country, index) => {
                                return (
                                    <Option
                                        key={index}
                                        countrycode={country.isoCode}
                                        value={country.name}
                                    >
                                        {country.name}
                                    </Option>
                                );
                            })}
                        </Select>
                    </div>
                    <div className="flex flex-col">
                        <label className="">State :</label>
                        <Select
                            // defaultValue={selectedState}
                            className="mt-2"
                            onChange={handleStateChange}
                            style={{ width: 220 }}
                            showSearch
                            filterOption={(input, option) =>
                                option.children
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                        >
                            {states.map((state, index) => {
                                return (
                                    <Option
                                        key={index}
                                        countrycode={state.countryCode}
                                        statecode={state.isoCode}
                                        value={state.name}
                                    >
                                        {state.name}
                                    </Option>
                                );
                            })}
                        </Select>
                    </div>
                    <div className="flex flex-col">
                        <label className="">City :</label>
                        <Select
                            // defaultValue={selectedCity}
                            className="mt-2"
                            onChange={handleCityChange}
                            style={{ width: 220 }}
                            showSearch
                            filterOption={(input, option) =>
                                option.children
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                        >
                            {cities.map((city, index) => {
                                return (
                                    <Option key={index} value={city.name}>
                                        {city.name}
                                    </Option>
                                );
                            })}
                        </Select>
                    </div>
                </div>

                <div className="mb-5">
                    <label>Bank Name :</label>
                    <Input
                        value={bankName}
                        onChange={handleBankName}
                        className="mt-2"
                    />
                </div>
                <div className="mb-5">
                    <label>Bank AcNo :</label>
                    <Input
                        value={bankAccNo}
                        onChange={handleBankAccNo}
                        className="mt-2"
                    />
                </div>
                <div className="mb-5">
                    <label>Bank IFSC :</label>
                    <Input
                        value={bankIFSC}
                        onChange={handleBankIFSC}
                        className="mt-2"
                    />
                </div>
                <div className="mb-5">
                    <label>Terms And Conditions :</label>
                    <TextArea
                        onChange={handleTermsAndCondition}
                        className="mt-2"
                        value={termsAndCondition}
                    />
                </div>
                <div className="mb-5">
                    <label>GSTIN :</label>
                    <Input
                        value={GSTIn}
                        onChange={handleGSTIN}
                        className="mt-2"
                    />
                </div>
                <Button
                    onClick={handleSubmit}
                    style={{
                        backgroundColor: "#7E56DA",
                        color: "#fafafa",
                        borderRadius: "5px",
                        width: "6rem",
                        fontWeight: "bold",
                    }}
                >
                    Submit
                </Button>
            </div>
        </div>
    );
}

export default AddCompanyInfo;
