import { useEffect } from "react";
import { useSimpleForm } from "../../../context/SimpleFormContext";
import SimpleForm from "./SimpleForm";
import FormWrapper from "./FormWrapper";
import { setFormNameInLocalStorage } from "../../modules/setFormNameInLocalStorage";

export default function NewRecordForm({
    passFormDataToFormulaEvaluator,
    isMasterModalForm,
}) {
    const { formId, formDetails, elements, setFormData, setRecordId } =
        useSimpleForm();

    const record = {};

    useEffect(() => {
        setRecordId(null);
        setFormData(record);
        setFormNameInLocalStorage(formDetails.form_name, isMasterModalForm);
        return () => {
            localStorage.removeItem("formNavigationArray");
        };
    }, [isMasterModalForm]);

    return isMasterModalForm ? (
        <SimpleForm
            formId={formId}
            elements={elements}
            passFormDataToFormulaEvaluator={passFormDataToFormulaEvaluator}
        />
    ) : (
        <FormWrapper
            formName={formDetails["form_name"]}
            formId={formId}
            isMasterModalForm={isMasterModalForm}
            formType={formDetails["form_type"]}
        >
            <SimpleForm
                formId={formId}
                elements={elements}
                passFormDataToFormulaEvaluator={passFormDataToFormulaEvaluator}
            />
        </FormWrapper>
    );
}
