<script>
    import ProductCard from './ProductCard.svelte';
    export let products;
    export let onToggleWishlist;
    export let onToggleCart;
    export let onShowDetails;
  </script>
  
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {#each products as product}
      <ProductCard 
        product={product} 
        on:toggleWishlist={() => onToggleWishlist(product.id)}
        on:toggleCart={() => onToggleCart(product.id)}
        on:showDetails={() => onShowDetails(product)}
      />
    {/each}
  </div>
  