import DashboardBuilder from "./DashboardBuilder.js";
import { dashboardConfig, previewerConfig } from "./dashboardConfig.js";
import { dashboardStore } from "./store/index.js";
import { dashboardService } from "../../../service/index.js";
import { cardModal } from "./shared/index.js";
import DashboardPreviewer from "./DashboardPreviewer.js";
import { AXIOS_INSTANCE } from "../../../utils/Global.js";
import DashboardBlock from "./domain/DashboardBlock.js";
import "../../../navbar/navbar-script.js";
import { loadAccountDetails } from "../../../navbar/loadAccountDetails.js";
import HeaderSearcher from "../../../shared/HeaderSearcher.js";
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

        const dashboardBlock = new DashboardBlock();
        await loadAccountDetails();
        await checkIsAdmin();

        const dashboardPreviewer = new DashboardPreviewer(previewerConfig);

        const dashboardBuilder = new DashboardBuilder(
            dashboardConfig,
            dashboardStore,
            dashboardService,
            cardModal,
            dashboardPreviewer
        );

        dashboardBlock._attachDeleteMethodOnDeleteBtn();
        dashboardBuilder.load();
    } else {
        window.location.href = "/signin";
    }

    const headerSearcher = new HeaderSearcher(
        "dashboard-builder-name",
        "dashboard_name",
        { builder: true }
    );
    headerSearcher._setHeaderName();
});
