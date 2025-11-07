<template>
  <section class="schedule">
    <div class="container">
      <div class="save-the-date-title">
        <Flower class="no-mobile" width="250" />
        <div class="save-the-date-title-content">
          <span class="save-the-date-title-content-label">Te esperamos el</span>
          <span class="save-the-date-title-content-date">
            13 &#183; Dic &#183; 25
          </span>
          <span class="save-the-date-title-content-label">
            <p>Parroquia "La preciosa Sangre de Cristo"</p>
            <p>
              <b>a las 5.45</b>
            </p>
            <a
              class="btn btn-primary"
              href="//maps.app.goo.gl/pLfzkrjruLkkCFnNA"
              target="_blank"
              >Ver en el mapa</a
            >
          </span>
        </div>
        <Flower width="250" class="no-mobile" orientation="flip-horizontal" />
      </div>
    </div>
  </section>
</template>

<script>
import Flower from "@/components/Flowers.vue";

export default {
  name: "ScheduleSection",
  components: {
    Flower,
  },
};
</script>