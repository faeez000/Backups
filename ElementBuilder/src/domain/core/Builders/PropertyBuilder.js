import { nanoid } from "../../../utils/nanoid.js";
import Element from "../Entity/Element.js";

/**
 * @description
 * PropertyBuilder is a builder class it takes and Element and set properties.
 * @link Checkout https://refactoring.guru/design-patterns/builder to understand what,why,how builder pattern
 *
 */
export default class PropertyBuilder {
    /**
     * @param {Element} element
     */
    constructor(element) {
        /**
         * @private
         */
        this.element = element;
    }

    /**
     *
     * @param {boolean} value
     */
    setLabelRequired(value) {
        this.element.property["labelRequired"] = value;
    }
    /**
     *
     * @param {string} value
     */
    setName(value) {
        this.element.property["name"] = `${value} ${nanoid(3)}`;
    }
    /**
     *
     * @param {string} value
     */
    setOptionType(value) {
        this.element.property["optionType"] = value;
    }

    /**
     *
     * @param {boolean} value
     */
    setPrimary(value) {
        this.element.property["primary"] = value;
    }
    /**
     *
     * @param {boolean} value
     */
    setAutoFetch(value) {
        this.element.property["autofetch"] = value;
    }
    /**
     * @param {string} value
     */
    setFormula(value) {
        this.element.property["formula"] = value;
    }

    /**
     * @param {string} value
     */
    setMobileFormula(value) {
        this.element.property["mobileFormula"] = value;
    }

    /**
     *
     * @param {string} value
     */
    setOnLoadQuery(value) {
        this.element.property["onLoadQuery"] = value;
    }
    /**
     *
     * @param {string} value
     */
    setOnChangeQuery(value) {
        this.element.property["onChangeQuery"] = value;
    }
    /**
     * @param {number} value
     */
    setFileSize(value) {
        this.element.property["fileSize"] = value;
    }
    /**
     * @param {string} value
     */
    setAccept(value) {
        this.element.property["accept"] = value;
    }
    /**
     * @param {string} value
     */
    setPrefix(value) {
        this.element.property["prefix"] = value;
    }
    /**
     * @param {string} value
     */
    setSuffix(value) {
        this.element.property["suffix"] = value;
    }
    /**
     * @param {string} value
     */
    setInitialNo(value) {
        this.element.property["initialNo"] = value;
    }
    /**
     * @param {string} value
     */
    setMasterForm(value) {
        this.element.property["masterForm"] = value;
    }
    /**
     * @param {boolean} value
     */
    setMandatory(value) {
        this.element.property["mandatory"] = value;
    }
    /**
     * @param {boolean} value
     */
    setDecimal(value) {
        this.element.property["Decimal"] = value;
    }
    /**
     *
     * @param {boolean} value
     */
    setAutoSuggestion(value) {
        this.element.property["autoSuggestion"] = value;
    }
    /**
     *
     * @param {boolean} value
     */
    setIsDataColumn(value = false) {
        this.element.property["isDataColumn"] = value;
    }
    /**
     *
     * @param {string} value
     */
    setHelpText(value) {
        this.element.property["helpText"] = value;
    }

    // New Added Properties

    /**
     *
     * @param {string} value
     */
    setTitleColor(value) {
        this.element.property["titleColor"] = value;
    }

    /**
     *
     * @param {string} value
     */
    setSubtitleColor(value) {
        this.element.property["subTitleColor"] = value;
    }

    /**
     *
     * @param {string} value
     */
    setDividerColor(value) {
        this.element.property["dividerColor"] = value;
    }

    /**
     *
     * @param {boolean} value
     */
    setDataReference(value) {
        this.element.property["dataReference"] = value;
    }

    /**
     *
     * @param {boolean} value
     */
    setCardDataReference(value) {
        this.element.property["cardDataReference"] = value;
    }

    /**
     *
     * @param {string} value
     */
    setDescriptionColor(value) {
        this.element.property["descriptionColor"] = value;
    }

    /**
     *
     * @param {string} value
     */
    setTextData(value) {
        this.element.property["content"] = value;
    }

    /**
     *
     * @param {string} value
     */
    setTextColor(value) {
        this.element.property["textColor"] = value;
    }

    /**
     *
     * @param {boolean} value
     */
    setAction(value) {
        this.element.property["action"] = value;
    }

    /**
     *
     * @param {string} value
     */
    setImageUrl(value) {
        this.element.property["imageUrl"] = value;
    }

    /**
     *
     * @param {number} value
     */
    setImageHeight(value) {
        this.element.property["imageHeight"] = value;
    }

    /**
     *
     * @param {string} value
     */
    setImageBorderColor(value) {
        this.element.property["imageBorderColor"] = value;
    }

    /**
     *
     * @param {number} value
     */
    setImageBorderSize(value) {
        this.element.property["imageBorderSize"] = value;
    }

    /**
     *
     * @param {string} value
     */
    setFillColor(value) {
        this.element.property["fillColor"] = value;
    }

    /**
     *
     * @param {boolean} value
     */
    setToggleEnable(value) {
        this.element.property["toggleEnable"] = value;
    }

    /**
     *
     * @param {boolean} value
     */
    setAvtarDataReference(value) {
        this.element.property["avtarDataReference"] = value;
    }

    /**
     *
     * @param {boolean} value
     */
    setHorizontalChipDataReference(value) {
        this.element.property["chipDataReference"] = value;
    }

    /**
     *
     * @param {boolean} value
     */
    setWhatsApp(value) {
        this.element.property["whatsAppNumber"] = value;
    }

    setTitle(value) {
        this.element.property["title"] = value;
    }

    /**
     *
     * @param {boolean} value
     */
    setDefaultMainPage(value) {
        this.element.property["defaultMainPage"] = value;
    }

    /**
     *
     * @param {boolean} value
     */
    setIconAction(value) {
        this.element.property["iconAction"] = value;
    }

    /**
     *
     * @param {string} value
     */
    setActionType(value) {
        this.element.property["actionType"] = value;
    }
    /**
     *
     * @param {string} value
     */
    setInstanceType(value) {
        this.element.property["instanceType"] = value;
    }

    /**
     *
     * @param {string} value
     */
    setAutoCalculation(value) {
        this.element.property["autoCalculation"] = value;
    }

    /**
     *
     * @param {string} value
     */
    setProfile(value) {
        this.element.property["profile"] = value;
    }

    /**
     *
     * @param {string} value
     */
    setSectionType(value) {
        this.element.property["dividerSectionType"] = value;
    }

    /**
     *
     * @param {string} value
     */
    setSectionSize(value) {
        this.element.property["dividerSectionSize"] = value;
    }

    /**
     *
     * @param {string} value
     */
    setFormData(value) {
        this.element.property["formData"] = value;
    }

    /**
     *
     * @param {string} value
     */
    setNumberOfColumn(value) {
        this.element.property["numberOfColumn"] = value;
    }

    /**
     *
     * @param {string} value
     */
    setDirection(value) {
        this.element.property["direction"] = value;
    }

    /**
     *
     * @param {string} value
     */
    setAlign(value) {
        this.element.property["align"] = value;
    }
}
