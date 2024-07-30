<script>
    import { Link } from 'svelte-routing';
    import { writable } from 'svelte/store';
    export let wishlist = writable([]);
    export let cart = writable([]);
  </script>
  
  <header class="navbar">
    <nav class="max-w-screen-xl flex items-center justify-between mx-auto p-4">
      <Link to="/" class="text-2xl font-semibold">SwiftCart</Link>
      <div class="flex space-x-4">
        <Link to="/wishlist">Wishlist ({$wishlist.length})</Link>
        <Link to="/cart">Cart ({$cart.length})</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  </header>
  
  <style>
    /* Your existing styles */
  </style>
  