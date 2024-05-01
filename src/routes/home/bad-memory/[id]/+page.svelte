<script>
	import { BadMemoryStore } from './../../../../stores/bad-memory-store.js';
    import Footer from '../../../../assests/Footer.svelte'
    import Navigation from '../../../../assests/Navigation.svelte'
    import { onMount } from 'svelte';
    import TopOfPage from '../../../../assests/TopOfPage.svelte';
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
        // console.log(call)
        let response = await fetch(call)
        if (response.status == 200) {
            badMemory = await response.json()
        } else {
            badMemory = null
        }
    }
})

</script>

<Navigation />

<div class="entire-memory-container">
    {#if badMemory}
        <div class="memory-details">
            <h2 class="memory-title">{badMemory.title}</h2>
            <div class="memory-info">
                <h3>Date: {badMemory.date}</h3>
                <h3>Weather: {badMemory.weather}</h3>
                <h3>Attendents: {badMemory.attendents}</h3>
                <h3>Location: {badMemory.location}</h3>
                <h3>Season: {badMemory.season}</h3>
                <h3>Country: {badMemory.country}</h3>
                <h3>Comments:</h3>
                <p>{badMemory.comment}</p>
            </div>
            <div class="image-container">
                <img src={badMemory.image} alt="memory-screenshot" class="memory-picture"/>
            </div>
            <div class="edit-link-container">
                {#if badMemory.id}
                    <a href="/home/bad-memory/{badMemory.id}/update" class="edit-link">Edit</a>
                {:else}
                    <p>No ID available</p>
                {/if}
            </div>
        </div>
    {:else}
        <p>Loading...</p>
    {/if}
</div>
<TopOfPage />
<Footer />

<style>
    .entire-memory-container {
        padding: 20px;
        margin: 20px;
        background-color: #f8f9fa;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .memory-title {
        margin-bottom: 10px;
        color: #bc1212;
        font-size: 40px;
    }

    .memory-info {
        margin-bottom: 20px;
    }

    .memory-info h3 {
        margin: 7px 0;
        color: #555;
        font-size: 18px;
    }

    .memory-info p {
        margin: 8px 0;
        color: #333;
        font-size: 16px;
    }

    .image-container {
        margin-bottom: 20px;
        text-align: center;
    }

    .memory-picture {
        max-width: 70%;
        max-height: 70%;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .edit-link-container {
        text-align: center;
    }

    .edit-link {
        display: inline-block;
        padding: 8px 16px;
        margin-top: 10px;
        background-color: #cdda1d;
        color: white;
        border-radius: 5px;
        text-decoration: none;
        transition: background-color 0.3s ease;
    }

    .edit-link:hover {
        background-color: #358f28; 
    }
</style>