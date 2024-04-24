<script>
	import { BadMemoryStore } from './../../../../stores/bad-memory-store.js';
    import Header from '../../../../assests/Header.svelte'
    import Footer from '../../../../assests/Footer.svelte'
    import Navigation from '../../../../assests/Navigation.svelte'
    import { onMount } from 'svelte';
    const apiUrl = import.meta.env.VITE_API_URL;


// state
let badMemory = [];
export let data;

// mount the bad memory
onMount(async function() {
    if($BadMemoryStore.length) {
        badMemory = $BadMemoryStore.find(badMemory => badMemory.id == data.id)
    } else {
        const call = `${apiUrl}/bad-memory/${data.id}/`
        console.log(call)
        let response = await fetch(call)
        if (response.status == 200) {
            badMemory = await response.json()
        } else {
            badMemory = null
        }
    }
})

</script>

<Header />
<Navigation />

<div>
    {#if badMemory}
        <h2>Title:{badMemory.title}</h2>
        <h3>Date:{badMemory.date}</h3>
        <h3>Weather:{badMemory.weather}</h3>
        <h3>Attendents:{badMemory.attendents}</h3>
        <h3>Location:{badMemory.location}</h3>
        <h3>Season:{badMemory.season}</h3>
        <h3>Country:{badMemory.country}</h3>
        <h3>Comments:{badMemory.comment}</h3>
        <img src={badMemory.image} alt="loaded"/>
        {#if badMemory.id}
            <a href="/home/bad-memory/{badMemory.id}/update">Edit</a>
        {:else}
            <p>No ID available</p>
        {/if}
    {:else}
        <p>Loading...</p>
    {/if}
</div>

<h2>This is routes/home/bad-memory/id/page</h2>


<Footer />