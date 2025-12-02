/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	Icon,
	Button,
	BaseControl,
	ToolbarButton,
	__experimentalHStack as HStack,
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';

/**
 * Internal Dependencies
 */
import { hasAnimationValue } from '../shared/utils';
import { iconMoveX, iconMoveY } from '../shared/icons';


export const MoveToolbar = ( {
    animation, 
    options, 
    updateOptions
} ) => {

    const hasValueY = hasAnimationValue(animation, 'Y');
    const hasValueX = hasAnimationValue(animation, 'X');

	return (
		<>
			<ToolbarButton
				icon={ iconMoveY }
				label={ __( 'Y axis', 'tzm-block-scroll-animations' ) }
				disabled={ hasValueY || !options?.hasX }
				isPressed={ options?.hasY }
				onClick={ () => updateOptions({ ...options, hasY: !options?.hasY }) }
			/>
			<ToolbarButton
				icon={ iconMoveX }
				label={ __( 'X axis', 'tzm-block-scroll-animations' ) }
				disabled={ hasValueX || !options?.hasY }
				isPressed={ options?.hasX }
				onClick={ () => updateOptions({ ...options, hasX: !options?.hasX }) }
			/>
		</>
	);
};

export const MoveControls = ( { animation, updateAnimation, options } ) => {
	const device = options?.responsive;
	const responsiveAnimation = animation?.responsive?.[ device ];

	return (
		<>
			{ options?.hasY && <BaseControl help={ __("Adjust your block's vertical start and end positions. Use negative values to shift upwards and positive values to shift downwards (Note: Percentage values are relative to the Timeline range).", "tzm-block-scroll-animations") }>
				<HStack
					className="animation-controls__row"
					spacing={ 4 }
					justify="stretch"
					alignment="bottom"
				>
					<Icon icon={ iconMoveY } size={ 40 } />
					<UnitControl __next40pxDefaultSize
						className="unit-control__move-starty"
						label={ __( 'Start Y', 'tzm-block-scroll-animations' ) }
						placeholder={ 0 }
						units={ [
							{ value: '%', label: '%' },
							{ value: 'px', label: 'px' },
							{ value: 'vh', label: 'vh' },
						] }
						value={ !! device
							? responsiveAnimation?.startY
							: animation?.startY
						}
						onChange={ ( newValue ) => updateAnimation({
							startY: newValue.match( /\d/ ) // `newValue` may contain only a unit, so we need to check if it actually contains a number
								? newValue
								: undefined,
						}) }
					/>
					<UnitControl
						__next40pxDefaultSize
						className="unit-control__move-endy"
						label={ __( 'End Y', 'tzm-block-scroll-animations' ) }
						placeholder={ 0 }
						units={ [
							{ value: '%', label: '%' },
							{ value: 'px', label: 'px' },
							{ value: 'vh', label: 'vh' },
						] }
						value={	!! device
							? responsiveAnimation?.endY
							: animation?.endY
						}
						onChange={ ( newValue ) => updateAnimation({
							endY: newValue.match( /\d/ )
								? newValue
								: undefined,
						}) }
					/>
					<Button
						__next40pxDefaultSize
						className="button__reset"
						size="small"
						variant="secondary"
						text={ __( 'Reset', 'tzm-block-scroll-animations' ) }
						onClick={ () =>	updateAnimation({
							startY: undefined,
							endY: undefined,
						}) }
					/>
				</HStack>
			</BaseControl> }

			{ options?.hasX && <BaseControl help={ __("Adjust your block's horizontal start and end positions. Use negative values to move to the left and positive values to move to the right (Note: Percentage values are relative to the Timeline range).", "tzm-block-scroll-animations") }>
				<HStack
					className="animation-controls__row"
					spacing={ 4 }
					justify="stretch"
					alignment="bottom"
				>
					<Icon icon={ iconMoveX } size={ 40 } />
					<UnitControl __next40pxDefaultSize
						className="unit-control__move-startx"
						label={ __( 'Start X', 'tzm-block-scroll-animations' ) }
						placeholder={ 0 }
						units={ [
							{ value: '%', label: '%' },
							{ value: 'px', label: 'px' },
							{ value: 'vw', label: 'vw' },
						] }
						value={ !! device
							? responsiveAnimation?.startX
							: animation?.startX
						}
						onChange={ ( newValue ) => updateAnimation({
							startX: newValue.match( /\d/ )
								? newValue
								: undefined,
						}) }
					/>
					<UnitControl __next40pxDefaultSize
						className="unit-control__move-endx"
						label={ __( 'End X', 'tzm-block-scroll-animations' ) }
						placeholder={ 0 }
						units={ [
							{ value: '%', label: '%' },
							{ value: 'px', label: 'px' },
							{ value: 'vw', label: 'vw' },
						] }
						value={ !! device
							? responsiveAnimation?.endX
							: animation?.endX
						}
						onChange={ ( newValue ) => updateAnimation({
							endX: newValue.match( /\d/ )
								? newValue
								: undefined,
						}) }
					/>
					<Button	__next40pxDefaultSize
						className="button__reset"
						size="small"
						variant="secondary"
						text={ __( 'Reset', 'tzm-block-scroll-animations' ) }
						onClick={ () =>	updateAnimation({
							startX: undefined,
							endX: undefined,
						}) }
					/>
				</HStack>
			</BaseControl> }
		</>
	);
};
