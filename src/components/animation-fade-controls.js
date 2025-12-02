/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	Icon,
	Button,
	BaseControl,
	ToolbarButton,
	RangeControl,
	__experimentalHStack as HStack,
} from '@wordpress/components';

/**
 * Internal Dependencies
 */
import { iconFade } from '../shared/icons';


export const FadeToolbar = () => {
	return (
		<ToolbarButton
			icon={ iconFade }
			disabled={ true }
			label={ __( 'Fade', 'tzm-block-scroll-animations' ) }
			isPressed={ true }
		/>
	);
};


export const FadeControls = ({ 
	animation, 
	updateAnimation, 
	options
}) => {

	const device = options?.responsive;
	const responsiveAnimation = animation?.responsive?.[ device ];

	return (
		<BaseControl help={ __("Adjust your block's start and end opacity. Set values below 100% to introduce transparency or 100% for full opacity.", "tzm-block-scroll-animations") }>
			<HStack
				className="animation-controls__row"
				spacing={ 4 }
				justify="stretch"
				alignment="bottom"
			>
				<Icon icon={ iconFade } size={ 40 } />
				<RangeControl __next40pxDefaultSize	__nextHasNoMarginBottom
					className="range-control__fade-start"
					label={ __(
						'Start Opacity (%)',
						'tzm-block-scroll-animations'
					) }
					initialPosition={ 100 }
					min={ 0 }
					max={ 100 }
					value={ !! device ? responsiveAnimation?.start : animation?.start }
					onChange={ ( newValue ) => updateAnimation({
						start: newValue === 100 ? undefined : newValue,
					}) }
				/>
				<RangeControl __next40pxDefaultSize __nextHasNoMarginBottom
					className="range-control__fade-end"
					label={ __(
						'End Opacity (%)',
						'tzm-block-scroll-animations'
					) }
					initialPosition={ 100 }
					min={ 0 }
					max={ 100 }
					value={ !! device ? responsiveAnimation?.end : animation?.end }
					onChange={ ( newValue ) => updateAnimation({
						end: newValue === 100 ? undefined : newValue,
					}) }
				/>
				<Button	__next40pxDefaultSize
					className="button__reset"
					size="small"
					variant="secondary"
					text={ __( 'Reset', 'tzm-block-scroll-animations' ) }
					onClick={ () => updateAnimation({ 
						start: undefined, 
						end: undefined 
					}) }
				/>
			</HStack>
		</BaseControl>
	);
};
