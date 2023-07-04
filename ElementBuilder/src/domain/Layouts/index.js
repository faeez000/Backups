import Section from "../core/ValueObject/Section.js";
import GridEntryFormLayout from "./GridEntryFormLayout.js";
import GridFormLayout from "./GridFormLayout.js";
import SimpleFormLayout from "./SimpleFormLayout.js";
import MobileFormLayout from './MobileFormLayout.js';
import FragmentLayout from './FragmentLayout.js';
import SimpleWithChatFormLayout from './SimpleWithChatFormLayout.js';

const simpleFormLayout = new SimpleFormLayout("SimpleForm", [
    new Section("Section1", "Section1"),
]);
const gridFormLayout = new GridFormLayout("GridForm", [
    new Section("Main_Element", "Main"),
    new Section("Bottom_Element", "Bottom"),
]);
const gridEntryFormLayout = new GridEntryFormLayout("GridEntry", [
    new Section("Search", "Search"),
    new Section("Primary", "Primary", 1),
    new Section("Secondary", "Secondary"),
]);

const mobileFormLayout = new MobileFormLayout("Mobile Form",[
    new Section("Main_Section","Main Section"),
])

const fragmentLayout = new FragmentLayout("Fragment Layout",[
    new Section('Top_App_Bar_Section','Top App Bar Section',4),
    new Section('Fragment_Section','Fragment Section',1),
    new Section('Bottom_Navigation_Section','Bottom Navigation Section',5),
])

const simpleWithChatFormLayout = new SimpleWithChatFormLayout("SimpleWithChatFormLayout", [
    new Section("Chat_Details", "Chat Details"),
]);

const multiGridFormLayout = new GridFormLayout(" Multi Grid Form", [
    new Section("Multi_Grid", "MultiGrid"),
    new Section("Bottom_Element", "Bottom"),
]);

const simpleWithSectionFormLayout = new SimpleFormLayout("Simple With Section Form", [
    new Section("Section1", "Section1"),
]);

const gridWithSectionFormLayout = new GridFormLayout("GridForm", [
    new Section("Main_Element", "Main"),
    new Section("Bottom_Element", "Bottom"),
]);

export { simpleFormLayout,
         gridFormLayout, 
         gridEntryFormLayout, 
         mobileFormLayout, 
         fragmentLayout, 
         simpleWithChatFormLayout,
         multiGridFormLayout,
         simpleWithSectionFormLayout,
         gridWithSectionFormLayout,
         };
