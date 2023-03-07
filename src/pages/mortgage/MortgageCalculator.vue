<template>
  <div class="calculator">
    <form class="calculator-form">
      <h1 class="calculator-header">Mortgage Calculator</h1>
      <section class="calculator-form_section">
        <div class="calculator-input_wrapper">
          <base-input
            :required="true"
            label="Property purchase price"
            ref="purchase-price"
            inputName="purchasePrice"
            @update:modelValue="(newValue: number) => (propertyPurchasePrice = newValue)"
            :modelValue="propertyPurchasePrice"
          >
            <template #prefix> <span>€</span> </template>
          </base-input>
        </div>
        <div class="calculator-input_wrapper">
          <base-input
            :required="true"
            ref="total-savings"
            inputName="totalSavings"
            label="Total Savings"
            @update:modelValue="(newValue: number) => (totalSavings = newValue)"
            :modelValue="totalSavings"
          >
            <template #prefix> <span>€</span> </template>
          </base-input>
        </div>
      </section>
      <section class="calculator-form_section">
        <div class="calculator-input_wrapper">
          <base-select
            ref="commision"
            label="Real estate commision"
            :modelValue="includeRealEstateCommision"
            @update:modelValue="(newValue: boolean) => (includeRealEstateCommision = newValue)"
          />
        </div>
        <div class="calculator-input_wrapper">
          <base-input
            :required="true"
            class="calculator-input_interest"
            ref="repayment-rate"
            inputName="repaymentRate"
            label="Annual repayment rate(%)"
            @update:modelValue="(newValue: number) => (repaymentRate = newValue)"
            :modelValue="repaymentRate"
          >
            <template #prefix>
              <decrement-button @decrement="decrementRate" />
            </template>
            <template #suffix>
              <increment-button @increment="incrementRate" />
            </template>
          </base-input>
        </div>
      </section>
      <section class="calculator-button_wrapper">
        <base-button ref="calculate" class="calculator-button" @click="calculateLoan"
          >Calculate</base-button
        >
      </section>
      <p class="calculator-error" v-if="hasError">Please enter all required fields</p>
    </form>
    <div class="calculator-info">
      <content-card ref="implied-loan" :value="rawLoanAmount" class="calculator-info_card">
        <p class="calculator-info_card-title">Implied loan</p>
        {{ convertToCurrency(rawLoanAmount) }}
      </content-card>
      <content-card ref="loan-to-value" :value="loanToValueFormatted" class="calculator-info_card">
        <p class="calculator-info_card-title">Loan to value</p>
        {{ convertToFixed(loanToValueFormatted) }}%
      </content-card>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, ref } from 'vue'
import { mortgageTaxValues, fixation } from '@/static/store'
import { isEmptyValue, convertToLocaleString, convertToCurrency, convertToFixed } from '~/helpers'
import BaseInput from '~/components/form-elements/BaseInput.vue'
import BaseButton from '~/components/form-elements/BaseButton.vue'
import BaseSelect from '@/components/form-elements/BaseSelect.vue'
import IncrementButton from '@/components/IncrementButton.vue'
import DecrementButton from '@/components/DecrementButton.vue'
import ContentCard from '~/components/card/ContentCard.vue'
export default {
  components: {
    BaseInput,
    BaseButton,
    BaseSelect,
    ContentCard,
    DecrementButton,
    IncrementButton
  },
  emits: ['submit-user-response'],
  setup(_, { emit }) {
    const propertyPurchasePrice = ref<number | undefined>()
    const totalSavings = ref<number | undefined>()
    const repaymentRate = ref<number | undefined>()
    const includeRealEstateCommision = ref<boolean>(false)
    const hasError = ref<boolean>(false)

    const isSubmitButtonDisabled = computed((): boolean => {
      return (
        isEmptyValue(totalSavings.value) ||
        isEmptyValue(repaymentRate.value) ||
        isEmptyValue(propertyPurchasePrice.value)
      )
    })

    const loanToValue = computed<number>(() => {
      return propertyPurchasePrice.value ? rawLoanAmount.value / propertyPurchasePrice.value : 0
    })
    const loanToValueFormatted = computed<number>(() => {
      return loanToValue.value * 100
    })
    const notaryCosts = computed<number>(() => {
      return propertyPurchasePrice.value
        ? 2144.0 + 0.013 * (propertyPurchasePrice.value - 100000.0)
        : 0
    })

    const brokerCosts = computed<number>(() => {
      if (includeRealEstateCommision.value) {
        return propertyPurchasePrice.value
          ? mortgageTaxValues.BROKER_TAX * propertyPurchasePrice.value
          : 0
      }
      return 0
    })

    const stampDutyCost = computed<number>(() => {
      return propertyPurchasePrice.value
        ? mortgageTaxValues.CITY_TAX * propertyPurchasePrice.value
        : 0
    })

    const totalCost = computed<number>(() => {
      return notaryCosts.value + brokerCosts.value + stampDutyCost.value
    })

    const rawLoanAmount = computed<number>(() => {
      return totalSavings.value && propertyPurchasePrice.value
        ? totalCost.value - totalSavings.value + propertyPurchasePrice.value
        : 0
    })

    const incrementRate = (): void => {
      if (!repaymentRate.value) {
        repaymentRate.value = 0
      }
      repaymentRate.value += 1
    }

    const decrementRate = (): void => {
      if (repaymentRate.value === 0) {
        return
      }
      repaymentRate.value ? (repaymentRate.value -= 1) : ''
    }
    const setError = (value: boolean): void => {
      //better error handling  with maximum and minimums
      hasError.value = value
    }
    const getUserResponseQuery = (): string => {
      return `query {
        root {
          rates_table {
            property_price: ${propertyPurchasePrice.value!},
            repayment: ${repaymentRate.value!},
            loan_amount: ${rawLoanAmount.value!},
            years_fixed: [${fixation}]
          }
        }
      }`
    }
    const calculateLoan = (): void => {
      if (isSubmitButtonDisabled.value) {
        setError(true)
        return
      }
      setError(false)
      emit('submit-user-response', getUserResponseQuery())
    }
    return {
      calculateLoan,
      convertToCurrency,
      convertToFixed,
      convertToLocaleString,
      decrementRate,
      hasError,
      incrementRate,
      includeRealEstateCommision,
      loanToValueFormatted,
      propertyPurchasePrice,
      rawLoanAmount,
      repaymentRate,
      totalSavings
    }
  }
}
</script>
<style lang="scss">
.calculator {
  &-form {
    width: 100%;
    background-color: $white;
    padding: 4rem 3rem 2rem;
    box-shadow: $primary-box-shadow;
    border: 1px solid $primary-border-color;
  }

  &-error {
    color: $error-color;
    font-size: 1.2rem;
  }

  &-header {
    font-weight: 600;
    color: $primary-text-color;
    font-size: 2.5rem;
    margin-bottom: 3rem;
  }

  &-button {
    color: $white;
    font-size: 1.3rem;
    font-weight: 600;
    background-color: $primary-color;
    padding: 1.2rem 4.2rem;
    border-radius: 0.4rem;

    &:hover {
      opacity: 0.7;
    }

    &_wrapper {
      display: flex;
      justify-content: flex-end;
    }
  }

  &-form_section {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3rem;

    @include screen(custom, max, 576) {
      flex-direction: column;
    }
  }

  &-input {
    &_wrapper {
      width: 100%;

      &:nth-of-type(even) {
        margin-left: 3rem;

        @include screen(custom, max, 576) {
          margin-left: 0;
        }
      }

      &:nth-of-type(odd) {
        @include screen(custom, max, 576) {
          margin-right: 0;
          margin-bottom: 3rem;
        }

        margin-right: 3rem;
      }
    }

    &_interest {
      text-align: center;
    }
  }

  &-info {
    display: flex;
    margin-top: 3rem;

    @include screen(custom, max, 576) {
      flex-direction: column;
    }

    &_card {
      width: 50%;
      height: 12rem;
      font-size: 3rem;
      font-weight: bold;

      @include screen(custom, max, 576) {
        width: 100%;
        margin-bottom: 2rem;
      }

      &:nth-of-type(even) {
        margin-left: 2rem;

        @include screen(custom, max, 576) {
          margin-left: 0;
        }
      }

      &:nth-of-type(odd) {
        margin-right: 2rem;

        @include screen(custom, max, 576) {
          margin-right: 0;
        }
      }

      &-title {
        font-size: 1.3rem;
        font-weight: 500;
        color: $seconday-text-color;
      }
    }
  }

  .rate-btn {
    width: 4rem;
  }
}
</style>
