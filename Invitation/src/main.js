import { acceptInvitation } from "./modules/acceptInvitation.js";
import { loadInvitation } from "./modules/loadInvitation.js";
import { acceptInvitationButton } from "./shared/elements.js";
import { invitationVariables } from "./shared/variables.js";
import "./navbar/navbar-script.js";

import { AXIOS_INSTANCE } from "./Global.js";
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
        loadAccountDetails();
        (async () => {
            loadInvitation(invitationVariables.invitationId);
        })();

        acceptInvitationButton.addEventListener("click", async () => {
            await auth.onAuthStateChanged((user) => {
                if (user) {
                    acceptInvitation(invitationVariables.invitationId);
                    loadAccountDetails();
                } else {
                    window.location.href = "/";
                }
            });
        });
    } else {
        window.location.href = "/signin";
    }
});
