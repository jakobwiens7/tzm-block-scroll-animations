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
	//AnglePickerControl // No negative values allowed
} from '@wordpress/components';

/**
 * Internal Dependencies
 */
import { hasAnimationValue } from '../shared/utils';
import { iconRotateX, iconRotateY, iconRotateZ } from '../shared/icons';


export const RotateToolbar = ({
    animation, 
    options, 
    updateOptions
}) => {

	const hasValueZ = hasAnimationValue(animation, 'Z');
	const hasValueY = hasAnimationValue(animation, 'Y');
	const hasValueX = hasAnimationValue(animation, 'X');

	return (
		<>
			<ToolbarButton
				icon={ iconRotateZ }
				label={ __( 'Z axis', 'tzm-block-scroll-animations' ) }
				disabled={ hasValueZ || (!options?.hasY && !options?.hasX) }
				isPressed={ options?.hasZ }
				onClick={ () =>	updateOptions({ ...options, hasZ: !options?.hasZ }) }
			/>
			<ToolbarButton
				icon={ iconRotateY }
				label={ __( 'Y axis', 'tzm-block-scroll-animations' ) }
				disabled={ hasValueY || (!options?.hasZ && !options?.hasX) }
				isPressed={	options?.hasY }
				onClick={ () => updateOptions({ ...options, hasY: !options?.hasY }) }
			/>
			<ToolbarButton
				icon={ iconRotateX }
				label={ __( 'X axis', 'tzm-block-scroll-animations' ) }
				disabled={ hasValueX || (!options?.hasZ && ! options?.hasY) }
                isPressed={	options?.hasX }
				onClick={ () =>	updateOptions({ ...options, hasX: !options?.hasX }) }
			/>
		</>
	);
};

export const RotateControls = ( { animation, updateAnimation, options } ) => {
	const device = options?.responsive;
	const responsiveAnimation = animation?.responsive?.[ device ];

	return (
		<>
			{ options?.hasZ && <BaseControl help={ __("Adjust your block's start and end rotation on the Z axis. Use negative values to rotate counterclockwise and positive values to rotate clockwise.", "tzm-block-scroll-animations") }>
				<HStack
					className="animation-controls__row"
					spacing={ 4 }
					justify="stretch"
					alignment="bottom"
				>
					<Icon icon={ iconRotateZ } size={ 40 } />
					<UnitControl
						__next40pxDefaultSize
						className="unit-control__rotate-startz"
						label={ __( 'Start Z', 'tzm-block-scroll-animations' ) }
						placeholder={ 0 }
						units={ [ { value: 'deg', label: '°' } ] }
						value={
							!! device
								? responsiveAnimation?.startZ
								: animation?.startZ
						}
						onChange={ ( newValue ) =>
							updateAnimation( { startZ: newValue } )
						}
					/>
					<UnitControl
						__next40pxDefaultSize
						className="unit-control__rotate-endz"
						label={ __( 'End Z', 'tzm-block-scroll-animations' ) }
						placeholder={ 0 }
						units={ [ { value: 'deg', label: '°' } ] }
						value={
							!! device
								? responsiveAnimation?.endZ
								: animation?.endZ
						}
						onChange={ ( newValue ) =>
							updateAnimation( { endZ: newValue } )
						}
					/>
					<Button
						__next40pxDefaultSize
						className="button__reset"
						size="small"
						variant="secondary"
						text={ __( 'Reset', 'tzm-block-scroll-animations' ) }
						onClick={ () =>
							updateAnimation( {
								startZ: undefined,
								endZ: undefined,
							} )
						}
					/>
				</HStack>
			</BaseControl> }

			{ options?.hasY && <BaseControl help={ __("Adjust your block's start and end rotation on the Y axis. Use negative values to tilt to the left and positive values to tilt to the right.", "tzm-block-scroll-animations") }>
				<HStack
					className="animation-controls__row"
					spacing={ 4 }
					justify="stretch"
					alignment="bottom"
				>
					<Icon icon={ iconRotateY } size={ 40 } />
					<UnitControl
						__next40pxDefaultSize
						className="unit-control__rotate-starty"
						label={ __( 'Start Y', 'tzm-block-scroll-animations' ) }
						placeholder={ 0 }
						units={ [ { value: 'deg', label: '°' } ] }
						value={
							!! device
								? responsiveAnimation?.startY
								: animation?.startY
						}
						onChange={ ( newValue ) =>
							updateAnimation( { startY: newValue } )
						}
					/>
					<UnitControl
						__next40pxDefaultSize
						className="unit-control__rotate-endy"
						label={ __( 'End Y', 'tzm-block-scroll-animations' ) }
						placeholder={ 0 }
						units={ [ { value: 'deg', label: '°' } ] }
						value={
							!! device
								? responsiveAnimation?.endY
								: animation?.endY
						}
						onChange={ ( newValue ) =>
							updateAnimation( { endY: newValue } )
						}
					/>
					<Button
						__next40pxDefaultSize
						className="button__reset"
						size="small"
						variant="secondary"
						text={ __( 'Reset', 'tzm-block-scroll-animations' ) }
						onClick={ () =>
							updateAnimation( {
								startY: undefined,
								endY: undefined,
							} )
						}
					/>
				</HStack>
			</BaseControl> }

			{ options?.hasX && <BaseControl help={ __("Adjust your block's start and end rotation on the X axis. Use negative values to tilt upwards and positive values to tilt downwards.", "tzm-block-scroll-animations") }>
				<HStack
					className="animation-controls__row"
					spacing={ 4 }
					justify="stretch"
					alignment="bottom"
				>
					<Icon icon={ iconRotateX } size={ 40 } />
					<UnitControl
						__next40pxDefaultSize
						className="unit-control__rotate-startx"
						label={ __( 'Start X', 'tzm-block-scroll-animations' ) }
						placeholder={ 0 }
						units={ [ { value: 'deg', label: '°' } ] }
						value={
							!! device
								? responsiveAnimation?.startX
								: animation?.startX
						}
						onChange={ ( newValue ) =>
							updateAnimation( { startX: newValue } )
						}
					/>
					<UnitControl
						__next40pxDefaultSize
						className="unit-control__rotate-endx"
						label={ __( 'End X', 'tzm-block-scroll-animations' ) }
						placeholder={ 0 }
						units={ [ { value: 'deg', label: '°' } ] }
						value={
							!! device
								? responsiveAnimation?.endX
								: animation?.endX
						}
						onChange={ ( newValue ) =>
							updateAnimation( { endX: newValue } )
						}
					/>
					<Button
						__next40pxDefaultSize
						className="button__reset"
						size="small"
						variant="secondary"
						text={ __( 'Reset', 'tzm-block-scroll-animations' ) }
						onClick={ () =>
							updateAnimation( {
								startX: undefined,
								endX: undefined,
							} )
						}
					/>
				</HStack>
			</BaseControl> }
		</>
	);
};
