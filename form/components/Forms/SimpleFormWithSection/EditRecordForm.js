import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSimpleForm } from "../../../context/SimpleFormContext";
import { formAPIService } from "../../../services";
import SimpleFormWithSection from "./SimpleFormWithSection";
import FormWrapper from "./FormWrapper";
import { setFormNameInLocalStorage } from "../../modules/setFormNameInLocalStorage";

export default function EditRecordForm() {
    const [searchParams] = useSearchParams({});
    const [loaded, setLoaded] = useState(false);
    let navigate = useNavigate();

    const { formId, formDetails, elements, setFormData, setRecordId } =
        useSimpleForm();

    const recordId = searchParams.get("recordId");

    useEffect(() => {
        (async function () {
            const { success, record } =
                await formAPIService.getRecordByFormIdAndRecordId(
                    formId,
                    recordId
                );

            if (!success) {
                navigate("/", { replace: true });

                return;
            }
            setFormData(record);
            setRecordId(recordId);
            setLoaded(true);
        })();
        setFormNameInLocalStorage(formDetails.form_name);
        return () => localStorage.removeItem("formNavigationArray");
    }, []);

    return (
        <>
            {loaded && (
                <FormWrapper
                    formName={formDetails["form_name"]}
                    formId={formId}
                    formType={formDetails["form_type"]}
                >
                    <SimpleFormWithSection
                        formId={formId}
                        elements={elements}
                        recordId={recordId}
                    />
                </FormWrapper>
            )}
        </>
    );
}
