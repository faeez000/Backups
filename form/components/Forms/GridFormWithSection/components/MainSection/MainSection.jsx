import React, { Component } from "react";
import { GridFormContext } from "../../../../../context/GridFormContext";
import { fieldMap } from "../../../../../core/fieldMap";
import { randomUidGenerator } from "../../Helper/randomId";
import { formAPIService } from "../../../../../services";
import FormModal from "./FormModal";
import GridTable from "./GridEntrriesTable/GridTable";
import { gridMainSectionHelper } from "../../Helper/GridMainSectionHelper";
import { checkIsAllMandatoryFieldsFilled } from "../../../../modules/checkIsAllMandatoryFieldsFilled";
import { shallowEqual } from "shallow-equal-object";
import { ResetIcon } from "../../../../../../../shared/components/Icons";
import FormLoadingSpinner from "../../../../Fields/components/FormLoadingSpinner";
import { notification, message } from "antd";
import GridTotalCalculator from "../../../../../core/GridTotalCalculator";

const gridTotalCalculator = new GridTotalCalculator();

export default class MainSection extends Component {
    constructor(props) {
        super();
        this.state = {
            mainFormData: {},
            records: new Map(),
            columnsForTable: null,
            dataForTable: [],
            isEditKey: false,
            isLoading: true,
        };
        this.helper = gridMainSectionHelper;
    }

    async componentDidMount() {
        const mainFormData = this.helper.getMainFormDataFromElements(
            this.context.mainElements,
            gridTotalCalculator.setTotalRequiredElements
        );

        if (this.isEditForm()) {
            await this.fetchRecordAndSetState(mainFormData);
        } else {
            this.setState({
                mainFormData: mainFormData,
                columnsForTable: this.helper.getColumnsFromElementsData(
                    this.context.mainElementsData
                ),
                isLoading: false,
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.records !== this.state.records) {
            gridTotalCalculator.executeGridTotalCalculation(
                this.state.records,
                this.context.bulkUpdateFormData
            );
            this.setDataForTableWithKey();
        }
        if (!this.state.columnsForTable) {
            this.getColumnsAndSetToState();
        }
        if (!shallowEqual(prevState.mainFormData, this.state.mainFormData)) {
            this.context.mainSectionFormulaEvaluator.setupData(
                this.state.mainFormData
            );
            this.context.mainSectionOnChangeQuery.setupData(
                this.state.mainFormData
            );
            this.context.mainSectionSetConditionalOptions.setupData(this.state.mainFormData)
        }
        if (
            prevProps.shouldResetMainEntries !==
            this.props.shouldResetMainEntries
        ) {
            if (this.props.shouldResetMainEntries) {
                this.handleResetTable();
                this.props.setShouldResetMainEntriesFalse();
            }
        }
    }

    openNotificationWithIcon(type, message, description = "") {
        notification[type]({
            message,
            description,
            placement: "topRight",
        });
    }

    isEditForm() {
        if (this.context.recordId) return true;
        return false;
    }

    async fetchRecordAndSetState(mainFormData) {
        const { success, record, message } =
            await formAPIService.getGridRecordsByFormIdRecordId(
                this.context.formId,
                this.context.recordId
            );
        if (!success) console.log(`error --> No Record available ${message}`);

        const { recordMap, rowsData } = this.helper.getRecordDataMapAndRowsData(
            record.mainElements
        );
        this.setState({
            mainFormData: mainFormData,
            records: recordMap,
            dataForTable: rowsData,
            columnsForTable: this.helper.getColumnsFromRecordData(
                record.mainElements
            ),
            isLoading: false,
        });
    }

    getColumnsAndSetToState() {
        this.setState({
            columnsForTable: this.helper.getColumnsFromElementsData(
                this.context.mainElementsData
            ),
        });
    }

    setDataForTableWithKey() {
        let rowsData = [];
        for (const [key, record] of this.state.records) {
            rowsData.push({ ...record, key: key });
        }
        this.context.setMainElementsData(this.state.records);
        this.setState({ dataForTable: rowsData });
    }

    handleEditRow = (key, updatedRow) => {
        this.setState({
            mainFormData: this.helper.getUpdatedMainFormData(
                this.state.mainFormData,
                updatedRow
            ),
            isEditKey: key,
        });
    };

    resetField = () => {
        this.setState({
            mainFormData: this.helper.getFieldsWithNullValue(
                this.state.mainFormData
            ),
        });
    };

    handleEditSubmit = () => {
        let tempRecordMapState = new Map(this.state.records);
        tempRecordMapState.set(
            this.state.isEditKey,
            this.helper.getRowObjFromElements(this.state.mainFormData)
        );
        this.setState({
            records: tempRecordMapState,
            isEditKey: false,
            mainFormData: this.helper.getFieldsWithNullValue(
                this.state.mainFormData
            ),
        });
    };

    handleDeleteRow = (key) => {
        if (this.state.records.has(key)) {
            let tempRecordMapState = new Map(this.state.records);
            tempRecordMapState.delete(key);
            this.setState({ records: tempRecordMapState });
        }
    };

    handleAddRow = () => {
        const isFieldsAreFilled = checkIsAllMandatoryFieldsFilled(
            this.context.mainElements,
            this.state.mainFormData
        );

        if (!isFieldsAreFilled)
            // return this.openNotificationWithIcon(
            //     "error",
            //     "Mandatory fields cannot be empty"
            // );
            return message.error("Mandatory fields cannot be empty");

        let tempRecordMapState = new Map(this.state.records);
        let id = randomUidGenerator();
        tempRecordMapState.set(
            id,
            this.helper.getRowObjFromElements(this.state.mainFormData)
        );
        this.setState({
            records: tempRecordMapState,
            mainFormData: this.helper.getFieldsWithNullValue(
                this.state.mainFormData
            ),
        });
    };

    handleChange = (key, value) => {
        if (this.state.mainFormData.hasOwnProperty(key)) {
            this.setState({
                mainFormData: {
                    ...this.state.mainFormData,
                    [key]: {
                        ...this.state.mainFormData[key],
                        value: !!value ? value : null,
                    },
                },
            });
        }
    };

    handleResetTable = () => {
        this.setState({ dataForTable: [], records: new Map() });
    };

    bulkUpdateFormData = (items = []) => {
        this.setState((prevState) => {
            const mainFormData = {};

            for (const item of items) {
                const key = this.context.getElementId(item.key);

                if (this.state.mainFormData[key]) {
                    mainFormData[key] = {
                        ...prevState.mainFormData[key],
                        value: !!item.value ? item.value : null,
                    };
                }
            }
            return {
                mainFormData: {
                    ...this.state.mainFormData,
                    ...mainFormData,
                },
            };
        });
    };

    render() {
        const {
            mainElements,
            formId,
            autofetch,
            mainSectionFormulaEvaluator,
            getElementId,
            onLoadQuery,
            mainSectionOnChangeQuery,
            buttonActionExecutor,
            mainSectionSetConditionalOptions
        } = this.context;

        const mainFields = [];

        mainElements.forEach((element) => {
            if (fieldMap.has(element.name)) {
                const Field = fieldMap.get(element.name);
                mainFields.push(
                    <Field
                        key={element.id}
                        formId={formId}
                        fieldId={element.id}
                        fieldProps={element.property}
                        handleChange={this.handleChange}
                        value={this.state.mainFormData[element.id]?.value}
                        handleBulkUpdate={this.bulkUpdateFormData}
                        formulas={element.property.formula}
                        getElementId={getElementId}
                        autofetch={autofetch}
                        formulaEvaluator={mainSectionFormulaEvaluator}
                        onLoadQuery={onLoadQuery}
                        onChangeQuery={mainSectionOnChangeQuery}
                        buttonActionExecutor={buttonActionExecutor}
                        setConditionalOptions={mainSectionSetConditionalOptions}
                    />
                );
            }
        });

        return (
            <div className="md:col-span-2 grid self-start mb-3 p-4  border ">
                <div className="bg-white  ">
                    <FormModal
                        mainFields={mainFields}
                        mainFormData={this.state.mainFormData}
                        handleAddRow={this.handleAddRow}
                        handleSumbitButton={
                            this.state.isEditKey
                                ? this.handleEditSubmit
                                : this.handleAddRow
                        }
                        handleModalVisibility={this.handleModalVisibility}
                        resetField={this.resetField}
                    />
                </div>
                <div
                    onClick={this.handleResetTable}
                    title="Reset table"
                    className="justify-end cursor-pointer bg-grey-light hover:bg-grey text-grey-darkest font-semibold mx-4  rounded inline-flex items-center m-2"
                >
                    <span className="hover:text-red-400 flex items-center">
                        <ResetIcon />
                        <span className="px-1 underline">Reset table</span>
                    </span>
                </div>
                {this.state.isLoading ? (
                    <FormLoadingSpinner />
                ) : (
                    <>
                        <GridTable
                            columnsForTable={this.state.columnsForTable}
                            dataForTable={this.state.dataForTable}
                            records={this.state.records}
                            handleDeleteRow={this.handleDeleteRow}
                            handleEditRow={this.handleEditRow}
                        />
                    </>
                )}
            </div>
        );
    }
}

MainSection.contextType = GridFormContext;
