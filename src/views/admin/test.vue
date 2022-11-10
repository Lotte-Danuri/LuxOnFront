<template>
  <h1>히트맵테스트</h1>
  <main id = "heatMapArea" style="height:100%">
    <div class="regi_grid">
      <div class="top_div">
        <h1>힡흐맵</h1>
      </div>
    </div>
  </main>
</template>
<script>
import axios from 'axios';
import heatmap from "@mars3d/heatmap.js";

// let browserPoint = (event)=>{
//     console.log(`브라우저 좌표 : (${event.pageX}, ${event.pageY})`);
// }
// let clientPoint = (event) =>{
//     console.log(`화면 좌표 : (${event.clientX}, ${event.clientY})`);
// }
// window.addEventListener('click',e=>{
//     browserPoint(e);
//     clientPoint(e);
// });

export default {
  data() {
    return {
      points : [],
      max : 0,
      width : 840,
      height : 1160,
      len : 10000

    };
  },
  mounted() {
    this.getRecommendProductList();
    document.addEventListener('click', this.logKey);
  },
  methods: {
    async getRecommendProductList() {

      var config = {
        container: document.getElementById('heatMapArea'),
        radius: 10,
        maxOpacity: .5,
        minOpacity: 0,
        blur: .75
      };
      var heatmapInstance = heatmap.create(config);

      while (this.len--) {
        var val = Math.floor(Math.random()*100);
        this.max = Math.max(this.max, val);
        var point = {
          x: Math.floor(Math.random()*this.width),
          y: Math.floor(Math.random()*this.height),
          value: val
        };
        this.points.push(point);
      }

      var data = {
        max: this.max,
        data: this.points
      };

      heatmapInstance.setData(data);

      console.log(this.points);
    },

    logKey(e) {
      var x = `${e.screenX}`
      var y = `${e.screenY}`
      axios
        .post(
          'https://sbbro.xyz/api/recommend/heatmaps/click',
          {
            x:parseInt(x),
            y:parseInt(y),
            productCode:"3612301006"
          },
        )
        .then(response => {
          console.log(x);
          console.log(y);
        });
    },
  }
};
</script>

<style scoped>
.regi_grid {
  display: grid;
  grid-template-columns: 700px 200px 200px;
  gap: 30px;
}
.category_grid {
  /* display: grid; */
  /* grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  grid-auto-rows: minmax(25px, auto); */
}

.category_grid div input {
  margin: 0px;
  width: 30px;
  height: 30px;
}

.top_div input {
  width: 200px;
  height: 40px;
  border: 2px solid black;
  margin-left: 30px;
  margin-bottom: 30px;
}

#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
}

#customers td,
#customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers tr:nth-child(even) {
  background-color: #f2f2f2;
}

#customers tr:hover {
  background-color: #ddd;
}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #9b9b9b;
  color: white;
}

.table_grid {
  display: grid;
  grid-template-columns: 500px 50px 500px 100px;
  gap: 30px;
  border: solid 2px black;
  /* grid-auto-rows: minmax(25px, auto); */
}

.table_grid div table {
  width: 500px;
  margin-left: 10px;
  margin-top: 10px;
  border: solid 2px gray;
}

.select_div select {
  width: 200px;
  height: 50px;
  border: solid 1px gray;
}
</style>
