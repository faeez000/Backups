import { invitationService } from "../services/index.js";
import {
    invitationContainer,
    invitationDetailContainer,
} from "../shared/elements.js";
import { invitationDetailComponent } from "./components/invitationDetailComponent.js";

/**
 *
 * @param {string} id
 */
export async function loadInvitation(id) {
    // if id is null set default id as 0
    id = !!id ? id : "0";

    invitationDetailContainer.innerHTML = "";

    const { success, invitation, message } =
        await invitationService.getInvitationById(id);

    if (!success) {
        invitationContainer.classList.remove("d-none");
        invitationContainer.innerHTML = `<p class="m-0" style="text-align:center;"> 
        <b>${message}</b></p>
        <a href="/features" type="button" class="mt-2" >Go to Features Page</a>`;
        return;
    }

    invitationContainer.classList.remove("d-none");

    invitationDetailContainer.innerHTML = invitationDetailComponent(invitation);
}
