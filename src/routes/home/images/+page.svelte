<script>
	import { ImagesStore } from './../../../stores/images-store.js';
    import Footer from '../../../assests/Footer.svelte'
    import Navigation from '../../../assests/Navigation.svelte'
    import { onMount } from 'svelte';  
    import { LoadImages } from '../../../lib/api.js';
    import TopOfPage from '../../../assests/TopOfPage.svelte';
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

<Navigation />

<div class="image-page-container">
    {#if images.length > 0}
        <div class="image-grid">
            {#each images as image}
                <div class="image-item">
                    <img src={image.image} alt="load" class="image-image-container"/>
                    <!-- get my id to link -->
                    {#if image.id}
                        <button on:click={() => handleDelete(image.id)} class="delete">Delete</button>
                    {:else}
                        <p>No ID available</p>
                    {/if}
                </div>
            {/each}
        </div>
    {:else}
        <p>Loading...</p>
    {/if}
</div>
<TopOfPage />
<Footer />

<style>
.image-page-container {
    display: flex;
    justify-content: center; 
    align-items: flex-start; 
}

.image-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr); 
    gap: 5px; 
    grid-row-gap: 5px;
}

.image-item {
    position: relative; 
    height: 100%;
}

.image-image-container {
    padding: 10px;
    width: 100%; 
    height: 100%; 
}

.delete {
    position: absolute;
    top: 10px;
    right: -10px;
    padding: 5px 10px;
    background-color: red;
    color: white;
    border: none;
    cursor: pointer;
    z-index: 1; 
}


.delete:hover,
.delete:focus {
    background-color: darkred;
}
</style>



