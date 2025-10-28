<script lang="ts">
  import DarkModeToggle from '$lib/components/DarkModeToggle.svelte';
</script>

<header class="app-header">
  <div class="header-content">
    <div class="logo-section">
      <div class="logo">
        <svg
          class="w-10 h-10"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="40" height="40" rx="8" fill="url(#gradient)" />
          <path
            d="M12 12h16v16H12z"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16 16h8v8h-8z"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <defs>
            <linearGradient
              id="gradient"
              x1="0"
              y1="0"
              x2="40"
              y2="40"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#667eea" />
              <stop offset="1" stop-color="#764ba2" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <h1 class="app-title">XXXnaper</h1>
    </div>

    <div class="header-actions">
      <DarkModeToggle />
    </div>
  </div>
</header>

<style>
  .app-header {
    background: theme('colors.white');
    border-bottom: 1px solid theme('colors.neutral.200');
    padding: 1rem;
  }

  :global(.dark) .app-header {
    background: theme('colors.neutral.800');
    border-color: theme('colors.neutral.700');
  }

  .header-content {
    max-width: 1440px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo-section {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .app-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: theme('colors.neutral.900');
    margin: 0;
  }

  :global(.dark) .app-title {
    color: theme('colors.neutral.100');
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  @media (max-width: 767px) {
    .app-title {
      font-size: 1.125rem;
    }
  }
</style>
