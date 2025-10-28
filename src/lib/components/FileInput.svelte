<script lang="ts">
  import { imageStore } from '$lib/stores/image.svelte';
  import { handleFileUpload, handlePaste, handleDrop } from '$lib/utils/fileHandlers';

  let fileInput: HTMLInputElement;
  let isDragging = $state(false);
  let error = $state<string | null>(null);

  // Handle file selection
  async function onFileSelect() {
    if (!fileInput) return;

    const result = await handleFileUpload(fileInput);
    if (result.success) {
      imageStore.setImage({
        url: result.url,
        file: result.file,
        width: result.width,
        height: result.height,
      });
      error = null;
    } else {
      error = result.error || 'Failed to load image';
    }
  }

  // Handle paste from clipboard
  async function onPaste(event: ClipboardEvent) {
    const result = await handlePaste(event);
    if (result.success) {
      imageStore.setImage({
        url: result.url,
        file: result.file,
        width: result.width,
        height: result.height,
      });
      error = null;
    }
    // Silently ignore paste errors (no image in clipboard)
  }

  // Handle drag over
  function onDragOver(event: DragEvent) {
    event.preventDefault();
    isDragging = true;
  }

  // Handle drag leave
  function onDragLeave() {
    isDragging = false;
  }

  // Handle drop
  async function onDrop(event: DragEvent) {
    isDragging = false;
    const result = await handleDrop(event);
    if (result.success) {
      imageStore.setImage({
        url: result.url,
        file: result.file,
        width: result.width,
        height: result.height,
      });
      error = null;
    } else {
      error = result.error || 'Failed to load image';
    }
  }

  // Listen for paste events globally
  $effect(() => {
    document.addEventListener('paste', onPaste);
    return () => document.removeEventListener('paste', onPaste);
  });
</script>

<div class="file-input-container">
  <div
    class="file-input-zone"
    class:drag-active={isDragging}
    ondragover={onDragOver}
    ondragleave={onDragLeave}
    ondrop={onDrop}
    onclick={() => fileInput?.click()}
    role="button"
    tabindex="0"
    onkeydown={(e) => e.key === 'Enter' && fileInput?.click()}
  >
    <!-- Upload Icon (Heroicon: arrow-up-tray) -->
    <svg
      class="upload-icon"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
      />
    </svg>

    <div class="file-input-text">
      <p class="text-base font-medium text-neutral-900 dark:text-neutral-100">
        Drop image here or click to upload
      </p>
      <p class="text-sm text-neutral-500 dark:text-neutral-400">
        PNG, JPG, WEBP, GIF up to 10MB
      </p>
      <p class="text-sm text-neutral-400 dark:text-neutral-500 mt-2">
        Or paste from clipboard (Ctrl/Cmd+V)
      </p>
    </div>
  </div>

  {#if error}
    <div class="error-message" role="alert">
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
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
        />
      </svg>
      {error}
    </div>
  {/if}

  <input
    bind:this={fileInput}
    type="file"
    accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
    onchange={onFileSelect}
    class="hidden"
    aria-label="Upload image file"
  />
</div>

<style>
  .file-input-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .file-input-zone {
    min-height: 200px;
    padding: 2rem;
    border-radius: 12px;
    border: 2px dashed theme('colors.neutral.200');
    background: theme('colors.neutral.50');
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    text-align: center;
    cursor: pointer;
    transition: all 200ms ease;
  }

  :global(.dark) .file-input-zone {
    background: theme('colors.neutral.900');
    border-color: theme('colors.neutral.700');
  }

  .file-input-zone:hover {
    border-color: theme('colors.brand.accent');
    background: theme('colors.neutral.100');
  }

  :global(.dark) .file-input-zone:hover {
    background: theme('colors.neutral.800');
  }

  .file-input-zone.drag-active {
    border-color: theme('colors.brand.accent');
    background: rgba(59, 130, 246, 0.05);
    border-style: solid;
  }

  .upload-icon {
    width: 64px;
    height: 64px;
    color: theme('colors.neutral.400');
  }

  :global(.dark) .upload-icon {
    color: theme('colors.neutral.500');
  }

  .file-input-text {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .error-message {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    background: rgba(239, 68, 68, 0.1);
    color: theme('colors.red.600');
    font-size: 0.875rem;
  }

  :global(.dark) .error-message {
    background: rgba(239, 68, 68, 0.2);
    color: theme('colors.red.400');
  }

  .hidden {
    display: none;
  }
</style>
