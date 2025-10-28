<script lang="ts">
  import { onMount } from 'svelte';
  import Header from '$lib/components/Header.svelte';
  import FileInput from '$lib/components/FileInput.svelte';
  import ImageCanvas from '$lib/components/ImageCanvas.svelte';
  import ControlPanel from '$lib/components/ControlPanel.svelte';
  import ExportMenu from '$lib/components/ExportMenu.svelte';
  import { imageStore } from '$lib/stores/image.svelte';
  import { settingsStore } from '$lib/stores/settings.svelte';

  let canvasElement: HTMLDivElement | null = $state(null);

  const hasImage = $derived(imageStore.current.url !== null);

  onMount(() => {
    // Initialize dark mode on app load
    settingsStore.initDarkMode();
  });

  function handleCanvasRef(element: HTMLDivElement | null) {
    canvasElement = element;
  }
</script>

<div class="app">
  <Header />

  <main class="app-main">
    {#if !hasImage}
      <!-- Empty State: Show file input -->
      <div class="empty-state-container">
        <div class="empty-state-content">
          <h2 class="empty-state-title">Beautiful Screenshot Frames</h2>
          <p class="empty-state-description">
            Upload or paste a screenshot to add professional backgrounds and styling
          </p>
          <div class="file-input-wrapper">
            <FileInput />
          </div>
        </div>
      </div>
    {:else}
      <!-- Loaded State: Show canvas and controls -->
      <div class="workspace">
        <div class="canvas-section">
          <ImageCanvas canvasRef={handleCanvasRef} />
        </div>

        <aside class="sidebar">
          <div class="sidebar-content">
            <ControlPanel />
            <div class="sidebar-divider"></div>
            <ExportMenu canvasElement={canvasElement} disabled={!hasImage} />

            <button
              class="reset-button"
              onclick={() => imageStore.clearImage()}
              type="button"
            >
              <svg
                class="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
              Clear Image
            </button>
          </div>
        </aside>
      </div>
    {/if}
  </main>
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: theme('colors.neutral.50');
  }

  :global(.dark) .app {
    background: theme('colors.neutral.900');
  }

  .app-main {
    flex: 1;
    display: flex;
    overflow: hidden;
  }

  /* Empty State */
  .empty-state-container {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .empty-state-content {
    max-width: 600px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    text-align: center;
  }

  .empty-state-title {
    font-size: 2rem;
    font-weight: 600;
    color: theme('colors.neutral.900');
    margin: 0;
  }

  :global(.dark) .empty-state-title {
    color: theme('colors.neutral.100');
  }

  .empty-state-description {
    font-size: 1.125rem;
    color: theme('colors.neutral.500');
    margin: 0;
  }

  :global(.dark) .empty-state-description {
    color: theme('colors.neutral.400');
  }

  .file-input-wrapper {
    width: 100%;
  }

  /* Workspace (when image is loaded) */
  .workspace {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .canvas-section {
    flex: 1;
    min-height: 60vh;
    overflow: auto;
  }

  .sidebar {
    background: theme('colors.white');
    border-top: 1px solid theme('colors.neutral.200');
    max-height: 40vh;
    overflow-y: auto;
  }

  :global(.dark) .sidebar {
    background: theme('colors.neutral.800');
    border-color: theme('colors.neutral.700');
  }

  .sidebar-content {
    display: flex;
    flex-direction: column;
  }

  .sidebar-divider {
    height: 1px;
    background: theme('colors.neutral.200');
    margin: 0;
  }

  :global(.dark) .sidebar-divider {
    background: theme('colors.neutral.700');
  }

  .reset-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    margin: 1rem;
    border: 1px solid theme('colors.neutral.200');
    border-radius: 8px;
    background: transparent;
    color: theme('colors.neutral.600');
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 150ms ease;
  }

  :global(.dark) .reset-button {
    border-color: theme('colors.neutral.700');
    color: theme('colors.neutral.400');
  }

  .reset-button:hover {
    border-color: theme('colors.red.400');
    color: theme('colors.red.600');
    background: rgba(239, 68, 68, 0.05);
  }

  :global(.dark) .reset-button:hover {
    border-color: theme('colors.red.500');
    color: theme('colors.red.400');
    background: rgba(239, 68, 68, 0.1);
  }

  /* Tablet/Desktop Layout */
  @media (min-width: 768px) {
    .empty-state-content {
      gap: 2.5rem;
    }

    .empty-state-title {
      font-size: 2.5rem;
    }

    .workspace {
      flex-direction: row;
    }

    .canvas-section {
      flex: 1;
      min-height: auto;
    }

    .sidebar {
      width: 320px;
      max-width: 400px;
      max-height: none;
      border-top: none;
      border-left: 1px solid theme('colors.neutral.200');
    }

    :global(.dark) .sidebar {
      border-color: theme('colors.neutral.700');
    }
  }

  @media (max-width: 767px) {
    .empty-state-title {
      font-size: 1.75rem;
    }

    .empty-state-description {
      font-size: 1rem;
    }
  }
</style>
