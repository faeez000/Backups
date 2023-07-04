import React, { useEffect, useState } from "react";
import { Select, Divider, Button, Space } from "antd";
import { useAgGridContext } from "../../../../context/AgGridContext";
import { templateApiService } from "../../../../services";
import { useParams } from "react-router";

const { Option } = Select;

export default function TemlpateButton() {
    const context = useAgGridContext();

    const [items, setItems] = useState([]);
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const [selcetedTemplate, setSelectedTemplate] = useState(null);

    const { formId } = useParams();

    useEffect(() => {
        (async function () {
            const { success, templates } =
                await templateApiService.getTemplatesByFormId(formId);
            if (!success)
                console.log(
                    "error :something went wrong while fetchig templates"
                );
            else {
                setItems(templates);
            }
        })();
    }, []);

    const onPrintClick = () => {
        console.log(selcetedTemplate);
        if (isNodesSelected && selcetedTemplate) {
            let selectedNodes = context.gridApi.getSelectedNodes();
            setParameterListToLocalstorage(selectedNodes);
            window.location.href = `/template/preview?template_id=${selcetedTemplate.id}&type=template`;
            console.log("...Redirecting To Template:", selcetedTemplate);
        }
    };

    const handleChange = (value) => {
        setIsOptionsOpen(true);
        if (!value) return setSelectedTemplate(null);
        setSelectedTemplate({ id: value });
    };

    const selectOptions = items.map((item) => (
        <Option key={item.name} value={item.id}>
            {item.name}
        </Option>
    ));

    function isNodesSelected() {
        return context.gridApi?.getSelectedNodes()?.length > 0;
    }

    function getMapedDataForLocalStorage(nodes) {
        let MapedParamList = {};
        nodes.forEach(
            (node) =>
                (MapedParamList[node.data.id] = [
                    { key: "id", value: node.data.id },
                ])
        );
        return MapedParamList;
    }

    function setParameterListToLocalstorage(nodes) {
        localStorage.removeItem("parameterList");
        const parameterList = getMapedDataForLocalStorage(nodes);
        localStorage.setItem("parameterList", JSON.stringify(parameterList));
    }

    return (
        <Select
            style={{ width: 175 }}
            onClick={() => setIsOptionsOpen(true)}
            onBlur={() => setIsOptionsOpen(false)}
            onMouseDown={(e) => e.preventDefault()}
            onChange={handleChange}
            open={isOptionsOpen}
            placeholder="select template"
            defaultValue={false}
            showSearch={true}
        filterOption={(input, option) =>(option?.children ?? '').toLowerCase().includes(input.toLowerCase())}
            dropdownRender={(menu) => (
                <>
                    <div onClick={(e) => e.stopPropagation()}>
                        {menu}
                        <Divider style={{ margin: "8px 0" }} />
                        <Space align="center" style={{ padding: "0 8px 4px" }}>
                            <Button
                                type="primary"
                                onClick={onPrintClick}
                                style={{ whiteSpace: "nowrap" }}
                                disabled={
                                    !isNodesSelected() || !selcetedTemplate
                                        ? true
                                        : false
                                }
                            >
                                Print
                            </Button>
                        </Space>
                    </div>
                </>
            )}
        >
            {[
                <Option key={Math.random()} value={false} selected>
                    -- Select Template --
                </Option>,
                ...selectOptions,
            ]}
        </Select>
    );
}
