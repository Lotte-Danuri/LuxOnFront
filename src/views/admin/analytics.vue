<template>
  <main>
    <h1>통계</h1>
    <div class="first_grid">
      <div>
        <canvas id="myChart1" style="width: 100%; max-width: 700px"></canvas>
      </div>
      <div>
        <canvas id="myChart2" style="width: 100%; max-width: 700px"></canvas>
      </div>
      <div>
        <canvas id="myChart3" style="width: 50%; max-width: 400px"></canvas>
      </div>
      <div>
        <canvas id="myChart4" style="width: 100%; max-width: 700px"></canvas>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      example: '',
    };
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    var xValues = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
    new Chart('myChart1', {
      type: 'bar',
      data: {
        labels: xValues,
        datasets: [
          {
            data: [860, 1140, 1060, 1060, 1070, 1110, 1330, 2210, 7830, 2478],
            borderColor: 'red',
            fill: false,
          },
          {
            data: [1600, 1700, 1700, 1900, 2000, 2700, 4000, 5000, 6000, 7000],
            borderColor: 'green',
            fill: false,
          },
          {
            data: [300, 700, 2000, 5000, 6000, 4000, 2000, 1000, 200, 100],
            borderColor: 'blue',
            fill: false,
          },
        ],
      },
      options: {
        legend: { display: false },
      },
    });
    new Chart('myChart2', {
      type: 'line',
      data: {
        labels: xValues,
        datasets: [
          {
            data: [860, 1140, 1060, 1060, 1070, 1110, 1330, 2210, 7830, 2478],
            borderColor: 'red',
            fill: false,
          },
          {
            data: [1600, 1700, 1700, 1900, 2000, 2700, 4000, 5000, 6000, 7000],
            borderColor: 'green',
            fill: false,
          },
          {
            data: [300, 700, 2000, 5000, 6000, 4000, 2000, 1000, 200, 100],
            borderColor: 'blue',
            fill: false,
          },
        ],
      },
      options: {
        legend: { display: false },
      },
    });
    new Chart('myChart3', {
      type: 'radar',
      data: {
        labels: ['Running', 'Swimming', 'Eating', 'Cycling'],
        datasets: [
          {
            data: [20, 10, 4, 2],
          },
        ],
      },
      options: {
        legend: { display: false },
      },
    });
    new Chart('myChart4', {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [10, 20, 30],
          },
        ],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: ['Red', 'Yellow', 'Blue'],
      },
      options: {
        legend: { display: false },
      },
    });
  },
  beforeUpdate() {},
  updated() {},
  beforeUnmount() {},
  unmounted() {},
  methods: {},
};
</script>

<style scoped>
.first_grid {
  display: grid;
  grid-template-columns: 700px 700px;
  grid-template-rows: 400px 400px;
  gap: 30px;
}

.first_grid div {
  background-color: gray;
  margin-bottom: 0px;
}
</style>
