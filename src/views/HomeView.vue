<template>
  <main class="home-view">
    <HeroSection />
    <BannerSection />
    <AboutTimeSection />
    <FlowerDivider />
    <Divider />
    <ScheduleSection />
    <Divider />

    <!-- 🕊 Sección del salón -->
    <SectionLayout ref="salonSection">
      <template v-slot:w-section-layout-content>
        <p class="text-description text-center">
          Después de la ceremonia religiosa <br />
          acompáñanos a celebrar en el
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
        <div
          class="d-flex justify-content-center my-5 flex-column align-items-center"
        >
          <a
            class="btn btn-primary btn-lg mb-3"
            href="//maps.app.goo.gl/6xumb6NJ3HwNsmWU8"
            target="_blank"
            >Ver en el mapa</a
          >
        </div>
      </template>
    </SectionLayout>

    <Divider />

    <!-- 👗 Sección del código de vestimenta -->
    <SectionLayout ref="dressCodeSection">
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

    <Divider />

    <!-- 🎁 Mesa de regalos -->
    <section>
      <div class="container">
        <div class="text-center">
          <div class="gift-ad">
            <p class="text-center text-description">
              Lo más importante para nosotros es compartir este día con ustedes.
              Si desean hacernos un obsequio, pueden hacerlo a través de nuestra
              mesa de regalos
            </p>
          </div>
          <h4 class="text-uppercase text-center py-3 my-4">
            mesa de regalos liverpool
          </h4>
          <a
            class="fs-1 text-decoration-none text-color-primary"
            href="https://mesaderegalos.liverpool.com.mx/milistaderegalos/51831072"
            target="_blank"
          >
            <span class="fw-bold fst-italic fs-4">Blanca Estela González</span>
            <br />
            <span class="text-decoration-underline">51831072</span>
          </a>
        </div>
      </div>
    </section>

    <Divider />

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
import { onMounted, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import HeroSection from "@/components/HeroSection.vue";
import BannerSection from "@/components/BannerSection.vue";
import AboutTimeSection from "@/components/AboutTimeSection.vue";
import ScheduleSection from "@/components/ScheduleSection.vue";
import FlowerDivider from "@/components/FlowerDivider.vue";
import SectionLayout from "@/components/SectionLayout.vue";
import BAsvg from "@/components/BAsvg.vue";
import Autocomplete from "@/components/Autocomplete.vue";
import Divider from "@/components/Divider.vue";

gsap.registerPlugin(ScrollTrigger);

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
    Divider,
  },
  setup() {
    const salonSection = ref(null);
    const dressCodeSection = ref(null);

    onMounted(() => {
      // ✨ Animación suave al hacer scroll
      const animateSection = (el) => {
        gsap.from(el.querySelectorAll("p, a, button"), {
          opacity: 0,
          y: 40,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      };

      if (salonSection.value?.$el) animateSection(salonSection.value.$el);
      if (dressCodeSection.value?.$el)
        animateSection(dressCodeSection.value.$el);
    });

    return { salonSection, dressCodeSection };
  },
};
</script>
