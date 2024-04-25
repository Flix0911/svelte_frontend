<script>
	import { GoodMemoryStore } from './../../../../stores/good-memory-store.js';
    import Footer from '../../../../assests/Footer.svelte'
    import Navigation from '../../../../assests/Navigation.svelte'
    import { onMount } from 'svelte';
    const apiUrl = import.meta.env.VITE_API_URL;

    // state
    let goodMemory = [];
    export let data;

    // mount the good memory
    onMount(async function() {
        if($GoodMemoryStore.length) {
            goodMemory = $GoodMemoryStore.find(goodMemory => goodMemory.id == data.id)
        } else {
            const call = `${apiUrl}good-memory/${data.id}/`
            console.log('goodmemory/id page', call)
            let response = await fetch(call)
            if (response.status == 200) {
                goodMemory = await response.json()
            } else {
                goodMemory = null
            }
        }
    })

</script>
<Navigation />

<div>
    {#if goodMemory}
        <h2>Title:{goodMemory.title}</h2>
        <h3>Date:{goodMemory.date}</h3>
        <h3>Weather:{goodMemory.weather}</h3>
        <h3>Attendents:{goodMemory.attendents}</h3>
        <h3>Location:{goodMemory.location}</h3>
        <h3>Season:{goodMemory.season}</h3>
        <h3>Country:{goodMemory.country}</h3>
        <h3>Comments:{goodMemory.comment}</h3>
        <img src={goodMemory.image} alt="loaded"/>
        <!-- take that ID and go update -->
        {#if goodMemory.id}
            <a href="/home/good-memory/{goodMemory.id}/update">Edit</a>
        {:else}
            <p>No ID available</p>
        {/if}
    {:else}
        <p>Loading...</p>
    {/if}
</div>

<h2>This is routes/home/good-memory/id/page</h2>


<Footer />