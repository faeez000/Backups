import {
    formService,
    getTotalTypeElementListService,
    profileListService,
} from "../../../services/index.js";
import FieldMap from "./FieldMap.js";
import {
    CheckboxFormField,
    ReadOnlyInputFormField,
    NumberFormField,
    SelectFormField,
    TextareaFormField,
    TextboxFormField,
    ColorPickerFormField,
} from "./Fields.js";
import Prop from "./Prop.js";
import { variables } from "../../../shared/variables.js";

const fieldMap = new FieldMap();

fieldMap.registerField(
    "referenceId",
    new ReadOnlyInputFormField("Reference Id")
);

fieldMap.registerField("name", new TextboxFormField("Name"));
fieldMap.registerField("helpText", new TextareaFormField("Help Text"));
fieldMap.registerField("accept", new TextboxFormField("Accept"));
fieldMap.registerField("prefix", new TextboxFormField("Prefix"));
fieldMap.registerField("suffix", new TextboxFormField("Suffix"));
fieldMap.registerField("Decimal", new CheckboxFormField("Decimal"));
fieldMap.registerField("initialNo", new TextboxFormField("Initial No"));
fieldMap.registerField("defaultValue", new TextboxFormField("Default Value"));

fieldMap.registerField("fileSize", new NumberFormField("File Size"));

fieldMap.registerField("onLoadQuery", new TextareaFormField("On Load Query"));
fieldMap.registerField(
    "onChangeQuery",
    new TextareaFormField("On Change Query")
);
fieldMap.registerField("formula", new TextareaFormField("Formula"));
fieldMap.registerField(
    "mobileFormula",
    new TextareaFormField("Mobile Formula")
);
fieldMap.registerField("primary", new CheckboxFormField("Primary"));
fieldMap.registerField(
    "labelRequired",
    new CheckboxFormField("Label Required")
);
fieldMap.registerField("mandatory", new CheckboxFormField("Mandatory"));
fieldMap.registerField(
    "whatsAppNumber",
    new CheckboxFormField("WhatsApp Number")
);
fieldMap.registerField("enable", new CheckboxFormField("Enable"));

fieldMap.registerField(
    "optionType",
    new SelectFormField("Option Type", [
        new Prop("--Select--", "none"),
        new Prop("Custom", "custom"),
        new Prop("Reference", "reference"),
        new Prop("Conditional", "conditional"),
    ])
);
fieldMap.registerField(
    "autofetch",
    new SelectFormField("Autofetch", [
        new Prop("Yes", true),
        new Prop("No", false),
    ])
);
fieldMap.registerField(
    "autoSuggestion",
    new SelectFormField("Auto Suggestion", [
        new Prop("Yes", true),
        new Prop("No", false),
    ])
);
fieldMap.registerField("titleColor", new ColorPickerFormField("Title Colour"));

fieldMap.registerField(
    "subTitleColor",
    new ColorPickerFormField("Subtitle Colour")
);

fieldMap.registerField(
    "dividerColor",
    new ColorPickerFormField("Divider Colour")
);

fieldMap.registerField(
    "descriptionColor",
    new ColorPickerFormField("Description Colour")
);

fieldMap.registerField("content", new TextareaFormField("Content"));

fieldMap.registerField("textColor", new ColorPickerFormField("Text Color"));

fieldMap.registerField(
    "dataReference",
    new SelectFormField("Data Reference", [
        new Prop("From JSON", "json"),
        new Prop("From Tables", "fromtable"),
    ])
);

fieldMap.registerField(
    "cardDataReference",
    new SelectFormField("Card Data Reference", [
        new Prop("From JSON", "json"),
        new Prop("From Tables", "fromtable"),
    ])
);

fieldMap.registerField(
    "action",
    new SelectFormField("Action", [
        new Prop("Redirect To Form", "form"),
        new Prop("Redirect To URL", "url"),
    ])
);

fieldMap.registerField("imageUrl", new TextboxFormField("Image Url"));

fieldMap.registerField("imageHeight", new NumberFormField("Image Height"));

fieldMap.registerField(
    "imageBorderColor",
    new ColorPickerFormField("Image Border Colour")
);

fieldMap.registerField(
    "imageBorderSize",
    new NumberFormField("Image Border Size")
);

fieldMap.registerField("fillColor", new ColorPickerFormField("Fill Color"));

fieldMap.registerField(
    "toggleEnable",
    new SelectFormField("Enable", [
        new Prop("Yes", true),
        new Prop("No", false),
    ])
);

fieldMap.registerField(
    "avtarDataReference",
    new SelectFormField("Avtar DataReference", [
        new Prop("From JSON", "json"),
        new Prop("From Tables", "fromtable"),
    ])
);

fieldMap.registerField(
    "chipDataReference",
    new SelectFormField("Chip DataReference", [
        new Prop("From JSON", "json"),
        new Prop("From Tables", "fromtable"),
    ])
);

fieldMap.registerField(
    "iconAction",
    new SelectFormField(" Icon Action", [
        new Prop("Redirect To Form", "form"),
        new Prop("Load Fragment", "loadFragment"),
    ])
);

fieldMap.registerField(
    "instanceType",
    new SelectFormField("Instance Type", [
        new Prop("Manual", "manual"),
        new Prop("Automatic", "automatic"),
    ])
);

fieldMap.registerField("title", new TextboxFormField("Title"));

fieldMap.registerField(
    "actionType",
    new SelectFormField("Action Type", [
        new Prop("None", "none"),
        new Prop("Redirect", "redirect"),
    ])
);

fieldMap.registerField(
    "dividerSectionType",
    new SelectFormField("Section Type", [
        new Prop("Master Section", "masterSection"),
        new Prop("Tab Section", "tabSection"),
    ])
);

fieldMap.registerField(
    "dividerSectionSize",
    new SelectFormField("Section Size", [
        new Prop("Column Of 4", "columnOf4"),
        new Prop("Column Of 6", "columnOf6"),
    ])
);

fieldMap.registerField(
    "numberOfColumn",
    new SelectFormField("Number Of Column", [
        new Prop("Column Of 1", "columnOf1"),
        new Prop("Column Of 2", "columnOf2"),
        new Prop("Column Of 3", "columnOf3"),
        new Prop("Column Of 4", "columnOf4"),
    ])
);

fieldMap.registerField(
    "direction",
    new SelectFormField("Direction", [
        new Prop("Horizontal", "horizontal"),
        new Prop("Vertical", "vertical"),
    ])
);

fieldMap.registerField(
    "align",
    new SelectFormField("Align", [
        new Prop("Left", "left"),
        new Prop("Right", "right"),
        new Prop("Centre", "centre"),
    ])
);

(async () => {
    let masterFormProps = [new Prop("None", "none")];

    const { success, forms } = await formService.getSimpleForms();

    for (let form of forms) {
        masterFormProps.push(new Prop(form["form_name"], form["form_id"]));
    }

    fieldMap.registerField(
        "masterForm",
        new SelectFormField("Master Form", masterFormProps)
    );
})();

(async () => {
    let defaultMainPage = [new Prop("None", "none")];

    const { success, forms } = await formService.getSimpleAndMobileForms();

    for (let form of forms) {
        defaultMainPage.push(new Prop(form["form_name"], form["form_id"]));
    }

    fieldMap.registerField(
        "defaultMainPage",
        new SelectFormField("Default Main Page", defaultMainPage)
    );
})();

(async () => {
    let autoCalculationProps = [new Prop("None", "none")];

    const { success, elements } =
        await getTotalTypeElementListService.getTotalTypeElementListBy(
            variables.formId
        );

    for (let element of elements) {
        autoCalculationProps.push(
            new Prop(element["eleName"], element["elementId"])
        );
    }

    fieldMap.registerField(
        "autoCalculation",
        new SelectFormField("Auto Calculation", autoCalculationProps)
    );
})();

(async () => {
    let profileProps = [new Prop("None", "none")];

    const { success, profiles } = await profileListService.getProfileList();

    for (let profile of profiles) {
        profileProps.push(
            new Prop(profile["profile_name"], profile["profile_id"])
        );
    }

    fieldMap.registerField(
        "profile",
        new SelectFormField("Profile", profileProps)
    );
})();

(async () => {
    let formDataProps = [new Prop("None", "none")];

    const { success, forms } = await formService.getSimpleForms();

    for (let form of forms) {
        formDataProps.push(new Prop(form["form_name"], form["form_id"]));
    }

    fieldMap.registerField(
        "formData",
        new SelectFormField("Form Data", formDataProps)
    );
})();

export { fieldMap };
