<script lang="ts">
  import { imageStore } from '$lib/stores/image.svelte';
  import { settingsStore } from '$lib/stores/settings.svelte';

  interface Props {
    canvasRef?: (element: HTMLDivElement | null) => void;
  }

  let { canvasRef }: Props = $props();

  let canvasElement: HTMLDivElement | null = $state(null);

  // Expose canvas element to parent
  $effect(() => {
    if (canvasRef) {
      canvasRef(canvasElement);
    }
  });

  const image = $derived(imageStore.current);
  const settings = $derived(settingsStore.current);

  // Calculate frame dimensions based on padding
  const frameStyle = $derived(() => {
    if (!image.url) return '';

    const totalPadding = settings.padding * 2;
    const insetScale = 1 - settings.inset / 100;

    return `
      padding: ${settings.padding}px;
      background: ${settings.background.value};
    `;
  });

  // Calculate image dimensions based on inset
  const imageStyle = $derived(() => {
    if (!image.url) return '';

    const insetScale = 1 - settings.inset / 100;

    return `
      border-radius: ${settings.borderRadius}px;
      transform: scale(${insetScale});
    `;
  });
</script>

<div class="canvas-container">
  {#if image.url}
    <div bind:this={canvasElement} class="canvas-frame" style={frameStyle()}>
      <div class="canvas-image" style={imageStyle()}>
        <img src={image.url} alt="Preview" />
      </div>
    </div>
  {:else}
    <div class="empty-state">
      <svg
        class="w-24 h-24 text-neutral-300 dark:text-neutral-600"
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
      <p class="text-lg text-neutral-500 dark:text-neutral-400">
        No image loaded
      </p>
    </div>
  {/if}
</div>

<style>
  .canvas-container {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background: theme('colors.neutral.50');
    overflow: auto;
  }

  :global(.dark) .canvas-container {
    background: theme('colors.neutral.900');
  }

  @media (min-width: 768px) {
    .canvas-container {
      padding: 1.5rem;
    }
  }

  @media (min-width: 1024px) {
    .canvas-container {
      padding: 2rem;
    }
  }

  .canvas-frame {
    /* This is the export target - includes gradient background + padding */
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    /* NO border-radius - keep corners sharp */
  }

  .canvas-image {
    /* This is the image container - ONLY this gets border-radius */
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
    box-shadow:
      0 4px 6px rgba(0, 0, 0, 0.07),
      0 10px 15px rgba(0, 0, 0, 0.1);
    transition: all 300ms ease;
  }

  .canvas-image img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 3rem;
  }
</style>
