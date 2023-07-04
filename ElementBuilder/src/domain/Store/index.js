import Store from "./Store.js";
import Item from "../core/ValueObject/Item.js";

import Email from "../Elements/Email.js";
import Number from "../Elements/Number.js";
import Label from "../Elements/Label.js";
import Button from "../Elements/Button.js";
import Radio from "../Elements/Radio.js";
import Checkbox from "../Elements/Checkbox.js";
import FileUpload from "../Elements/FileUpload.js";
import ImageUpload from "../Elements/ImageUpload.js";
import Dropdown from "../Elements/Dropdown.js";
import DateElement from "../Elements/DateElement.js";
import Time from "../Elements/Time.js";
import TextBox from "../Elements/Textbox.js";
import TextArea from "../Elements/Textarea.js";
import Tel from "../Elements/Tel.js";
import Instance from "../Elements/Instance.js";
import CardList from "../Elements/CardList.js";
import HorizontalCardList from "../Elements/HorizontalCardList.js";
import ImageList from "../Elements/ImageList.js";
import SimpleList from "../Elements/SimpleList.js";
import Text from "../Elements/Text.js";
import Image from "../Elements/Image.js";
import ActionButton from '../Elements/ActionButton.js';
import Toggle from '../Elements/Toggle.js';
import AvtarList from '../Elements/AvtarList.js';
import HorizontalChipList from '../Elements/HorizontalChipList.js';
import ActionIcon from '../Elements/ActionIcon.js';
import NavigationIcon from '../Elements/NavigationIcon.js';
import DefaultMainPage from '../Elements/DefaultMainPage.js';
import Title from '../Elements/Title.js';
import Total from '../Elements/Total.js';
import ChatTitle from '../Elements/ChatTitle.js';
import Users from '../Elements/Users.js';
import ElementDivider from '../Elements/ElementDivider.js';
import BottomDivider from '../Elements/BottomDivider.js';
import GridElement from '../Elements/GridElement.js';
import BottomSectionDivider from '../Elements/BottomSectionDivider.js';


import {
    simpleFormLayout,
    gridEntryFormLayout,
    gridFormLayout,
    mobileFormLayout,
    fragmentLayout,
    simpleWithChatFormLayout,
    multiGridFormLayout,
    simpleWithSectionFormLayout,
    gridWithSectionFormLayout,
} from "../Layouts/index.js";

const elementStore = new Store();
const layoutStore = new Store();
const elementItemsBySectionStore = new Store();



const desktopElements = [
    // @ts-ignore
    new Item("TextBox", "Textbox", TextBox),

    // @ts-ignore
    new Item("TextArea", "Textarea", TextArea),

    // @ts-ignore
    new Item("Email", "Email", Email),

    // @ts-ignore
    new Item("Number", "Number", Number),

    // @ts-ignore
    new Item("Tel", "Tel", Tel),

    // @ts-ignore
    new Item("Dropdown", "Dropdown", Dropdown),

    // @ts-ignore
    new Item("Label", "Label", Label),

    // @ts-ignore
    new Item("Button", "Button", Button),

    // @ts-ignore
    new Item("Radio", "Radio", Radio),

    // @ts-ignore
    new Item("Checkbox", "Checkbox", Checkbox),

    // @ts-ignore
    new Item("FileUpload", "File Upload", FileUpload),

    // @ts-ignore
    new Item("ImageUpload", "Image Upload", ImageUpload),

    // @ts-ignore
    new Item("Time", "Time", Time),

    // @ts-ignore
    new Item("Date", "Date", DateElement),

    // @ts-ignore
    new Item("Instance", "Instance", Instance),   
];

const BottomNewElement = [
     // @ts-ignore
     new Item("Total", "Total", Total),

     // @ts-ignore
     new Item("BottomDivider", "BottomDivider", BottomDivider),

      // @ts-ignore
      new Item("BottomSectionDivider", "BottomSectionDivider", BottomSectionDivider),
]

const MainSectionElement = [
     // @ts-ignore
     new Item("TextBox", "Textbox", TextBox),

     // @ts-ignore
     new Item("TextArea", "Textarea", TextArea),
 
     // @ts-ignore
     new Item("Email", "Email", Email),
 
     // @ts-ignore
     new Item("Number", "Number", Number),
 
     // @ts-ignore
     new Item("Tel", "Tel", Tel),
 
     // @ts-ignore
     new Item("Dropdown", "Dropdown", Dropdown),
 
     // @ts-ignore
     new Item("Label", "Label", Label),
 
 
     // @ts-ignore
     new Item("Radio", "Radio", Radio),
 
     // @ts-ignore
     new Item("Checkbox", "Checkbox", Checkbox),
 
     // @ts-ignore
     new Item("FileUpload", "File Upload", FileUpload),
 
     // @ts-ignore
     new Item("ImageUpload", "Image Upload", ImageUpload),
 
     // @ts-ignore
     new Item("Time", "Time", Time),
 
     // @ts-ignore
     new Item("Date", "Date", DateElement),
 
     
]

const mobileElements=[

    ...desktopElements,
      // @ts-ignore
  new Item("CardList", "CardList", CardList),

  //     // @ts-ignore
  new Item("HorizontalCardList", "Horizontal CardList", HorizontalCardList),
    
  // // @ts-ignore
    new Item("ImageList", "ImageList", ImageList),

  //     // @ts-ignore
  new Item("SimpleList", "SimpleList", SimpleList),

  //   // @ts-ignore
    new Item("Text", "Text", Text),

    
  //   // @ts-ignore
    new Item("Image", "Image", Image),

  //    // @ts-ignore
     new Item("ActionButton", "ActionButton", ActionButton),

  //    // @ts-ignore
     new Item("Toggle", "Toggle", Toggle),

  //    // @ts-ignore
     new Item("AvtarList", "AvtarList", AvtarList),

  //     // @ts-ignore
      new Item("HorizontalChipList", "HorizontalChipList", HorizontalChipList),

]

const fragmentElements = [
    //     // @ts-ignore
    new Item("ActionIcon", "ActionIcon", ActionIcon),

    //     // @ts-ignore
    new Item("NavigationIcon", "NavigationIcon", NavigationIcon),
  
    //     // @ts-ignore
    new Item("DefaultMainPage", "DefaultMainPage", DefaultMainPage),

    //     // @ts-ignore
    new Item("Title", "Title", Title),
];

const simpleWithChatElements = [
     // @ts-ignore
     new Item("ChatTitle", "ChatTitle", ChatTitle),
     
      // @ts-ignore
     new Item("Users", "Users", Users),

]

const sectionElement = [
     // @ts-ignore
     new Item('ElementDivider', 'Element Divider', ElementDivider),
]

const multiGridElement = [
    // @ts-ignore
    new Item('GridElement', 'Grid Element', GridElement),
]

const allElementItems = [
    
    ...mobileElements,
    ...fragmentElements, 
    ...BottomNewElement,
    ...simpleWithChatElements,
    ...MainSectionElement,
    ...sectionElement,
    ...multiGridElement,
  
];

elementItemsBySectionStore.register([
    new Item("Section1", "Section1", [...desktopElements, ...sectionElement]),
    new Item("Chat_Details", "Chat_Details", [...desktopElements,
                                          ...simpleWithChatElements]),
    new Item("Main_Element", "Main_Element", MainSectionElement),
    new Item("Bottom_Element", "Bottom_Element", [...desktopElements, ...BottomNewElement]),
    new Item("Search", "Search", [
        new Item("TextBox", "Textbox", TextBox),

        // @ts-ignore
        new Item("Email", "Email", Email),

        // @ts-ignore
        new Item("Number", "Number", Number),

        // @ts-ignore
        new Item("Tel", "Tel", Tel),

        // @ts-ignore
        new Item("Dropdown", "Dropdown", Dropdown),

        // @ts-ignore
        new Item("Label", "Label", Label),

        // @ts-ignore
        new Item("Button", "Button", Button),

        // @ts-ignore
        new Item("FileUpload", "File Upload", FileUpload),

        // @ts-ignore
        new Item("ImageUpload", "Image Upload", ImageUpload),

        // @ts-ignore
        new Item("Time", "Time", Time),

        // @ts-ignore
        new Item("Date", "Date", DateElement),
    ]),
    new Item("Primary", "Primary", [
        // @ts-ignore
        new Item("Label", "Label", Label),
    ]),
    new Item("Secondary", "Secondary", desktopElements),

    /**
     * @MobileSection
     */
    new Item("Main_Section","Main_Section",mobileElements),

    new Item("Top_App_Bar_Section","Top_App_Bar_Section",[

        //     // @ts-ignore
        new Item("NavigationIcon", "NavigationIcon", NavigationIcon),

        //     // @ts-ignore
        new Item("Title", "Title", Title),

         //     // @ts-ignore
        new Item("ActionIcon", "ActionIcon", ActionIcon),
    ]),
    new Item("Fragment_Section","Fragment_section",[
         //     // @ts-ignore
         new Item("DefaultMainPage", "DefaultMainPage", DefaultMainPage),
    ]),
    new Item("Bottom_Navigation_Section","Bottom_Navigation_Section",[
       
        //     // @ts-ignore
         new Item("ActionIcon", "ActionIcon", ActionIcon),
   ]),

   new Item("Multi_Grid","Multi_Grid", multiGridElement),
]);

layoutStore.register([
    new Item("Simple", "Simple", simpleFormLayout),
    new Item("Design", "Design", simpleFormLayout),
    new Item("Letter", "Letter", simpleFormLayout),
    new Item("Ledger", "Ledger", simpleFormLayout),
    new Item("Text", "Text", simpleFormLayout),
    new Item("QueryReport", "QueryReport", simpleFormLayout),
    new Item("Grid", "Grid", gridFormLayout),
    new Item("GridEntry", "GridEntry", gridEntryFormLayout),
    new Item("Mobile","Mobile", mobileFormLayout),
    new Item('FragmentLayout','FragmentLayout',fragmentLayout),
    new Item('SimpleWithChat','SimpleWithChat',simpleWithChatFormLayout),
    new Item('MultiGrid','MultiGrid', multiGridFormLayout),
    new Item('SimpleWithSection','SimpleWithSection', simpleWithSectionFormLayout),
    new Item('GridWithSection','GridWithSection', gridWithSectionFormLayout),

]);

elementStore.register(allElementItems);

export { elementStore, layoutStore, elementItemsBySectionStore };
