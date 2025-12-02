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
import { iconScale, iconScaleX, iconScaleY } from '../shared/icons';


export const ScaleToolbar = ({
    animation, 
    options, 
    updateOptions
}) => {

	const hasValueXY = hasAnimationValue(animation, '');
	const hasValueY = hasAnimationValue(animation, 'Y');
	const hasValueX = hasAnimationValue(animation, 'X');

	return (
		<>
			<ToolbarButton icon={ iconScale }
				label={ __( 'Size', 'tzm-block-scroll-animations' ) }
				disabled={ hasValueXY || hasValueY || hasValueX }
				isPressed={ options?.hasXY}
				onClick={ () => updateOptions({ ...options,
					hasXY: !options?.hasXY,
					hasX: options?.hasXY,
					hasY: options?.hasXY,
				}) }
			/>
			<ToolbarButton icon={ iconScaleY }
				label={ __( 'Height', 'tzm-block-scroll-animations' ) }
				disabled={ hasValueY || hasValueXY || (!options?.hasX && !options?.hasXY) }
				isPressed={	options?.hasY }
				onClick={ (newValue) => updateOptions({	...options,
					hasY: !options?.hasY,
					hasXY: newValue ? false : options?.hasXY
				}) }
			/>
			<ToolbarButton
				icon={ iconScaleX }
				label={ __( 'Width', 'tzm-block-scroll-animations' ) }
				disabled={ hasValueX || hasValueXY || (!options?.hasY && !options?.hasXY)}
				isPressed={	options?.hasX }
				onClick={ (newValue) =>	updateOptions({	...options,
					hasX: !options?.hasX,
					hasXY: newValue ? false : options?.hasXY
				}) }
			/>
		</>
	);
};

export const ScaleControls = ( { animation, updateAnimation, options } ) => {
	const device = options?.responsive;
	const responsiveAnimation = animation?.responsive?.[ device ];

	return (
		<>
			{ options?.hasXY && <BaseControl help={ __("Adjust your block's start and end size proportionally. Use values below 100 to reduce the size and values above 100 to enlarge it.", "tzm-block-scroll-animations") }>
				<HStack
					className="animation-controls__row"
					spacing={ 4 }
					justify="stretch"
					alignment="bottom"
				>
					<Icon icon={ iconScale } size={ 40 } />
					<UnitControl
						__next40pxDefaultSize
						className="unit-control__scale-start"
						label={ __(
							'Start Size',
							'tzm-block-scroll-animations'
						) }
						placeholder={ 100 }
						units={ [ { value: '%', label: '%' } ] }
						value={
							!! device
								? responsiveAnimation?.start
								: animation?.start
						}
						onChange={ ( newValue ) =>
							updateAnimation( { start: newValue } )
						}
					/>
					<UnitControl
						__next40pxDefaultSize
						className="unit-control__scale-end"
						label={ __(
							'End Size',
							'tzm-block-scroll-animations'
						) }
						placeholder={ 100 }
						units={ [ { value: '%', label: '%' } ] }
						value={
							!! device
								? responsiveAnimation?.end
								: animation?.end
						}
						onChange={ ( newValue ) =>
							updateAnimation( { end: newValue } )
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
								start: undefined,
								end: undefined,
							} )
						}
					/>
				</HStack>
			</BaseControl> }

			{ options?.hasY && <BaseControl help={ __("Adjust your block's start and end height independently. Use values below 100 to decrease the height and values above 100 to increase it.", "tzm-block-scroll-animations") }>
				<HStack
					className="animation-controls__row"
					spacing={ 4 }
					justify="stretch"
					alignment="bottom"
				>
					<Icon icon={ iconScaleY } size={ 40 } />
					<UnitControl
						__next40pxDefaultSize
						className="unit-control__scale-starty"
						label={ __(
							'Start Height',
							'tzm-block-scroll-animations'
						) }
						placeholder={ 100 }
						units={ [ { value: '%', label: '%' } ] }
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
						className="unit-control__scale-endy"
						label={ __(
							'End Height',
							'tzm-block-scroll-animations'
						) }
						placeholder={ 100 }
						units={ [ { value: '%', label: '%' } ] }
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

			{ options?.hasX && <BaseControl help={ __("Adjust your block's start and end width independently. Use values below 100 to decrease the width and values above 100 to increase it.", "tzm-block-scroll-animations") }>
				<HStack
					className="animation-controls__row"
					spacing={ 4 }
					justify="stretch"
					alignment="bottom"
				>
					<Icon icon={ iconScaleX } size={ 40 } />
					<UnitControl
						__next40pxDefaultSize
						className="unit-control__scale-startx"
						label={ __(
							'Start Width',
							'tzm-block-scroll-animations'
						) }
						placeholder={ 100 }
						units={ [ { value: '%', label: '%' } ] }
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
						className="unit-control__scale-endx"
						label={ __(
							'End Width',
							'tzm-block-scroll-animations'
						) }
						placeholder={ 100 }
						units={ [ { value: '%', label: '%' } ] }
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
