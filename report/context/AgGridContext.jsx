import React, { Component, useContext } from "react";

const AgGridContext = React.createContext(undefined);
const useAgGridContext = () => {
    return useContext(AgGridContext);
};

class AgGridProvider extends Component {
    state = {
        columnApi: null,
        gridApi: null,
    };

    setGridApi = (value) => {
        this.setState((prevState) => {
            return {
                ...prevState,
                gridApi: value,
            };
        });
    };

    setColumnApi = (value) => {
        this.setState((prevState) => {
            return {
                ...prevState,
                columnApi: value,
            };
        });
    };

    render() {
        let contextValues = {
            gridApi: this.state.gridApi,
            columnApi: this.state.columnApi,
            setGridApi: this.setGridApi,
            setColumnApi: this.setColumnApi,
        };
        return (
            <AgGridContext.Provider value={contextValues}>
                {this.props.children}
            </AgGridContext.Provider>
        );
    }
}

export { AgGridContext, AgGridProvider, useAgGridContext };
