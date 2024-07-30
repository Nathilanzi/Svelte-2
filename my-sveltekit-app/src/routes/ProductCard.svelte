<script lang="ts">
  import type { Product } from './App.svelte';

  export let product: Product;
  export let isInWishlist: boolean;
  export let isInCart: boolean;
  export let onToggleWishlist: (event: CustomEvent<number>) => void;
  export let onToggleCart: (event: CustomEvent<number>) => void;
  export let onShowDetails: (event: CustomEvent<Product>) => void;

  function handleToggleWishlist() {
    onToggleWishlist(new CustomEvent('toggleWishlist', { detail: product.id }));
  }

  function handleToggleCart() {
    onToggleCart(new CustomEvent('toggleCart', { detail: product.id }));
  }

  function showDetails() {
    onShowDetails(new CustomEvent('showDetails', { detail: product }));
  }
</script>

<div class="card">
  <img src={product.image} alt={product.title} on:click={showDetails} />
  <h2 class="text-lg font-semibold">{product.title}</h2>
  <p class="text-gray-900">${product.price}</p>
  <p class="text-gray-600">{product.category}</p>
  <div class="rating">
    {#each Array(Math.round(product.rating.rate)) as _}⭐{/each}
    <span>({product.rating.count})</span>
  </div>
  <button class="wishlist-button" on:click={handleToggleWishlist}>
    {#if isInWishlist}💖{/if}
    {#if !isInWishlist}🤍{/if}
  </button>
  <button class="cart-button" on:click={handleToggleCart}>
    {#if isInCart}🛒{/if}
    {#if !isInCart}➕{/if}
  </button>
</div>

<style>
  .card {
    /* your card styling here */
  }

  .wishlist-button,
  .cart-button {
    /* your button styling here */
  }
</style>
