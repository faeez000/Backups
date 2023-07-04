import "./modules/editor/plugins/index.js";
import { templateBuilder } from "./index.js";
import "./shared/Table.js";
import { AXIOS_INSTANCE } from "./Global.js";
import "./navbar/navbar-script.js";
import { loadAccountDetails } from "./navbar/loadAccountDetails.js";
import { checkIsAdmin } from "./modules/templates/checkIsAdmin.js";

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
        await loadAccountDetails();
        await checkIsAdmin();

        templateBuilder.init();
    } else {
        window.location.href = "/signin";
    }
});
