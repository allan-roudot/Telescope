wp.domReady(function() {
    // Fonction pour ajouter la classe 'glide__slide' aux <li>
    const addGlideSlideClassToListItems = () => {
        const queryBlocks = document.querySelectorAll('.wp-block-query');

        queryBlocks.forEach(queryBlock => {
            // Trouver tous les <li>
            const listItems = queryBlock.querySelectorAll('li');
            
            listItems.forEach(li => {
                // Ajouter la classe 'glide__slide'
                if (!li.classList.contains('glide__slide')) {
                    li.classList.add('glide__slide');
                }
            });
        });
    };

    // Exécuter la fonction pour ajouter la classe dès le chargement
    addGlideSlideClassToListItems();

    // Observer les changements dans l'éditeur
    const observer = new MutationObserver(() => {
        addGlideSlideClassToListItems();  // Appliquer la classe sur les nouveaux blocs ajoutés
    });

    // Observer les changements dans le DOM
    const editorArea = document.querySelector('.block-editor-writing-flow');
    if (editorArea) {
        observer.observe(editorArea, { childList: true, subtree: true });
    }
});
