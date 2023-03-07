<template>
  <header>
    <div class="wrapper"></div>
  </header>
  <main class="home">
    <mortgage-calculator
      @submit-user-response="getLoanRates"
      v-if="currentStep === Step.Calculator"
    />
    <article class="loader" v-if="currentStep === Step.Loading">
      <img src="/src/assets/loader.gif" alt="Loading" />
      <p>Hang on while we're running to get your results.</p>
    </article>
    <mortgage-rates-table
      @go-back="updateStep(Step.Calculator)"
      :mortgage-rates="results"
      v-if="currentStep === Step.Result && results"
    />
  </main>
</template>
<script lang="ts">
import { ref, onBeforeUnmount } from 'vue'
// import HttpService from '~/services/index'
import { rateResponse } from '@/static/mock'
import type { IRatesResponse } from '~/static/index.model'
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
    const results = ref<IRatesResponse['data']['root'] | null>()
    const isLoading = ref<boolean>(true)
    const timeOut = ref<number>()

    // const http = new HttpService({
    //   baseUrl: 'api',
    //   baseHeaders: {
    //     mode: 'cors'
    //   }
    // })

    const updateStep = (step: Step): void => {
      currentStep.value = step
    }
    const getLoanRates = async (): Promise<void> => {
      updateStep(Step.Loading)
      results.value = rateResponse.data.root
      timeOut.value = window.setTimeout(() => {
        updateStep(Step.Result)
      }, 3000)

      // Note: i would do this if i were  communicating with the backend server
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
      isLoading,
      results,
      Step,
      updateStep
    }
  }
}
</script>
<style lang="scss">
.home {
  padding: 10rem 13rem;
  max-width: 120rem;
  margin: 0 auto;

  @include screen(custom, max, 576) {
    width: 100%;
    padding: 4rem 1.5rem;
  }
}

.loader {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
