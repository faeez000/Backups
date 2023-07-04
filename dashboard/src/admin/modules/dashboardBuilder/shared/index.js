import CardModal from "./CardModal.js";
import ChartModal from "./ChartModal.js";
import ReportModal from "./ReportModal.js";
import TableLoader from "./TableLoader.js";

const cardModal = new CardModal("dashcard-modal", "#app", "card-title");
const reportModal = new ReportModal("report-modal", "#app", "report-title");
const chartModal = new ChartModal("chart-modal","#app","chart-title")
const tableLoder = new TableLoader();
cardModal.create();
reportModal.create();
chartModal.create();

export { cardModal, reportModal, tableLoder, chartModal };
