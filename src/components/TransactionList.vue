<template>
  <div>
    <div v-bind:key="i" v-for="(li, i) in tlist">
      <a :href="li.actions.public_view">
        price: {{ li.data.temp_price }} limits: {{ li.data.min_amount }} ..
        {{ li.data.max_amount }} | {{ li.data.profile.name }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TransactionList',
  props: ['tlist']
}
</script>

<style scoped></style>
