import Scratchpad from "../../domain/ValueObject/Scratchpad.js";
import VariableList from "../../domain/ValueObject/VariableList.js";
import { editorConfig } from "./editorConfig.js";
import icons from "./icon/index.js";
import TemplateEditor from "./TemplateEditor.js";

const templateEditor = new TemplateEditor(editorConfig, icons);
const variableList = new VariableList([]);
const scratchpad = new Scratchpad("");

export { templateEditor, variableList, scratchpad };
