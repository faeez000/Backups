import Store from "../../shared/Core/Store.js";
import ReportsBlock from "../domain/block/ReportsBlock.js";
import WidgetsBlock from "../domain/block/DashboardWidget.js";
import ChartsBlock from "../domain/block/ChartsBlock.js";
import ReportAndChartBlock from "../domain/block/ReportAndChartBlock.js"
import Report from "../domain/cards/Report.js";
import Widget from "../domain/cards/Widget.js";
import ChartCard from "../domain/cards/Chart.js";
const dashboardStore = new Store();

dashboardStore.register([
    { name: "Widgets Block", value: WidgetsBlock },
    { name: "Reports Block", value: ReportsBlock },
    { name: "Charts Block", value: ChartsBlock },
    { name: "Report & Chart Block ", value: ReportAndChartBlock },
    
]);

dashboardStore.registerSection([
    { name: "Widget", value: Widget },
    { name: "Report", value: Report },
    { name: "Chart", value: ChartCard }
]);

export { dashboardStore };
