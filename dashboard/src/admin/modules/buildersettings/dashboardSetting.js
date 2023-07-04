import BuilderSetting from "./domain/BuilderSetting.js";
import { dashboardSettingService } from "../../../service/index.js";
import EditModal from "./shared/EditModal.js";
import { AXIOS_INSTANCE } from "../../../utils/Global.js";
import "./shared/SearchDashboard.js";
import DeleteModal from "./shared/DeleteModal.js";
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

        document.body.style.display = "block";
        await loadAccountDetails();
        await checkIsAdmin();
        const dashboardSettingConfig = {
            container: ".dashboard-list-container",
            createNewBtn: "#create-dashboard-btn",
            nameInput: "form-element",
            editNameInput: "#dashboard-name-input",
            updateBtn: "#update-dashboard-btn",
            createNewModalId: "#create-new-dashboard-modal",
            editModalId: "#edit-dashboard-modal",
            builderPage: "dashboardBuilder.html",
            searchbar  :"#dashboard-search"
        };
        const editModalConfig = {
            id: "#edit-dashboard-modal",
            nameInput: "#dashboard-name-input",
            updateBtn: "#update-dashboard-btn",
        };
        const deleteModalConfig = {
            id: "#delete-dashboard-modal",
            deleteBtn: "#delete-dashboard-btn",
        };

        const settingName = "dashboard";

        const editModal = new EditModal(editModalConfig, settingName);
        const deleteModal = new DeleteModal(deleteModalConfig, settingName);

        const dashboardBuilderSetting = new BuilderSetting(
            dashboardSettingConfig,
            settingName,
            dashboardSettingService,
            editModal,
            deleteModal
        );

        dashboardBuilderSetting.init();
    } else {
        window.location.href = "/signin";
    }
});
