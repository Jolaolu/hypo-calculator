<template>
  <header>
    <div class="wrapper"></div>
  </header>
  <main class="home">
    <mortgage-calculator @submit-user-response="getLoanRates" v-if="currentStep === Step.Calculator" />
    <article class="loader" v-if="currentStep === Step.Loading">
      <img src="/src/assets/loader.gif" alt="Loading" />
      <p>Hang on while we're running to get your results.</p>
    </article>
    <mortgage-rates-table :mortgage-rates="results" v-if="currentStep === Step.Result && results" />
  </main>
</template>
<script lang="ts">
import { ref, onBeforeUnmount } from 'vue'
import HttpService from '~/services/index'
import { rateResponse } from '@/static/mock'
import type { IRatesResponse } from "~/static/index.model"
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
    const currentStep = ref(Step.Result)
    const results = ref<IRatesResponse["data"]["root"] | null>(rateResponse.data.root)
    const isLoading = ref<boolean>(true)
    const timeOut = ref<NodeJS.Timeout>()

    const http = new HttpService({
      baseUrl: 'api',
      baseHeaders: {
        mode: 'cors',
      }
    })

    const updateStep = (step: Step): void => {
      currentStep.value = step
    }
    const getLoanRates = async (userQuery: string): Promise<void> => {
      console.log(userQuery)
      updateStep(Step.Loading)
      results.value = rateResponse.data.root
      timeOut.value = setTimeout(() => {
        updateStep(Step.Result)
      }, 3000)

      /**
      await http
        .post('q', { payload: JSON.stringify({ query: userQuery }) })
        .then((response): void => {
       results.value = response.data.root
          isLoading.value = false
          console.log(response)
        })
        .catch((error) => {
      handle api errors  here
          console.log(error?.message)
        })
         */
    }
      onBeforeUnmount(() => {
        clearTimeout(timeOut.value)
      })

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

.loader {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
