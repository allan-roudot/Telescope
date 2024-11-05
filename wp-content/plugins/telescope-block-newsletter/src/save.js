// WIP Ajout checkbox consentement

import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
	return (
		<div {...useBlockProps.save()}>
			<RichText.Content 
				tagName="h3" 
				value={ attributes.heading } 
				className="telescope-newsletter__title"
			/>
			<RichText.Content 
				tagName="p" 
				value={ attributes.paragraph } 
				className="telescope-newsletter__text"
			/>
			<form className="telescope-newsletter__form">
				<label for="newsletter" className="sr-only telescope-newsletter__label">Votre adresse e-mail :</label>
				<input type="email" placeholder="Votre e-mail" id ="newsletter" className="telescope-newsletter__field" />
				<RichText.Content 
					tagName="button" 
					value={ attributes.buttonText } 
					type="submit"
					className="telescope-newsletter__button"
				/>
			</form>
		</div>
	);
}
