import { loadLayoutDropdownOptions } from "./modules/templates/loadLayoutDropdownOptions.js";
import { loadFormDropdownOptions } from "./modules/templates/loadFormDropdownOptions.js";
import { loadTemplates } from "./modules/templates/loadTemplates.js";
import { checkIsAdmin } from "./modules/templates/checkIsAdmin.js";
import "./modules/templates/createNewTemplate.js";
import "./modules/templates/deleteTemplate.js";
import "./modules/templates/updateTemplateName.js";
import "./modules/templates/components/SearchTemplatesByName.js";
import "./navbar/navbar-script.js";
import { AXIOS_INSTANCE } from "./Global.js";
import { userApiService } from "./service/index.js";
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

        (async () => {
            await loadAccountDetails();
            await checkIsAdmin();
            await loadLayoutDropdownOptions();
            await loadFormDropdownOptions();
            await loadTemplates();
        })();

        document.addEventListener("TemplateCreated", async () => {
            await loadTemplates();
        });
        document.addEventListener("TemplateNameUpdated", async () => {
            await loadTemplates();
        });
        document.addEventListener("TemplateDeleted", async () => {
            await loadTemplates();
        });
    } else {
        window.location.href = "/signin";
    }
});
