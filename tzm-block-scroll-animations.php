<?php

/**
 * Plugin Name:		TZM Block Scroll Animations
 * Description:		Bring your blocks to life with scroll-driven animations — no coding required!
 * Version:			1.0.2
 * Author:			TezmoMedia - Jakob Wiens
 * Author URI:		https://www.tezmo.media
 * License:			GPL-2.0-or-later
 * License URI:		https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:		tzm-block-scroll-animations
 * Domain Path:		/languages
 * Requires at least: 6.4
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

// Check if class exists
if (!class_exists('TZM_Block_Scroll_Animations')) {

    class TZM_Block_Scroll_Animations
    {
        // The instance of this class
        private static $instance = null;

        // Returns the instance of this class.
        public static function get_instance()
        {
            if (null === self::$instance) {
                self::$instance = new self();
            }
            return self::$instance;
        }

        public function __construct()
        {
            // Render block
            add_filter('render_block', array($this, 'render_block'), 10, 2);

            // Enqueue editor assets
            add_action('enqueue_block_editor_assets', array($this, 'enqueue_editor_assets'));

            // Enqueue frontend assets
            add_action('enqueue_block_assets', array($this, 'enqueue_block_assets'));
        }


        /**
         * Enqueue editor assets
         */
        public function enqueue_editor_assets()
        {
            $editor_assets = include(plugin_dir_path(__FILE__) . 'build/tzm-block-scroll-animations.asset.php');

            wp_enqueue_style(
                'tzm-block-scroll-animations-editor',
                plugins_url('/build/tzm-block-scroll-animations.css', __FILE__),
                array('wp-editor'),
                $editor_assets['version']
            );
            wp_enqueue_script(
                'tzm-block-scroll-animations-editor',
                plugins_url('/build/tzm-block-scroll-animations.js', __FILE__),
                $editor_assets['dependencies'],
                $editor_assets['version'],
                true
            );

            // Script Translations
            if (function_exists('wp_set_script_translations')) {
                wp_set_script_translations(
                    'tzm-block-scroll-animations-editor',
                    'tzm-block-scroll-animations',
                    plugin_dir_path(__FILE__) . 'languages'
                );
            }
        }

        /**
         * Enqueue both frontend + editor assets.
         */
        public function enqueue_block_assets()
        {
            $assets = include(plugin_dir_path(__FILE__) . 'build/view-tzm-block-scroll-animations.asset.php');

            wp_enqueue_style(
                'tzm-block-scroll-animations',
                plugins_url('/build/style-tzm-block-scroll-animations.css', __FILE__),
                [],
                $assets['version']
            );

            wp_enqueue_script(
                'tzm-block-scroll-animations',
                plugins_url('/build/view-tzm-block-scroll-animations.js', __FILE__),
                $assets['dependencies'],
                $assets['version'],
                true
            );

            // Allow custom scrollage settings
            $scrollage_settings = apply_filters('tzm_scrollage_init_settings', array(
                'selector' => '.scrollage',
                'options' => array(
                    'direction' => 'vertical',
                    'source' => null,
                    'breakpoints' => array(781, 1024, 1366),
                    'triggers' => array(),
                    'initialize' => true,
                )
            ));

            // Pass settings to JavaScript
            wp_localize_script(
                'tzm-block-scroll-animations',
                'tzmScrollageSettings',
                $scrollage_settings
            );
        }


        /**
         * Render block
         */
        public function render_block($block_content, $block)
        {
            $scroll_animations = $block['attrs']['scrollAnimations'] ?? [];

            if (empty($scroll_animations['enabled'])) {
                return $block_content;
            }

            $html = new WP_HTML_Tag_Processor($block_content);
            if ($html->next_tag()) {

                // Add scrollage class if any animations exist
                if (!empty($scroll_animations['animations'])) {
                    $html->add_class('scrollage');
                }

                // Set timeline range
                if (!empty($scroll_animations['range'])) {
                    $html->set_attribute('data-timeline-range', $scroll_animations['range']);
                }

                // Set animation range
                $range_start = $scroll_animations['rangeStart'] ?? '0';
                $range_end = $scroll_animations['rangeEnd'] ?? '0';

                if ($range_start !== '0' || $range_end !== '0') {
                    $html->set_attribute('data-timeline-offset', "$range_start $range_end");
                }

                // Set animation attributes
                $animation_types = ['move', 'rotate', 'scale', 'fade', 'saturate', 'blur'];

                foreach ($animation_types as $type) {
                    if (!empty($scroll_animations['animations'][$type])) {
                        $json_value = json_encode($scroll_animations['animations'][$type]);

                        if ($json_value) {
                            $html->set_attribute("data-animation-$type", $json_value);
                        }
                    }
                }
            }

            return $html->get_updated_html();
        }
    }

    TZM_Block_Scroll_Animations::get_instance();
}
