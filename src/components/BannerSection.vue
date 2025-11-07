<template>
  <section class="banner">
    <div class="container">
      <div class="row">
        <h2 class="about-label fs-3">
          <span class="text-uppercase fw-bold">hace 40 años</span>,
          <br />
          decidimos unir nuestras vidas en matrimonio,<br />
          hoy queremos compartir con ustedes nuestra renovacion de votos
        </h2>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from "vue";
import gsap from "@/plugins/gsap";

onMounted(() => {
  // Seleccionamos todos los elementos internos: spans, br y texto
  const textElements = Array.from(
    document.querySelectorAll(".about-label span, .about-label br")
  );

  // Animación principal para todos los elementos
  gsap.from(textElements, {
    scrollTrigger: {
      trigger: ".about-label",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    opacity: 0,
    y: 40,
    scale: 0.98,
    rotationX: 2,
    duration: 1.2,
    ease: "power3.out",
    stagger: 0.06, // más elegante, no tan rápido
  });

  // Animación para el resto del texto que no está envuelto en span/br
  gsap.from(".about-label", {
    scrollTrigger: {
      trigger: ".about-label",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    opacity: 0,
    y: 20,
    duration: 1,
    ease: "power2.out",
    delay: 0.2,
  });
});
</script>

<style scoped>
.about-label {
  width: 80%;
  margin-inline: auto;
  margin-top: 1rem;
  margin-bottom: 5rem;
  font-weight: 400;
  font-style: italic;
  font-size: 1.5rem;
  line-height: 1.3;
  text-align: center;
  text-transform: lowercase;
}

/* ============================= */
/* RESPONSIVE MOBILE             */
/* ============================= */
@media (max-width: 768px) {
  .about-label {
    font-size: 4vmin !important;
    width: 90%;
    margin-bottom: 3rem;
    margin-top: 3rem;
  }
}
</style>
