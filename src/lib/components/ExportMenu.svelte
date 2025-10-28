<script lang="ts">
  import Button from '$lib/components/ui/Button.svelte';
  import { downloadImage, copyToClipboard, shareImage } from '$lib/utils/exportImage';
  import { nanoid } from 'nanoid';
  import type { ExportOptions } from '$lib/types';

  interface Props {
    canvasElement: HTMLDivElement | null;
    disabled?: boolean;
  }

  let { canvasElement, disabled = false }: Props = $props();

  let exportFormat = $state<'png' | 'jpg'>('png');
  let jpgQuality = $state(0.95);
  let isExporting = $state(false);
  let exportMessage = $state<string | null>(null);

  async function handleDownload() {
    if (!canvasElement) return;

    isExporting = true;
    exportMessage = null;

    const options: ExportOptions = {
      format: exportFormat,
      quality: jpgQuality,
    };

    const filename = `xxxnaper-${nanoid(8)}`;
    const result = await downloadImage(canvasElement, filename, options);

    isExporting = false;

    if (result.success) {
      exportMessage = 'Downloaded successfully!';
      setTimeout(() => (exportMessage = null), 3000);
    } else {
      exportMessage = result.error || 'Download failed';
      setTimeout(() => (exportMessage = null), 5000);
    }
  }

  async function handleCopy() {
    if (!canvasElement) return;

    isExporting = true;
    exportMessage = null;

    const options: ExportOptions = {
      format: 'png', // Always PNG for clipboard
    };

    const result = await copyToClipboard(canvasElement, options);

    isExporting = false;

    if (result.success) {
      exportMessage = 'Copied to clipboard!';
      setTimeout(() => (exportMessage = null), 3000);
    } else {
      exportMessage = result.error || 'Copy failed';
      setTimeout(() => (exportMessage = null), 5000);
    }
  }

  async function handleShare() {
    if (!canvasElement) return;

    isExporting = true;
    exportMessage = null;

    const options: ExportOptions = {
      format: exportFormat,
      quality: jpgQuality,
    };

    const filename = `xxxnaper-${nanoid(8)}`;
    const result = await shareImage(canvasElement, filename, options);

    isExporting = false;

    if (!result.success) {
      // Only show error, don't show success (user sees native share dialog)
      if (result.error !== 'Share cancelled') {
        exportMessage = result.error || 'Share failed';
        setTimeout(() => (exportMessage = null), 5000);
      }
    }
  }
</script>

<div class="export-menu">
  <h3 class="section-heading">Export</h3>

  <div class="format-selector">
    <label class="format-option">
      <input
        type="radio"
        name="format"
        value="png"
        checked={exportFormat === 'png'}
        onchange={() => (exportFormat = 'png')}
      />
      <span>PNG</span>
    </label>
    <label class="format-option">
      <input
        type="radio"
        name="format"
        value="jpg"
        checked={exportFormat === 'jpg'}
        onchange={() => (exportFormat = 'jpg')}
      />
      <span>JPG</span>
    </label>
  </div>

  {#if exportFormat === 'jpg'}
    <div class="quality-slider">
      <label for="jpg-quality" class="text-sm text-neutral-600 dark:text-neutral-400">
        Quality: {Math.round(jpgQuality * 100)}%
      </label>
      <input
        id="jpg-quality"
        type="range"
        min="0.5"
        max="1"
        step="0.05"
        bind:value={jpgQuality}
        class="w-full"
        aria-label="JPG quality slider"
      />
    </div>
  {/if}

  <div class="export-actions">
    <Button
      variant="primary"
      disabled={disabled || isExporting}
      onclick={handleDownload}
      ariaLabel="Download image"
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
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
          />
        </svg>
        {isExporting ? 'Exporting...' : 'Download'}
      {/snippet}
    </Button>

    <div class="secondary-actions">
      <Button
        variant="secondary"
        disabled={disabled || isExporting}
        onclick={handleCopy}
        ariaLabel="Copy to clipboard"
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
              d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
            />
          </svg>
          Copy
        {/snippet}
      </Button>

      <Button
        variant="secondary"
        disabled={disabled || isExporting}
        onclick={handleShare}
        ariaLabel="Share image"
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
              d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
            />
          </svg>
          Share
        {/snippet}
      </Button>
    </div>
  </div>

  {#if exportMessage}
    <div
      class="export-message"
      class:success={exportMessage.includes('success') || exportMessage.includes('Copied')}
      class:error={!exportMessage.includes('success') && !exportMessage.includes('Copied')}
      role="status"
      aria-live="polite"
    >
      {exportMessage}
    </div>
  {/if}
</div>

<style>
  .export-menu {
    display: flex;
    flex-direction: column;
    gap: 1rem;
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

  .format-selector {
    display: flex;
    gap: 0.75rem;
  }

  .format-option {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem;
    border: 1px solid theme('colors.neutral.200');
    border-radius: 8px;
    cursor: pointer;
    transition: all 150ms ease;
  }

  :global(.dark) .format-option {
    border-color: theme('colors.neutral.700');
  }

  .format-option:hover {
    border-color: theme('colors.brand.accent');
    background: theme('colors.neutral.50');
  }

  :global(.dark) .format-option:hover {
    background: theme('colors.neutral.800');
  }

  .format-option input[type='radio'] {
    margin: 0;
  }

  .format-option span {
    font-size: 0.875rem;
    font-weight: 500;
    color: theme('colors.neutral.900');
  }

  :global(.dark) .format-option span {
    color: theme('colors.neutral.100');
  }

  .quality-slider {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .export-actions {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .secondary-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }

  .export-message {
    padding: 0.75rem;
    border-radius: 8px;
    font-size: 0.875rem;
    text-align: center;
  }

  .export-message.success {
    background: rgba(16, 185, 129, 0.1);
    color: theme('colors.green.600');
  }

  :global(.dark) .export-message.success {
    background: rgba(16, 185, 129, 0.2);
    color: theme('colors.green.400');
  }

  .export-message.error {
    background: rgba(239, 68, 68, 0.1);
    color: theme('colors.red.600');
  }

  :global(.dark) .export-message.error {
    background: rgba(239, 68, 68, 0.2);
    color: theme('colors.red.400');
  }
</style>
