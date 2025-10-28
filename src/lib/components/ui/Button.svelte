<script lang="ts">
  import { clsx } from 'clsx';

  interface Props {
    variant?: 'primary' | 'secondary' | 'icon';
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    class?: string;
    ariaLabel?: string;
    onclick?: () => void;
    children: import('svelte').Snippet;
  }

  let {
    variant = 'primary',
    type = 'button',
    disabled = false,
    class: className = '',
    ariaLabel,
    onclick,
    children,
  }: Props = $props();

  const classes = $derived(
    clsx(
      'transition-all duration-150 ease-out',
      {
        // Primary button
        'min-h-11 px-6 py-3 rounded-lg font-medium tracking-wide text-white bg-brand-accent border-none shadow-sm hover:bg-blue-600 hover:-translate-y-px hover:shadow-md active:translate-y-0 active:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0':
          variant === 'primary',
        // Secondary button
        'min-h-11 px-6 py-3 rounded-lg font-medium text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 disabled:opacity-50 disabled:cursor-not-allowed':
          variant === 'secondary',
        // Icon button
        'w-11 h-11 p-0 rounded-lg flex items-center justify-center bg-transparent border-none text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed':
          variant === 'icon',
      },
      className
    )
  );
</script>

<button
  {type}
  {disabled}
  class={classes}
  aria-label={ariaLabel}
  onclick={onclick}
>
  {@render children()}
</button>
