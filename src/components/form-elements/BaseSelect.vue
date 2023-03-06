<template>
  <div class="select-wrapper">
    <label class="select-label" for="select">{{ label }}</label>
    <select :value="modelValue" name="select" class="select" @change="changeOption($event)">
      <option disabled value="">Please select one</option>
      <option v-for="(option, index) in selectOptions" :key="index" :value="option.value">
        {{ option.text }}
      </option>
    </select>
  </div>
</template>
<script lang="ts">
import { selectOptions } from '~/static/store'
import { isEmptyValue } from '~/helpers'
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    modelValue: {
      type: Boolean,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(_, { emit }) {
    const changeOption = ($event: Event) => {
      const eventValue = ($event.target as HTMLInputElement).value
      if (!isEmptyValue(eventValue)) {
        emit('update:modelValue', JSON.parse(eventValue))
      }
    }
    return {
      changeOption,
      selectOptions
    }
  }
}
</script>
<style lang="scss">
.select {
  appearance: none;
  width: 100%;
  font-size: 1.5rem;
  font-weight: 600;
  border-radius: 0.4rem;
  padding: 1.2rem;
  background-color: $input-background-color;
  color: $primary-text-color;
  border: 1px solid $primary-border-color;
  margin-top: 1rem;
  background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgMTQgOCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICAgIDxkZWZzPgogICAgICAgIDxwYXRoIGQ9Ik0xMiwxMy41ODU3ODY0IEw2LjcwNzEwNjc4LDguMjkyODkzMjIgQzYuMzE2NTgyNDksNy45MDIzNjg5MyA1LjY4MzQxNzUxLDcuOTAyMzY4OTMgNS4yOTI4OTMyMiw4LjI5Mjg5MzIyIEM0LjkwMjM2ODkzLDguNjgzNDE3NTEgNC45MDIzNjg5Myw5LjMxNjU4MjQ5IDUuMjkyODkzMjIsOS43MDcxMDY3OCBMMTEuMjkyODkzMiwxNS43MDcxMDY4IEMxMS42ODM0MTc1LDE2LjA5NzYzMTEgMTIuMzE2NTgyNSwxNi4wOTc2MzExIDEyLjcwNzEwNjgsMTUuNzA3MTA2OCBMMTguNzA3MTA2OCw5LjcwNzEwNjc4IEMxOS4wOTc2MzExLDkuMzE2NTgyNDkgMTkuMDk3NjMxMSw4LjY4MzQxNzUxIDE4LjcwNzEwNjgsOC4yOTI4OTMyMiBDMTguMzE2NTgyNSw3LjkwMjM2ODkzIDE3LjY4MzQxNzUsNy45MDIzNjg5MyAxNy4yOTI4OTMyLDguMjkyODkzMjIgTDEyLDEzLjU4NTc4NjQgWiIgaWQ9InBhdGgtMSI+PC9wYXRoPgogICAgPC9kZWZzPgogICAgPGcgaWQ9Ikljb25zLS0tU3ltYm9scyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Ikljb24vb3V0bGluZS9jaGV2cm9uLWRvd24iIHRyYW5zZm9ybT0idHJhbnNsYXRlKC01LjAwMDAwMCwgLTguMDAwMDAwKSI+CiAgICAgICAgICAgIDxtYXNrIGlkPSJtYXNrLTIiIGZpbGw9IndoaXRlIj4KICAgICAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj0iI3BhdGgtMSI+PC91c2U+CiAgICAgICAgICAgIDwvbWFzaz4KICAgICAgICAgICAgPHVzZSBpZD0iY2hldnJvbi1kb3duIiBmaWxsPSIjMUI4MzkxIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHhsaW5rOmhyZWY9IiNwYXRoLTEiPjwvdXNlPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+');
  background-repeat: no-repeat;
  background-size: 2rem;
  background-position-x: 95%;
  background-position-y: 1.7rem;

  &-label {
    font-weight: 600;
    color: $seconday-text-color;
  }
}
</style>
