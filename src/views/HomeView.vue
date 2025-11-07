<template>
  <main class="home-view">
    <HeroSection />
    <BannerSection />
    <AboutTimeSection />
    <FlowerDivider />
    <ScheduleSection />
    <SectionLayout>
      <template v-slot:w-section-layout-content>
        <p class="text-description text-center">
          Después de la ceremonia religiosa <br />
          acompañanos a celebrar en el
        </p>
        <div class="py-3">
          <p class="playfair playfair-italic display-5 text-center">Salón</p>
          <p
            class="playfair playfair-italic text-uppercase display-4 text-center"
          >
            Roca L' Club
          </p>
        </div>
        <p class="fw-bold text-center text-description">a las 8:00 PM</p>
      </template>
    </SectionLayout>
    <SectionLayout>
      <template v-slot:w-section-layout-content>
        <p class="text-description text-center">Código de vestimenta</p>
        <p
          class="playfair playfair-italic text-uppercase display-4 text-center py-4"
        >
          Formal
        </p>
        <p class="text-description text-center">
          Evitar los colores blanco y rojo, muchas gracias.
        </p>
      </template>
    </SectionLayout>
    <Autocomplete />
    <footer>
      <div class="container my-5 py-5 text-center">
        <BAsvg />
        <p class="pt-4 fw-light">
          13 de diciembre de 2025 | Bodas de Rubí | #Blanca&Argel
        </p>
      </div>
    </footer>
  </main>
</template>

<script>
import HeroSection from "@/components/HeroSection.vue";
import BannerSection from "@/components/BannerSection.vue";
import AboutTimeSection from "@/components/AboutTimeSection.vue";
import ScheduleSection from "@/components/ScheduleSection.vue";
import FlowerDivider from "@/components/FlowerDivider.vue";
import SectionLayout from "@/components/SectionLayout.vue";
import BAsvg from "@/components/BAsvg.vue";
import Autocomplete from "@/components/Autocomplete.vue";

export default {
  name: "HomeView",
  components: {
    HeroSection,
    BannerSection,
    AboutTimeSection,
    ScheduleSection,
    FlowerDivider,
    SectionLayout,
    BAsvg,
    Autocomplete,
  },
};
</script>
