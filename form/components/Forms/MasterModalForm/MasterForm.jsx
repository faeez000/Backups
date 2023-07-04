import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { SimpleFormProvider } from "../../../context/SimpleFormContext";
import Autofetch from "../../../core/Autofetch";
import FormulaEvaluator from "../../../core/FormulaEvaluator";
import OnLoadQuery from "../../../core/OnLoadQuery";
import { formAPIService } from "../../../services";
import NewRecordForm from "../SimpleForm/NewRecordForm";
import FormLoadingSpinner from "../../Fields/components/FormLoadingSpinner";
import FormNavigation from "./components/FormNavigation";
import NoAccess from "./components/NoAccess";
import OnChangeQuery from "../../../core/OnChangeQuery";
import ButtonActionExecutor from "../../../core/ButtonActionExecutor";
import SetConditionalOptions from "../../../core/SetConditionalOptions";

const formulaEvaluator = new FormulaEvaluator();
const autofetch = new Autofetch();
const onLoadQuery = new OnLoadQuery();
const onChangeQuery = new OnChangeQuery();
const buttonActionExecutor = new ButtonActionExecutor();
const setConditionalOptions = new SetConditionalOptions();

export default function MasterForm({ formId }) {
    const [state, setState] = useState({
        isLoading: true,
        formDetails: {},
        isAccessDeinied: false,
    });
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const { success, formDetails } =
                await formAPIService.getFormDetailByFormId(formId);

            if (!success) {
                setState({ isLoading: false, isAccessDeinied: true });
                return;
            }

            setState({ isLoading: false, formDetails });
        })();
    }, [formId]);

    return state.isLoading ? (
        <FormLoadingSpinner />
    ) : state.isAccessDeinied ? (
        <NoAccess />
    ) : (
        <>
            <div className="flex flex-col w-full">
                <FormNavigation currentFormName={state.formDetails.form_name} />
                <SimpleFormProvider
                    formId={formId}
                    formDetails={state.formDetails}
                    navigate={navigate}
                    autofetch={autofetch}
                    formulaEvaluator={formulaEvaluator}
                    onLoadQuery={onLoadQuery}
                    onChangeQuery={onChangeQuery}
                    buttonActionExecutor={buttonActionExecutor}
                    setConditionalOptions={setConditionalOptions}
                >
                    <NewRecordForm isMasterModalForm={true} />
                </SimpleFormProvider>
            </div>
        </>
    );
}
