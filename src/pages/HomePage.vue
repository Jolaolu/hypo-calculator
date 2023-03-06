<template>
  <header>
    <div class="wrapper"></div>
  </header>
  <main class="home">
    <mortgage-calculator @submit-user-response="getLoanRates" v-if="currentStep === Step.Calculator" />
    <article v-if="currentStep === Step.Loading"></article>
    <mortgage-rates-table v-if="currentStep === Step.Result" />
  </main>
</template>
<script lang="ts">
import { ref } from 'vue'
import HttpService from '~/services/index'
import type { IUserResponse } from '@/static/index.model'
import MortgageCalculator from '~/pages/mortgage/MortgageCalculator.vue'
import MortgageRatesTable from '~/pages/mortgage/MortgageRatesTable.vue'
enum Step {
  Calculator,
  Loading,
  Result
}
export default {
  components: {
    MortgageCalculator,
    MortgageRatesTable
  },
  setup() {
    const currentStep = ref(Step.Calculator)
    const results = ref<'' | null>(null)
    const isLoading = ref<boolean>(true)

    const http = new HttpService({
      baseUrl: 'api',
      baseHeaders: {
        mode: 'no-cors'
      }
    })

    const updateStep = (step: Step): void => {
      currentStep.value = step
    }
    const getLoanRates = async (userQuery: IUserResponse ): Promise<void> => {
      console.log(userQuery, userQuery)
      await http
        .post('q', {})
        .then((response): void => {
          isLoading.value = false
          console.log(response)
        })
        .catch((error) => {
          console.log(error?.message)
        })
    }
    return {
      currentStep,
      getLoanRates,
      results,
      Step,
      updateStep
    }
  }
}
</script>
<style lang="scss">
.home {
  padding: 10rem 15rem;
  max-width: 120rem;
  margin: 0 auto;
}
</style>
