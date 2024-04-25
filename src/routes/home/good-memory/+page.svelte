<script>
	import { LoadGoodMemory } from '../../../lib/api';
    import Footer from '../../../assests/Footer.svelte'
    import Navigation from '../../../assests/Navigation.svelte'
    import { GoodMemoryStore } from '../../../stores/good-memory-store';
    import { onMount } from 'svelte';
    const apiUrl = import.meta.env.VITE_API_URL;

    // "state"
    let goodMemories = [];

    // mount all good memories
    onMount(async () => {
        const data = await LoadGoodMemory();
        console.log('good-memory/page:', data)
        GoodMemoryStore.set(data)
    })

    // delete function
    const handleDelete = (id) => {
        const call = `${apiUrl}good-memory/${id}`
        console.log('delete call', call)
        fetch (call, {method: 'DELETE'}).then(response => {
            if(response.status == 204) {
                GoodMemoryStore.update(prev => prev.filter(memory => memory.id != id))
            }
        })
    }


    // subscribe
    $: goodMemories = $GoodMemoryStore

</script>
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
                <button on:click={() => handleDelete(memory.id)} class="delete">Delete</button>
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