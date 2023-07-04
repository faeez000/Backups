import { loadOrganizatioNamesByUserId } from "./modules/Selection/loadAllOrganizationsByUserId.js";
import { loadOrganizationInfo } from "./modules/OrganizationInfo/loadOrganizationInfo.js";
import { addImageUploader } from "./shared/modules/addImageUploader.js";
import {
    createOrganizationLogoInput,
    organizationlogo,
    createOrganizationFileInputLabel,
    editOrganizationLogoInput,
    editOrganizationLogo,
    editOrganizationFileInputLabel,
} from "./shared/elements.js";

import { AXIOS_INSTANCE } from "./Global.js";

import "./modules/OrganizationInfo/deleteOrganization.js";
import "./modules/OrganizationInfo/createNewOrganization.js";
import "./modules/Selection/components/organizationSwitch.js";

import "./modules/SearchOrganizationByName.js";
import { loadAccountDetails } from "./navbar/loadAccountDetails.js";

var config = {
    apiKey: "AIzaSyDleysoc_2w1EJQqFPRHUskebDD6h3FYbQ",
    authDomain: "cleverlywork.firebaseapp.com",
    databaseURL: "https://cleverlywork-default-rtdb.firebaseio.com",
    projectId: "cleverlywork",
};

// @ts-ignore
firebase.initializeApp(config);

// make auth and firestore references
// @ts-ignore
const auth = firebase.auth();
// @ts-ignore

const signOutButton = document.getElementById("signOut");

signOutButton.addEventListener("click", async () => {
    firebase.auth().signOut();
});

auth.onAuthStateChanged(async (user) => {
    if (user) {
        AXIOS_INSTANCE.defaults.headers.common["Authorization"] = user.uid;

        document.body.style.display = "block";

        import("./navbar/navbar-script.js");
        import("./modules/OrganizationInfo/updateOrganizationInfo.js");

        addImageUploader(
            createOrganizationLogoInput,
            organizationlogo,
            createOrganizationFileInputLabel
        );
        addImageUploader(
            editOrganizationLogoInput,
            editOrganizationLogo,
            editOrganizationFileInputLabel
        );

        (async () => {
            await loadAccountDetails();
            await loadOrganizatioNamesByUserId();
            await loadOrganizationInfo();
        })();
    } else {
        window.location.href = "/signin";
    }
});
