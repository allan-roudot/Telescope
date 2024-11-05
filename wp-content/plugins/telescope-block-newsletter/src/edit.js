import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Edit( { attributes, setAttributes } ) {

	const blockProps = useBlockProps();

	return(
		<div {...blockProps}>
			<RichText
				tagName="h3"
				value={ attributes.heading }
				allowedFormats={ [ 'core/bold', 'core/italic' ] }
				onChange={ ( heading ) => setAttributes( { heading } ) }
				placeholder="Titre du formulaire..."
			/>
			<RichText
				tagName="p"
				value={ attributes.paragraph }
				allowedFormats={ [ 'core/bold', 'core/italic' ] }
				onChange={ ( paragraph ) => setAttributes( { paragraph } ) }
				placeholder="Lorem ipsum..."
			/>
			<p>
				<span>Votre adresse e-mail</span>
				<RichText
					tagName="span"
					value={ attributes.buttonText }
					allowedFormats={ [] }
					onChange={ ( buttonText ) => setAttributes( { buttonText } ) }
					placeholder="Texte du bouton..."
				/>
			</p>
		</div>
	)
}
