import React, { useCallback } from "react";
import { SearchIcon } from "../../../../../../shared/components/Icons";
import { useAgGridContext } from "../../../../context/AgGridContext";

export default function SearchInput() {
    let context = useAgGridContext();

    const onQuickFilterChanged = useCallback(() => {
        context.gridApi.setQuickFilter(
            document.getElementById("quickFilter").value
        );
    }, [context]);

    return (
        <>
            <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center p-2 pointer-events-none bg-slate-200">
                    <SearchIcon className="h-5 w-5" />
                </div>

                <input
                    className="p-2.5 pl-10 w-48 text-gray-900 bg-gray-50 border focus:ring-blue-500 focus:border-blue-100 "
                    type="text"
                    onInput={onQuickFilterChanged}
                    id="quickFilter"
                    placeholder="Quick search..."
                />
            </div>
        </>
    );
}
