<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 24 24"
  >
    <defs>
      <path
        id="a"
        d="M13 11h6a1 1 0 0 1 0 2h-6v6a1 1 0 0 1-2 0v-6H5a1 1 0 0 1 0-2h6V5a1 1 0 0 1 2 0z"
      />
      <mask id="b" fill="none"><use xlink:href="#a" fill-rule="evenodd" /></mask>
    </defs>
    <g fill="#1B8391" fill-rule="evenodd">
      <use xlink:href="#a" fill-rule="nonzero" />
      <g mask="url(#b)"><path d="M0 0h24v24H0z" /></g>
    </g>
  </svg>
</template>
