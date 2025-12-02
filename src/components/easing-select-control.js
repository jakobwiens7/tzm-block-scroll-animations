/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { SVG } from '@wordpress/primitives';
import {
	Icon,
	PanelRow,
	ComboboxControl,
	__experimentalHStack as HStack,
} from '@wordpress/components';

/**
 * Internal Dependencies
 */
import { easingData, easingOptions } from '../shared/easings';
import { iconEasing } from '../shared/icons';

// Easing SVG preview component
const SvgEasing = ( { easing } ) => {
	if ( ! easing || ! easingData[ easing ] ) return null;

	return (
		<SVG
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 220 72"
			preserveAspectRatio="none"
			dangerouslySetInnerHTML={ { __html: easingData[ easing ].content } }
		/>
	);
};

// Easing option item render function
const renderEasingPreview = ( { item } ) => {
	if ( item.disabled ) {
		return <div>{ item.label }</div>;
	}

	return (
		<>
			<SvgEasing easing={ item.value } />
			<span>{ item.label }</span>
		</>
	);
};

// Easing selection component
const EasingSelectControl = ( { animation, updateAnimationEasing } ) => {
	return (
		<ComboboxControl
			__next40pxDefaultSize
			className="combobox-control__easing"
			label={ __( 'Easing', 'tzm-block-scroll-animations' ) }
			help={ __(
				"The timing curve that governs how your block's animation accelerates and decelerates as you scroll.",
				'tzm-block-scroll-animations'
			) }
			__experimentalRenderItem={ renderEasingPreview }
			options={ easingOptions }
			placeholder={
				animation?.easing
					? easingData[ animation?.easing ].name
					: __( 'Linear', 'tzm-block-scroll-animations' )
			}
			onChange={ ( newValue ) => updateAnimationEasing( newValue ) }
			value={ animation?.easing }
		/>
	);
};

export default EasingSelectControl;
