<script>
	import TopOfPage from './../../../../assests/TopOfPage.svelte';
	import { GoodMemoryStore } from './../../../../stores/good-memory-store.js';
    import Footer from '../../../../assests/Footer.svelte'
    import Navigation from '../../../../assests/Navigation.svelte'
    import { onMount } from 'svelte';
    const apiUrl = import.meta.env.VITE_API_URL;

    // state
    let goodMemory = [];
    export let data;
    // console.log('id',data)

    // mount the good memory
    onMount(async function() {
        if($GoodMemoryStore.length) {
            goodMemory = $GoodMemoryStore.find(goodMemory => goodMemory.id == data.id)
        } else {
            const call = `${apiUrl}good-memory/${data.id}/`
            // console.log('goodmemory/id page', call)
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

<div class="entire-memory-container">
    {#if goodMemory}
        <div class="memory-details">
            <h2 class="memory-title">{goodMemory.title}</h2>
            <div class="memory-info">
                <h3>Date: {goodMemory.date}</h3>
                <h3>Weather: {goodMemory.weather}</h3>
                <h3>Attendents: {goodMemory.attendents}</h3>
                <h3>Location: {goodMemory.location}</h3>
                <h3>Season: {goodMemory.season}</h3>
                <h3>Country: {goodMemory.country}</h3>
                <h3>Comments:</h3>
                <p>{goodMemory.comment}</p>
            </div>
            <div class="image-container">
                <img src={goodMemory.image} alt="memory-screenshot" class="memory-picture"/>
            </div>
            <div class="edit-link-container">
                {#if goodMemory.id}
                    <a href="/home/good-memory/{goodMemory.id}/update" class="edit-link">Edit</a>
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