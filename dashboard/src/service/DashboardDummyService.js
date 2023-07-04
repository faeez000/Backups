import Service from "../admin/modules/shared/Core/Service.js";
import DashboardMapper from "../admin/modules/dashboardBuilder/mapper/DashboardMapper.js";

export default class DashboardDummyService extends Service {
  constructor() {
    super();
    this.mapper = DashboardMapper;
  }
  save(data) {
    const existingData = localStorage.getItem('dashboard-blocks');
    if (!!existingData) {
      localStorage.setItem('dashboard-blocks', JSON.stringify([...JSON.parse(existingData), this.mapper.toDTO(data)]));
    } else {
      localStorage.setItem('dashboard-blocks', JSON.stringify([this.mapper.toDTO(data)]));
    }
  }
  findOneAndUpdate(data) {
    const rawBlocks = localStorage.getItem('dashboard-blocks');
    if (!!rawBlocks) {
      let parsedBlocks = JSON.parse(rawBlocks);
      const blockIndex = parsedBlocks.findIndex((parsedBlock) => parsedBlock.block_id === data.uniqueId);
      const parsedBlock = parsedBlocks[blockIndex];
      const cardIndex = parsedBlock.cards.findIndex((card) => data.card.uniqueId === card.card_id);
      parsedBlocks[blockIndex].cards[cardIndex]['card_property'] = DashboardMapper.cardPropertyToDTO(
        data.card.property
      );
      localStorage.setItem('dashboard-blocks', JSON.stringify(parsedBlocks));
    }
  }
  fetch() {
    const rawBlocks = localStorage.getItem('dashboard-blocks');
    if (!!rawBlocks) {
      const parsedBlocks = JSON.parse(rawBlocks);
      parsedBlocks.sort((blockA, blockB) => {
        return blockA.block_index - blockB.block_index;
      });
      return { success: true, blocks: this.mapper.toDomain(parsedBlocks) };
    }
    return { success: false };
  }
  fetchRaw() {
    const rawBlocks = localStorage.getItem('dashboard-blocks');
    if (!!rawBlocks) {
      const parsedBlocks = JSON.parse(rawBlocks);
      parsedBlocks.sort((blockA, blockB) => {
        return blockA.block_index - blockB.block_index;
      });
      return parsedBlocks;
    }
    return null;
  }
  updateOrder(blockList = []) {
    const blocks = localStorage.getItem('dashboard-blocks');
    if (!!blocks) {
      const parsedBlocks = JSON.parse(blocks);
      parsedBlocks.forEach((parsedBlock) => {
        blockList.forEach((block) => {
          if (parsedBlock.block_id === block.block_id) {
            parsedBlock.block_index = block.block_index;
          }
        });
      });
      localStorage.setItem('dashboard-blocks', JSON.stringify(parsedBlocks));
    }
  }
  deleteBlockBy(uniqueId) {
    const blocks = localStorage.getItem('dashboard-blocks');
    if (!!blocks) {
      const parsedBlock = JSON.parse(blocks);
      const index = parsedBlock.findIndex((block) => block.uniqueId === uniqueId);
      parsedBlock.splice(index, 1);
      localStorage.setItem('dashboard-blocks', JSON.stringify(parsedBlock));
      document.dispatchEvent(new Event('block-deleted'));
    }
  }
}
