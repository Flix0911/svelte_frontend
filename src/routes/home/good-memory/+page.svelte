<script>
	import TopOfPage from './../../../assests/TopOfPage.svelte';
	import { LoadGoodMemory } from '../../../lib/api';
    import Footer from '../../../assests/Footer.svelte'
    import Navigation from '../../../assests/Navigation.svelte'
    import { GoodMemoryStore } from '../../../stores/good-memory-store';
    import { onMount } from 'svelte';
    const apiUrl = import.meta.env.VITE_API_URL;


    // "state"
    let goodMemories = [];
    let searchYear = '';
    let searchLocation = '';
    let searchSeason = '';
    let searchCountry = '';

    // mount all good memories
    onMount(async () => {
        const data = await LoadGoodMemory();
        console.log('good-memory/page:', data)
        GoodMemoryStore.set(data)
    })

    // delete function
    const handleDelete = (id) => {
        const call = `${apiUrl}good-memory/${id}`
        console.log('delete call', call)
        fetch (call, {method: 'DELETE'}).then(response => {
            if(response.status == 204) {
                GoodMemoryStore.update(prev => prev.filter(memory => memory.id != id))
            }
        })
    }


    // subscribe
    $: goodMemories = $GoodMemoryStore

    // search for the year
    const handleYearSearch = () => {
        goodMemories = $GoodMemoryStore.filter(memory => {
            const memoryYear = new Date(memory.date).getFullYear();
            return memoryYear.toString() === searchYear
        })
    }

    // search for the location
    const handleLocationSearch = () => {
        goodMemories = $GoodMemoryStore.filter(memory => {
            return memory.location.toLowerCase().includes(searchLocation.toLowerCase());
        })
    }

    // search for season
    const handleSeasonSearch = () => {
        goodMemories = $GoodMemoryStore.filter(memory => {
            return memory.season.toLowerCase().includes(searchSeason.toLowerCase());
        })
    }

    // search for country
    const handleCountrySearch = () => {
        goodMemories = $GoodMemoryStore.filter(memory => {
            return memory.country.toLowerCase().includes(searchCountry.toLowerCase())
        })
    }

    // clear search
    const clearSearch = () => {
        searchYear = '';
        searchLocation = '';
        searchSeason = '';
        searchCountry = '';
        goodMemories = $GoodMemoryStore
    }

</script>
<Navigation />

<div class="memory-page-container">
    <div class="search-container">
        <input type="text" placeholder="Enter Year" class="search-input" bind:value={searchYear}/>
        <button class="search-button" on:click={handleYearSearch}>Search</button>
        <button class="clear-button" on:click={clearSearch}>Clear</button>
    </div>
    <div class="search-container">
        <input type="text" placeholder="Enter Location" class="search-input" bind:value={searchLocation}/>
        <button class="search-button" on:click={handleLocationSearch}>Search</button>
        <button class="clear-button" on:click={clearSearch}>Clear</button>
    </div>
    <div class="search-container">
        <input type="text" placeholder="Enter Season" class="search-input" bind:value={searchSeason}/>
        <button class="search-button" on:click={handleSeasonSearch}>Search</button>
        <button class="clear-button" on:click={clearSearch}>Clear</button>
    </div>
    <div class="search-container">
        <input type="text" placeholder="Enter Country" class="search-input" bind:value={searchCountry}/>
        <button class="search-button" on:click={handleCountrySearch}>Search</button>
        <button class="clear-button" on:click={clearSearch}>Clear</button>
    </div>

    <div class="memory-information-container">
        <h2 class="memory-title-page">Your Good Memories</h2>

        {#if goodMemories.length > 0}
            {#each goodMemories as memory}
                <div class="memory-details">
                    <h2 class="memory-title-container">Title: {memory.title}</h2>
                    <h3 class="memory-date-container">Date: {memory.date}</h3>
                    <h3 class="memory-location-container">Location: {memory.location}</h3>
                    <div class="memory-actions">
                        <a class="memory-link-container" href={`/home/good-memory/${memory.id}`}>View</a>
                        <button on:click={() => handleDelete(memory.id)} class="delete-button">Delete</button>
                    </div>
                </div>
            {/each}
        {:else}
            <p>Loading...</p>
        {/if}
    </div>
</div>


<TopOfPage />
<Footer />

<style>
    .memory-page-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 20px;
    }
  
    .search-container {
      margin-bottom: 10px;
      padding: 10px;
      width: 80%;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      background-color: white;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
    }
  
    .search-input {
      flex-grow: 1;
      margin-right: 10px;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  
    .search-button, .clear-button {
      padding: 8px 16px;
      border: none;
      background-color: #007BFF;
      color: white;
      border-radius: 4px;
      cursor: pointer;
    }
  
    .clear-button {
      background-color: #dc3545;
    }
  
    .memory-information-container {
      width: 80%;
      margin-top: 20px;
    }
  
    .memory-title-page {
      text-align: center;
      color: #333;
    }
  
    .memory-title-container, .memory-date-container, .memory-location-container {
      border-bottom: 1px solid #eee;
      padding: 10px;
      background-color: #f8f9fa;
      margin-top: 5px;
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
  
    .memory-link-container, .delete-button {
      display: inline-block;
      margin: 5px;
      text-decoration: none;
      color: #007BFF;
      padding: 5px 10px;
      border-radius: 4px;
      background-color: #28a745;
      color: white;
    }
  
    .delete-button {
      background-color: #dc3545;
    }
  
    .memory-link-container:hover, .delete-button:hover {
      opacity: 0.85;
    }
  </style>