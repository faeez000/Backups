import { randomUidGenerator } from "./randomId";

class GridMainSectionHelper {
    getMainFormDataFromElements(elementsData, setTotalRequiredElements) {
        const mainFormData = {};
        const data = {};

        elementsData.forEach((element) => {
            const value = !!data[element.property.name]
                ? data[element.property.name]
                : null;

            mainFormData[element.id] = {
                elementId: element.id,
                elementName: element.property.name,
                elementType: element.name,
                value,
            };
            setTotalRequiredElements(element);
        });
        return mainFormData;
        // input -> [{id: "13431335",name: "TextBox", prop:{name:customer}}]
        // output ->  {13431335: {elementName: "text", value:"someValue"}}
    }

    getColumnsFromElementsData(data) {
        return Object.values(data).map((element) => element["elementName"]);
        // input ->  {13431335: {elementName: "text", value:"someValue"}}
        // output -> [name, values, Gender];
    }
    getColumnsFromRecordData(data) {
        return Object.keys(data[0][0]);
        // input -> [{name: "customer name",values: "null", Gender:"male"}]
        // output -> [name,values,Gender]
    }

    getRowObjFromElements(data) {
        let rowDataObj = {};
        Object.values(data).forEach((element) => {
            rowDataObj[element.elementName] = element.value;
        });
        return rowDataObj;
        // input ->  {13431335: {elementName: "name", value:"jhoneDoe"}}
        // output -> { name: "jhoneDoe" }
    }

    getRecordDataMapAndRowsData(data) {
        let recordMap = new Map();
        let rowsData = [];
        data[0].forEach((record) => {
            let id = randomUidGenerator();
            recordMap.set(id, record);
            rowsData.push({ ...record, key: id });
        });
        return { recordMap, rowsData };
        // input -> [{name:"some", age:"23"}]
        // output -> object{ recordMap:{key:value}, rowsData: [{name:"some", key:3242}]}
    }

    getUpdatedMainFormData(elementsData, updatedRow) {
        const mainFormData = {};
        Object.keys(elementsData).forEach(function (key) {
            const value = !!updatedRow[elementsData[key].elementName]
                ? updatedRow[elementsData[key].elementName]
                : null;

            mainFormData[key] = { ...elementsData[key], value: value };
        });

        return mainFormData;
        // input -> {13431335: {elementName: "text", value:null}}, {name:text, address:"some"}
        // output ->  {13431335: {elementName: "text", value:"someValue"}}
    }

    getFieldsWithNullValue = (fields) => {
        let mainFormData = {};
        Object.keys(fields).forEach(function (key) {
            mainFormData[key] = {
                ...fields[key],
                value: null,
            };
        });
        return mainFormData;
        // input -> {13431335: {elementName: "text", value: "somevalue"}}
        //  output ->  {13431335: {elementName: "text", value: null}}
    };
}

const gridMainSectionHelper = new GridMainSectionHelper();

export { gridMainSectionHelper };
