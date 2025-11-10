<script setup>
import { ref, computed, watch } from "vue";

const isFocused = ref(false);
const searchQuery = ref("");
const selectedGuest = ref(null);
const notFound = ref(false);
const showResults = ref(false);
const isTyping = ref(false); // ✅ nueva bandera

const isActive = computed(
  () => isFocused.value || searchQuery.value.trim().length > 0
);

const guests = ref([
  { name: "Familia De Gante González", tickets_quantity: 4 },
  { name: "Familia Mariscal De Gante", tickets_quantity: 4 },
  { name: "Familia Aguilar González", tickets_quantity: 5 },
  { name: "Familia González Monterosa", tickets_quantity: 4 },
  { name: "Beatriz González Vilchis", tickets_quantity: 2 },
  { name: "Alejandra Hernández y Familia", tickets_quantity: 4 },
  { name: "Nadia Magdalena Laguna González y Familia", tickets_quantity: 4 },
  { name: "Rosa María González Ortíz", tickets_quantity: 1 },
  { name: "Araceli González Ortíz", tickets_quantity: 1 },
  { name: "Ramón Hernández González", tickets_quantity: 4 },
  { name: "Hermelinda Vilchis y René García", tickets_quantity: 2 },
  { name: "Roberto García Vilchis", tickets_quantity: 2 },
  { name: "Vanesa García", tickets_quantity: 2 },
  { name: "Familia Torres García", tickets_quantity: 4 },
  { name: "Ivonne Lopéz de la Fuente", tickets_quantity: 3 },
  { name: "Leticia Palma", tickets_quantity: 2 },
  { name: "Omar Rámirez Palma", tickets_quantity: 2 },
  { name: "Sonia Jiménez y Hugo Araoz", tickets_quantity: 2 },
  { name: "Abel Jiménez y Familia", tickets_quantity: 3 },
  { name: "María Esther Palma y Familia", tickets_quantity: 3 },
  { name: "Karina Palma y Familia", tickets_quantity: 3 },
  { name: "Erika Palma Del Valle y Familia", tickets_quantity: 6 },
  { name: "Karen Palma y Esposo", tickets_quantity: 2 },
  { name: "Silvia Palma y Anayeli Palma", tickets_quantity: 2 },
  { name: "Laura Vilchis Castillo", tickets_quantity: 1 },
  { name: "Patricia Urrieta y Familia", tickets_quantity: 3 },
  { name: "Fabiola Urrieta", tickets_quantity: 2 },
  { name: "Verónica Urrieta", tickets_quantity: 2 },
  { name: "Patricia Tinajero", tickets_quantity: 2 },
  { name: "Ivonne González Casas", tickets_quantity: 4 },
  { name: "Familia Toribio Rivera", tickets_quantity: 4 },
  { name: "Abraham González", tickets_quantity: 2 },
  { name: "Sandra González", tickets_quantity: 2 },
  { name: "Lorena González", tickets_quantity: 2 },
  { name: "Erika González", tickets_quantity: 2 },
  { name: "Alma Rosa Solis", tickets_quantity: 2 },
  { name: "Familia Mariscal Azpilcueta", tickets_quantity: 2 },
  { name: "Familia De Gante Martínez", tickets_quantity: 4 },
  { name: "Familia Rivera De Gante", tickets_quantity: 3 },
  { name: "Patricia De Gante y Familia", tickets_quantity: 3 },
  { name: "María De la Paz y Francisco", tickets_quantity: 3 },
  { name: "Arcelia Macias y Familia", tickets_quantity: 2 },
  { name: "Luzciel De Gante Macías", tickets_quantity: 2 },
  { name: "Nadxielii De Gante y Familia", tickets_quantity: 3 },
  { name: "Ludwing De Gante y Familia", tickets_quantity: 4 },
  { name: "Aurora Fernández Díaz", tickets_quantity: 1 },
  { name: "Graciel De Gante Fernández", tickets_quantity: 2 },
  { name: "Dalia De Gante y Familia", tickets_quantity: 3 },
  { name: "Familia Sánchez De Gante", tickets_quantity: 3 },
  { name: "Erik Cortez De Gante", tickets_quantity: 2 },
  { name: "Octavia Montiel", tickets_quantity: 2 },
  { name: "Francisco Briones", tickets_quantity: 2 },
  { name: "José Briones", tickets_quantity: 3 },
  { name: "Herzain Briones", tickets_quantity: 4 },
  { name: "Familia Torres Beltrán", tickets_quantity: 3 },
  { name: "Carmén Rojas", tickets_quantity: 2 },
  { name: "Familia Clemente Paniagua", tickets_quantity: 2 },
  { name: "Familia Portilla Clemente", tickets_quantity: 2 },
  { name: "Familia Barroso Clemente", tickets_quantity: 2 },
  { name: "Familia Arroyo Chávez", tickets_quantity: 5 },
  { name: "Familia De la Torre Arroyo", tickets_quantity: 2 },
  { name: "Leticia Moreno", tickets_quantity: 2 },
  { name: "Susana Alvarado y Familia", tickets_quantity: 3 },
  { name: "Paola Ruvalcaba", tickets_quantity: 2 },
  { name: "Eduardo Cardeña", tickets_quantity: 2 },
  { name: "Omar Moreira", tickets_quantity: 2 },
  { name: "Lucero López", tickets_quantity: 2 },
  { name: "Alessandra Garza de la Fuente", tickets_quantity: 2 },
  { name: "José Manuel Martínez Trens", tickets_quantity: 2 },
  { name: "Henry Jiménez", tickets_quantity: 1 },
  { name: "Luisa Ramírez", tickets_quantity: 1 },
  { name: "Fernanda Lopéz", tickets_quantity: 2 },
  { name: "Eréndira de Jesús", tickets_quantity: 1 },
  { name: "Natalia Elizondo", tickets_quantity: 1 },
  { name: "Yazmín Arana", tickets_quantity: 2 },
  { name: "Alfonso Áviles", tickets_quantity: 2 },
  { name: "Claudia Rodríguez", tickets_quantity: 2 },
  { name: "César López y Familia", tickets_quantity: 4 },
  { name: "Antonio Barragán", tickets_quantity: 2 },
]);

// 🔍 Computed para filtrar invitados
const filteredGuests = computed(() => {
  if (!showResults.value || searchQuery.value.trim() === "") return [];
  const results = guests.value.filter((guest) =>
    guest.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
  notFound.value = results.length === 0;
  return results;
});

// 🧠 Observador que solo limpia si el cambio viene del teclado
watch(searchQuery, (newValue, oldValue) => {
  if (isTyping.value) {
    selectedGuest.value = null;
    notFound.value = false;
  }
});

// Cuando el usuario escribe, marcamos que está tipeando
function onInput() {
  isTyping.value = true;
  showResults.value = true;
}

// Cuando selecciona un invitado, desactivamos esa bandera
function selectGuest(guest) {
  isTyping.value = false;
  selectedGuest.value = guest;
  searchQuery.value = guest.name;
  showResults.value = false;
  notFound.value = false;
}

function onSearch() {
  showResults.value = true;
  selectedGuest.value = null;
}

function confirmAttendance(phoneNumber) {
  if (!selectedGuest.value) return;
  const guestName = selectedGuest.value.name;
  const tickets = selectedGuest.value.tickets_quantity;

  const message = `✅ Hola, confirmo mi asistencia.\nNombre: ${guestName}\nBoletos: ${tickets}`;
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  window.open(url, "_blank");
}

function closeForm() {
  isFocused.value = false;
  searchQuery.value = "";
  showResults.value = false;
  selectedGuest.value = null;
  notFound.value = false;
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

      <div class="form-guests" :class="{ active: isActive }">
        <form
          class="d-flex flex-column align-items-center form-autocomplete"
          @submit.prevent="onSearch"
        >
          <div class="close-button-container">
            <p class="text-uppercase fw-bold playfair playfair-italic">
              Confirma tu asistencia
            </p>
            <button
              type="button"
              class="btn-close"
              aria-label="Close"
              @click="closeForm"
            ></button>
          </div>

          <div
            class="d-flex w-100 justify-content-center gap-2 form-autocomplete-input"
          >
            <input
              v-model="searchQuery"
              type="text"
              class="form-control form-control-wedding"
              placeholder="Busca tu nombre"
              @input="onInput"
              @focus="isFocused = true"
              @blur="isFocused = false"
            />
            <button type="submit" class="btn btn-primary">Buscar</button>
          </div>

          <div class="form-autocomplete-input autocomplete-content">
            <ul
              v-if="filteredGuests.length"
              class="list-group autocomplete-list-group"
            >
              <li
                v-for="guest in filteredGuests"
                :key="guest.name"
                class="list-group-item autocomplete-result-item"
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
              <h5 class="text-color-primary fw-bold fs-4">
                {{ selectedGuest.name }}
              </h5>
              <p>
                🎟 Tienes
                <strong>{{ selectedGuest.tickets_quantity }}</strong> boletos
                disponibles
              </p>
              <div
                class="d-flex flex-column flex-sm-row justify-content-center gap-2 mt-3"
              >
                <button
                  class="btn btn-outline<-success"
                  @click="confirmAttendance('+525514158115')"
                >
                  Confirmar con la novia 👰‍♀️
                </button>
                <button
                  class="btn btn-outline-success"
                  @click="confirmAttendance('+525533691211')"
                >
                  Confirmar con el novio 🤵‍♂️
                </button>
              </div>
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

<style lang="scss" scoped>
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
  overflow-y: auto;
  max-height: 200px;
}

.list-group-item {
  width: 100%;
  cursor: pointer;
}

.selected-guest-list {
  padding: 1rem 0.5rem;
  border: 1px solid var(--text-color);
}

.close-button-container {
  width: 100%;
  display: none;
  justify-content: space-between;
  padding: 1rem 1rem;
}

.form-autocomplete {
  position: relative;
}

.autocomplete-list-group {
  background-color: #fff;
  box-shadow: rgba(14, 63, 126, 0.06) 0px 0px 0px 1px,
    rgba(42, 51, 70, 0.03) 0px 1px 1px -0.5px,
    rgba(42, 51, 70, 0.04) 0px 2px 2px -1px,
    rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px,
    rgba(42, 51, 70, 0.03) 0px 5px 5px -2.5px,
    rgba(42, 51, 70, 0.03) 0px 10px 10px -5px,
    rgba(42, 51, 70, 0.03) 0px 24px 24px -8px;
}

.autocomplete-content {
  position: absolute;
  width: 100%;
  top: 4.5rem;
  z-index: 9999;
}

@media (max-width: 576px) {
  .form-guests {
    width: 100%;
    padding: 1rem;
  }
  .form-autocomplete {
    height: 100%;
    position: relative;
  }
  .form-guests.active {
    position: fixed;
    background-color: #fff;
    transition: all 0.3s ease;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999999;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px,
      rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
    border-top-left-radius: 0.95rem;
    border-top-right-radius: 0.95rem;
    .close-button-container {
      display: flex;
    }
  }
  .autocomplete-content {
    position: absolute;
    top: 10rem;
    width: 100%;
  }
  .autocomplete-result-item {
    border-radius: 0;
    margin: 0.25rem 0;
    border: none;
    font-family: var(--font-title);
    font-weight: 600;
  }
  .list-group {
    max-height: 100%;
  }
}
</style>
