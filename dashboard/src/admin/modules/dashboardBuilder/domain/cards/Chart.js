import Card from "../Card.js";
import { chartModal } from "../../shared/index.js";
import { dashboardQueryService } from "../../../../../service/index.js";
import DashboardQueryModel from "../model/DashboardQueryModel.js";

export default class ChartCard extends Card {
    constructor(property, uniqueId = null) {
        super(property, chartModal, uniqueId);
    }
    
    async toHTML() {
        const queryStructure = new DashboardQueryModel(this.property.query);
        const { success, data } = await dashboardQueryService.fetchTableChart(
            queryStructure
        );

        let xAxis = [];
        let yAxis = [];
        const typeOfChart = this.property.value.toLowerCase();
        const legendValue =
            typeOfChart === "bar" ||
            typeOfChart === "line" ||
            typeOfChart === ""
                ? false
                : true;
        

        
            
        if (success) {
            for (let chartData of data) {
                chartData["x-axis"] ? xAxis.push(chartData["x-axis"]) : null;
                chartData["y-axis"] ? yAxis.push(chartData["y-axis"]) : null;
            }

            

            const container = document.createElement("div");
            container.setAttribute(
                "class",
                `col-lg-4 col-md-${this.property.col} col-sm-12 mb-4   canvas-container `
            );

            const chartHeaderContainer = document.createElement("div");
            const h5 = document.createElement("h5");

            const canvascontainer = document.createElement("div");
            canvascontainer.setAttribute(
                "class",
                `${
                    typeOfChart === "line" || typeOfChart === "bar"
                        ? "col-10"
                        : "col-7"
                }  preview-chart-container`
            );

            chartHeaderContainer.setAttribute("class", "w-100");
            chartHeaderContainer.style.marginTop = "10px ";
            h5.setAttribute("class", "preview-tag");
            h5.textContent = this.property.text;

            chartHeaderContainer.appendChild(h5);
            container.prepend(chartHeaderContainer);

            if (xAxis.length !== 0 || yAxis.length !== 0) {
                const dataSetForChart = {
                    labels: xAxis,
                    datasets: [
                        {
                            label: "My Chart",
                            backgroundColor: [
                                "rgba(255, 99, 132, 0.2)",
                                "rgba(255, 159, 64, 0.2)",
                                "rgba(255, 205, 86, 0.2)",
                                "rgba(75, 192, 192, 0.2)",
                                "rgba(54, 162, 235, 0.2)",
                                "rgba(153, 102, 255, 0.2)",
                                "rgba(201, 203, 207, 0.2)",
                            ],
                            borderColor: [
                                "rgb(255, 99, 132)",
                                "rgb(255, 159, 64)",
                                "rgb(255, 205, 86)",
                                "rgb(75, 192, 192)",
                                "rgb(54, 162, 235)",
                                "rgb(153, 102, 255)",
                                "rgb(201, 203, 207)",
                            ],
                            data: yAxis,
                            borderWidth: 1,
                            hoverOffset: 5,
                        },
                    ],
                };

                const chartConfig = {
                    type: typeOfChart,
                    data: dataSetForChart,
                    options: {
                        plugins: {
                            legend: {
                                display: legendValue,
                                position: `${
                                    typeOfChart === "line" ||
                                    typeOfChart === "bar" ||
                                    typeOfChart === "radar"
                                        ? "top"
                                        : "left"
                                }`,
                            },
                        },
                    },
                };

                const canvas = document.createElement("canvas");

                canvas.setAttribute("height", "200px");

                canvas.setAttribute("id", "chartCanvas");

                canvascontainer.append(canvas);
                container.append(canvascontainer);

                new Chart(canvas, chartConfig);
            } else {
                const errorElement = document.createElement("div");
                errorElement.setAttribute("class", "text-danger");
                errorElement.style.fontWeight = "600";
                errorElement.textContent = "Format Error!";
                canvascontainer.style.height= "7rem"
                canvascontainer.style.display= "flex"
                canvascontainer.style.marginTop= "61px"
                canvascontainer.style.alignItems= "center"
                canvascontainer.append(errorElement);
                container.append(canvascontainer);
            }

            return container;


        } else {
            const container = document.createElement("div");
            container.setAttribute(
                "class",
                `col-lg-4 col-md-${this.property.col} col-sm-12 mb-4   canvas-container `
            );
              

            const canvascontainer = document.createElement("div");
            canvascontainer.setAttribute(
                "class",
                `${
                    typeOfChart === "line" || typeOfChart === "bar"
                        ? "col-10"
                        : "col-7"
                }  preview-chart-container`
            );
            canvascontainer.style.height= "7rem"
            canvascontainer.style.display= "flex"
            canvascontainer.style.alignItems= "center"

            const errorElement = document.createElement("div");
            errorElement.setAttribute("class", "text-danger");
            errorElement.style.fontWeight = "600";
            canvascontainer.style.marginTop="61px";

            errorElement.textContent =
                "Invalid Format!";
            
            const chartHeaderContainer = document.createElement("div");
            const h5 = document.createElement("h5");
            chartHeaderContainer.setAttribute("class", "w-100");
            chartHeaderContainer.style.marginTop = "10px ";
            h5.setAttribute("class", "preview-tag");
            h5.textContent = this.property.text;
    
            chartHeaderContainer.appendChild(h5);
            container.prepend(chartHeaderContainer);
            canvascontainer.append(errorElement)
            container.append(canvascontainer)
            

            return container;
        }
    }

    
}
