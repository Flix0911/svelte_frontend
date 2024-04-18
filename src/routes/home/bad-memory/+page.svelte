<script>
	import { BadMemoryStore } from '../../../stores/bad-memory-store';
    import Header from '../../../assests/Header.svelte'
    import Footer from '../../../assests/Footer.svelte'
    import Navigation from '../../../assests/Navigation.svelte'
    import { LoadBadMemory } from '$lib/api';
    import { onMount } from 'svelte';

// "state"
let badMemories = [];

// mount all bad memories
onMount(async () => {
    const data = await LoadBadMemory();
    console.log('bad-memory/page:', data)
    BadMemoryStore.set(data)
})

// subscribe
$: badMemories = $BadMemoryStore

</script>

<Header />
<Navigation />

<div>
    {#if badMemories.length > 0}
        {#each badMemories as memory}
            <h2>Title:{memory.title}</h2>
            <h3>Date:{memory.date}</h3>
            <h3>Location:{memory.location}</h3>
            <!-- get my ID to link -->
            {#if memory.id}
                <a href="/home/bad-memory/{memory.id}">View</a>
            {:else}
                <p>No ID available</p>
            {/if}
        {/each} 
    {:else}
        <p>Loading...</p>
    {/if}
</div>

<h2>This is routes/home/bad-memory/page</h2>


<Footer />