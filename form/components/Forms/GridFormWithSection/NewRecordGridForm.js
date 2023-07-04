import { useEffect, useState } from "react";
import { useGridForm } from "../../../context/GridFormContext";
import { setFormNameInLocalStorage } from "../../modules/setFormNameInLocalStorage";
import FormLoadingSpinner from "../../Fields/components/FormLoadingSpinner";
import GridFormWithSection from "./GridFormWithSection";
import GridFormMainSectionWrapper from "./GridFormMainSectionWrapper";

export default function NewRecordGridForm() {
    const { formId, setFormData, setRecordId, formDetails } = useGridForm();
    const [loaded, setLoaded] = useState(false);

    const record = { mainElements: {}, bottomElements: [{}] };

    useEffect(() => {
        setRecordId(null);
        setFormData(record);
        setFormNameInLocalStorage(formDetails.form_name);
        setLoaded(true);
        return () => localStorage.removeItem("formNavigationArray");
    }, []);

    return loaded ? (
        <GridFormMainSectionWrapper
            formName={formDetails["form_name"]}
            formId={formId}
            formType={formDetails["form_type"]}
        >
            <GridFormWithSection formId={formId} />
        </GridFormMainSectionWrapper>
    ) : (
        <FormLoadingSpinner />
    );
}
