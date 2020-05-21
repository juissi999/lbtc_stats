<template>
  <ul>
    <li
      v-bind:key="i"
      v-for="(li, i) in tlist.filter((d, i) => i < transactionCount)"
    >
      <a :href="li.actions.public_view">
        price: {{ li.data.temp_price }} limits: {{ li.data.min_amount }} ..
        {{ li.data.max_amount }} | {{ li.data.profile.name }}
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'AdvertisementList',
  props: ['tlist', 'transactionCount'],
  data: () => {
    return {}
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-inline-start: 10px;
}
li {
  margin-bottom: 4px;
}
</style>
