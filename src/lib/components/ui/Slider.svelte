<script lang="ts">
  interface Props {
    label: string;
    value: number;
    min: number;
    max: number;
    step?: number;
    unit?: string;
    onchange: (value: number) => void;
  }

  let { label, value = $bindable(), min, max, step = 1, unit = 'px', onchange }: Props = $props();

  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const newValue = Number(target.value);
    value = newValue;
    onchange(newValue);
  }
</script>

<div class="flex flex-col gap-2">
  <div class="flex items-center justify-between">
    <span class="text-sm text-neutral-900 dark:text-neutral-100">{label}</span>
    <span class="text-sm font-medium tabular-nums text-brand-accent">
      {value}{unit}
    </span>
  </div>
  <input
    type="range"
    {min}
    {max}
    {step}
    {value}
    oninput={handleInput}
    class="slider-input w-full"
    aria-label="{label} slider"
    aria-valuemin={min}
    aria-valuemax={max}
    aria-valuenow={value}
    aria-valuetext="{value} {unit}"
  />
</div>

<style>
  .slider-input {
    -webkit-appearance: none;
    appearance: none;
    height: 44px; /* Touch target */
    background: transparent;
    cursor: pointer;
  }

  /* Track */
  .slider-input::-webkit-slider-track {
    height: 4px;
    background: theme('colors.neutral.200');
    border-radius: 2px;
  }

  :global(.dark) .slider-input::-webkit-slider-track {
    background: theme('colors.neutral.700');
  }

  .slider-input::-moz-range-track {
    height: 4px;
    background: theme('colors.neutral.200');
    border-radius: 2px;
  }

  :global(.dark) .slider-input::-moz-range-track {
    background: theme('colors.neutral.700');
  }

  /* Thumb */
  .slider-input::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: theme('colors.brand.accent');
    cursor: grab;
    margin-top: -8px; /* Center on track */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: transform 150ms ease;
  }

  .slider-input:active::-webkit-slider-thumb {
    cursor: grabbing;
    transform: scale(1.1);
  }

  .slider-input::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border: none;
    border-radius: 50%;
    background: theme('colors.brand.accent');
    cursor: grab;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: transform 150ms ease;
  }

  .slider-input:active::-moz-range-thumb {
    cursor: grabbing;
    transform: scale(1.1);
  }
</style>
