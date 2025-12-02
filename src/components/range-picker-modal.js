/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { getBlockType } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';
import { chevronDownSmall } from '@wordpress/icons';

import {
	Button,
	Modal,
	Icon,
	Notice,
	__experimentalText as Text,
	__experimentalTreeGrid as TreeGrid,
	__experimentalTreeGridRow as TreeGridRow,
	__experimentalTreeGridCell as TreeGridCell,
	__experimentalHStack as HStack,
	//__experimentalVStack as VStack,
} from '@wordpress/components';

/**
 * Internal Dependencies
 */
import { textWithElements } from '../shared/utils';


// RangePickerModal component
const RangePickerModal = ( { props, updateAttribute, close } ) => {
	const { scrollAnimations } = props.attributes;

	// Collect blockTree data
	const buildBlockTree = ( blocks, parentId = null, level = 1 ) => {
		return blocks.flatMap( ( block, index ) => {
			const blockType = getBlockType( block.name );

			const item = {
				id: block.clientId,
				parentId,
				position: index,
				title:
					block.attributes.metadata?.name ||
					blockType?.title ||
					block.name,
				icon: blockType?.icon.src,
				anchor: block.attributes.anchor || null,
				isParent: !! block.innerBlocks.length,
				level,
			};
			const children = buildBlockTree(
				block.innerBlocks,
				block.clientId,
				level + 1
			);

			return [ item, ...children ];
		} );
	};

	const items = useSelect( ( select ) => {
		const blocks = select( 'core/block-editor' ).getBlocks();
		return buildBlockTree( blocks );
	} );

	const hasAnchors = items.some( ( item ) => item.anchor );

	return (
		<Modal
			size="medium"
			title={ __( 'Timeline Range', 'tzm-block-scroll-animations' ) }
			className="range-picker-modal"
			onRequestClose={ close }
		>
			<TreeGrid className="range-picker__tree-grid">
				<Text isBlock style={ { marginBottom: '12px' } }>
					{ __(
						'Select a block with an HTML anchor assigned to it.',
						'tzm-block-scroll-animations'
					) }
				</Text>

				{ ! hasAnchors && (
					<Notice
						__unstableHTML
						isDismissible={ false }
						status="warning"
						className="range-picker__tree-grid-notice"
					>
						{ textWithElements( 
							__("No blocks with HTML anchors found.<br/>Add unique anchors to your blocks in their `Advanced` settings in the inspector panel to make them selectable.", 'tzm-block-scroll-animations'),
							{ br: <br/> }
						) }
					</Notice>
				) }

				{ !! hasAnchors &&
					items.map( ( item ) => (
						<TreeGridRow
							className="range-picker__tree-grid-row"
							key={ item.id }
							level={ item.level }
							positionInSet={ item.position + 1 }
							setSize={
								items.filter(
									( i ) => i.parentId === item.parentId
								).length
							}
						>
							<TreeGridCell className="range-picker__tree-grid-cell">
								{ ( props ) => (
									<Button
										{ ...props }
										disabled={ ! item.anchor }
										isPressed={
											scrollAnimations?.range ===
											`#${ item.anchor }`
										}
										className="range-picker__tree-grid-cell__item-button"
										onClick={ () => {
											updateAttribute( {
												...scrollAnimations,
												range:
													scrollAnimations?.range ===
													`#${ item.anchor }`
														? undefined
														: `#${ item.anchor }`,
											} );
											close();
										} }
									>
										<HStack
											className="range-picker__tree-grid-cell__item-content"
											justify="flex-start"
											spacing={ 0 }
										>
											<Icon
												className="range-picker__tree-grid-cell__item-expander"
												icon={ chevronDownSmall }
												style={ {
													opacity: item.isParent
														? 1
														: 0,
												} }
											/>
											<Icon
												className="range-picker__tree-grid-cell__item-icon"
												icon={ item.icon }
											/>
											<HStack justify="space-between">
												<span className="range-picker__tree-grid-cell__item-title">
													{ item.title }
												</span>
												{ !! item.anchor && (
													<span className="range-picker__tree-grid-cell__item-anchor">
														{ item.anchor }
													</span>
												) }
											</HStack>
										</HStack>
									</Button>
								) }
							</TreeGridCell>
						</TreeGridRow>
					) ) }
			</TreeGrid>
		</Modal>
	);
};

export default RangePickerModal;
