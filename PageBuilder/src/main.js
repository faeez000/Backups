import { loadFormItems } from "./modules/form/loadFormItems.js";
import { loadCategory } from "./modules/category/loadCategory.js";
import { loadCategoryItem } from "./modules/category/loadCategoryItems.js";
import { checkIsAdmin } from "./modules/checkIsAdmin/checkIsAdmin.js";
import { AXIOS_INSTANCE } from "./Global.js";

import "./modules/form/createNewForm.js";
import "./modules/form/cloneForm.js";
import "./modules/form/exportForm.js";
import "./modules/form/importForm.js";
import "./modules/category/createNewCategory.js";
import "./modules/form/deleteForm.js";
import "./modules/category/deleteCategory.js";
import "./modules/category/updateCatetory.js";
import "./modules/form/updateForm.js";
import "./modules/form/FormQuery/FormActionAndQueryList.js";
import "./modules/form/FormQuery/saveFieldUpdate.js";

import "./modules/form/FormQuery/UpdateFieldUpdate.js";
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
    window.location = "/signin";
});

auth.onAuthStateChanged(async (user) => {
    if (user) {
        AXIOS_INSTANCE.defaults.headers.common["Authorization"] = user.uid;

        document.body.style.display = "block";

        (async () => {
            await loadAccountDetails();
            await checkIsAdmin();
            await loadCategory();
            await loadFormItems();
            await loadCategoryItem();
        })();
    } else {
        window.location.href = "/signin";
    }
});

import "./modules/form/searchForm.js";
import "./modules/category/searchCategory.js";
import "./modules/category/filterByCategory.js";
import "./navbar/navbar-script.js";
