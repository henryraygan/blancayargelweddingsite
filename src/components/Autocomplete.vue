<script setup>
import { ref, computed } from "vue";

const guests = ref([
  { name: "Blanca y Argel", tickets_quantity: 4 },
  { name: "Blanquita y Antonio", tickets_quantity: 4 },
  { name: "Homero Aguilar", tickets_quantity: 5 },
  { name: "José A.González V.", tickets_quantity: 4 },
  { name: "Beatriz González V.", tickets_quantity: 6 },
  { name: "Magdalena Laguna G.", tickets_quantity: 4 },
  { name: "Rosa Ma. Y Araceli", tickets_quantity: 2 },
  { name: "Enrique Toribio", tickets_quantity: 4 },
  { name: "Hermelinda Vilchis C.", tickets_quantity: 4 },
  { name: "Vanesa García", tickets_quantity: 2 },
  { name: "Leticia Palma (Omar)", tickets_quantity: 4 },
  { name: "Hector Torres (Male)", tickets_quantity: 4 },
  { name: "Sonia Jimenez", tickets_quantity: 2 },
  { name: "Abel Jimenez", tickets_quantity: 3 },
  { name: "Ma. Esther Palma", tickets_quantity: 3 },
  { name: "Karina Palma", tickets_quantity: 3 },
  { name: "Ivón González", tickets_quantity: 3 },
  { name: "Ivón Lopéz (Pamela)", tickets_quantity: 3 },
  { name: "Estela Beltrán", tickets_quantity: 3 },
  { name: "Carmén Rojas", tickets_quantity: 2 },
  { name: "Everardo Clemente (Gaby)", tickets_quantity: 2 },
  { name: "Gabriela Clemente", tickets_quantity: 2 },
  { name: "Monica Clemente", tickets_quantity: 2 },
  { name: "Julio Arroyo ( Beatriz)", tickets_quantity: 5 },
  { name: "Beatriz Arrroyo (Jr)", tickets_quantity: 2 },
  { name: "Leticia Moreno", tickets_quantity: 2 },
  { name: "Francisco De Gante U.", tickets_quantity: 4 },
  { name: "Humberto Rivera (Angelica)", tickets_quantity: 3 },
  { name: "Patricia De Gante U.", tickets_quantity: 3 },
  { name: "Maria de la Paz (Paco)", tickets_quantity: 3 },
  { name: "Arcelia Macias", tickets_quantity: 2 },
  { name: "Luzciel De Gante M.", tickets_quantity: 2 },
  { name: "Nadxieli De Gante M.", tickets_quantity: 3 },
  { name: "Ludwing De Gante", tickets_quantity: 4 },
  { name: "Aurora Fernández", tickets_quantity: 1 },
  { name: "Graciel De Gante F.", tickets_quantity: 2 },
  { name: "Dalia De Gante F.", tickets_quantity: 3 },
  { name: "Laura De Gante F.", tickets_quantity: 3 },
  { name: "Erik Cortez", tickets_quantity: 2 },
  { name: "Eduardo Cardeña", tickets_quantity: 2 },
  { name: "Omar Moreira", tickets_quantity: 2 },
  { name: "Lucero", tickets_quantity: 2 },
  { name: "Alessandra Garza", tickets_quantity: 2 },
  { name: "José Manuel", tickets_quantity: 2 },
  { name: "Henry Jimenez", tickets_quantity: 1 },
  { name: "Luisa Ramirez", tickets_quantity: 1 },
  { name: "Fernanda Lopéz", tickets_quantity: 2 },
  { name: "Erendira", tickets_quantity: 1 },
  { name: "Natalia Elizondo", tickets_quantity: 1 },
  { name: "Yazmin Arana", tickets_quantity: 2 },
  { name: "Alfonso Aviles", tickets_quantity: 2 },
  { name: "Claudia Rodriguez", tickets_quantity: 2 },
  { name: "Laura Vilchis", tickets_quantity: 1 },
  { name: "Patricia Urrieta", tickets_quantity: 3 },
  { name: "Fabiola Urrieta", tickets_quantity: 2 },
  { name: "Veronica Urrieta", tickets_quantity: 2 },
  { name: "Erika Palma", tickets_quantity: 2 },
  { name: "Ramón Hernández González", tickets_quantity: 4 },
  { name: "Susana Alvarado", tickets_quantity: 3 },
  { name: "Silvia Palma", tickets_quantity: 1 },
  { name: "Nayeli Palma", tickets_quantity: 2 },
  { name: "Karen Palma", tickets_quantity: 1 },
  { name: "Abraham González", tickets_quantity: 2 },
  { name: "Sandra González", tickets_quantity: 2 },
  { name: "Lorena González", tickets_quantity: 2 },
  { name: "Erika González", tickets_quantity: 2 },
  { name: "Alma Rosa Solis", tickets_quantity: 2 },
  { name: "Paola Ruvalcaba", tickets_quantity: 2 },
  { name: "Octavia Montiel", tickets_quantity: 2 },
  { name: "Francisco Briones", tickets_quantity: 2 },
  { name: "José Briones", tickets_quantity: 3 },
  { name: "Herzain Briones", tickets_quantity: 4 },
  { name: "Cesar Lopez", tickets_quantity: 3 },
  { name: "Miguel Marroquin", tickets_quantity: 3 },
]);

const searchQuery = ref("");
const selectedGuest = ref(null);
const notFound = ref(false);
const showResults = ref(false);

const filteredGuests = computed(() => {
  if (!showResults.value || searchQuery.value.trim() === "") return [];
  const results = guests.value.filter((guest) =>
    guest.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
  notFound.value = results.length === 0;
  return results;
});

function onSearch() {
  showResults.value = true;
  selectedGuest.value = null;
}

function selectGuest(guest) {
  selectedGuest.value = guest;
  searchQuery.value = guest.name;
  showResults.value = false;
  notFound.value = false;
}

function confirmAttendance() {
  alert(
    `✅ Asistencia confirmada para ${selectedGuest.value.name}. Boletos disponibles: ${selectedGuest.value.tickets_quantity}`
  );
}
</script>

<template>
  <section class="section-list">
    <div class="container">
      <h4
        class="text-color-secondary text-center text-uppercase py-3 fs-2 playfair playfair-italic"
      >
        Confirma tu asistencia
      </h4>

      <p class="text-color-secondary text-center fw-light">
        Escribe tu nombre para consultar tus boletos reservados
      </p>

      <div class="form-guests">
        <form
          class="d-flex flex-column align-items-center"
          @submit.prevent="onSearch"
        >
          <div class="d-flex w-100 justify-content-center gap-2">
            <input
              v-model="searchQuery"
              type="text"
              class="form-control form-control-wedding"
              placeholder="Busca tu nombre"
              @input="showResults = true"
            />
            <button type="submit" class="btn btn-primary">Buscar</button>
          </div>

          <div class="autocomplete-content">
            <ul v-if="filteredGuests.length" class="list-group">
              <li
                v-for="guest in filteredGuests"
                :key="guest.name"
                class="list-group-item list-group-item-action"
                @click="selectGuest(guest)"
              >
                {{ guest.name }}
              </li>
            </ul>

            <p v-if="notFound" class="text-danger mt-2">
              ❌ No encontramos tu nombre. Verifica ortografía o comunícate con
              los anfitriones.
            </p>

            <div
              v-if="selectedGuest"
              class="card mt-3 p-3 text-center selected-guest-list"
            >
              <h5>{{ selectedGuest.name }}</h5>
              <p>
                🎟 Tienes
                <strong>{{ selectedGuest.tickets_quantity }}</strong> boletos
                disponibles
              </p>
              <button class="btn btn-success" @click="confirmAttendance">
                Confirmar Asistencia
              </button>
            </div>
          </div>
        </form>
      </div>

      <p class="text-color-secondary text-center fw-light mb-4 mt-4">
        Ejemplo: "Familia González Torres" o "Jazmín Fernandez"
      </p>
    </div>
  </section>
</template>

<style scoped>
.section-list {
  padding: 2rem 0;
}

.form-guests {
  margin: 0 auto;
  width: 100%;
  max-width: 600px;
  padding: 1rem 0.5rem;
  position: relative;
}

.list-group {
  padding: 1rem;
  overflow-y: auto;
  max-height: 200px;
}

.list-group-item {
  cursor: pointer;
}

.selected-guest-list {
  padding: 1rem 0.5rem;
}

.autocomplete-content {
  position: relative;
}

@media (max-width: 576px) {
  .form-guests {
    width: 100%;
    padding: 1rem;
  }
}
</style>
