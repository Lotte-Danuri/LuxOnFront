<template>
  <div id="app">
    <h1>Vue-Paginate v3.0</h1>
    <paginate name="items" :list="items" ref="paginator" class="paginate-list">
      <li v-for="item in paginated('items')">
        {{ item }}
      </li>
    </paginate>

    <paginate-links for="items" :show-step-links="true"></paginate-links>

    <paginate-links
      for="items"
      :show-step-links="true"
      :limit="2"
      :step-links="{
        next: 'N',
        prev: 'P',
      }"
    ></paginate-links>

    <paginate-links
      for="items"
      :simple="{
        next: 'Next »',
        prev: '« Back',
      }"
    ></paginate-links>

    <span v-if="$refs.paginator">
      Viewing {{ $refs.paginator.pageItemsCount }} results
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        'Item One',
        'Item Two',
        'Item Three',
        'Item Four',
        'Item Five',
        'Item Six',
        'Item Seven',
        'Item Eight',
        'Item Nine',
        'Item Ten',
        'Item Eleven',
        'Item Twelve',
        'Item Thirteen',
      ],
      paginate: ['items'],
    };
  },
};
</script>
