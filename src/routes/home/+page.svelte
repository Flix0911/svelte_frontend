<script>
	import { ImagesStore } from './../../stores/images-store.js';
	import { BadMemoryStore } from './../../stores/bad-memory-store.js';
	import { GoodMemoryStore } from './../../stores/good-memory-store.js';
    import Header from '../../assests/Header.svelte'
    import Footer from '../../assests/Footer.svelte'
    import Navigation from '../../assests/Navigation.svelte'
    import { onMount } from 'svelte';
    import { LoadGoodMemory, LoadBadMemory, LoadImages } from '$lib/api'

let goodMemories = [];
let badMemories = [];
let images = [];

onMount(async () => {
    // good memories
    const goodMemoryData = await LoadGoodMemory();
    console.log('Page good memory data:', goodMemoryData)
    GoodMemoryStore.set(goodMemoryData)

    // bad memories
    const badMemoryData = await LoadBadMemory();
    console.log('Page bad memory data:', badMemoryData)
    BadMemoryStore.set(badMemoryData)

    // images
    const imagesData = await LoadImages();
    console.log('Page images', imagesData)
    ImagesStore.set(imagesData)
})

// subscribe to the goodmemory store
$: goodMemories = $GoodMemoryStore

// subscribe to the badmemory store
$: badMemories = $BadMemoryStore

// subscribe to the images store
$: images = $ImagesStore

</script>

<Navigation />

<h2>This is ./routers/home/page.svelte page</h2>

<div>
    {#each images as image}
        <img src={image.image} alt="Loaded-images"/>
    {/each}

    <!-- GOOD MEMORIES -->
    <h3>Good Memories</h3>
    {#if goodMemories.length > 0}
        {#each goodMemories as memory}
            <h2>{memory.title}</h2>
            <a href="/home/good-memory/{memory.id}/">View</a>
        {/each}
    {:else}
        <p>Loading...</p>
    {/if}

    <!-- BAD MEMORIES -->
    <h3>Bad Memories</h3>
    {#if badMemories.length > 0}
        {#each badMemories as memory}
            <h2>{memory.title}</h2>
        {/each}
    {:else}
        <p>Loading...</p>
    {/if}

</div>


<Footer />