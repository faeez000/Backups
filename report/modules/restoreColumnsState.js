const restoreColumnsState = async (params) => {
    // let columnsState = await fetchColumnsState();
    // if(Array.isArray(columnsState)){
    //     params.columnApi.applyColumnState({
    //         state: columnsState,
    //         applyOrder: true,
    //     });
    // }

    let myColumnState = localStorage.getItem("myColumnState");

    if (!myColumnState) {
        return;
    }
    params.columnApi.applyColumnState({
        state: JSON.parse(myColumnState),
        applyOrder: true,
    });
    console.log("column state restored");
};

export { restoreColumnsState };
