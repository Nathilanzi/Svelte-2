<script>
    import { onMount } from 'svelte';
    import { navigate } from 'svelte-routing';
  
    let products = [];
    let categories = [];
    let filteredCategories = [];
    let wishlist = [];
    let cart = [];
    let searchTerm = "";
    let sortOrder = "asc";
    let filter = "";
    let loading = false;
    let error = "";
  
    onMount(async () => {
      await fetchCategories();
      await fetchProducts();
    });
  
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
  
    async function fetchProducts() {
      loading = true;
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error(`Failed to fetch products: ${res.statusText}`);
        let data = await res.json();
        if (filter) {
          data = data.filter(product => product.category === filter);
        }
        data = data.sort((a, b) => sortOrder === "asc" ? a.price - b.price : b.price - a.price);
        products = data;
      } catch (err) {
        console.error("Failed to fetch products:", err);
        error = "Failed to load products. Please try again later.";
      }
      loading = false;
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
  
    function goToDetail(id) {
      navigate(`/product/${id}`);
    }
  
    function toggleWishlist(productId) {
      if (wishlist.includes(productId)) {
        wishlist = wishlist.filter(id => id !== productId);
      } else {
        wishlist.push(productId);
      }
    }
  
    function toggleCart(productId) {
      if (cart.includes(productId)) {
        cart = cart.filter(id => id !== productId);
      } else {
        cart.push(productId);
      }
    }
  </script>
  
  <style>
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 16px;
    }
  
    .card {
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
      padding: 16px;
      position: relative;
      cursor: pointer;
    }
  
    .card img {
      max-width: 100%;
      height: auto;
    }
  
    .wishlist-button,
    .cart-button {
      position: absolute;
      bottom: 8px;
      padding: 8px;
      border-radius: 50%;
      cursor: pointer;
    }
  
    .wishlist-button {
      left: 8px;
      background-color: yellow;
    }
  
    .cart-button {
      right: 8px;
      background-color: green;
      color: white;
    }
  </style>
  
  <div class="container mx-auto p-4">
    <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
      <input type="text" bind:value={searchTerm} on:input={filterCategories} placeholder="Search categories..." class="bg-gray-200 text-gray-900 px-4 py-2 rounded mb-4 md:mb-0" />
      <div class="flex flex-col md:flex-row md:space-x-4 mt-4 md:mt-0">
        <select bind:value={sortOrder} on:change={fetchProducts} class="bg-gray-200 text-gray-900 px-4 py-2 rounded">
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
        <button on:click={resetFilters} class="bg-red-500 text-white px-4 py-2 rounded">Reset Filters</button>
      </div>
    </div>
  
    {#if error}
      <p class="text-red-500">{error}</p>
    {/if}
  
    {#if loading}
      <p>Loading...</p>
    {:else}
      <div class="grid">
        {#each products as product}
          <div class="card" on:click={() => goToDetail(product.id)}>
            <img src={product.image} alt={product.title} class="w-full h-40 object-cover mb-4" />
            <h2 class="text-lg font-semibold">{product.title}</h2>
            <p class="text-gray-900">${product.price}</p>
            <p class="text-gray-600">{product.category}</p>
            <div class="rating">
              {Array(Math.round(product.rating.rate)).fill().map(() => "⭐")}
              <span>({product.rating.count})</span>
            </div>
            <button class="wishlist-button" on:click={() => toggleWishlist(product.id)}>
              {wishlist.includes(product.id) ? "💖" : "🤍"}
            </button>
            <button class="cart-button" on:click={() => toggleCart(product.id)}>
              {cart.includes(product.id) ? "🛒" : "➕"}
            </button>
          </div>
        {/each}
      </div>
    {/if}
  </div>
  