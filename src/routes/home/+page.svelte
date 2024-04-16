<script>
	import { GoodMemoryStore } from './../../stores/good-memory-store.js';
    import Header from '../../assests/Header.svelte'
    import Footer from '../../assests/Footer.svelte'
    import Navigation from '../../assests/Navigation.svelte'
    import { onMount } from 'svelte';
    import { LoadGoodMemory, LoadBadMemory, LoadImages } from '$lib/api'

let goodMemories = [];
let badMemories = [];
let images = null;

onMount(async () => {
    const goodMemoryData = await LoadGoodMemory();
    console.log('Page good memory data:', goodMemoryData)
    GoodMemoryStore.set(goodMemoryData)
})

$: goodMemories = $GoodMemoryStore

</script>

<Header />
<Navigation />

<h2>This is ./routers/home/page.svelte page</h2>

<div>
    {#if goodMemories.length > 0}
        {#each goodMemories as memory}
            <h2>{memory.title}</h2>
        {/each}
    {:else}
        <p>Loading...</p>
    {/if}

</div>


<Footer />