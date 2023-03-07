<template>
  <table class="table">
    <thead class="table-head">
      <tr class="table-head__row">
        <th class="table-head__item" v-for="(header, index) in tableHeader" :key="index">
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody class="table-body">
      <tr
        class="table-body__row"
        v-for="(rates, index) in Object.keys(mortgageRates.ratesTable)"
        :key="index"
      >
        <td class="table-body__item">{{ rates }} Years</td>
        <td class="table-body__item">{{ mortgageRates.ratesTable[rates].monthlyRate }}€</td>
        <td class="table-body__item">
          {{ convertToFixed(mortgageRates.ratesTable[rates].borrowingRate) }}%
        </td>
      </tr>
    </tbody>
  </table>
  <section class="goback-wrapper">
    <base-button class="goback" @click="$emit('go-back')">Go Back</base-button>
  </section>
</template>
<script lang="ts">
import { convertToFixed } from '~/helpers'
import { tableHeader } from '@/static/store'
import BaseButton from '@/components/form-elements/BaseButton.vue'
export default {
  emits: ['go-back'],
  components: {
    BaseButton
  },
  props: {
    mortgageRates: {
      type: Object,
      default: () => {}
    }
  },
  setup() {
    return {
      convertToFixed,
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
  border-radius: 1rem;
  box-shadow: $primary-box-shadow;
  border: 1px solid $primary-border-color;

  @include screen(custom, max, 576) {
    width: 100%;
  }

  &-head {
    border-width: 0px 1px 1px 1px;
    border-style: solid;
    border-color: #c4c4c4;
    background: $primary-color;

    &__item {
      padding: 1.6rem 0 1.7rem 0;
      text-align: left;
      font-size: 1.6rem;
      font-weight: 500;

      &:first-of-type {
        padding-left: 1.8rem;
      }
    }
  }

  &-body {
    &__row {
      &:nth-child(even) {
        border-width: 1px 0px;
        border-style: solid;
        border-color: $input-background-color;
        background: rgba($primary-border-color, 0.5);
      }
    }

    &__item {
      padding: 1.6rem 0 1.3rem 0;
      font-weight: 600;

      &:first-of-type {
        padding-left: 1.7rem;
      }
    }
  }
}

.goback {
  color: $white;
  font-size: 1.3rem;
  font-weight: 600;
  background-color: $primary-color;
  padding: 1.2rem 4.2rem;
  border-radius: 0.4rem;

  &:hover {
    opacity: 0.7;
  }

  &-wrapper {
    margin-top: 5rem;
    display: flex;
    justify-content: center;
  }
}
</style>
