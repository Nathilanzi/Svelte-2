<!-- <script lang="ts">
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
  
    let product: Product | null = null;
    let loading: boolean = true;
    let error: string = "";
  
    // Define the type for the product
    interface Product {
      id: number;
      title: string;
      image: string;
      price: number;
      category: string;
      description: string;
      rating: {
        rate: number;
        count: number;
      };
    }
  
    // Fetch product details based on ID
    async function fetchProduct(id: number) {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch product details: ${res.statusText}`);
        }
        product = await res.json();
      } catch (err) {
        console.error("Failed to fetch product details:", err);
        error = "Failed to load product details. Please try again later.";
      } finally {
        loading = false;
      }
    }
  
    // On mount, fetch the product details using the ID from the URL
    onMount(() => {
      const id = Number($page.params.id); // Convert the ID to a number
      if (id) {
        fetchProduct(id);
      } else {
        error = "No product ID provided.";
        loading = false;
      }
    });
  
    function goBack() {
      goto('/');
    }
  </script>
  
  <div class="product-detail">
    <button on:click={goBack} class="mb-4 bg-gray-500 text-white px-4 py-2 rounded">
      Back to Products
    </button>
    {#if error}
      <p class="text-red-500">{error}</p>
    {:else if loading}
      <p>Loading...</p>
    {:else if product}
      <h1 class="text-3xl font-bold mb-4">{product.title}</h1>
      <img src={product.image} alt={product.title} class="product-image mb-4">
      <p class="text-xl font-semibold mb-2">${product.price}</p>
      <p class="text-gray-600 mb-2">Category: {product.category}</p>
      <p class="mb-4">{product.description}</p>
      <div class="rating">
        {#each Array(Math.round(product.rating.rate)) as _}⭐{/each}
        <span class="text-gray-600">({product.rating.count} reviews)</span>
      </div>
    {:else}
      <p>No product found.</p>
    {/if}
  </div>
  
  <style>
    .product-detail {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    .product-image {
      max-width: 100%;
      height: auto;
    }
    .rating {
      color: #f1c40f;
    }
  </style>
   -->