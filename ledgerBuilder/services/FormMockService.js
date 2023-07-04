import React, { Component } from "react";

export default class FormMockService {
  constructor(baseURL) {
    this.baseURL = baseURL;

    this.tables = [
      {
        formId: "6355480b-da6e-4a16-a38e-076c43c1dfeb",
        form_name: "acb",
      },
      {
        formId: "6059ace0-7194-49f5-963c-56ba309a6afa",
        form_name: "add customer",
      },
      {
        formId: "b78a1760-bdef-464a-a8d7-2dfcd35000b7",
        form_name: "Add Customer To My Shop",
      },
      {
        formId: "c6f39e7c-631e-42b0-b274-75ce9230b52d",
        form_name: "AddSimpleFormula",
      },
      {
        formId: "124",
        form_name: "Application",
      },
      {
        formId: "e0306305-2e1b-4b64-963a-c2f51706556e",
        form_name: "A-simple1",
      },
      {
        formId: "20",
        form_name: "Attendance Process Master",
      },
      {
        formId: "130",
        form_name: "Bag Delivery Challan",
      },
      {
        formId: "12",
        form_name: "Bag Details",
      },
      {
        formId: "114",
        form_name: "Bag Return",
      },
    ];
    this.columns = [
      {
        columnId: "1",
        ColumnName: "FIrst Name",
      },
      {
        columnId: "2",
        ColumnName: "Last Name",
      },
      {
        columnId: "3",
        ColumnName: "Field",
      },
      {
        columnId: "4",
        ColumnName: "Image",
      },
      {
        columnId: "5",
        ColumnName: "Uploader",
      },
    ];
  }
  async getTableList() {
    try {
      // @ts-ignore
      const data = { success: true, data: this.tables };
      if (data.success) {
        return { success: true, tables: data.data };
      }
      return { success: false };
    } catch {
      return {
        success: false,
      };
    }
  }
  async getColumnList() {
    try {
      // @ts-ignore
      const data = { success: true, data: this.columns };
      if (data.success) {
        return { success: true, columns: data.data };
      }
      return { success: false };
    } catch {
      return {
        success: false,
      };
    }
  }
}
