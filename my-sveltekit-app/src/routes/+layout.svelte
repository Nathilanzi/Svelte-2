<script>
  // import '../app.css';
  import { navigating } from '$app/stores';
  import { onNavigate } from '$app/navigation';
  import { page } from '$app/stores';

  // Example of handling navigation events, like errors
  onNavigate((navigation) => {
    if (navigation.type === 'error') {
      console.error('Navigation error:', navigation.error);
      // You can set a global error state here or show a toast notification
    }
  });
</script>

<main>
  {#if $navigating}
    <div class="loading-overlay">
      <div class="loading-spinner"></div>
    </div>
  {/if}
  
  <slot />
</main>

<style>
  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .loading-spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
