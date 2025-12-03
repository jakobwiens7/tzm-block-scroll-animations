/**
 * External Dependencies
 */
const { assign, merge } = lodash;
import clsx from 'clsx';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';
import { useState } from '@wordpress/element';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';

import {
	PanelRow,
	PanelBody,
	BaseControl,
	ToggleControl,
	Button,
	ToolbarGroup,
	ToolbarButton,
	__experimentalInputControl as InputControl,
	__experimentalUnitControl as UnitControl,
	__experimentalHStack as HStack,
} from '@wordpress/components';

/**
 * Internal Dependencies
 */
import { cleanEmptyObject } from './shared/utils';
import { iconRangePicker, iconEditor } from './shared/icons';
import GuideModal from './components/guide-modal';
import RangePickerModal from './components/range-picker-modal';
import AnimationsEditorModal from './components/animations-editor-modal';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import './style.scss';


/**
 * Checks if the given animations object contains any keys, excluding "easing".
 *
 * @param {Object} animations - The animations object to check.
 * @returns {boolean} True if there are any animation keys other than "easing", false otherwise.
 */
const hasAnyAnimations = ( animations ) =>
	Object.keys( animations || {} ).some( ( key ) => key !== 'easing' );


/**
 * Add custom attribute for block scroll animations.
 *
 * @param {Object} settings Settings for the block.
 *
 * @return {Object} settings Modified settings.
 */
function addBlockScrollageAttribute( settings ) {
	// check if object exists for old Gutenberg version compatibility
	if ( typeof settings.attributes !== 'undefined' ) {
		return assign( {}, settings, {
			attributes: merge( settings.attributes, {
				scrollAnimations: {
					type: 'object',
					default: null,
				},
			} ),
		} );
	}
	return settings;
}


/**
 * Add block scroll animation controls to Block Panel.
 *
 * @param {function} BlockEdit Block edit component.
 *
 * @return {function} BlockEdit Modified block edit component.
 */
const withBlockScrollageControls = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {

		const { attributes, setAttributes, isSelected, /*clientId*/ } = props;
		const { scrollAnimations } = attributes;

		// Allow Preview?
		const [ allowPreview, setAllowPreview ] = useState( false );

		// Guide Modal states
		const [ isGuideVisible, setIsGuideVisible ] = useState( false );

		// Range Picker Modal states
		const [ isRangePickerOpen, setRangePickerOpen ] = useState( false );

		// Animations Editor Modal states
		const [ isAnimationsEditorOpen, setAnimationsEditorOpen ] =
			useState( false );

		const OFFSET_UNITS = [
			{ value: '%', label: '%' },
			{ value: 'px', label: 'px' },
			{ value: 'vh', label: 'vh' },
		];

		// Clean and update 'scrollAnimations' attribute
		function updateAttribute( updatedScrollAnimations = {} ) {
			const cleanScrollAnimations = cleanEmptyObject(
				updatedScrollAnimations
			);
			setAttributes({
				scrollAnimations: { ...cleanScrollAnimations },
			});
		}

		// Re-Initialize Scrollage on `scrollAnimations` changes
		useEffect( () => {
			const iframe = document.querySelector('.editor-visual-editor.is-iframed iframe');
			if ( iframe ) setAllowPreview( true );

			if ( !scrollAnimations?.enabled && !hasAnyAnimations( scrollAnimations?.animations ) ) return;

			const scrollageInstance =
				iframe?.contentWindow?.scrollageInstance ||
				window.scrollageInstance;

			scrollageInstance?.init();
		}, [ scrollAnimations ] );


		return (
			<>
				<BlockEdit { ...props } />

				{ scrollAnimations?.enabled && (<>
					<BlockControls>
						<ToolbarGroup>
							<ToolbarButton
								icon={ iconEditor }
								label={ __('Scroll Animation Editor', 'tzm-block-scroll-animations') }
								isPressed={ isAnimationsEditorOpen }
								onClick={ () =>	setAnimationsEditorOpen( true )	}
							/>
							<ToolbarButton
								icon={ iconRangePicker }
								label={ __('Pick Timeline Range', 'tzm-block-scroll-animations') }
								isPressed={ isRangePickerOpen }
								onClick={ () =>	setRangePickerOpen( true )	}
							/>
						</ToolbarGroup>
					</BlockControls>
				</>) }

				<InspectorControls>
					<PanelBody
						className={ 'block-editor-panel-scrollage' }
						title={ __('Scroll animations', 'tzm-block-scroll-animations') }
						initialOpen={ false }
					>
						<PanelRow>
							<ToggleControl __nextHasNoMarginBottom
								className="toggle-control__enabled"
								checked={ scrollAnimations?.enabled }
								label={ scrollAnimations?.enabled 
									? __('Enabled', 'tzm-block-scroll-animations') 
									: __('Disabled', 'tzm-block-scroll-animations')
								}
								onChange={ ( newValue ) => updateAttribute({
									...scrollAnimations,
									enabled: newValue,
								}) }
							/>
						</PanelRow>
						
						{ scrollAnimations?.enabled && (<>
							<PanelRow>
								<Button __next40pxDefaultSize
									className="button__full-width"
									icon={ iconEditor }
									variant="secondary"
									onClick={ () =>	setAnimationsEditorOpen( true )	}
								>
									{ __('Animation Editor', 'tzm-block-scroll-animations') }
								</Button>
							</PanelRow>

							<PanelRow>
								<ToggleControl __nextHasNoMarginBottom
									className="toggle-control__preview"
									checked={ scrollAnimations?.previewEnabled }
									label={ __('Experimental preview',	'tzm-block-scroll-animations') }
									help={ __( 'Preview might be disabled or inaccurate. Always review your results on the frontend.', 'tzm-block-scroll-animations') 
									}
									onChange={ ( newValue ) => updateAttribute({
										...scrollAnimations,
										previewEnabled: newValue,
									}) }
									disabled={ !allowPreview }

								/>
							</PanelRow>

							<PanelRow>
								<InputControl __next40pxDefaultSize
									className="text-control__range"
									label={ __('Timeline range', 'tzm-block-scroll-animations') }
									help={ __('Custom CSS selector for the scroll-timeline range element controlling the animation. Leave empty to use the entire document.', 'tzm-block-scroll-animations') }
									placeholder={ __('e.g. #my-range', 'tzm-block-scroll-animations') }
									onChange={ ( newValue ) => updateAttribute({
										...scrollAnimations,
										range: newValue,
									}) }
									value={ scrollAnimations?.range || '' }
									suffix={ <Button
										icon={ iconRangePicker }
										variant="secondary"
										onClick={ () =>	setRangePickerOpen( true )	}
										label={ __('Pick Timeline Range', 'tzm-block-scroll-animations') }
										style={{ margin: '3px' }}
									/> }
									
								/>
							</PanelRow>

							<PanelRow>
								<BaseControl __nextHasNoMarginBottom
									className="unit-controls__offsets"
									label={ __('Range offsets',	'tzm-block-scroll-animations') }
									help={ __('Fine-tune your scroll-timeline range by applying offsets to the top and bottom.', 'tzm-block-scroll-animations') }
								>
									<HStack alignment="top">
										<UnitControl __next40pxDefaultSize
											label={ __('Top', 'tzm-block-scroll-animations') }
											units={ OFFSET_UNITS }
											value={	scrollAnimations?.rangeStart }
											onChange={ ( newValue ) => updateAttribute({
												...scrollAnimations,
												rangeStart: newValue.match(	/\d/)
													? newValue
													: undefined,
											}) }
										/>
										<UnitControl __next40pxDefaultSize
											label={ __('Bottom', 'tzm-block-scroll-animations') }
											units={ OFFSET_UNITS }
											value={ scrollAnimations?.rangeEnd }
											onChange={ ( newValue ) => updateAttribute({
												...scrollAnimations,
												rangeEnd: newValue.match( /\d/ )
													? newValue
													: undefined,
											}) }
										/>
									</HStack>
								</BaseControl>
							</PanelRow>
						</>) }

						<PanelRow>
							<Button __next40pxDefaultSize
								className="button__full-width"
								icon="editor-help"
								variant="secondary"
								onClick={ () =>	setIsGuideVisible( true )	}
							>
								{ __('Quick Guide', 'tzm-block-scroll-animations') }
							</Button>
						</PanelRow>

					</PanelBody>
				</InspectorControls>

                { isGuideVisible && <GuideModal
                    onFinish={() => setIsGuideVisible(false)}
                /> }

				{ isRangePickerOpen && <RangePickerModal
					props={ props }
					updateAttribute={ ( attr ) => updateAttribute( attr ) }
					close={ () => setRangePickerOpen( false ) }
				/> }

				{ isAnimationsEditorOpen && <AnimationsEditorModal
					props={ props }
					updateAttribute={ ( attr ) => updateAttribute( attr ) }
					close={ () => setAnimationsEditorOpen( false ) }
				/> }
			</>
		);
	};
}, 'withBlockScrollageControls');

/**
 * Add scrollage props to the block in the editor
 */
const addBlockScrollagePropsEditor = createHigherOrderComponent( ( BlockListBlock ) => {
	return ( props ) => {
		
		const { 
			attributes, 
			className, 
			//isSelected 
		} = props;

		const { scrollAnimations } = attributes;

		const wrapperProps = {
			...props.wrapperProps,

			'data-scrollage-anchor': attributes?.anchor // id's/anchors are not exposed, but we need them for timeline range
				? `#${ attributes?.anchor }`
				: undefined,
		};
		
		if ( scrollAnimations?.enabled && hasAnyAnimations( scrollAnimations?.animations ) ) {

			// Add data attributes for Scrollage
			Object.assign( wrapperProps, {
				'data-timeline-range': scrollAnimations?.range
					? scrollAnimations.range.startsWith( '#' )
						? `[data-scrollage-anchor="${ scrollAnimations.range }"]`
						: scrollAnimations.range
					: undefined,

				'data-timeline-offset':
					scrollAnimations?.rangeStart ||
					scrollAnimations?.rangeEnd
						? `${ scrollAnimations.rangeStart ?? '0' } ${
								scrollAnimations.rangeEnd ?? '0'
							}`
						: undefined,

				...Object.fromEntries(
					['move', 'rotate', 'scale', 'fade', 'saturate', 'blur'].map( ( type ) => [
						`data-animation-${ type }`,
						scrollAnimations?.animations?.[ type ]
							? JSON.stringify(
									scrollAnimations.animations[ type ]
								)
							: undefined,
					] )
				),
			} );
		}
		
		return (
			<BlockListBlock	{ ...props }
				className={ clsx(className, 
					{ "scrollage": scrollAnimations?.previewEnabled }
				) }
				wrapperProps={ wrapperProps }
			/>
		);
	};
}, 'addBlockScrollagePropsEditor');


// Add block Scrollage attribute
addFilter(
	'blocks.registerBlockType',
	'tzm/block-scrollage-attribute',
	addBlockScrollageAttribute
);

// Add block Scrollage controls
addFilter(
	'editor.BlockEdit',
	'tzm/block-scrollage-controls',
	withBlockScrollageControls
);

// Add block Scrollage props (Editor)
addFilter(
	'editor.BlockListBlock',
	'tzm/block-scrollage-props',
	addBlockScrollagePropsEditor
);
