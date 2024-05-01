<script>
import Navigation from '../../../../../assests/Navigation.svelte';
import Footer from '../../../../../assests/Footer.svelte';
import { GoodMemoryStore } from '../../../../../stores/good-memory-store';
import { onMount } from 'svelte';
import { goto } from '$app/navigation';
import TopOfPage from '../../../../../assests/TopOfPage.svelte';
const apiUrl = import.meta.env.VITE_API_URL;


export let data;
export let id;
// state for memory
let goodMemory = [];
// state for all fields
let title = '';
let weather = '';
let comment = '';
let attendents = '';
let location = '';
let season = '';
let country = '';
let date = '';
let file = [];
let showInvalidMessage = false;

// console.log("data", data)
// console.log("id", id)

const handleSubmit = () => {
    // if(!validFields()) {
    //     showInvalidMessage = true;
    //     return
    // }
    const call = `${apiUrl}good-memory/${data}/`
    // console.log('when submit', call)
    let data = new FormData()
    data.append('title', title)
    data.append('weather', weather)
    data.append('comment', comment)
    data.append('attendents', attendents)
    data.append('location', location)
    data.append('season', season)
    data.append('country', country)
    data.append('date', date)

    // logic for image
    if(file) {
        data.append('image', file[0])
    }
    fetch (call, {method: 'PUT', body: data}).then(response => response.json()).then(data => {
        GoodMemoryStore.update(prev => {
            let updatedGoodMemory = $GoodMemoryStore.slice()
            let index = updatedGoodMemory.findIndex(goodMemory => goodMemory.id == data.id)
            updatedGoodMemory[index] = data
            // console.log("updated good memory", updatedGoodMemory)
            return updatedGoodMemory
        })
    })

    // redirect
    goto('/home/good-memory/')
}

// mount the memory
onMount(async function() {
    if($GoodMemoryStore.length) {
        goodMemory = $GoodMemoryStore.find(goodMemory => goodMemory.id == data.id)
    } else {
        const call = `${apiUrl}good-memory/${data.id}/`
        // console.log(call)
        // console.log('data-id', `${data.id}`)
        let response = await fetch(call)
        if (response.status == 200) {
            goodMemory = await response.json()
            if (goodMemory.image) {
                file = [{ name: goodMemory.image.split('/').pop() }]
            }
        } else {
            goodMemory = null
        }
    }
    ({ title, date, weather, attendents, location, season, country, comment, file, id } = goodMemory)
})


</script>

<Navigation />

<div class="form-container">
    {#if showInvalidMessage}
        <div class="invalid-message">
            <h4>Form data is not valid</h4>
        </div>
    {/if}

    <form class="edit-form" on:submit|preventDefault={handleSubmit}>
        <div class="form-group">
            <input type="text" placeholder="Title" bind:value={title} class="edit-input"/>
            <input type="text" placeholder="YYYY/MM/DD" bind:value={date} class="edit-input"/>
            <input type="text" placeholder="Weather" bind:value={weather} class="edit-input"/>
            <input type="text" placeholder="Attendents" bind:value={attendents} class="edit-input"/>
            <input type="text" placeholder="Location" bind:value={location} class="edit-input"/>
            <input type="text" placeholder="Season" bind:value={season} class="edit-input"/>
            <input type="text" placeholder="Country" bind:value={country} class="edit-input"/>
            <!-- need file name to show -->
            {#if file && file.length > 0}
                <input type="text" value={file[0].name} readonly class="edit-input"/>
            {:else}
                <input type="file" bind:files={file} class="edit-input"/>
            {/if}
            <textarea rows="6" placeholder="Comment" bind:value={comment} class="edit-input"></textarea>
        </div>
        <button type="submit" class="edit-button">Submit</button>
    </form>
</div>

<TopOfPage />
<Footer />

<style>
    .form-container {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        background-color: #f8f9fa;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .invalid-message {
        margin-bottom: 20px;
    }

    .edit-form {
        display: flex;
        flex-direction: column;
    }

    .form-group {
        margin-bottom: 20px;
    }

    .edit-input {
        padding: 10px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-sizing: border-box;
    }

    textarea.edit-input {
        resize: vertical; 
        min-height: 100px; 
    }

    .edit-button {
        padding: 10px 20px;
        border: none;
        background-color: #007bff;
        color: white;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .edit-button:hover {
        background-color: #0056b3; 
    }
</style>