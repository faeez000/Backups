import { dashboardStore } from "../store/index.js";

export default class DashboardMapper {
    static toDTO(block, dashboard_id) {
        const dto_block = {
            block_id: block.uniqueId,
            dashboard_id,
            block_name: block.name,
            block_index: block.index,
            cards: [],
        };
        block.cards.forEach((card) => {
            const dto_card = {
                card_id: card.uniqueId,
                dashboard_id,
            };
            const dto_card_property = {
                card_name: card.property.name,
                block_id: card.property.blockId,
                card_type: card.property.type,
                card_query: card.property.query,
                card_value: card.property.value,
                card_text: card.property.text,
                html_column_class: card.property.column,
                card_icon: card.property.icon,
                card_icon_color: card.property.iconColor,
                html_col_class: card.property.col,
                card_report_name: card.property.reportName,
                card_chart_name: card.property.chartName,
                card_chart_type: card.property.chartType
            };
            dto_card["card_property"] = dto_card_property;
            dto_block.cards.push(dto_card);
        });

        return dto_block;
    }
    static toDomain(dto_blocks) {
        const blocks = [];
        dto_blocks.forEach((dto_block) => {
            const Block = dashboardStore.getBlockBy(dto_block.block_name).value;
            const cards = [];

            
            dto_block.cards.forEach((card) => {
                
                const Card = dashboardStore.getSectionBy(
                    card.card_property.card_type
                ).value;
                const property = {
                    name: card.card_property.card_name,
                    blockId: card.card_property.block_id,
                    type: card.card_property.card_type,
                    query: card.card_property.card_query,
                    value: card.card_property.card_value,
                    text: card.card_property.card_text,
                    column: card.card_property.html_column_class,
                    icon: card.card_property.card_icon,
                    iconColor: card.card_property.card_icon_color,
                    col: card.card_property.html_col_class,
                    reportName: card.card_property.card_report_name,
                    // chartName: card.card_property.card_chart_name,
                    // chartType: card.card_property.card_chart_type
                };
                const newCard = new Card(property, card.card_id);
                cards.push(newCard);
            });

            const block = new Block(cards, dto_block.block_id);
            block.updateIndex(dto_block.block_index);

            blocks.push(block);
        });
        return blocks;
    }
    static cardToDTO(card, dashboard_id) {
        return {
            card_id: card.uniqueId,
            dashboard_id,
            card_property: {
                block_id: card.property.blockId,
                card_name: card.property.name,
                card_type: card.property.type,
                card_query: card.property.query,
                card_value: card.property.value,
                card_text: card.property.text,
                html_column_class: card.property.column,
                card_icon: card.property.icon,
                card_icon_color: card.property.iconColor,
                html_col_class: card.property.col,
                card_report_name: card.property.reportName,
            },
        };
    }

  
}
