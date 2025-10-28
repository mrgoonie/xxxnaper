<script lang="ts">
  import Slider from '$lib/components/ui/Slider.svelte';
  import BackgroundPicker from '$lib/components/BackgroundPicker.svelte';
  import { settingsStore } from '$lib/stores/settings.svelte';

  let padding = $state(settingsStore.padding);
  let inset = $state(settingsStore.inset);
  let borderRadius = $state(settingsStore.borderRadius);

  // Sync with store when values change
  $effect(() => {
    padding = settingsStore.padding;
    inset = settingsStore.inset;
    borderRadius = settingsStore.borderRadius;
  });
</script>

<div class="control-panel">
  <div class="control-section">
    <h3 class="section-heading">Adjustments</h3>
    <div class="sliders">
      <Slider
        label="Padding"
        bind:value={padding}
        min={0}
        max={200}
        step={1}
        unit="px"
        onchange={(value: number) => settingsStore.setPadding(value)}
      />
      <Slider
        label="Inset"
        bind:value={inset}
        min={0}
        max={100}
        step={1}
        unit="%"
        onchange={(value: number) => settingsStore.setInset(value)}
      />
      <Slider
        label="Border Radius"
        bind:value={borderRadius}
        min={0}
        max={50}
        step={1}
        unit="px"
        onchange={(value: number) => settingsStore.setBorderRadius(value)}
      />
    </div>
  </div>

  <div class="control-section">
    <BackgroundPicker />
  </div>
</div>

<style>
  .control-panel {
    background: theme('colors.white');
    border-top: 1px solid theme('colors.neutral.200');
    padding: 1rem;
    max-height: 50vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  :global(.dark) .control-panel {
    background: theme('colors.neutral.800');
    border-color: theme('colors.neutral.700');
  }

  .control-section {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .section-heading {
    font-size: 0.875rem;
    font-weight: 600;
    color: theme('colors.neutral.500');
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 0;
  }

  :global(.dark) .section-heading {
    color: theme('colors.neutral.400');
  }

  .sliders {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  @media (min-width: 768px) {
    .control-panel {
      width: 320px;
      max-width: 400px;
      max-height: none;
      border-top: none;
      border-left: 1px solid theme('colors.neutral.200');
      padding: 1.5rem;
      gap: 2rem;
    }

    :global(.dark) .control-panel {
      border-color: theme('colors.neutral.700');
    }
  }

  @media (min-width: 1024px) {
    .control-panel {
      padding: 2rem;
    }
  }
</style>
