<template>
  <input :type="type" :value="modelValue" @input="updateValue" :placeholder="placeholder" />
</template>

<script>
export default {
  name: 'InputBox',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  methods: {
    updateValue(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>
