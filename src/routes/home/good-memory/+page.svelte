<script>
	import { LoadGoodMemory } from '../../../lib/api';
    import Header from '../../../assests/Header.svelte'
    import Footer from '../../../assests/Footer.svelte'
    import Navigation from '../../../assests/Navigation.svelte'
    import { GoodMemoryStore } from '../../../stores/good-memory-store';
    import { onMount } from 'svelte';

    // "state"
    let goodMemories = [];

    // mount all good memories
    onMount(async () => {
        const data = await LoadGoodMemory();
        console.log('good-memory/page:', data)
        GoodMemoryStore.set(data)
    })

    // subscribe
    $: goodMemories = $GoodMemoryStore

</script>

<Header />
<Navigation />

<div>
    {#if goodMemories.length > 0}
        {#each goodMemories as memory}
            <h2>Title:{memory.title}</h2>
            <h3>Date:{memory.date}</h3>
            <h3>Location:{memory.location}</h3>
            <!-- get my ID to link -->
            {#if memory.id}
                <a href="/home/good-memory/{memory.id}">View</a>
            {:else}
                <p>No ID available</p>
            {/if}
        {/each}
    {:else}
        <p>Loading...</p>
    {/if}
</div>

<h2>This is routes/home/good-memory/page</h2>


<Footer />