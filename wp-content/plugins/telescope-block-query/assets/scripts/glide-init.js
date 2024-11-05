document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.glide');
    
    carousels.forEach((carousel) => {
        new Glide(carousel, {
            rewind: false,       // Désactiver le rewind
            perView: 3,          // Nombre de slides visibles
            gap: 20,             // Espace entre les slides
            breakpoints: {       // Ajuster le nombre de slides selon la taille de l'écran
                800: {
                    perView: 2    // 2 slides visibles pour les écrans inférieurs à 800px
                },
                480: {
                    perView: 1    // 1 slide visible pour les écrans inférieurs à 480px
                }
            }
        }).mount();
    });
});