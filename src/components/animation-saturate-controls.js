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
import { iconSaturate } from '../shared/icons';

export const SaturateToolbar = () => {
	return (
		<>
			<ToolbarButton
				icon={ iconSaturate }
				disabled={ true }
				label={ __( 'Saturate', 'tzm-block-scroll-animations' ) }
				isPressed={ true }
			/>
		</>
	);
};

export const SaturateControls = ( { animation, updateAnimation, options } ) => {
	const device = options?.responsive;
	const responsiveAnimation = animation?.responsive?.[ device ];

	return (
		<BaseControl help={ __("Adjust your block's start and end color saturation. Set values below 100% to reduce saturation or values above 100% to intensify the colors.","tzm-block-scroll-animations") }>
			<HStack
				className="animation-controls__row"
				spacing={ 4 }
				justify="stretch"
				alignment="bottom"
			>
				<Icon icon={ iconSaturate } size={ 40 } />
				<RangeControl __next40pxDefaultSize __nextHasNoMarginBottom
					className="range-control__saturate-start"
					label={ __('Start Saturation (%)', 'tzm-block-scroll-animations') }
					initialPosition={ 100 }
					min={ 0 }
					max={ 250 }
					step={ 5 }
					value={	!! device ? responsiveAnimation?.start : animation?.start }
					onChange={ ( newValue ) => updateAnimation({
						start: newValue === 100 ? undefined : newValue,
					}) }
				/>
				<RangeControl __next40pxDefaultSize __nextHasNoMarginBottom
					className="range-control__saturate-end"
					label={ __('End Saturation (%)', 'tzm-block-scroll-animations') }
					initialPosition={ 100 }
					min={ 0 }
					max={ 250 }
					step={ 5 }
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
					onClick={ () =>	updateAnimation({ 
						start: undefined, 
						end: undefined 
					}) }
				/>
			</HStack>
		</BaseControl>
	);
};
