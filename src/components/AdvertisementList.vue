<template>
  <div>
    <div
      v-bind:key="i"
      v-for="(li, i) in tlist.filter((d, i) => i < TRANSACTION_COUNT)"
    >
      <a :href="li.actions.public_view">
        price: {{ li.data.temp_price }} limits: {{ li.data.min_amount }} ..
        {{ li.data.max_amount }} | {{ li.data.profile.name }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdvertisementList',
  props: ['tlist'],
  data: () => {
    return { TRANSACTION_COUNT: 10 }
  }
}
</script>

<style scoped></style>
