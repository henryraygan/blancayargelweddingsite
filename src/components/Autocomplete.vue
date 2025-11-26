<script setup>
import { ref, computed, watch } from "vue";

const isFocused = ref(false);
const searchQuery = ref("");
const selectedGuest = ref(null);
const notFound = ref(false);
const showResults = ref(false);
const isTyping = ref(false);
const confirmedTickets = ref(0); // 🎟 cantidad confirmada por el invitado
const step = ref(1); // wizard step: 1 = selección, 2 = confirmación o declinar
const actionType = ref("confirm"); // "confirm" o "decline"

// Computed para input activo
const isActive = computed(
  () => isFocused.value || searchQuery.value.trim().length > 0
);

// Lista de invitados
const guests = ref([
  { name: "Familia De Gante González", tickets_quantity: 4 },
  { name: "Familia Mariscal De Gante", tickets_quantity: 4 },
  { name: "Familia Aguilar González", tickets_quantity: 5 },
  { name: "Familia González Monterosa", tickets_quantity: 4 },
  { name: "Beatriz González Vilchis", tickets_quantity: 2 },
  { name: "Alejandra Hernández y Familia", tickets_quantity: 5 },
  { name: "Nadia Magdalena Laguna González y Familia", tickets_quantity: 4 },
  { name: "Rosa María González Ortíz", tickets_quantity: 1 },
  { name: "Araceli González Ortíz", tickets_quantity: 1 },
  { name: "Ramón Hernández González", tickets_quantity: 4 },
  { name: "Hermelinda Vilchis y René García", tickets_quantity: 3 },
  { name: "Roberto García Vilchis", tickets_quantity: 2 },
  { name: "Raúl García Vilchis y Familia", tickets_quantity: 3 },
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
  { name: "Abraham González", tickets_quantity: 2 },
  { name: "Sandra González", tickets_quantity: 2 },
  { name: "Erika González", tickets_quantity: 2 },
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
  { name: "Erik Cortés De Gante", tickets_quantity: 2 },
  { name: "Octavia Montiel", tickets_quantity: 2 },
  { name: "Francisco Briones", tickets_quantity: 2 },
  { name: "José Briones", tickets_quantity: 3 },
  { name: "Gersain Briones", tickets_quantity: 5 },
  { name: "Familia Torres Beltrán", tickets_quantity: 3 },
  { name: "Carmén Rojas", tickets_quantity: 2 },
  { name: "Familia Clemente Paniagua", tickets_quantity: 2 },
  { name: "Familia Portilla Clemente", tickets_quantity: 2 },
  { name: "Familia Barroso Clemente", tickets_quantity: 2 },
  { name: "Familia Arroyo Chávez", tickets_quantity: 5 },
  { name: "Familia De la Torre Arroyo", tickets_quantity: 2 },
  { name: "Leticia Moreno", tickets_quantity: 2 },
  { name: "Susana Alvarado y Familia", tickets_quantity: 3 },
  { name: "Eduardo Cardeña", tickets_quantity: 2 },
  { name: "Omar Moreira", tickets_quantity: 2 },
  { name: "Lucero López", tickets_quantity: 2 },
  { name: "Alessandra Garza de la Fuente", tickets_quantity: 2 },
  { name: "José Manuel Martínez Trens", tickets_quantity: 2 },
  { name: "Alejandra Reyes Flores", tickets_quantity: 3 },
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
  { name: "Pilar Espinoza Lecona y Esposo", tickets_quantity: 2 },
  { name: "Paola Robles Espinoza y Esposo", tickets_quantity: 2 },
  { name: "Joselin Robles Espinosa", tickets_quantity: 2 },
  { name: "Brenda Guadalupe Martínez Irigoyen", tickets_quantity: 3 },
  { name: "Marcos Cruz Arce", tickets_quantity: 2 },
]);

// Normalizar texto
function normalizeText(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

// Filtrado de invitados
const filteredGuests = computed(() => {
  if (!showResults.value || searchQuery.value.trim() === "") return [];
  const query = normalizeText(searchQuery.value);
  const results = guests.value.filter((guest) =>
    normalizeText(guest.name).includes(query)
  );
  notFound.value = results.length === 0;
  return results;
});

// Observador para input
watch(searchQuery, () => {
  if (isTyping.value) {
    selectedGuest.value = null;
    notFound.value = false;
  }
});

function onInput() {
  isTyping.value = true;
  showResults.value = true;
}

function selectGuest(guest) {
  isTyping.value = false;
  selectedGuest.value = guest;
  confirmedTickets.value = guest.tickets_quantity;
  searchQuery.value = guest.name;
  showResults.value = false;
  notFound.value = false;
  step.value = 1;
  actionType.value = "confirm";
}

function onSearch() {
  showResults.value = true;
  selectedGuest.value = null;
}

function increaseTickets() {
  if (
    selectedGuest.value &&
    confirmedTickets.value < selectedGuest.value.tickets_quantity
  ) {
    confirmedTickets.value++;
  }
}

function decreaseTickets() {
  if (confirmedTickets.value > 1) {
    confirmedTickets.value--;
  }
}

// Continuar al paso 2 según acción
function continueStep(type = "confirm") {
  if (type === "confirm" && confirmedTickets.value > 0) {
    step.value = 2;
    actionType.value = "confirm";
  }
  if (type === "decline") {
    step.value = 2;
    actionType.value = "decline";
  }
}

// Detectar si es un dispositivo móvil
function isMobile() {
  return /Mobi|Android/i.test(navigator.userAgent);
}

// Función para enviar mensaje de confirmación
function confirmAttendance(phoneNumber) {
  if (!selectedGuest.value) return;

  const guestName = selectedGuest.value.name;
  const totalTickets = selectedGuest.value.tickets_quantity;
  const confirmed = confirmedTickets.value;
  const message = `✅ Hola, confirmo mi asistencia.\nNombre: ${guestName}\nBoletos confirmados: ${confirmed}\nBoletos asignados: ${totalTickets}`;
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  if (isMobile()) {
    // En móviles reemplaza la página actual
    window.location.href = url;
  } else {
    // En desktop abre nueva pestaña
    window.open(url, "_blank", "noopener,noreferrer");
  }

  closeForm();
}

// Función para enviar mensaje de declinar
function sendDecline(phoneNumber) {
  if (!selectedGuest.value) return;

  const guestName = selectedGuest.value.name;
  const message = `❌ Hola, lamentablemente no podré asistir.\nNombre: ${guestName}`;
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  if (isMobile()) {
    window.location.href = url;
  } else {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  closeForm();
}

function closeForm() {
  isFocused.value = false;
  searchQuery.value = "";
  showResults.value = false;
  selectedGuest.value = null;
  notFound.value = false;
  step.value = 1;
}

function goBack() {
  step.value = 1;
  actionType.value = "confirm";
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

            <p v-if="notFound" class="text-danger mt-2 fw-light">
              ❌ No encontramos tu nombre. Verifica ortografía o comunícate con
              los anfitriones.
            </p>

            <!-- Wizard -->
            <div
              v-if="selectedGuest"
              class="card text-center selected-guest-list"
            >
              <h5 class="text-color-primary fw-bold fs-4 mb-2">
                {{ selectedGuest.name }}
              </h5>
              <p class="fw-light">
                <ion-icon name="ticket-outline"></ion-icon> Tienes
                <strong>{{ selectedGuest.tickets_quantity }}</strong> boletos
                disponibles
              </p>

              <!-- Paso 1 -->
              <div v-if="step === 1">
                <div
                  v-if="actionType === 'confirm'"
                  class="d-flex justify-content-center align-items-center gap-3 mt-3 ticket-counter"
                >
                  <button
                    type="button"
                    class="btn btn-outline-secondary btn-round"
                    @click="decreaseTickets"
                    :disabled="confirmedTickets === 1"
                  >
                    −
                  </button>
                  <span class="fs-5 fw-bold text-color-primary">{{
                    confirmedTickets
                  }}</span>
                  <button
                    type="button"
                    class="btn btn-outline-secondary btn-round"
                    @click="increaseTickets"
                    :disabled="
                      confirmedTickets === selectedGuest.tickets_quantity
                    "
                  >
                    +
                  </button>
                </div>

                <p
                  class="mt-2 text-muted small"
                  v-if="actionType === 'confirm'"
                >
                  Confirmarás {{ confirmedTickets }} de
                  {{ selectedGuest.tickets_quantity }} boletos
                </p>

                <div
                  class="d-flex flex-column justify-content-center gap-2 mt-3 p-3"
                >
                  <button
                    v-if="actionType === 'confirm'"
                    class="btn btn-outline-success"
                    @click="continueStep('confirm')"
                  >
                    Sí, asitiré
                  </button>
                  <button class="btn btn-link" @click="continueStep('decline')">
                    No podré asistir
                  </button>
                </div>
              </div>

              <!-- Paso 2 -->
              <div v-else-if="step === 2">
                <p class="fs-6 text-center text-muted">
                  {{
                    actionType === "confirm"
                      ? `Confirmarás ${confirmedTickets} de ${selectedGuest.tickets_quantity} boletos`
                      : "¿Con quién quieres notificar que no asistirás?"
                  }}
                </p>

                <div
                  class="d-flex flex-column justify-content-center gap-2 mt-3 p-3"
                >
                  <button
                    v-if="actionType === 'confirm'"
                    class="btn btn-outline-success"
                    @click="confirmAttendance('+525514158115')"
                  >
                    Confirmar con la novia 👰‍♀️
                  </button>
                  <button
                    v-if="actionType === 'confirm'"
                    class="btn btn-outline-success"
                    @click="confirmAttendance('+525533691211')"
                  >
                    Confirmar con el novio 🤵‍♂️
                  </button>

                  <button
                    v-if="actionType === 'decline'"
                    class="btn btn-outline-success"
                    @click="sendDecline('+525514158115')"
                  >
                    Notificar a la novia 👰‍♀️
                  </button>
                  <button
                    v-if="actionType === 'decline'"
                    class="btn btn-outline-success"
                    @click="sendDecline('+525533691211')"
                  >
                    Notificar al novio 🤵‍♂️
                  </button>

                  <button class="btn btn-link" @click="goBack">← Volver</button>
                </div>
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
/* Mantengo tu CSS original */
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
  border: 1px solid var(--text-color);
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: rgba(14, 63, 126, 0.06) 0px 0px 0px 1px,
    rgba(42, 51, 70, 0.03) 0px 1px 1px -0.5px,
    rgba(42, 51, 70, 0.04) 0px 2px 2px -1px;
  height: 300px;
  display: flex;
  justify-content: center;
  height: max-content;
  padding: 1rem;
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
.autocomplete-content {
  position: absolute;
  width: 100%;
  top: 4.5rem;
  z-index: 9999;
}

.autocomplete-content .text-danger {
  display: block;
  background-color: #fff;
  padding: 0.75rem 1rem;
  border-radius: 0.25rem;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  font-weight: 600;
  color: #b02a37;
  text-align: center;
  margin: 0.25rem 0;
  box-shadow: rgba(14, 63, 126, 0.06) 0px 0px 0px 1px,
    rgba(42, 51, 70, 0.03) 0px 1px 1px -0.5px,
    rgba(42, 51, 70, 0.04) 0px 2px 2px -1px;
}
.form-control:focus {
  color: var(--bs-body-color);
  background-color: var(--bs-body-bg);
  border-color: #9e0505;
  outline: 0;
  box-shadow: 0px 4px 11.9px 0px rgba(0, 0, 0, 0.25);
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
    background-color: var(--white);
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
    top: 10rem;
    width: 100%;
  }
  .autocomplete-result-item {
    border-radius: 0;
    margin: 0.25rem 0;
    border: none;
    font-weight: 400;
  }
  .list-group {
    max-height: 70vh;
    padding: 0.25rem;
  }
}
</style>
