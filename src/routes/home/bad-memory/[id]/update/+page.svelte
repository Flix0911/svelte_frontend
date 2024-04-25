<script>
import Navigation from "../../../../../assests/Navigation.svelte";
import Footer from "../../../../../assests/Footer.svelte";
import { BadMemoryStore } from "../../../../../stores/bad-memory-store";
import { onMount } from "svelte";
import { goto } from "$app/navigation";
const apiUrl = import.meta.env.VITE_API_URL

export let data;
export let id;
let badMemory = [];
let title = '';
let weather = '';
let comment = '';
let attendents = '';
let location = '';
let season = '';
let country = '';
let date = '';
let file;
let showInvalidMessage = false;

const handleSubmit = () => {




    const call = `${apiUrl}bad-memory/${id}/`
    console.log('when submit', call)
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
    fetch(call, {method: 'PUT', body: data}).then(response => response.json()).then(data => {
        BadMemoryStore.update(prev => {
            let updatedBadMemory = $BadMemoryStore.slice()
            let index = updatedBadMemory.findIndex(badMemory => badMemory.id == data.id)
            updatedBadMemory[index] = data
            console.log("updated bad memory", updatedBadMemory)
            return updatedBadMemory
        })
    })
    goto('/home/bad-memory/')
}

// mount the memory
onMount(async function() {
    if($BadMemoryStore.length) {
        badMemory = $BadMemoryStore.find(badMemory => badMemory.id == data.id)
    } else {
        const call = `${apiUrl}bad-memory/${data.id}/`
        console.log('update page', call)
        console.log('data-id', `${data.id}`)
        let response = await fetch(call)
        if (response.status == 200) {
            badMemory = await response.json()
        } else {
            badMemory = null
        }
    }
    ({ title, date, weather, attendents, location, season, country, comment, file, id } = badMemory)
})

</script>

<Navigation />

<div>
    {#if showInvalidMessage}
        <h4>Form data is not valid</h4>
    {/if}

    <form on:submit|preventDefault={handleSubmit}>
        <input class="edit-input" type="text" placeholder="title" bind:value={title}/>
        <input class="edit-input" type="text" placeholder="YYYY/MM/DD" bind:value={date}/>
        <input class="edit-input" type="text" placeholder="weather" bind:value={weather}/>
        <input class="edit-input" type="text" placeholder="attendents" bind:value={attendents}/>
        <input class="edit-input" type="text" placeholder="location" bind:value={location}/>
        <input class="edit-input" type="text" placeholder="season" bind:value={season}/>
        <input class="edit-input" type="text" placeholder="country" bind:value={country}/>
        <input class="edit-input" type="text" placeholder="comment" bind:value={comment}/>
        <input class="edit-input" type="file" bind:files={file}/>

        <button class="edit-button" type="submit">Submit</button>
    </form>
</div>

<h2>This is the routes/home/bad-memory/:id/update/page</h2>

<Footer />