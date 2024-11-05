<?php
/**
 * Plugin Name:       Telescope Block Query
 * Description:       Un bloc personnalisé affichant les derniers articles dans un carrousel Glide.js.
 * Version:           1.0.0
 * Requires at least: 6.2
 * Requires PHP:      7.0
 * Author:            Allan Roudot
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       telescope-block-query
 *
 * @package           telescope-block-query
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}


function add_glide_slide_class_to_li( $block_content, $block ) {
    // Vérifier si le bloc est un query-carousel
    if ( isset( $block['attrs']['namespace'] ) && $block['attrs']['namespace'] === 'query-carousel' ) {
        // Ajouter la classe glide__slide aux <li> générés
        $block_content = str_replace( '<li class="wp-block-post', '<li class="glide__slide wp-block-post', $block_content );
    }
    
    return $block_content;
}

add_filter( 'render_block', 'add_glide_slide_class_to_li', 10, 2 );


function add_glide_data_attributes( $block_content, $block ) {

    if ( $block['blockName'] !== 'core/query' || 
    ! isset( $block['attrs']['namespace'] ) || 
    $block['attrs']['namespace'] !== 'query-carousel' ) {
        return $block_content;
    }

    $p = new WP_HTML_Tag_Processor( $block_content );
    $p->next_tag();
    $p->set_bookmark( 'start' );

    while ( $p->next_tag( array( 'class_name' => 'glide__track' ) ) ) {
        $p->set_attribute( 'data-glide-el', 'track' );
    }

    $p->seek( 'start' );

    while ( $p->next_tag( array( 'class_name' => 'glide__arrows' ) ) ) {
        $p->set_attribute( 'data-glide-el', 'controls' );
    }

    $p->seek( 'start' );

    while ( $p->next_tag( array( 'class_name' => 'glide__arrow--left' ) ) ) {
        $p->set_attribute( 'data-glide-dir', '<' );
    }

    $p->seek( 'start' );

    while ( $p->next_tag( array( 'class_name' => 'glide__arrow--right' ) ) ) {
        $p->set_attribute( 'data-glide-dir', '>' );
    }

    return $p->get_updated_html();
}

add_filter( 'render_block', 'add_glide_data_attributes', 10, 2 );


function telescope_block_query_enqueue_frontend_assets() {

	if ( has_block( 'core/query' ) ) {
		wp_enqueue_script(
			'glide-js',
			plugins_url( 'assets/scripts/glide.min.js', __FILE__ ),
			array(),
			'3.4.1',
			true 
		);

		wp_enqueue_script(
			'glide-init',
			plugins_url( 'assets/scripts/glide-init.js', __FILE__ ),
			array( 'glide-js' ),
			null,
			true
		);

		wp_enqueue_style(
			'glide-css',
			plugins_url( 'assets/styles/glide.core.min.css', __FILE__ ),
			array(),
			'3.4.1'
		);

		wp_enqueue_style(
			'frontend-styles',
			plugins_url( 'assets/styles/style.css', __FILE__ ),
			array(),
			null
		);
	}
}

add_action( 'wp_enqueue_scripts', 'telescope_block_query_enqueue_frontend_assets' );


function telescope_block_query_enqueue_attributes_editor_assets() {
    wp_enqueue_script(
        'glide-editor-script',
        plugins_url( 'assets/scripts/glide-attributes.js', __FILE__ ),
        array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-hooks' ),
        null,
        true
    );
}

add_action( 'enqueue_block_editor_assets', 'telescope_block_query_enqueue_attributes_editor_assets' );


function telescope_block_query_enqueue_editor_assets() {

	$asset = include_once plugin_dir_path( __FILE__ ) . 'build/index.asset.php';

	wp_enqueue_script(
		'listing-query-variation',
		plugins_url( 'build/index.js', __FILE__ ),
		$asset['dependencies'],
		$asset['version'],
		true
	);
    
    wp_enqueue_script(
        'glide-js',
        plugins_url( 'assets/scripts/glide.min.js', __FILE__ ),
        array(),
        '3.4.1',
        true
    );

    wp_enqueue_script(
        'glide-init',
        plugins_url( 'assets/scripts/glide-init.js', __FILE__ ),
        array( 'glide-js' ),
        '3.4.1',
        true
    );

    wp_enqueue_style(
        'glide-css',
        plugins_url( 'assets/styles/glide.core.min.css', __FILE__ ),
        array(),
        '3.4.1'
    );

    wp_enqueue_style(
        'editor-styles',
        plugins_url( 'assets/styles/style.css', __FILE__ ),
        array(),
        null
    );
}

add_action( 'enqueue_block_editor_assets', 'telescope_block_query_enqueue_editor_assets' );