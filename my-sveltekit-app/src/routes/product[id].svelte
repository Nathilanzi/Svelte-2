<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { goto } from 'svelte-routing';
  
    let products = [];
    let categories = [];
    let filteredCategories = [];
    let wishlist = writable([]);
    let cart = writable([]);
    let searchTerm = "";
    let sortOrder = "asc";
    let filter = "";
    let loading = false;
    let error = "";
  
    async function fetchProducts() {
      loading = true;
      error = "";
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error(`Failed to fetch products: ${res.statusText}`);
        let data = await res.json();
        if (filter) data = data.filter(product => product.category === filter);
        data = data.sort((a, b) => sortOrder === "asc" ? a.price - b.price : b.price - a.price);
        products = data;
      } catch (err) {
        console.error("Failed to fetch products:", err);
        error = "Failed to load products. Please try again later.";
      }
      loading = false;
    }
  
    async function fetchCategories() {
      try {
        const res = await fetch("https://fakestoreapi.com/products/categories");
        if (!res.ok) throw new Error(`Failed to fetch categories: ${res.statusText}`);
        categories = await res.json();
        filteredCategories = categories;
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        error = "Failed to load categories. Please try again later.";
      }
    }
  
    function filterCategories() {
      const term = searchTerm.toLowerCase();
      filteredCategories = categories.filter(category => category.toLowerCase().includes(term));
    }
  
    function resetFilters() {
      filter = "";
      sortOrder = "asc";
      searchTerm = "";
      filteredCategories = categories;
      fetchProducts();
    }
  
    function navigateToProductDetail(productId) {
      goto(`/product/${productId}`);
    }
  
    function toggleWishlist(productId) {
      wishlist.update(wishlist => wishlist.includes(productId) ? wishlist.filter(id => id !== productId) : [...wishlist, productId]);
    }
  
    function toggleCart(productId) {
      cart.update(cart => cart.includes(productId) ? cart.filter(id => id !== productId) : [...cart, productId]);
    }
  
    function clearWishlist() {
      wishlist.set([]);
    }
  
    function clearCart() {
      cart.set([]);
    }
  
    onMount(() => {
      fetchProducts();
      fetchCategories();
    });
  </script>
  
  <main>
    {#if loading}
      <p>Loading...</p>
    {:else if error}
      <p class="text-red-500">{error}</p>
    {:else}
      <div class="container mx-auto p-4">
        <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
          <input type="text" bind:value={searchTerm} on:input={filterCategories} placeholder="Search categories..." class="bg-gray-200 text-gray-900 px-4 py-2 rounded mb-4 md:mb-0" />
          <div class="flex flex-col md:flex-row md:space-x-4 mt-4 md:mt-0">
            <select bind:value={filter} on:change={fetchProducts} class="bg-gray-200 text-gray-900 px-4 py-2 rounded">
              <option value="">All Categories</option>
              {#each filteredCategories as category}
                <option value={category}>{category}</option>
              {/each}
            </select>
            <select bind:value={sortOrder} on:change={fetchProducts} class="bg-gray-200 text-gray-900 px-4 py-2 rounded">
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
            <button on:click={resetFilters} class="bg-red-500 text-white px-4 py-2 rounded">Reset Filters</button>
          </div>
        </div>
  
        <div class="grid">
          {#each products as product}
            <div class="card">
              <img src={product.image} alt={product.title} on:click={() => navigateToProductDetail(product.id)} />
              <h2 class="text-lg font-semibold">{product.title}</h2>
              <p class="text-gray-900">${product.price}</p>
              <p class="text-gray-600">{product.category}</p>
              <div class="rating">
                {#each Array(Math.round(product.rating.rate)) as _}⭐{/each}
                <span>({product.rating.count})</span>
              </div>
              <button class="wishlist-button" on:click={() => toggleWishlist(product.id)}>
                {#if $wishlist.includes(product.id)}💖{/if}
                {#if !$wishlist.includes(product.id)}🤍{/if}
              </button>
              <button class="cart-button" on:click={() => toggleCart(product.id)}>
                {#if $cart.includes(product.id)}🛒{/if}
                {#if !$cart.includes(product.id)}➕{/if}
              </button>
            </div>
          {/each}
        </div>
        <button on:click={clearWishlist} class="mt-4 bg-yellow-500 text-white px-4 py-2 rounded">Clear Wishlist</button>
        <button on:click={clearCart} class="mt-4 bg-green-500 text-white px-4 py-2 rounded">Clear Cart</button>
      </div>
    {/if}
  </main>
  
  <style>
    /* Your existing styles */
  </style>
  