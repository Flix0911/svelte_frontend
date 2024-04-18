<script>
	import { ImagesStore } from './../../../stores/images-store.js';
    import Header from '../../../assests/Header.svelte'
    import Footer from '../../../assests/Footer.svelte'
    import Navigation from '../../../assests/Navigation.svelte'
    import { onMount } from 'svelte';  
    import { LoadImages } from '../../../lib/api.js';
    

    // state
    let images = [];
    
    // mount all images
    onMount(async () => {
        const data = await LoadImages();
        console.log('images/page', data)
        ImagesStore.set(data)
    })

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