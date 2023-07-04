
const dashboardSearch = document.getElementById("dashboard-search"); //input field

dashboardSearch.addEventListener("keyup", (e) => {
    searchDashboardByName(e.target.value);
});


function searchDashboardByName(dashboard) {
    
    const dashboardCards = document.querySelectorAll(".searchDashboard");
    const dashboardLowerCaseName = dashboard.toLowerCase();
    
    dashboardCards.forEach((dashboardcard) => {
            const cardTitle = dashboardcard.getAttribute("data-dashboardName").toLowerCase();

            if (cardTitle.indexOf(dashboardLowerCaseName) > -1) {
                dashboardcard.style.display = "flex";
            } else  {
                dashboardcard.style.display = "none";
            }
        }
        

        );

}

