<template>
  <section
    class="section-layout"
    :style="{
      '--left-decor': `url(${leftDecor})`,
      '--right-decor': `url(${rightDecor})`,
    }"
  >
    <div class="container">
      <slot name="w-section-layout-content"></slot>
    </div>
  </section>
</template>

<script setup>
import leftDecor from "@/assets/media/left-decor.svg";
import rightDecor from "@/assets/media/right-decor.svg";
</script>

<style lang="scss" scoped>
.section-layout {
  position: relative;
  padding: 1rem 0;
  margin-bottom: 9rem;
  display: flex;
  justify-content: center;
}

.section-layout::before,
.section-layout::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 400px;
  height: 100%;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  transform: translateY(-50%);
  pointer-events: none;
  width: 22vw; /* o cualquier % del viewport */
  max-width: 400px; /* no crezca demasiado */
  height: 100%;
}

/* left side */
.section-layout::before {
  left: 0;
  background-image: var(--left-decor);
}

/* right side */
.section-layout::after {
  right: 0;
  background-image: var(--right-decor);
}

@media (max-width: 768px) {
  .section-layout {
    margin-bottom: 0.5rem;
  }

  .section-layout::before,
  .section-layout::after {
    content: "";
    background-image: none;
  }
}
</style>
