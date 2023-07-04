import { invitationService } from "../services/index.js";
import { acceptInvitationButton } from "../shared/elements.js";
import {
    startButtonLoader,
    stopButtonLoader,
} from "../shared/utils/ui/loader.js";

export async function acceptInvitation(id) {
    // if id is null set default id as 0
    id = !!id ? id : 0;

    startButtonLoader(acceptInvitationButton);

    const { success, message } = await invitationService.acceptInvitation(id);

    stopButtonLoader(acceptInvitationButton, "Accept Invitation");
    if (!success) {
        // @ts-ignore
        new SnackBar({
            message,
            status: "error",
            dismissible: true,
            timeout: 5000,
        });
        return;
    }
    new SnackBar({
        message,
        status: "success",
        dismissible: true,
        timeout: 5000,
    });

    window.location.reload();
}
