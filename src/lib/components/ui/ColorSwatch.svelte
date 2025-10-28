<script lang="ts">
  import type { GradientPreset } from '$lib/types';

  interface Props {
    gradient: GradientPreset;
    selected: boolean;
    onclick: () => void;
  }

  let { gradient, selected, onclick }: Props = $props();
</script>

<button
  type="button"
  class="color-swatch"
  class:selected
  style="background: {gradient.value}"
  aria-label={gradient.name}
  aria-checked={selected}
  role="radio"
  tabindex="0"
  onclick={onclick}
>
  <span class="sr-only">{gradient.name}</span>
</button>

<style>
  .color-swatch {
    width: 44px;
    height: 44px;
    border-radius: 8px;
    border: 2px solid transparent;
    cursor: pointer;
    transition: all 150ms ease;
    -webkit-tap-highlight-color: transparent;
  }

  .color-swatch:hover {
    transform: scale(1.05);
  }

  .color-swatch:active {
    transform: scale(0.95);
  }

  .color-swatch.selected {
    border-color: theme('colors.brand.accent');
    box-shadow:
      0 0 0 2px theme('colors.neutral.100'),
      0 0 0 4px theme('colors.brand.accent');
  }

  :global(.dark) .color-swatch.selected {
    box-shadow:
      0 0 0 2px theme('colors.neutral.800'),
      0 0 0 4px theme('colors.brand.accent');
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
</style>
