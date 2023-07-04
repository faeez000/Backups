import { reportsIcon } from "./module/component/svg/reportsIcon.js";
import { ledgerReportIcon } from "./module/component/svg/ledgerReportIcon.js";
import { menuBuilderIcon } from "./module/component/svg/menuBuilderIcon.js";
import { smsServiceIcon } from "./module/component/svg/smsServiceIcon.js";
import { emailServiceIcon } from "./module/component/svg/emailServiceIcon.js";
import { templateBuilderIcon } from "./module/component/svg/templateBuilderIcon.js";
import { designerIcon } from "./module/component/svg/designerIcon.js";
import { formsIcon } from "./module/component/svg/formsIcon.js";
import { dashboardBuilderIcon } from "./module/component/svg/dashboardBuilderIcon.js";
import { dashboardReportIcon } from "./module/component/svg/dashboardReportIcon.js";

export function navbarFetureComponent(account) {
    return account["isAdmin"] == true
        ? `<ul class="list-unstyled grid-container">
        <li>
            <a class="dropdown-item grid-item" href="/reports">
                <div class=" d-flex flex-column justify-content-center align-items-center">
                    <div
                        id="nav-reports"
                        class="  text-center"
                        style="cursor: pointer; width:1.75rem"
                    >${reportsIcon()}</div>
                    <h1
                        class="text-center  pt-1"
                        style="font-size: 11px; line-height: 17px; color: black; font-weight:400;"
                    >
                        Form <br /> Reports
                    </h1>
                </div>
            </a>
        </li>
        <li>
            <a class="dropdown-item grid-item" href="/ledger-reports">
                <div class=" d-flex flex-column justify-content-center align-items-center">
                    <div
                        id="nav-ledgerReports"
                        class="  text-center"
                        style="cursor: pointer; width:1.75rem"
                    >${ledgerReportIcon()}</div>
                    <h1
                        class="text-center pt-1"
                        style="font-size: 11px; line-height: 17px; color: black; font-weight:400;"
                    >
                        Ledger <br /> Reports
                    </h1>
                </div>
            </a>
        </li>
        <li>
            <a class="dropdown-item grid-item" href="/dashboard-report-list">
                <div class="d-flex flex-column justify-content-center align-items-center">
                    <div
                        id="nav-dashboardReport"
                        class="text-center"
                        style="
                                cursor: pointer;
                                width: 1.75rem;
                            "
                    >${dashboardReportIcon()}</div>
                    <h1
                        class="text-center pt-1"
                        style="
                                font-size: 11px;
                                line-height: 17px;
                                color: black;
                                font-weight: 400;
                            "
                    >
                        Dashboard <br />
                        Reports
                    </h1>
                </div>
            </a>
        </li>
        <li>
            <a class="dropdown-item grid-item" href="/menu-builder">
                <div class=" d-flex flex-column justify-content-center align-items-center">
                    <div
                        id="nav-menuBuilder"
                        class="  text-center"
                        style="cursor: pointer; width:1.75rem"
                    >${menuBuilderIcon()}</div>
                    <h1
                        class="text-center  pt-1"
                        style="font-size: 11px; line-height: 17px; color: black; font-weight:400;"
                    >
                        Menu <br /> Builder
                    </h1>
                </div>
            </a>
        </li>
        <li>
            <a class="dropdown-item grid-item" href="/ledger">
                <div class=" d-flex flex-column justify-content-center align-items-center">
                    <div
                        id="nav-ledgerBuilder"
                        class="  text-center"
                        style="cursor: pointer; width:1.75rem"
                    >${formsIcon()}</div>
                    <h1
                        class="text-center  pt-1"
                        style="font-size: 11px; line-height: 17px; color: black; font-weight:400;"
                    >
                        Ledger <br /> Builder
                    </h1>
                </div>
            </a>
        </li>
        <li>
            <a class="dropdown-item grid-item" href="/sms">
                <div class=" d-flex flex-column justify-content-center align-items-center">
                    <div
                        id="nav-smsService"
                        class="  text-center"
                        style="cursor: pointer; width:1.75rem"
                    >${smsServiceIcon()}</div>
                    <h1
                        class="text-center  pt-1"
                        style="font-size: 11px; line-height: 17px; color: black;  color: black; font-weight:400;"
                    >
                        SMS <br /> Service
                    </h1>
                </div>
            </a>
        </li>
        <li>
            <a class="dropdown-item grid-item" href="/email">
                <div class=" d-flex flex-column justify-content-center align-items-center">
                    <div
                        id="nav-emailService"
                        class="  text-center"
                        style="cursor: pointer; width:1.75rem"
                    >${emailServiceIcon()}</div>
                    <h1
                        class="text-center pt-1 "
                        style="font-size: 11px; line-height: 17px; color: black; font-weight:400;"
                    >
                        Email <br /> Service
                    </h1>
                </div>
            </a>
        </li>
        <li>
            <a class="dropdown-item grid-item" href="/templates">
                <div class=" d-flex flex-column justify-content-center align-items-center">
                    <div
                        id="nav-templateBuilder"
                        class="  text-center"
                        style="cursor: pointer; width:1.75rem"
                    >${templateBuilderIcon()}</div>
                    <h1
                        class="text-center  pt-1"
                        style="font-size: 11px; line-height: 17px; color: black; font-weight:400;"
                    >
                        Template <br /> Builder
                    </h1>
                </div>
            </a>
        </li>
        <li>
            <a class="dropdown-item grid-item" href="/designer">
                <div class=" d-flex flex-column justify-content-center align-items-center">
                    <div
                        id="nav-designer"
                        class="  text-center"
                        style="cursor: pointer; width:1.75rem"
                    >${designerIcon()}</div>
                    <h1
                        class="text-center  pt-1"
                        style="font-size: 11px; line-height: 17px; color: black; font-weight:400;"
                    >
                        Designer
                    </h1>
                </div>
            </a>
        </li>
        <li>
            <a class="dropdown-item grid-item" href="/dashboard-builder-list">
                <div class="d-flex flex-column justify-content-center align-items-center">
                    <div
                        id="nav-dashboardBuilder"
                        class="text-center"
                        style="
                                cursor: pointer;
                                width: 1.75rem;
                            "
                    >${dashboardBuilderIcon()}</div>
                    <h1
                        class="text-center pt-1"
                        style="
                                font-size: 11px;
                                line-height: 17px;
                                color: black;
                                font-weight: 400;
                            "
                    >
                        Dashboard <br />
                        Builder
                    </h1>
                </div>
            </a>
        </li>
        <li>
            <a class="dropdown-item grid-item" href="/forms">
                <div class=" d-flex flex-column justify-content-center align-items-center">
                    <div
                        id="nav-formBuilder"
                        class="  text-center"
                        style="cursor: pointer; width:1.75rem"
                    >${formsIcon()}</div>
                    <h1
                        class="text-center  pt-1"
                        style="font-size: 11px; line-height: 17px; color: black; font-weight:400;"
                    >
                        Form <br /> Builder
                    </h1>
                </div>
            </a>
        </li>
    </ul>`
        : `<ul class="list-unstyled grid-container">
        <li>
            <a class="dropdown-item grid-item" href="/reports">
                <div class=" d-flex flex-column justify-content-center align-items-center">
                    <div
                        id="nav-reports"
                        class="  text-center"
                        style="cursor: pointer; width:1.75rem"
                    >${reportsIcon()}</div>
                    <h1
                        class="text-center  pt-1"
                        style="font-size: 11px; line-height: 17px; color: black; font-weight:400;"
                    >
                        Form <br /> Reports
                    </h1>
                </div>
            </a>
        </li>
        <li>
            <a class="dropdown-item grid-item" href="/ledger-reports">
                <div class=" d-flex flex-column justify-content-center align-items-center">
                    <div
                        id="nav-ledgerReports"
                        class="  text-center"
                        style="cursor: pointer; width:1.75rem"
                    >${ledgerReportIcon()}</div>
                    <h1
                        class="text-center pt-1"
                        style="font-size: 11px; line-height: 17px; color: black; font-weight:400;"
                    >
                        Ledger <br /> Reports
                    </h1>
                </div>
            </a>
        </li>
        <li>
            <a class="dropdown-item grid-item" href="/dashboard-report-list">
                <div class="d-flex flex-column justify-content-center align-items-center">
                    <div
                        id="nav-dashboardReport"
                        class="text-center"
                        style="
                                cursor: pointer;
                                width: 1.75rem;
                            "
                    >${dashboardReportIcon()}</div>
                    <h1
                        class="text-center pt-1"
                        style="
                                font-size: 11px;
                                line-height: 17px;
                                color: black;
                                font-weight: 400;
                            "
                    >
                        Dashboard <br />
                        Reports
                    </h1>
                </div>
            </a>
        </li>
    </ul>`;
}

export function navigationProfileMenu(account) {
    return account["isAdmin"] == true
        ? `<li class="dropdown-item" id="emailId" style="font-weight: 700; color:rgba(0, 0, 0, 0.88);" href="/profile">${account.email}
    </li>
    <li><a class="dropdown-item" href="/profile">Profile</a></li>
    <li><a class="dropdown-item" href="/organizations">Organization</a></li>
    
    <li><a class="dropdown-item" href="/settings/organization/roles-and-profiles">Roles And
            Profile</a></li>
    <li><a class="dropdown-item" href="/setting">Setting</a></li>`
        : `<li class="dropdown-item" id="emailId" style="font-weight: 600; color:rgba(0, 0, 0, 0.88);" href="/profile">${account.email}
        </li>
    <li><a class="dropdown-item" href="/profile">Profile</a></li>
    <li><a class="dropdown-item" href="/organizations">Organization</a></li>
  `;
}
{/* <li><a class="dropdown-item" href="/pricing">Plans And Billing</a></li> */}