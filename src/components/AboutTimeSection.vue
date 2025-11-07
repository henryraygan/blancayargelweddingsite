<template>
  <section class="about-time">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-12">
          <div class="polaroid-gallery">
            <img
              class="polaroid-photo"
              :src="require('@/assets/media/jovenes.png')"
              alt=""
            />
            <img
              class="polaroid-photo"
              :src="require('@/assets/media/casados.png')"
              alt=""
            />
            <img
              class="polaroid-photo"
              :src="require('@/assets/media/actual.png')"
              alt=""
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12">
          <h2
            class="playfair-title text-uppercase text-md-center fst-italic mt-5 mb-4"
          >
            Lo que el tiempo <br />
            nos ha mostrado
          </h2>
          <div class="about-time-description">
            <p>
              Cuarenta años de vida compartida nos han enseñado que el amor se
              construye día a día, entre aciertos, retos y muchos aprendizajes.
              Entendimos que el amor no es destino, es una elección constante:
              elegir acompañarse, cuidarse y seguir caminando juntos.
            </p>
            <p>
              Hoy queremos celebrar este recorrido con las personas que han
              formado parte de nuestra historia.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from "vue";
import gsap from "@/plugins/gsap";

onMounted(() => {
  gsap.from(".polaroid-photo", {
    scrollTrigger: {
      trigger: ".polaroid-gallery",
      start: "top 75%",
      scrub: 1,
    },
    y: (index) => index * 40 - 60,
    opacity: 0,
    duration: 1.8,
    ease: "power3.out",
    stagger: 0.3,
  });

  // Animación del título principal (línea por línea)
  gsap.from("h2.playfair-title br, h2.playfair-title", {
    scrollTrigger: {
      trigger: "h2.playfair-title",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power3.out",
    stagger: 0.2,
  });

  // Animación del párrafo de descripción
  gsap.from(".about-time-description p", {
    scrollTrigger: {
      trigger: ".about-time-description",
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    y: 30,
    duration: 1,
    ease: "power2.out",
    stagger: 0.3,
  });
});
</script>


<style lang="scss" scoped>
.about-time {
  padding-block: 3rem;
  margin-block: 2rem;
}

.polaroid-gallery {
  position: relative;
  min-height: 100vh;
  padding: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.polaroid-photo {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
  object-fit: cover;
  width: 20rem;
  height: 20rem;
  transition: transform 0.3s ease;
  position: absolute;
}

.polaroid-photo:nth-child(1) {
  transform: rotate(5deg);
  top: 0;
  right: 0;
}
.polaroid-photo:nth-child(2) {
  transform: rotate(-25deg);
  top: 35%;
  left: 10%;
}
.polaroid-photo:nth-child(3) {
  transform: rotate(6deg);
  top: 65%;
  left: 40%;
}

.about-time-description {
  border-radius: 8px;
  padding: 2rem 5rem;
  font-weight: 200;
  font-size: 1.5rem;
  text-align: center;
}

/* ============================= */
/* RESPONSIVE MOBILE             */
/* ============================= */
@media (max-width: 768px) {
  .polaroid-gallery {
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    min-height: auto;
    overflow-x: auto;
    padding: 1rem 0.5rem;

    .polaroid-photo {
      position: relative;
      transform: none;
      left: initial;
      right: initial;
      top: initial;
      bottom: initial;
      border-radius: 0.5rem;
    }
  }

  .about-time {
    padding-block: 1rem;
    margin-block: 1rem;
  }

  .about-time-description {
    padding: 0;
    text-align: left;
    font-size: 1.3rem;
  }
}
</style>
