// import { tableLoder } from "../../admin/modules/dashboardBuilder/shared/index.js";
import UserDashboardPreviewer from "./UserDashboardPreviewer.js";
import { AXIOS_INSTANCE } from "../../utils/Global.js";
import HeaderSearcher from "../../shared/HeaderSearcher.js";
import "../../navbar/navbar-script.js";
import { dashboardService } from "../../service/index.js";
import { loadAccountDetails } from "../../navbar/loadAccountDetails.js";
import { checkIsAdmin } from "../../admin/modules/checkIsAdmin/checkIsAdmin.js";
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

        await loadAccountDetails();
        await checkIsAdmin();

        const userDashboardPreviewer = new UserDashboardPreviewer(
            {
                previewContainer: "#app",
            },
            dashboardService,
            "#dashboard-preview-loader"
        );

        const headerSearcher = new HeaderSearcher(
            "dashboardNameId",
            "dashboardName"
        );
        headerSearcher._setHeaderName();

        userDashboardPreviewer.init();
        // .then(() => {
        //     tableLoder.load();
        // });
    }
});
