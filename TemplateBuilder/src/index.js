import { templateEditor } from "./modules/editor/index.js";
import { templateBuilderService } from "./modules/editor/service/index.js";
import TemplateBuilder from "./modules/editor/TemplateBuilder.js";

const header = ".template-name";
const templateBuilder = new TemplateBuilder(
    templateEditor,
    templateBuilderService,
    header
);

export { templateBuilder };
