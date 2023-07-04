import { AXIOS_INSTANCE } from "./Global.js";
import { renderPreview } from "./modules/previews/renderPreview.js";
import QueryParser from "./shared/QueryParser.js";

const previewContainer = document.querySelector("#print-preview-container");

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

auth.onAuthStateChanged(async (user) => {
    if (user) {
        AXIOS_INSTANCE.defaults.headers.common["Authorization"] = user.uid;

        document.body.style.display = "block";

        (async () => {
            const defaultParameter = {
                0: [{ key: "id", value: 0 }],
            };
            let parametersList =
                JSON.parse(localStorage.getItem("parameterList")) ||
                defaultParameter;

            for (let [, value] of Object.entries(parametersList)) {
                renderPreview(
                    QueryParser.getValueOf("template_id"),
                    value,
                    previewContainer
                );
            }
        })();
    } else {
        window.location.href = "/signin";
    }
});
