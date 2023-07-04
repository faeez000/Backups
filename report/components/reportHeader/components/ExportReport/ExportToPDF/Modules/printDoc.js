import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import getDocDefinition from "./docDefination";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

function printDoc(printParams, gridApi, columnApi) {
    console.log("Exporting to PDF...");
    const docDefinition = getDocDefinition(printParams, gridApi, columnApi);
    pdfMake.createPdf(docDefinition).open();
}

export default printDoc;
