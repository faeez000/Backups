import { loadProfileItems } from "./modules/profile/loadprofileitems.js";
import { loadUserItems } from "./modules/user/loaduseritems.js";
import {
    loadformsNames,
    loadRightItems,
} from "./modules/right/loadRightsItems.js";
import { loadProfilesNames } from "./modules/loadprofilesnames.js";
import { loadRightsNames } from "./modules/loadrightsnames.js";
import { loadFormsWithEmptyRights } from "./modules/loadFormsWithEmptyRights.js";

import "./modules/right/createNewRight.js";

import { AXIOS_INSTANCE } from "./Global.js";
import { loadMobileLandingPage } from "./modules/loadMobileLandingPage.js";
import { loadAccountDetails } from "./navbar/loadAccountDetails.js";
import "./modules/user/component/clearModalField.js";

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

        import("./navbar/navbar-script.js");

        import("./modules/profile/createNewProfile.js");
        import("./modules/profile/deleteProfile.js");
        import("./modules/profile/updateProfile.js");

        import("./modules/user/createnewuser.js");
        import("./modules/user/updateuser.js");
        import("./modules/user/deleteuser.js");

        import("./modules/right/updateRight.js");
        import("./modules/right/updateRightName.js");
        import("./modules/right/deleteRight.js");
        import("./modules/right/searchRightByName.js");
        import("./modules/right/searchFormInEditRight.js");

        import("./modules/profile/SearchProfileByName.js");
        import("./modules/user/searchUserByEmail.js");

        document.body.style.display = "block";

        (async () => {
            await loadAccountDetails();
            await loadProfileItems();
            await loadUserItems();
            await loadRightItems();
            await loadformsNames();
            await loadFormsWithEmptyRights();
            await loadMobileLandingPage();

            await loadProfilesNames();
            await loadRightsNames();
        })();
    } else {
        window.location.href = "/signin";
    }
});
