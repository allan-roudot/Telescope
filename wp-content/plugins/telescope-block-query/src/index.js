import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { useEffect } from '@wordpress/element'; // Pour utiliser useEffect pour la gestion du cycle de vie des composants
import { registerBlockVariation } from '@wordpress/blocks';
import Glide from '../assets/scripts/glide.min.js'; // Importation du script Glide.js

// Enregistrement de la variation du bloc 'core/query' pour un carrousel dynamique
registerBlockVariation('core/query', {
    name: 'query-carousel',         // Nom de la variation
    title: 'Posts Query Carousel',  // Titre affiché dans l'éditeur
    icon: 'building',               // Icône pour la variation
    description: 'Affiche un carrousel dynamique des derniers articles avec Glide.js',  // Description du bloc
    isActive: (blockAttributes) => blockAttributes.namespace === 'query-carousel',      // Détermine si la variation est active
    attributes: {
        namespace: 'query-carousel',  // Attribut personnalisé pour identifier la variation
        align: 'wide',  // Alignement large
        query: {
            postType: 'post',   // Type de contenu à récupérer (articles)
            perPage: 6,         // Limite à 6 articles par carrousel
            order: 'asc',       // Ordre ascendant des articles
            orderBy: 'date',    // Trie par date
        },
    },
    allowedControls: [], // Masque les contrôles non nécessaires dans l'éditeur
    innerBlocks: [
        [
            'core/group',  // Bloc principal qui enveloppe le carrousel Glide.js
            { 
                className: 'glide',  // Ajout de la classe 'glide' pour identifier le carrousel
                lock: {              // Verrouillage du bloc principal
                    move: true,      // Empêche le déplacement
                    remove: true,    // Empêche la suppression
                    insert: true     // Empêche l'insertion
                } 
            },
            [
                [
                    'core/group',  // Bloc qui représente la piste de slides du carrousel
                    { 
                        className: 'glide__track', // Ajout de la classe 'glide__track' pour Glide.js
                        lock: {
                            move: true,
                            remove: true,
                            insert: true
                        }   
                    },  
                    [
                        [
                            'core/post-template',  // Utilisation de 'post-template' pour répéter les articles dans le carrousel
                            { 
                                className: 'glide__slides',
                                tagName: 'ul',
                                lock: {
                                    move: true,
                                    remove: true
                                }  
                            },  
                            [
                                ['core/post-featured-image'],  // Affiche l'image mise en avant de l'article
                                ['core/post-title', 
                                    { 
                                        level: 3, 
                                        isLink: true // Affiche le titre de l'article en tant que lien
                                    }
                                ],  
                                ['core/post-date']  // Affiche la date de publication de l'article
                            ]
                        ]
                    ]
                ],
                [
                    'core/group',  // Bloc pour les flèches de navigation de Glide.js
                    { 
                        className: 'glide__arrows', // Ajout de la classe 'glide__arrows' pour les flèches
                        lock: {
                            move: true,
                            remove: true,
                            insert: true
                        }   
                    }, 
                    [
                        [
                            'core/button',  // Flèche gauche
                            {
                                className: 'glide__arrow glide__arrow--left button-icon button-icon--left',  // Classe pour la flèche gauche
                                text: 'Précédent',  // Texte du bouton
                                tagName: 'button',  // Spécification du bouton HTML
                                lock: {
                                    move: true,
                                    remove: true
                                }   
                            }
                        ],
                        [
                            'core/button',  // Flèche droite
                            {
                                className: 'glide__arrow glide__arrow--right button-icon button-icon--right',
                                text: 'Suivant',
                                tagName: 'button',
                                lock: {
                                    move: true,
                                    remove: true
                                }   
                            }
                        ]
                    ]
                ]
            ]
        ]
    ],
});

// Fonction HOC (Higher-Order Component) pour ajouter des attributs et classes personnalisés aux blocs
const addGlideAttributes = createHigherOrderComponent((BlockListBlock) => {
    return (props) => {
        const { block } = props;  // Extraction du bloc actuel

        useEffect(() => {
            // Utilisation de setInterval pour vérifier régulièrement la disponibilité des éléments dans le DOM
            const interval = setInterval(() => {
                const listItems = document.querySelectorAll('.wp-block-post');  // Sélection des éléments <li> avec la classe 'wp-block-post'
                
                if (listItems.length > 0) {
                    // Ajouter la classe 'glide__slide' à chaque élément <li>
                    listItems.forEach((item) => {
                        item.classList.add('glide__slide');
                    });

                    // Sélectionne tous les éléments avec la classe 'glide' pour initialiser Glide.js
                    const carousels = document.querySelectorAll('.glide');
                    if (carousels.length > 0) {
                        carousels.forEach((carousel) => {
                            // Initialiser Glide.js pour chaque carrousel trouvé
                            new Glide(carousel, {
                                rewind: false,       
                                perView: 3,          
                                gap: 20,             
                                breakpoints: {      
                                    800: {
                                        perView: 2  
                                    },
                                    480: {
                                        perView: 1
                                    }
                                }
                            }).mount();
                        });

                        clearInterval(interval);  // Arrête l'intervalle une fois les carrousels initialisés
                    }
                }
            }, 500);  // Exécution toutes les 500ms pour vérifier si les éléments sont présents

            return () => clearInterval(interval);  // Nettoyage pour éviter les fuites de mémoire
        }, []);  // Exécuté une seule fois lors du montage initial du composant

        // Ajout des attributs spécifiques pour les flèches de navigation et les éléments de Glide.js
        if (block.name === 'core/group' && block.attributes.className?.includes('glide__arrows')) {
            return (
                <BlockListBlock
                    {...props}
                    wrapperProps={{
                        ...props.wrapperProps,
                        'data-glide-el': 'controls',  // Ajout de l'attribut 'data-glide-el' pour Glide.js
                    }}
                />
            );
        }

        if (block.name === 'core/group' && block.attributes.className?.includes('glide__track')) {
            return (
                <BlockListBlock
                    {...props}
                    wrapperProps={{
                        ...props.wrapperProps,
                        'data-glide-el': 'track',  // Ajout de l'attribut 'data-glide-el' pour la piste de Glide.js
                    }}
                />
            );
        }

        if (block.name === 'core/button' && block.attributes.className?.includes('glide__arrow--left')) {
            return (
                <BlockListBlock
                    {...props}
                    wrapperProps={{
                        ...props.wrapperProps,
                        'data-glide-dir': '<',  // Ajout de l'attribut 'data-glide-dir' pour la flèche gauche
                    }}
                />
            );
        }

        if (block.name === 'core/button' && block.attributes.className?.includes('glide__arrow--right')) {
            return (
                <BlockListBlock
                    {...props}
                    wrapperProps={{
                        ...props.wrapperProps,
                        'data-glide-dir': '>',  // Ajout de l'attribut 'data-glide-dir' pour la flèche droite
                    }}
                />
            );
        }

        return <BlockListBlock {...props} />;  // Retourne le bloc inchangé si aucune condition n'est remplie
    };
}, 'addGlideAttributes');

// Application du filtre pour injecter les classes et attributs dans l'éditeur Gutenberg
addFilter(
    'editor.BlockListBlock',  // Cible tous les blocs dans l'éditeur
    'telescope-block-query/add-glide-attributes',  // Nom unique du filtre
    addGlideAttributes  // Fonction à appliquer
);
