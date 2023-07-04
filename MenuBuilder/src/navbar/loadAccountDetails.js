import { userAccountService } from "../services/index.js";
import {
    navbarFetureComponent,
    navigationProfileMenu,
} from "./navbar-script.js";
export async function loadAccountDetails() {
    const currentOrganizationName = document.getElementById(
        "current-organization-name"
    );
    const profileImage = document.getElementById("profileImage");
    const navbarfeturecomponent = document.querySelector(
        ".navbarFeatureComponents"
    );
    const navigationprofilemenu = document.querySelector(
        ".navigationProfileMenu"
    );

    const { success, account } = await userAccountService.getMyAccount();
    if (!success) {
        return;
    }
    currentOrganizationName.innerText = account.currentOrganization;
    profileImage.src = account.profilePic;
    navbarfeturecomponent.innerHTML = navbarFetureComponent(account);
    navigationprofilemenu.innerHTML = navigationProfileMenu(account);
}
