<script>
    import { Router, Route, Link } from 'svelte-routing';
    import MainPage from './+page.svelte';
    import ProductDetails from './ProductDetails.svelte';
    
    export let url = '';
  </script>
  
  <Router {url}>
    <nav>
      <Link to="/">Home</Link>
    </nav>
  
    <main>
      <Route path="/" component={MainPage} />
      <Route path="/product/:id" let:params>
        <ProductDetails id={params.id} />
      </Route>
    </main>
  </Router>
  
  <style>
    nav {
      padding: 1rem;
      background-color: #f0f0f0;
    }
  
    nav :global(a) {
      color: #333;
      text-decoration: none;
      font-weight: bold;
    }
  
    nav :global(a:hover) {
      text-decoration: underline;
    }
  
    main {
      padding: 1rem;
    }
  </style>