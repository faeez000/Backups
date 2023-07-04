const Heading = ({ reportData }) => {
    return (
        <label
            className=" font-bold pb-2 first-letter:uppercase"
            style={{ fontSize: "2rem" }}
        >
            {reportData.Report_Name}
        </label>
    );
};

export default Heading;
