=== TZM Block Scroll Animations ===
Contributors:       jakobwiens
Tags:               block controls, scroll, motion, effects, animation
Tested up to:       7.0
Stable tag:         1.0.2
License:			GPLv2 or later
License URI: 		https://www.gnu.org/licenses/gpl-2.0.html

Bring your blocks to life with scroll-driven animations — easy and intuitive with no coding required!


== Description ==

**TZM Block Scroll Animations** helps you bring your blocks to life by adding clean, expressive scroll-driven motion effects. Animate properties such as position, scale, rotation, opacity, and more — all directly within the Gutenberg Editor in just a few seconds.


=== Features ===

* **Animation Editor:** A clean and straightforward interface that requires no coding or scripting knowledge. Set up eye-catching scroll-based animations in just a few clicks.

* **Start/End-Based Animations:** Animate movement, rotation, scaling, opacity, grayscale, and blur using a simple, start-to-end value workflow that keeps animation behavior predictable.

* **Customizable Timeline Range:** Define the scroll segment that drives the animation using block selection or custom CSS selectors for maximum flexibility.

* **Integrated Responsive Controls:** Assign different animation settings for desktop, laptop, tablet, and phone independently.

* **Easing Curves:** Add extra refinement by using non-linear easing to adjust how animations unfold along the scroll timeline.


=== Source Code ===

The source code for TZM Block Scroll Animations is available on GitHub! 
Follow the development, report issues, and get involved in improving the plugin. We welcome contributions, feedback, and feature requests from the community.

* [View on GitHub](https://github.com/jakobwiens7/tzm-block-scroll-animations)


== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/tzm-block-scroll-animations` directory, or install the plugin through the WordPress plugins screen directly.

2. Activate the plugin through the 'Plugins' screen in WordPress


== Frequently Asked Questions ==

= Does this plugin require coding or scripting knowledge? =
No. All animations can be created within the Animation Editor by using input fields and sliders.

= Why can’t I select certain blocks when using “Pick Timeline Range”? =
Blocks without an HTML anchor cannot be selected. Add an anchor in the block settings, then try again.

= Can I disable or define different animations for mobile and desktop? =
Yes. The Animation Editor supports device-specific configuration. Activate the responsive icons to set unique values per device.

= Is this plugin compatible with all themes? =
Block Scroll Animations works with any theme that properly supports the block editor and follows standard frontend markup.

= I want to use Block Scroll Animations on a non-WordPress site. Is this possible?
While the plugin cannot be used outside the WordPress environment, you may want to explore the underlying **ScrollageJS** library, which powers this plugin: https://github.com/jakobwiens7/scrollage-js.

= Can I customize the ScrollageJS initialization settings? =
Yes. Use the `tzm_scrollage_init_settings` filter to modify the initialization configuration. For example:

`add_filter('tzm_scrollage_init_settings', function($settings) {
    $settings['debug'] = true;
    return $settings;
});`

For a complete list of available options, refer to the [ScrollageJS documentation](https://github.com/jakobwiens7/scrollage-js).


== Screenshots ==

1. Quick and intuitive block animation workflow.
2. Configure Sroll Animation features right from the block’s settings.
3. Integrated quick guide for setting up scroll animations.


== Changelog ==

= 1.0.2 =
* Minor bugfixes
* Allow importing single animations via JSON
* Allow custom ScrollageJS initialization settings

= 1.0.0 =
* Initial Release :)
