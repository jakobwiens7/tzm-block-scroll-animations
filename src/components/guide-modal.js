/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
//import { getBlockType } from '@wordpress/blocks';
//import { useSelect } from '@wordpress/data';
//import { chevronDownSmall } from '@wordpress/icons';

import {
	Guide,
	Icon,
	//Notice,
} from '@wordpress/components';


/**
 * Internal dependencies
 */
import { iconRangePicker, iconEditor, iconEasing } from '../shared/icons';
import { textWithElements } from '../shared/utils';
import imgGuide01 from '../images/guide01.webp';
import imgGuide02 from '../images/guide02.webp';
import imgGuide03 from '../images/guide03.webp';
import imgGuide04 from '../images/guide04.webp';
import imgGuide05 from '../images/guide05.webp';

// GuideModal component
const GuideModal = ( { onFinish } ) => {
	return (
        <Guide
            className="tzm-block-scrollage-guide"
            contentLabel={__('Block Scroll Animations Guide', 'tzm-block-scroll-animations')}
            finishButtonText={__('Get Started', 'tzm-block-scroll-animations')}
            onFinish={onFinish}
            pages={[
                {
                    image: <img src={ imgGuide01 }/>,
                    content: 
                        <div className="quick-guide__content">
                            <h2>{ __('Introduction', 'tzm-block-scroll-animations') }</h2>
                            <p>
                               { __("Block Scroll Animations allows you to add scroll-driven animations to your blocks easily. Animate properties such as position, rotation, size, opacity, and more.", 'tzm-block-scroll-animations') }
                            </p>
                            <p>
                                { __("Enabling Scroll Animations in the inspector panel equips you with all the tools you need to animate your block effortlessly.", 'tzm-block-scroll-animations') }
                            </p>
                            <p>
                                { textWithElements( 
                                    __("For further details refer to the official documentation at:<br/><a>github.com/jakobwiens7/tzm-block-scroll-animations</a>", 'tzm-block-scroll-animations'), 
                                    { br: <br/>, a: <a href="https://github.com/jakobwiens7/tzm-block-scroll-animations" target="_blank"/> }
                                ) }
                            </p>
                        </div>
                },
                {
                    image: <img src={ imgGuide02 }/>,
                    content: (
                        <div className="quick-guide__content">
                            <h2>{ __('Animation Editor', 'tzm-block-scroll-animations') }</h2>

                            <p>
                                { textWithElements( 
                                    __("Open the Animation Editor using the <icon/> button in the inspector panel or the block toolbar.", 'tzm-block-scroll-animations'), 
                                    { icon: <Icon icon={iconEditor}/> }
                                ) }
                            </p>
                            <p>
                                { textWithElements( 
                                    __("Browse the available properties and define your <strong>start</strong> and <strong>end</strong> values. Don't forget to save before closing the window.", 'tzm-block-scroll-animations'), 
                                    { strong: <strong/> }
                                ) }
                            </p>
                            <p>
                                { textWithElements( 
                                    __("By default, animations run only on the Frontend. However, you might be able to enable <strong>Experimental preview</strong> in the inspector panel to view animations directly in the Editor.", 'tzm-block-scroll-animations'), 
                                    { strong: <strong/> }
                                ) }
                            </p>
                        </div>
                    ),
                },
                {
                    image: <img src={ imgGuide03 }/>,
                    content: (
                        <div className="quick-guide__content">
                            <h2>{ __('Animation Editor Toolbar', 'tzm-block-scroll-animations') }</h2>
                            <p>
                                { textWithElements( 
                                    __("Depending on the property you may have options to toggle additional <strong>directions or axes</strong>. For example, switch to Height to scale vertically rather than proportionally.", 'tzm-block-scroll-animations'),
                                    { strong: <strong/> }
                                ) }
                            </p>
                            <p>
                                { textWithElements( 
                                    __("Adjust <strong>responsive animations</strong> for specific screen sizes by toggling the responsive device icons (Desktop, Laptop, Tablet, Phone) and setting unique values per device.", 'tzm-block-scroll-animations'),
                                    { strong: <strong/> }
                                ) }
                            </p>
                            <p>
                                { textWithElements( 
                                    __("Apply <strong>Easing curves</strong> (<icon/>) other than linear to fine-tune how the animation progresses through it's timeline.", 'tzm-block-scroll-animations'),
                                    { strong: <strong/>, icon: <Icon icon={iconEasing}/> }
                                ) }
                            </p>
                        </div>
                    ),
                },
                {
                    image: <img src={ imgGuide04 }/>,
                    content: (
                        <div className="quick-guide__content">
                            <h2>{ __('Timeline Range', 'tzm-block-scroll-animations') }</h2>
                            <p>
                                { textWithElements( 
                                    __("By default, the Timeline range that controls a block's animation spans the entire page. The animation progresses from start to end as you scroll from top to bottom.", 'tzm-block-scroll-animations'),
                                    { strong: <strong/> }
                                ) }
                            </p>
                            <p>
                                { textWithElements( 
                                    __("Sometimes you might want to limit the Timeline range to a specific section of your page, so the animation begins when that section enters the viewport and ends when it leaves.", 'tzm-block-scroll-animations'),
                                    { strong: <strong/> }
                                ) }
                            </p>
                            <p>
                                { textWithElements( 
                                    __("With the <icon/> button in the block toolbar you can set the Timeline range from a list of blocks. Note: The desired block must have a HTML anchor assigned, otherwise it will not be selectable. Alternatively, enter a <strong>custom CSS selector</strong> in the inspector panel.", 'tzm-block-scroll-animations'),
                                    { strong: <strong/>, icon: <Icon icon={iconRangePicker}/> }
                                ) }
                            </p>
                        </div>
                    ),
                },
                {
                    image: <img src={ imgGuide05 }/>,
                    content: (
                        <div className="quick-guide__content">
                            <h2>{ __('Timeline Range Offsets', 'tzm-block-scroll-animations') }</h2>
                            <p>
                                { textWithElements( 
                                    __("You can refine the Timeline range using Range offsets applied to its top and bottom edges. Positive values move the boundary downward, negative values move it upward.", 'tzm-block-scroll-animations'),
                                    { strong: <strong/> }
                                ) }
                            </p>
                            <p>
                                { __("The following units are available:", 'tzm-block-scroll-animations') }
                            </p>
                            <ul>
                                <li>
                                    { textWithElements( 
                                        __("- <strong>px</strong> for absolute values in pixel", 'tzm-block-scroll-animations'), 
                                        { strong: <strong/> }
                                    ) }
                                </li>
                                <li>
                                    { textWithElements( 
                                        __("- <strong>%</strong> for values relative to the Timeline range height", 'tzm-block-scroll-animations'), 
                                        { strong: <strong/> }
                                    ) }
                                </li>
                                <li>
                                    { textWithElements( 
                                        __("- <strong>vh</strong> for values relative to the Viewport height", 'tzm-block-scroll-animations'), 
                                        { strong: <strong/> }
                                    ) }
                                </li>
                            </ul>
                        </div>
                    ),
                },
            ]}
        />
    );
};

export default GuideModal;
