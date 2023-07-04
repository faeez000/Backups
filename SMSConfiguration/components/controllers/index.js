import {
    elementsAPIservice,
    formsAPIService,
    smsTemplateAPIService,
    smsTempVariableAPIservice,
} from "../../services";
import { ElementsController } from "./ElementsController";
import { FormController } from "./FormController";
import { SMSTemplateController } from "./SMSTemplateController";
import { VariableConfigController } from "./VariableConfigController";

const smsTemplateController = new SMSTemplateController(smsTemplateAPIService);
const elementController = new ElementsController(elementsAPIservice);
const formController = new FormController(formsAPIService);
const variableConfigController = new VariableConfigController(
    smsTempVariableAPIservice
);

export {
    formController,
    smsTemplateController,
    variableConfigController,
    elementController,
};
