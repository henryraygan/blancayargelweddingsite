<script setup>
import { onMounted } from "vue";
import gsap from "@/plugins/gsap";

onMounted(() => {
  gsap.from(".ruby-title", {
    opacity: 0,
    y: 50,
    duration: 2,
    ease: "power4.out",
  });

  gsap.from(".title-hero svg", {
    opacity: 0,
    scale: 0.8,
    duration: 2,
    ease: "power3.out",
    delay: 0.3,
  });
});
</script>

<template>
  <section class="hero">
    <div class="container">
      <div class="row">
        <h2
          class="playfair-italic text-uppercase text-center fst-italic fw-lighter ruby-title"
        >
          Bodas de rubí
        </h2>
      </div>
      <div class="row">
        <div class="title-hero title-hero-desktop-only">
          <TitleHeader />
        </div>
        <div class="title-hero title-hero-mobile-only">
          <TitleHeaderMobile />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import TitleHeader from "@/components/TitleHeader.vue";
import TitleHeaderMobile from "@/components/TitleHeaderMobile.vue";

export default {
  name: "HeroSection",
  components: {
    TitleHeader,
    TitleHeaderMobile,
  },
};
</script>

<style lang="scss" scoped>
.hero {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 6rem;
}

.title-hero {
  width: min(100%, 900px);
  margin-inline: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ruby-title {
  letter-spacing: 0.45rem;
}

.title-hero-mobile-only {
  display: none;
}

/* ============================= */
/* RESPONSIVE MOBILE             */
/* ============================= */
@media (max-width: 768px) {
  .title-hero-desktop-only {
    display: none;
  }
  .title-hero-mobile-only {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 2rem;
  }

  .ruby-title {
    font-size: 1rem;
    font-weight: 200;
    text-align: center;
  }
  .title-hero {
    svg {
      width: 300px !important;
      height: auto !important;
    }
  }
}
</style>
