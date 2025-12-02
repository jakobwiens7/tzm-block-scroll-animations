/**
 * WordPress Dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { useState, /*useEffect*/ } from '@wordpress/element';
import { getBlockType } from '@wordpress/blocks';
import { moreVertical } from '@wordpress/icons';
import {
	TabPanel,
	Button,
	Modal,
	Notice,
	Toolbar,
	ToolbarGroup,
	ToolbarButton,
	ToolbarItem,
	ToolbarDropdownMenu,
	Dropdown,
	__experimentalHStack as HStack,
	__experimentalVStack as VStack,
} from '@wordpress/components';

/**
 * Internal Dependencies
 */
import { cleanEmptyObject, hasAnimationValue } from '../shared/utils';
import { iconEasing } from '../shared/icons';
import { easingData } from '../shared/easings';
import { MoveToolbar, MoveControls } from './animation-move-controls';
import { RotateToolbar, RotateControls } from './animation-rotate-controls';
import { ScaleToolbar, ScaleControls } from './animation-scale-controls';
import { FadeToolbar, FadeControls } from './animation-fade-controls';
import { SaturateToolbar, SaturateControls } from './animation-saturate-controls';
import { BlurToolbar, BlurControls } from './animation-blur-controls';
import EasingSelectControl from './easing-select-control';


// AnimationEditorModal component
const AnimationsEditorModal = ( { props, updateAttribute, close } ) => {
	const blockType = getBlockType( props.name );

	const { scrollAnimations } = props.attributes;

	// Set temporary `animations` and `options`
	const [ animations, setAnimations ] = useState(
		scrollAnimations?.animations || {}
	);

	function updateResponsiveAnimation(	type, responsiveDevice = null, attr = {} ) {
		setAnimations(
			cleanEmptyObject({	...animations, [ type ]: {
				...animations?.[ type ],
				...( !! responsiveDevice
					? { responsive: {
						...animations?.[ type ]?.responsive,
						[ responsiveDevice ]: {	...animations?.[ type ]?.responsive?.[responsiveDevice], ...attr }
					} } 
					: attr 
				) 
			} })
		);
	}

	// Modal buttons
	const saveAll = () => {
		updateAttribute( {
			...scrollAnimations,
			animations: { ...animations },
		} );
		close();
	};

	const resetAll = () => {
		updateAttribute( { ...scrollAnimations, animations: {} } );
		close();
	};


	// Export Animation settings
	const exportJson = async ( animation ) => {
		try {
			await navigator.clipboard.writeText(
				JSON.stringify( animation, null, 2 )
			);
			alert( 'JSON string copied to clipboard!' );
		} catch ( err ) {
			console.error( 'Failed to copy: ', err );
		}
	};


	// AnimationControlsWrapper component
	const AnimationControlsWrapper = (type) => {

		const [ hasResponsiveNotice, setResponsiveNotice ] = useState( true );
		const [ options, setOptions ] = useState({
			move: {
				hasY: hasAnimationValue(animations?.move, 'Y') || !hasAnimationValue(animations?.move, 'X') 
					? true 
					: false,
            	hasX: hasAnimationValue(animations?.move, 'X') || !hasAnimationValue(animations?.move, 'Y') 
					? true 
					: false,
			},
			rotate: {
				hasZ: hasAnimationValue(animations?.rotate, 'Z') || (!hasAnimationValue(animations?.rotate, 'Y') && !hasAnimationValue(animations?.rotate, 'X')) 
					? true 
					: false,
				hasY: hasAnimationValue(animations?.rotate, 'Y') ? true : false,
				hasX: hasAnimationValue(animations?.rotate, 'X') ? true : false,
			},
			scale: {
				hasXY: hasAnimationValue(animations?.scale) || (!hasAnimationValue(animations?.scale, 'Y') && !hasAnimationValue(animations?.scale, 'X')) 
					? true 
					: false,
				hasY: hasAnimationValue(animations?.scale, 'Y') ? true : false,
				hasX: hasAnimationValue(animations?.scale, 'X') ? true : false,
			},
		});

		const animation = animations?.[ type ];
		const responsive = options?.[ type ]?.responsive || false;

		function setResponsive( device ) {
			setOptions({
				...options,
				[ type ]: { ...options[ type ], responsive: device },
			});
		}


		// AnimationToolbar component
		const AnimationToolbar = () => {
			switch ( type ) {
				case 'move':
					return <MoveToolbar
						animation={ animations?.move }
						options={ options?.move }
						updateOptions={ ( value ) => setOptions({ ...options, move: value }) }
					/>
				case 'rotate':
					return <RotateToolbar
						animation={ animations?.rotate }
						options={ options?.rotate }
						updateOptions={ ( value ) => setOptions({ ...options, rotate: value }) }
					/>
				case 'scale':
					return <ScaleToolbar
						animation={ animations?.scale }
						options={ options?.scale }
						updateOptions={ ( value ) => setOptions({ ...options, scale: value }) }
					/>
				case 'fade':
					return <FadeToolbar />;
				case 'saturate':
					return <SaturateToolbar />;
				case 'blur':
					return <BlurToolbar />;
			}
		};

		// AnimationControls component
		const AnimationControls = () => {
			switch ( type ) {
				case 'move':
					return <MoveControls
						animation={ animations?.move }
						updateAnimation={ ( attr ) => updateResponsiveAnimation('move', options?.move?.responsive,	attr) }
						options={ options?.move }
					/>
				case 'rotate':
					return <RotateControls
						animation={ animations?.rotate }
						updateAnimation={ ( attr ) => updateResponsiveAnimation('rotate', options?.rotate?.responsive, attr) }
						options={ options?.rotate }
					/>
				case 'scale':
					return <ScaleControls
						animation={ animations?.scale }
						updateAnimation={ ( attr ) => updateResponsiveAnimation('scale', options?.scale?.responsive, attr) }
						options={ options?.scale }
					/>
				case 'fade':
					return <FadeControls
						animation={ animations?.fade }
						updateAnimation={ ( attr ) => updateResponsiveAnimation('fade',	options?.fade?.responsive, attr) }
						options={ options?.fade }
					/>
				case 'saturate':
					return <SaturateControls
						animation={ animations?.saturate }
						updateAnimation={ ( attr ) => updateResponsiveAnimation('saturate',	options?.saturate?.responsive, attr) }
						options={ options?.saturate }
					/>
				case 'blur':
					return <BlurControls
						animation={ animations?.blur }
						updateAnimation={ ( attr ) => updateResponsiveAnimation('blur',	options?.blur?.responsive, attr) }
						options={ options?.blur }
					/>
			}
		};

		const responsiveStrings = {
			desktop: __( 'Desktop screens', 'tzm-block-scroll-animations' ),
			laptop: __( 'Laptop screens', 'tzm-block-scroll-animations' ),
			tablet: __( 'Tablet screens', 'tzm-block-scroll-animations' ),
			phone: __( 'Phone screens', 'tzm-block-scroll-animations' ),
		};

		return (
			<>
				<Toolbar
					variant="unstyled"
					id="animations-editor-toolbar"
					label="Animation tools"
				>
					<ToolbarGroup>
						<ToolbarButton
							icon={ blockType.icon.src }
							text={ props.attributes?.metadata?.name || blockType.title }
						/>
					</ToolbarGroup>
					<ToolbarGroup>
						{ !! AnimationToolbar && AnimationToolbar() }
					</ToolbarGroup>
					<ToolbarGroup>
						<ToolbarButton
							icon="desktop"
							label={ responsiveStrings[ 'desktop' ] }
							isPressed={ responsive === 'desktop' }
							onClick={ () =>	setResponsive( responsive !== 'desktop' ? 'desktop' : undefined ) }
						/>
						<ToolbarButton
							icon="laptop"
							label={ responsiveStrings[ 'laptop' ] }
							isPressed={ responsive === 'laptop' }
							onClick={ () =>	setResponsive( responsive !== 'laptop' ? 'laptop' : undefined ) }
						/>
						<ToolbarButton
							icon="tablet"
							label={ responsiveStrings[ 'tablet' ] }
							isPressed={ responsive === 'tablet' }
							onClick={ () =>	setResponsive( responsive !== 'tablet' ? 'tablet' : undefined ) }
						/>
						<ToolbarButton
							icon="smartphone"
							label={ responsiveStrings[ 'phone' ] }
							isPressed={ responsive === 'phone' }
							onClick={ () =>	setResponsive( responsive !== 'phone' ? 'phone' : undefined ) }
						/>
					</ToolbarGroup>

					<ToolbarGroup>
						<ToolbarItem>
							{ () => (
								<Dropdown
									popoverProps={ { placement: 'bottom-start' } }
									contentClassName="easing-dropdown"
									renderToggle={ ({ isOpen, onToggle }) => (
										<Button
											icon={ iconEasing }
											label={ __('Easing curve', 'tzm-block-scroll-animations') }
											text={ animation?.easing
												? easingData[animation.easing].name
												: __('Linear', 'tzm-block-scroll-animations')
											}
											onClick={ onToggle }
											aria-expanded={ isOpen }
										/>
									) }
									renderContent={ () => (
										<EasingSelectControl
											animation={ animation }
											updateAnimationEasing={ ( value ) => setAnimations(
												cleanEmptyObject({
													...animations,
													[ type ]: {	...animation, easing: value }
												})
											) }
										/>
									) }
								/>
							) }
						</ToolbarItem>
					</ToolbarGroup>

					<ToolbarGroup>
						<ToolbarDropdownMenu
							icon={ moreVertical }
							label={ __('More', 'tzm-block-scroll-animations') }
							controls={ [
								{
									title: sprintf(
										__('Reset %s animation', 'tzm-block-scroll-animations'),
										[ ...type ][ 0 ].toUpperCase() + [ ...type ].slice( 1 ).join( '' )
									),
									isDisabled: ! animation,
									onClick: () => setAnimations( { ...animations, [ type ]: undefined } )
								},
								{
									title: sprintf(
										__('Export %s animation', 'tzm-block-scroll-animations'),
										[ ...type ][ 0 ].toUpperCase() + [ ...type ].slice( 1 ).join( '' )
									),
									isDisabled: ! animation,
									onClick: () => exportJson( animation ),
								},
							] }
						/>
					</ToolbarGroup>
				</Toolbar>

				<VStack
					className="animations-controls"
					spacing={ 3 }
					justify="flex-start"
				>
					{ !! responsive && hasResponsiveNotice && (
						<Notice	__unstableHTML
							className="animation-editor__responsive-notice"
							onRemove={ () => setResponsiveNotice( false ) }
						>
							{ sprintf(
								__('You are currently editing the responsive animations for <strong>%s</strong>.', 'tzm-block-scroll-animations'),
								responsiveStrings[ responsive ]
							) }
						</Notice>
					) }
					{ !! AnimationControls && AnimationControls() }
				</VStack>
			</>
		);
	};

	// Render Animations Editor Modal
	return (
	<>
		<Modal
			size="large"
			title={ __( 'Animation Editor', 'tzm-block-scroll-animations' ) }
			className="animation-editor"
			onRequestClose={ close }
		>
			<TabPanel
				className="animation-editor__tab-panel"
				initialTabName={ scrollAnimations?.lastEdited }
				onSelect={ ( tabName ) => updateAttribute({	...scrollAnimations, lastEdited: tabName }) }
				tabs={ [
					{
						name: 'move',
						title: __( 'Move', 'tzm-block-scroll-animations' ),
						className: animations?.move ? 'has-animation-data' : '',
						content: AnimationControlsWrapper( 'move' ),
					},
					{
						name: 'rotate',
						title: __( 'Rotate', 'tzm-block-scroll-animations' ),
						className: animations?.rotate ? 'has-animation-data' : '',
						content: AnimationControlsWrapper( 'rotate' ),
					},
					{
						name: 'scale',
						title: __( 'Scale', 'tzm-block-scroll-animations' ),
						className: animations?.scale ? 'has-animation-data' : '',
						content: AnimationControlsWrapper( 'scale' ),
					},
					{
						name: 'fade',
						title: __( 'Fade', 'tzm-block-scroll-animations' ),
						className: animations?.fade ? 'has-animation-data' : '',
						content: AnimationControlsWrapper( 'fade' ),
					},
					{
						name: 'saturate',
						title: __( 'Saturate', 'tzm-block-scroll-animations' ),
						className: animations?.saturate ? 'has-animation-data' : '',
						content: AnimationControlsWrapper( 'saturate' ),
					},
					{
						name: 'blur',
						title: __( 'Blur', 'tzm-block-scroll-animations' ),
						className: animations?.blur ? 'has-animation-data' : '',
						content: AnimationControlsWrapper( 'blur' ),
					},
				] }
			>
				{ ( { content } ) => (
					<div className="animation-editor__tab-panel__content">
						{ content }
					</div>
				) }
			</TabPanel>

			<HStack
				justify="space-between"
				className="animation-editor__footer-buttons"
			>
				<Button variant="primary" onClick={ saveAll }>
					{ __( 'Save', 'tzm-block-scroll-animations' ) }
				</Button>
				<Button isDestructive onClick={ resetAll }>
					{ __( 'Reset all', 'tzm-block-scroll-animations' ) }
				</Button>
			</HStack>
		</Modal>
	</>
	);
};

export default AnimationsEditorModal;
