<template>
  <section class="about-time">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-12">
          <div class="polaroid-container">
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
            <div class="polaroid-arrow">
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </div>
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
  const isMobile = window.innerWidth <= 768; // 📱 detectar móvil

  // Animación polaroid — solo aplica opacidad en desktop
  gsap.from(".polaroid-photo", {
    scrollTrigger: {
      trigger: ".polaroid-gallery",
      start: "top 75%",
      scrub: 1,
    },
    y: isMobile ? 0 : (index) => index * 40 - 60, // sin movimiento en mobile
    opacity: isMobile ? 1 : 0, // sin efecto de fade en mobile
    duration: 1.8,
    ease: "power3.out",
    stagger: 0.3,
  });

  // Animación del título
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

  // Animación de párrafos
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

  // 💫 Flecha que avanza el scroll
  const gallery = document.querySelector(".polaroid-gallery");
  const arrow = document.querySelector(".polaroid-arrow");

  if (arrow && gallery) {
    arrow.addEventListener("click", () => {
      const scrollAmount = gallery.clientWidth * 0.8;
      gallery.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    });

    // 🔄 Ocultar flecha al llegar al final
    gallery.addEventListener("scroll", () => {
      const isAtEnd =
        gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth - 10;
      arrow.style.opacity = isAtEnd ? "0" : "1";
      arrow.style.pointerEvents = isAtEnd ? "none" : "auto";
    });
  }
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
    gap: 0.75rem;
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
      width: 83%;
      border-radius: 0.5rem;
      object-fit: cover;
      background-color: #fff;
      box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px,
        rgb(209, 213, 219) 0px 0px 0px 1px inset;
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

  .polaroid-container {
    position: relative;
  }
  .polaroid-arrow {
    position: absolute;
    background-color: #fff;
    top: 50%;
    right: 10px;
    padding: 0.75rem;
    border-radius: 100%;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
      rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
