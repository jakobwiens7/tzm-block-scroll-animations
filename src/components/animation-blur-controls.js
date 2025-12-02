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
import { iconBlur } from '../shared/icons';

export const BlurToolbar = () => {
	return (
		<ToolbarButton
			icon={ iconBlur }
			disabled={ true }
			label={ __( 'Blur', 'tzm-block-scroll-animations' ) }
			isPressed={ true }
		/>
	);
};

export const BlurControls = ({ 
	animation, 
	updateAnimation, 
	options
}) => {

	const device = options?.responsive;
	const responsiveAnimation = animation?.responsive?.[ device ];


	return (
		<BaseControl help={ __("Adjust your block's start and end blur. Increase the value above 0 to add a progressive blur effect. Note: Excessive use of blur can significantly impact performance, especially on slower devices.","tzm-block-scroll-animations") }>
			<HStack
				className="animation-controls__row"
				spacing={ 4 }
				justify="stretch"
				alignment="bottom"
			>
				<Icon icon={ iconBlur } size={ 40 } />
				<RangeControl __next40pxDefaultSize	__nextHasNoMarginBottom
					className="range-control__blur-start"
					label={ __('Start Blur (px)', 'tzm-block-scroll-animations') }
					initialPosition={ 0 }
					min={ 0 }
					max={ 72 }
					value={	!! device ? responsiveAnimation?.start : animation?.start }
					onChange={ ( newValue ) => updateAnimation({
						start: newValue === 0 ? undefined : newValue,
					}) }
				/>
				<RangeControl __next40pxDefaultSize	__nextHasNoMarginBottom
					className="range-control__blur-end"
					label={ __('End Blur (px)',	'tzm-block-scroll-animations') }
					initialPosition={ 0 }
					min={ 0 }
					max={ 72 }
					value={ !! device ? responsiveAnimation?.end : animation?.end }
					onChange={ ( newValue ) => updateAnimation({
						end: newValue === 0 ? undefined : newValue,
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
