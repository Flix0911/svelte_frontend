<!-- Return to this later, want to separate out concerns -->


<script>
    import { GoodMemoryStore } from '../stores/good-memory-store';
    const apiUrl = import.meta.env.VITE_API_URL;
    import { onMount } from 'svelte'; 

let goodMemory = {};
let title = '';
let weather = '';
let comment = '';
let attendents = '';
let location = '';
let season = '';
let country = '';
let date = '';
let file;

onMount(async function() {
    if($GoodMemoryStore.length) {
        goodMemory = $GoodMemoryStore.find(goodMemory => goodMemory.id == data.id)
    } else {
        const call = `${apiUrl}good-memory/${data.id}/`
        console.log(call)
        console.log('data-id', `${data.id}`)
        let response = await fetch(call)
        if (response.status == 200) {
            goodMemory = await response.json()
        } else {
            goodMemory = null
        }
    }
    ({ title, date, weather, attendents, location, season, country, comment, file, id } = goodMemory)
})
</script>

<form>
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
