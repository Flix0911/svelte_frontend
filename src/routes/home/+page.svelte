<script>
	import { ImagesStore } from './../../stores/images-store.js';
	import { BadMemoryStore } from './../../stores/bad-memory-store.js';
	import { GoodMemoryStore } from './../../stores/good-memory-store.js';
    import Footer from '../../assests/Footer.svelte'
    import Navigation from '../../assests/Navigation.svelte'
    import { onMount, onDestroy } from 'svelte';
    import { LoadGoodMemory, LoadBadMemory, LoadImages } from '$lib/api'

let goodMemories = [];
let badMemories = [];
// used for the images and the slideshow effect
let images = [];
let currentIndex = 0;
let interval;



onMount(async () => {
    // good memories
    const goodMemoryData = await LoadGoodMemory();
    console.log('Page good memory data:', goodMemoryData)
    GoodMemoryStore.set(goodMemoryData)

    // bad memories
    const badMemoryData = await LoadBadMemory();
    console.log('Page bad memory data:', badMemoryData)
    BadMemoryStore.set(badMemoryData)

    // images
    const imagesData = await LoadImages();
    console.log('Page images', imagesData)
    ImagesStore.set(imagesData)

    // function to begin the slideshow
    startSlideshow();
})

// subscribe to the goodmemory store
$: goodMemories = $GoodMemoryStore

// subscribe to the badmemory store
$: badMemories = $BadMemoryStore

// subscribe to the images store
$: images = $ImagesStore



 const startSlideshow = () => {
    interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
    }, 5000); 
  };

  const stopSlideshow = () => {
    clearInterval(interval);
  };

  onDestroy(() => {
    // Cleanup interval on component destroy
    stopSlideshow();
  });

</script>

<Navigation />

    <!-- IMAGES CONTAINER -->
    <div class="page-container">
        <div class="slideshow">
            {#if images.length > 0}
            <div class="tech-slideshow">
                {#each images as image, index}
                <div class="{`image mover-${index % 2 + 1}`} {index === currentIndex ? 'active' : ''}" style="background-image: url({image.image});"></div>
                {/each}
            </div>
            {:else}
            <p>Loading images...</p>
            {/if}
        </div>
        <hr>
    <div class="memories-wrapper">
        <!-- GOOD MEMORIES -->
        <div class="memories-container">
            <div class="header-container">
                <h1 class="memory-header">-Good Memories-</h1>
            </div>
            <div class="good-memory-information-container">
                {#if goodMemories.length > 0}
                    {#each goodMemories as memory}
                        <div class="memory-item">
                            <h2>{memory.title}</h2>
                            <a class="memory-link" href="/home/good-memory/{memory.id}/">*View*</a>
                        </div>
                    {/each}
                {:else}
                    <p>Loading...</p>
                {/if}
            </div>
        </div>

        <!-- BAD MEMORIES -->
        <div class="memories-container">
            <div class="header-container">
                <h1 class="memory-header">-Bad Memories-</h1>
            </div>
            <div class="bad-memory-information-container">
                {#if badMemories.length > 0}
                    {#each badMemories as memory}
                        <div class="memory-item">
                            <h2>{memory.title}</h2>
                            <a class="memory-link" href="/home/bad-memory/{memory.id}/">*View*</a>
                        </div>
                    {/each}
                {:else}
                    <p>Loading...</p>
                {/if}
            </div>
        </div>
    </div>
</div>


<Footer />

<style>
    .page-container {
        background-color: #f8f9fa; 
        padding: 20px; 
        font-family: 'Arial', sans-serif; 
    }

    .slideshow {
        height: 600px;
        max-width: 800px;
        margin: 20px auto;
        position: relative;
        overflow: hidden;
    }

    .tech-slideshow {
        height: 100%;
        width: 100%;
        position: relative;
        overflow: hidden;
    }

    .tech-slideshow .image {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        background-size: cover;
        background-repeat: no-repeat;
        transition: opacity 1s ease;
    }

    .tech-slideshow .image.active {
        opacity: 1;
    }

    .memories-wrapper {
        display: flex;
        overflow-x: auto; 
        padding: 15px 40px; 
    }

    .memories-container {
        flex-shrink: 0;
        width: 50%; 
        padding: 10px; 
        margin: 0 10px; 
        background-color: #fff; 
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); 
        border-radius: 5px; 
    }

    .header-container {
        padding-bottom: 10px;
        border-bottom: 5px solid #ccc;
    }

    .memory-header {
        margin: 10px 0;
        font-size: 35px;
        color: #333; 
        font-style: normal; 
        text-align: center;
    }

    .good-memory-information-container, .bad-memory-information-container {
        margin-top: 10px;
        max-height: 300px;
        overflow-y: auto;
        text-align: center;
    }

    .memory-item {
        margin-bottom: 15px;
        padding: 10px;
    }

    .memory-item h2 {
        margin: 0;
        font-size: 20px;
        color: #0d0111; 
    }

    .memory-link {
        color: #007bff;
        text-decoration: none;
        transition: color 0.3s ease;
    }

    .memory-link:hover {
        color: #dc3545;
        text-decoration: underline;
    }
</style>