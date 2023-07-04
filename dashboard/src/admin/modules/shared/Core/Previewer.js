export default class Previewer {
  constructor(config) {
    this.dropSection = document.querySelector(`${config.dropSection}`);
    this.previewSection = document.querySelector(`${config.previewSection}`);
    this.backToEditButton = document.querySelector(`${config.backToEditButton}`);
    this.previewButton = document.querySelector(`${config.previewButton}`);
    this.blockListSection = document.querySelector(`${config.blockListSection}`);
    this.updateButton = document.querySelector(`${config.updatebutton}`)
    this.blocks = [];
  }
  init() {
    this._attachBackToEditMethodToBackToEditButton();
  }
  view(blocks) {
    this.blocks = blocks;
    this._hideDropSection();
    this._hideBlockListSection();
    this._showPreviewSection();
    this._hidePreviewButton();
    this._showBackToEditButton();
    this._hideUpdateButton();

    
    this._render();
  }
  backToEdit() {
    this._hidePreviewSection();
    this._showDropSection();
    this._showBlockListSection();
    this._hideBackToEditButtion();
    this._showPreviewButtion();
    this._showUpdateButton();
  }

  _render() {}

  _attachBackToEditMethodToBackToEditButton() {
    this.backToEditButton.addEventListener('click', this.backToEdit.bind(this));
  }

  _showDropSection() {
    this.dropSection.style.display = 'block';
  }
  _hideDropSection() {
    this.dropSection.style.display = 'none';
  }

  _showPreviewSection() {
    this.previewSection.style.display = 'flex';
    this.previewSection.style.justifyContent = 'center';
    this.previewSection.style.alignItems = 'center';
  }
  _hidePreviewSection() {
    this.previewSection.style.display = 'none';
  }

  _showPreviewButtion() {
    this.previewButton.style.display = 'block';
  }
  _hidePreviewButton() {
    this.previewButton.style.display = 'none';
  }

  _showBackToEditButton() {
    this.backToEditButton.style.display = 'block';
  }
  _hideBackToEditButtion() {
    this.backToEditButton.style.display = 'none';
  }

  _showBlockListSection() {
    this.blockListSection.style.display = 'block';
  }
  _hideBlockListSection() {
    this.blockListSection.style.display = 'none';
  }
  _hideUpdateButton(){
    this.updateButton.style.display = "none"
  }
  _showUpdateButton(){
    this.updateButton.style.display = "block"
    
  }

  _noBlockPresent(){
    const container = document.createElement('div');
    container.setAttribute("class","noBlockContainer")
    container.style.height="85vh"
    container.style.display="flex"
    container.style.justifyContent="center"
    container.style.alignItems="center"
    container.style.width="inherit"
    container.style.fontSize="25px"
    container.style.marginRight="35px"
    container.style.boxShadow= "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px"

    container.setAttribute("class","text-secondary text-capitalize")
    container.textContent ="Nothing To preview, Please Add Blocks..."

    return container
}
}
