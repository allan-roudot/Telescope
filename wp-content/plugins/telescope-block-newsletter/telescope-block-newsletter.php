<?php
/*
 * Plugin name: Telescope Block Newsletter
 * Description: Block custom pour afficher un formulaire de newsletter d'après la maquette. Pour quelques chose de fonctionnel, j'opterai pour Gravity Forms.
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


function newsletter_block_assets() {
    $script_path = plugin_dir_path( __FILE__ ) . 'build/index.js';
    $front_style_path = plugin_dir_path( __FILE__ ) . 'assets/style.css';

    if ( file_exists( $script_path ) ) {
        wp_enqueue_script(
            'telescope-newsletter',
            plugin_dir_url( __FILE__ ) . 'build/index.js',
            array( 'wp-blocks', 'wp-element', 'wp-block-editor' ),
            filemtime( $script_path ),
            true
        );
    }

    if ( file_exists( $front_style_path ) ) {
        wp_enqueue_style(
            'telescope-newsletter-front',
            plugin_dir_url( __FILE__ ) . 'assets/style.css',
            array(),
            filemtime( $front_style_path )
        );
    }
}

add_action( 'enqueue_block_assets', 'newsletter_block_assets' );


function newsletter_editor_assets() {
    $editor_style_path = plugin_dir_path( __FILE__ ) . 'assets/editor.css';

    if ( file_exists( $editor_style_path ) ) {
        wp_enqueue_style(
            'telescope-newsletter-editor',
            plugin_dir_url( __FILE__ ) . 'assets/editor.css',
            array(),
            filemtime( $editor_style_path )
        );
    }
}

add_action( 'enqueue_block_editor_assets', 'newsletter_editor_assets' );


function newsletter_register_in_php() {
    register_block_type( __DIR__ . '/block.json' );
}

add_action( 'init', 'newsletter_register_in_php' );
