import { registerBlockType } from '@wordpress/blocks';

import Edit from './edit';
import Save from './save';
import metadata from './../block.json';

registerBlockType( 
	metadata,
	{
		edit: Edit,
		save: Save
	}
)

document.addEventListener('DOMContentLoaded', function () {
	// Sélectionnez le formulaire du bloc
	const formNewsletter = document.querySelectorAll('.telescope-newsletter__form');
	
	formNewsletter.forEach((form) => {
		form.addEventListener('submit', function(event) {
			event.preventDefault(); // Empêche la soumission du formulaire
		});
	});
});