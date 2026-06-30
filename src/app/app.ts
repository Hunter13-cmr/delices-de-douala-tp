import { Component, computed, signal } from '@angular/core';

import { HeaderComponent } from './components/header/header';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list';

import { Restaurant } from './models/restaurant';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    RestaurantListComponent
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  // Afficher uniquement les restaurants ≥ 4 étoiles
  showBestOnly = signal(false);

  // Les restaurants imposés
  restaurants = signal<Restaurant[]>([
    {
      id: 1,
      name: 'Le Calao Doré',
      district: 'Akwa',
      specialty: 'Ndolé aux crevettes',
      currentRating: 0,
      image: '/images/ndole-crevettes.jpg'
    },
    {
      id: 2,
      name: 'Chez Madame Ngono',
      district: 'Bonapriso',
      specialty: 'Eru aux pieds de bœuf',
      currentRating: 0,
      image: '/images/eru-pieds-boeuf.jpg'
    },
    {
      id: 3,
      name: 'La Fourchette Camerounaise',
      district: 'Bonanjo',
      specialty: 'Poulet DG',
      currentRating: 0,
      image: '/images/poulet-dg.jpg'
    },
    {
      id: 4,
      name: 'Saveurs du Wouri',
      district: 'Bonamoussadi',
      specialty: 'Poisson braisé',
      currentRating: 0,
      image: '/images/poisson-braise.jpg'
    },
    {
      id: 5,
      name: "L'Akwa Gourmand",
      district: 'Akwa',
      specialty: 'Bobolo et sauce arachide',
      currentRating: 0,
      image: '/images/bobolo-sauce-arachide.jpg'
    },
    {
      id: 6,
      name: 'Le Royal de Bali',
      district: 'Bali',
      specialty: 'Koki et plantain',
      currentRating: 0,
      image: '/images/koki-plantain.jpg'
    }
  ]);

  // Nombre de restaurants notés
  ratedCount = computed(() =>
    this.restaurants().filter(r => r.currentRating > 0).length
  );

  // Moyenne des notes
  averageRating = computed(() => {

    const rated = this.restaurants()
      .filter(r => r.currentRating > 0);

    if (rated.length === 0) {
      return 0;
    }

    const total = rated.reduce(
      (sum, restaurant) => sum + restaurant.currentRating,
      0
    );

    return Number((total / rated.length).toFixed(1));

  });

  // Liste triée et filtrée
  filteredRestaurants = computed(() => {

    let list = [...this.restaurants()];

    if (this.showBestOnly()) {
      list = list.filter(r => r.currentRating >= 4);
    }

    return list.sort((a, b) => b.currentRating - a.currentRating);

  });

  // Mise à jour de la note d'un restaurant
  updateRestaurantRating(event: {
    restaurantId: number;
    rating: number;
  }) {

    this.restaurants.update(restaurants =>
      restaurants.map(restaurant => {

        if (restaurant.id !== event.restaurantId) {
          return restaurant;
        }

        return {
          ...restaurant,
          currentRating: event.rating
        };

      })
    );

  }

  // Activer/Désactiver le filtre
  toggleFilter() {
    this.showBestOnly.update(value => !value);
  }

}