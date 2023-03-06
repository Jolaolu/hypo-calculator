<template>
  <article ref="card" class="card">
    <div class="card-content_wrapper">
      <slot />
    </div>
  </article>
</template>
<style lang="scss">
.card {
  display: grid;
  border: 1px solid $primary-border-color;
  border-radius: 0.3rem;
  padding: 2rem;
  transform-origin: top center;
  box-shadow: $primary-box-shadow;
  transition: all 0.5s cubic-bezier(0.37, 0.33, 0.1, 1);

  &-content {
    &_wrapper {
      position: relative;
      height: 100%;
      text-align: center;
      display: grid;
      align-items: center;
    }
  }
}
</style>
