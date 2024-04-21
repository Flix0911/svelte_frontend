<script>
	import { ImagesStore } from './../../../stores/images-store.js';
    import Header from '../../../assests/Header.svelte'
    import Footer from '../../../assests/Footer.svelte'
    import Navigation from '../../../assests/Navigation.svelte'
    import { onMount } from 'svelte';  
    import { LoadImages } from '../../../lib/api.js';
    const apiUrl = import.meta.env.VITE_API_URL;
    

    // state
    let images = [];
    
    // mount all images
    onMount(async () => {
        const data = await LoadImages();
        console.log('images/page', data)
        ImagesStore.set(data)
    })

    // delete function
    const handleDelete = (id) => {
        const call = `${apiUrl}images/${id}`
        console.log('delete call', call)
        fetch(call, {method: 'DELETE'}).then(response => {
            if(response.status == 204) {
                ImagesStore.update(prev => prev.filter(images => images.id != id))
            }
        })
    }

    // subscribe
    $: images = $ImagesStore

</script>

<Header />
<Navigation />

<div>
    {#if images.length > 0}
        {#each images as image}
            <img src={image.image} alt="load"/>
            <!-- get my id to link -->
            {#if image.id}
                <a href="/home/images/{image.id}">View</a>
                <button on:click={() => handleDelete(image.id)} class="delete">Delete</button>
            {:else}
                <p>No ID available</p>
            {/if}
        {/each}
    {:else}
        <p>Loading...</p>
    {/if}
    
</div>

<h2>This is routes/home/images/page</h2>


<Footer />