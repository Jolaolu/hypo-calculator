<template>
  <label class="input-label" :for="inputName">{{ label }} <span v-if="required"> required*</span></label>
  <div class="input-wrapper" tabindex="0" :class="{ invalid: '' }">
    <div v-if="$slots.prefix">
      <slot name="prefix"></slot>
    </div>
    <input required="true" :name="inputName" :value="modelValue" v-bind="$attrs" type="number" inputmode="numeric"
      @input="$emit('update:modelValue', parseInt($event.target.value))" placeholder="" class="input"
      autocomplete="none" />
    <div v-if="$slots.suffix">
      <slot name="suffix"></slot>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent( {
  props: {
    modelValue: {
      type: Number,
      required: false
    },
    label: {
      type: String,
      required: true
    },
    inputName: {
      type: String
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  emits: [ 'update:modelValue' ]
} )
</script>

<style lang="scss">
.input {
  display: flex;
  width: 100%;
  font-size: 1.5rem;
  font-weight: 600;
  outline: none;
  margin-left: 1rem;
  background-color: transparent;
  border: none;
  color: $primary-text-color;

  @include screen(custom, max, 576) {
    font-size: 0.5rem;
    padding: 0.3rem;
  }

  &-wrapper {
    display: flex;
    align-items: center;
    margin-top: 1rem;
    height: 4.5rem;
    padding: 1.2rem;
    border-radius: 0.4rem;
    background-color: $input-background-color;
    border: 1px solid $primary-border-color;

    &.invalid {
      color: $error-color;
      border: 1px solid $error-color;

      &::placeholder {
        color: $error-color;
      }
    }
  }

  &-label {
    font-weight: 600;
    color: $seconday-text-color;

    span {
      font-size: .8rem;
      color: $primary-color;
    }
  }

  &-error {
    position: absolute;
    display: block;
    color: $error-color;

    @include screen(custom, max, 576) {
      font-size: 0.5rem;
    }
  }
}
</style>
