import { ledgerListService } from "../services/index.js";
import { ledgerListContainer } from "../shared/elements.js";
import { ledgerItemComponent } from "./components/ledgerItemComponent.js";

export async function loadLedgerList() {
    const { success, ledger } = await ledgerListService.getLedgerList();
    const ledgerList = [];

    if (success) {
        ledger.forEach((item) => {
            ledgerList.push(
                ledgerItemComponent(item["Report_ID"], item["Report_Name"])
            );
        });
        ledgerListContainer.innerHTML = ledgerList.join("");
    }
}
