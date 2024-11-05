import { store } from '@wordpress/interactivity';

store("telescope-api-interactivity/button-interactivity", {
  actions: {
    showNotification() {
      butterup.toast({
        message: 'Ton adresse e-mail s\'envole vers d\'autres cieux ! 🚀',
        duration: 3000,
        dismissible: true,
        location: 'bottom-right',
        theme: 'telescope'
      });
    }
  },
});
