import PreviewList from "./previewList.js";
import { dashboardSettingService } from "../../../service/index.js";
import { AXIOS_INSTANCE } from "../../../utils/Global.js";
import "../buildersettings/shared/SearchDashboard.js";
import "../../../navbar/navbar-script.js";
import { loadAccountDetails } from "../../../navbar/loadAccountDetails.js";
import { checkIsAdmin } from "../checkIsAdmin/checkIsAdmin.js";

var config = {
    apiKey: "AIzaSyDleysoc_2w1EJQqFPRHUskebDD6h3FYbQ",
    authDomain: "cleverlywork.firebaseapp.com",
    databaseURL: "https://cleverlywork-default-rtdb.firebaseio.com",
    projectId: "cleverlywork",
};
firebase.initializeApp(config);

const auth = firebase.auth();

const signOutButton = document.getElementById("signOut");

signOutButton.addEventListener("click", async () => {
    firebase.auth().signOut();
});

auth.onAuthStateChanged(async (user) => {
    if (user) {
        AXIOS_INSTANCE.defaults.headers.common["Authorization"] = user.uid;

        const settingName = "dashboard";
        await loadAccountDetails();
        await checkIsAdmin();

        const previewList = new PreviewList(
            {
                listContainer: "container-preview",
                searchbar: "#dashboard-search",
            },
            settingName,
            dashboardSettingService
        );

        previewList.loadinglist();
    } else {
        window.location.href = "/signin";
    }
});
