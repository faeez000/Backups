import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useGridForm } from "../../../context/GridFormContext";
import { formAPIService } from "../../../services";
import { setFormNameInLocalStorage } from "../../modules/setFormNameInLocalStorage";
import FormLoadingSpinner from "../../Fields/components/FormLoadingSpinner";
import GridFormWithSection from "./GridFormWithSection";
import GridFormMainSectionWrapper from "./GridFormMainSectionWrapper";

export default function EditRecordGridForm() {
    const [searchParams] = useSearchParams({});
    const [loaded, setLoaded] = useState(false);
    let navigate = useNavigate();

    const recordId = searchParams.get("recordId");
    const { formId, setFormData, setRecordId, formDetails } = useGridForm();

    setRecordId(recordId);

    useEffect(() => {
        async function fetchData() {
            const { success, record } =
                await formAPIService.getGridRecordsByFormIdRecordId(
                    formId,
                    recordId
                );

            if (!success) {
                navigate("/", { replace: true });
                return;
            }

            setFormData(record);
            setLoaded(true);
        }
        fetchData();

        setFormNameInLocalStorage(formDetails.form_name);
        return () => localStorage.removeItem("formNavigationArray");
    }, [formId, setFormData]);

    return loaded ? (
        <GridFormMainSectionWrapper
            formName={formDetails["form_name"]}
            formId={formId}
        >
            <GridFormWithSection formId={formId} recordId={recordId} />
        </GridFormMainSectionWrapper>
    ) : (
        <FormLoadingSpinner />
    );
}
