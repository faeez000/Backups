import { apiHostController } from "../../../shared/core/ApiHostController";
import OTPService from "./OTPService";

const API_DOMAIN_URL = apiHostController.getApiDomain(window.location.hostname);

const otpService = new OTPService(API_DOMAIN_URL);

export { otpService };
