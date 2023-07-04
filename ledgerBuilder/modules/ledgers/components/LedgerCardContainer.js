import LedgerSingleCard from "./LedgerSingleCard";

function LedgerCardContainer({
    deleteReport,
    reportList,
    updateReport,
    inputText,
}) {
    const remove = (reportId) => {
        deleteReport(reportId);
    };
    const update = (id, reportName) => {
        updateReport(id, reportName);
    };

    return (
        <div className="grid grid-cols-1 p-4 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {reportList
                .filter((report) =>
                    report.Report_Name.trim().toLowerCase().includes(inputText)
                )
                .map((value) => {
                    return (
                        <LedgerSingleCard
                            key={value.Report_ID}
                            report={value}
                            deleteReport={remove}
                            updateReport={update}
                        />
                    );
                })}
        </div>
    );
}

export default LedgerCardContainer;
