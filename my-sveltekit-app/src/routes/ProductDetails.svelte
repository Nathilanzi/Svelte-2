<script lang="ts">
    import type { Product } from './App.svelte';
  
    export let product: Product;
    export let isInWishlist: boolean;
    export let isInCart: boolean;
    export let onClose: () => void;
    export let onToggleWishlist: (event: CustomEvent<number>) => void;
    export let onToggleCart: (event: CustomEvent<number>) => void;
  
    function handleToggleWishlist() {
      onToggleWishlist(new CustomEvent('toggleWishlist', { detail: product.id }));
    }
  
    function handleToggleCart() {
      onToggleCart(new CustomEvent('toggleCart', { detail: product.id }));
    }
  </script>
  
  <div class="modal">
    <button class="close-button" on:click={onClose}>Close</button>
    <img src={product.image} alt={product.title} />
    <h2>{product.title}</h2>
    <p>${product.price}</p>
    <p>{product.description}</p>
    <p>{product.category}</p>
    <div class="rating">
      {#each Array(Math.round(product.rating.rate)) as _}⭐{/each}
      <span>({product.rating.count})</span>
    </div>
    <button on:click={handleToggleWishlist}>
      {#if isInWishlist}Remove from Wishlist{/if}
      {#if !isInWishlist}Add to Wishlist{/if}
    </button>
    <button on:click={handleToggleCart}>
      {#if isInCart}Remove from Cart{/if}
      {#if !isInCart}Add to Cart{/if}
    </button>
  </div>
  
  <style>
    .modal {
      /* your modal styling here */
    }
  
    .close-button {
      /* your close button styling here */
    }
  </style>
  