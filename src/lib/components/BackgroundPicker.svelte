<script lang="ts">
  import ColorSwatch from '$lib/components/ui/ColorSwatch.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { settingsStore } from '$lib/stores/settings.svelte';
  import { GRADIENT_PRESETS } from '$lib/utils/gradients';

  let fileInput: HTMLInputElement;

  const currentBackground = $derived(settingsStore.background);

  function selectGradient(gradient: typeof GRADIENT_PRESETS[0]) {
    settingsStore.setBackground({
      type: 'gradient',
      value: gradient.value,
    });
  }

  function handleCustomImageUpload() {
    const file = fileInput?.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      settingsStore.setBackground({
        type: 'image',
        value: `url(${imageUrl})`,
      });
    };
    reader.readAsDataURL(file);
  }

  const isGradientSelected = $derived((gradientValue: string) => {
    return (
      currentBackground.type === 'gradient' &&
      currentBackground.value === gradientValue
    );
  });
</script>

<div class="background-picker">
  <h3 class="section-heading">Background</h3>

  <div class="gradients-grid" role="radiogroup" aria-label="Gradient presets">
    {#each GRADIENT_PRESETS as gradient (gradient.id)}
      <ColorSwatch
        {gradient}
        selected={isGradientSelected(gradient.value)}
        onclick={() => selectGradient(gradient)}
      />
    {/each}
  </div>

  <div class="custom-background">
    <Button
      variant="secondary"
      onclick={() => fileInput?.click()}
      ariaLabel="Upload custom background image"
    >
      {#snippet children()}
        <svg
          class="w-5 h-5 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
        Custom Image
      {/snippet}
    </Button>

    <input
      bind:this={fileInput}
      type="file"
      accept="image/*"
      onchange={handleCustomImageUpload}
      class="hidden"
      aria-label="Upload custom background image"
    />
  </div>
</div>

<style>
  .background-picker {
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

  .gradients-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, 44px);
    gap: 0.5rem;
  }

  .custom-background {
    margin-top: 0.5rem;
  }

  .hidden {
    display: none;
  }
</style>
