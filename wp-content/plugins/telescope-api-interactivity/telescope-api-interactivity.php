<?php
/*
 * Plugin name: Telescope API Interactivity
 * Description: Ce plugin pas très opti m'a permis de tester l'API Interactivity. J'aurai pu tester plus de choses, mais l'intégration n'aurait jamais avancée.
 * Version: 1.0
 * Requires at least: 6.5
 * Author: Allan Roudot
 * Author URI: https://allan-roudot.com/
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}


function enqueue_butteruptoast_assets() {

    wp_enqueue_style( 'butteruptoast-styles', plugin_dir_url( __FILE__ ) . 'butterup/butterup.min.css' );
    wp_enqueue_script( 'butteruptoast-scripts', plugin_dir_url( __FILE__ ) . 'butterup/butterup.min.js', array(), null, true );

    wp_enqueue_script_module(
        '@telescope-api-interactivity/entry',
        plugin_dir_url( __FILE__ ) . 'index.js',
        array('butteruptoast-scripts'),
        null,
        true
    );

    wp_enqueue_style(
        'telescope-custom-style',
        plugin_dir_url( __FILE__ ) . 'style.css',
        array(),
        null
    );
}

add_action( 'wp_enqueue_scripts', 'enqueue_butteruptoast_assets' );


function my_custom_render( $block_content, $block ) {
    if ( $block['blockName'] !== 'telescope/newsletter' ) {
        return $block_content;
    }

    wp_enqueue_script_module(
        '@telescope-api-interactivity/entry',
        plugin_dir_url( __FILE__ ) . 'index.js'
    );

    $p = new WP_HTML_Tag_Processor( $block_content );
    $p->next_tag( array( 'class_name' => 'telescope-newsletter__button' ) );

    $p->set_attribute( 'data-wp-interactive', 'telescope-api-interactivity/button-interactivity' );
    $p->set_attribute( 'data-wp-on--click', 'actions.showNotification' );

    return $p->get_updated_html();
}

add_filter( 'render_block', 'my_custom_render', 10, 2 );
