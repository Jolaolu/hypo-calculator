<template>
  <table class="table">
    <thead>
      <tr class="table-head__row">
        <th class="table-head__item" v-for="(header, index) in tableHeader" :key="index">{{ header }}</th>
      </tr>
    </thead>
    <tbody class="table-body">
      <tr class="table-body__row" v-for="(rates, index)  in Object.keys(mortgageRates.ratesTable)" :key="index">
        <td class="table-body__item">{{ rates }} Years</td>
        <td class="table-body__item">{{ mortgageRates.ratesTable[rates].monthlyRate }}€</td>
        <td class="table-body__item">{{ mortgageRates.ratesTable[rates].borrowingRate }}%</td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
import { tableHeader } from '@/static/store';
export default {
  props: {
    mortgageRates: {
      type: Object,
      default: () => { }
    }
  },
  setup() {
    return {
      tableHeader
    }
  }
}
</script>
<style lang="scss">
.table {
  overflow: auto;
  width: 100%;
  max-width: 100%;
  border-collapse: collapse;
  table-layout: auto;
  box-shadow: $primary-box-shadow;
  border: 1px solid $primary-border-color;

  @include screen(custom, max, 576) {
    display: block;
  }

  &__item {
    padding: 1.6rem 0 1.7rem 0;
    text-align: left;
    text-transform: uppercase;

    &:first-of-type {
      padding-left: 1.8rem;
    }
  }

  &-head {
    border-width: 0px 1px 1px 1px;
    border-style: solid;
    border-color: $gray-lighter;
    background: $gray-lighter;
  }

  &-body {
    &__row {
      &:nth-child(even) {
        border-width: 1px 0px;
        border-style: solid;
        border-color: $gray-light;
        background: rgba($primary-border-color, 0.5);
      }
    }
  }
}
</style>
