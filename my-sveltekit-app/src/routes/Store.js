import { writable } from 'svelte/store';

// Create writable stores for filters and sorting
export const products = writable([]);
export const categories = writable([]);
export const wishlist = writable([]);
export const cart = writable([]);
export const searchTerm = writable("");
export const sortOrder = writable("asc"); // "asc" for price low to high, "desc" for high to low
export const filter = writable("");
export const loading = writable(false);
export const error = writable("");
