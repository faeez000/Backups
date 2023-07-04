import Invitation from "../../Domain/Model/Invitation.js";

/**
 *
 * @param {Invitation} invitation
 */
export function invitationDetailComponent(invitation) {
    return `
    <div class="row p-2 pb-0">
        <div class="w-100 flex-column-center-center">
            <h4 class="m-0 p-0"><b style="color: blue">${invitation.organizationName} </b> <b>Invitation</b></h4>
            <span class="badge rounded-pill d-flex align-items-center mt-2 px-4 py-2 " style="background-color: #ededed; font-size:14px">
                ${invitation.email}
            </span>
        </div>
    </div>
    <div class="row p-2 flex-row-center-center mt-4">
        <div class="w-100 flex-row-center-center">
            <p>Hello, <b>${invitation.accepterName}</b> you are invited to join <b>${invitation.organizationName}</b></p>
        </div>
    </div>
    `;
}
