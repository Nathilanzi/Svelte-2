<script>
    import { page } from '$app/stores';
  </script>
  
  <h1>{$page.status}: {$page.error.message}</h1>
  <p>We're sorry, but something went wrong. Please try again later.</p>
  <a href="/">Go back to the homepage</a>