<template>
  <ul>
    <li
      v-bind:key="li.data.ad_id"
      v-for="li in tlist.filter((d, i) => i < transactionCount)"
    >
      <a :href="li.actions.public_view">
        price: {{ li.data.temp_price }} EUR/BTC limits:
        {{ li.data.min_amount }} .. {{ li.data.max_amount }} |
        {{ li.data.profile.name }}
      </a>
    </li>
  </ul>
</template>

<script>
// this component renders the items in tlist-prop as a ul-html element.
// list item count is determined by transactionCount-prop

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
