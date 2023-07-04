import { emailConfigAPISerivce } from "../services";
import { EmailTemplateConfigController } from "./EmailTemplateConfigController";

const emailTemplateConfigController = new EmailTemplateConfigController(
    emailConfigAPISerivce
);

export { emailTemplateConfigController };
