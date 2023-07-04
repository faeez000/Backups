export default class Store {
  constructor() {
    this.blocks = [];
    this.sections = [];
  }
  registerSection(sections) {
    sections.forEach((section) => {
      this.sections.push(section);
    });
  }
  register(blocks) {
    blocks.forEach((block) => {
      this.blocks.push(block);
    });
  }
  getBlocks() {
    return this.blocks;
  }
  getSectionBy(name) {
    var result = this.sections.filter((section) => section.name === name);
    return result ? result[0] : null;
  }
  getBlockBy(name) {
    var result = this.blocks.filter((block) => block.name === name);
 
    return result ? result[0] : null;
  }
}
