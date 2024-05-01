<script>
	import { goto } from '$app/navigation';
	import { BadMemoryStore } from './../../../../stores/bad-memory-store.js';
    import Footer from '../../../../assests/Footer.svelte'
    import Navigation from '../../../../assests/Navigation.svelte'
    import TopOfPage from '../../../../assests/TopOfPage.svelte';
    const apiUrl = import.meta.env.VITE_API_URL

    // state
    let title = '';
    let weather = '';
    let comment = '';
    let attendents = '';
    let location = '';
    let season = '';
    let country = '';
    let date = '';
    let files = '';

    // handleSubmit function
    let handleSubmit = () => {
        const call = `${apiUrl}bad-memory/`
        console.log('the call', call)
        let data = new FormData()
        console.log('data', data)
        data.append('title', title)
        data.append('weather', weather)
        data.append('comment', comment)
        data.append('attendents', attendents)
        data.append('location', location)
        data.append('season', season)
        data.append('country', country)
        data.append('date', date)
        data.append('image', files[0])

        fetch(call, {method: 'POST', body: data}).then(response => response.json()).then(data => {
            BadMemoryStore.update(prev => [...prev, data])
            // console.log('data in fetch', data)
            goto('/home/bad-memory/')
        })
    }
    
</script>


<Navigation />
<div class="add-memory-container">
    <h2>Add Bad Memory</h2>
    <div class="form-container">
        <form on:submit|preventDefault={handleSubmit}>
            <div class="input-group">
                <input class="input-container" type="text" placeholder="title" bind:value={title}/>
                <input class="input-container" type="text" placeholder="weather" bind:value={weather}/>
                <input class="input-container" type="text" placeholder="attendents" bind:value={attendents}/>
                <input class="input-container" type="text" placeholder="location" bind:value={location}/>
                <input class="input-container" type="text" placeholder="season" bind:value={season}/>
                <input class="input-container" type="text" placeholder="country" bind:value={country}/>
                <input class="input-container" type="text" placeholder="YYYY-MM-DD" bind:value={date}/>
                <input class="input-container" type="file" bind:files/>
            </div>
            <!-- need this textarea for the ability to write large comments -->
            <textarea rows="4" placeholder="Comment" bind:value={comment} class="input-container"></textarea>
            <button class="submit-button" type="submit">Submit</button>
        </form>
    </div>
</div>

<TopOfPage />
<Footer />

<style>
    .add-memory-container {
        background-color: #f8f9fa;
        padding: 20px;
        margin: 20px;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    h2 {
        color: #333;
        font-size: 30px;
        margin-bottom: 20px;
        text-align: center;
    }

    .form-container {
        max-width: 600px;
        margin: 0 auto;
    }

    .input-group {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        grid-gap: 10px;
        margin-bottom: 20px;
    }

    .input-container {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        width: 100%;
        box-sizing: border-box; 
        margin-bottom: 10px;
        text-align: center;
    }

    textarea.input-container {
        resize: vertical; 
        min-height: 100px; 
    }

    .submit-button {
        padding: 10px 20px;
        border: none;
        background-color: #007bff;
        color: white;
        border-radius: 5px;
        cursor: pointer;
    }

    .submit-button:hover {
        background-color: #18bc46; 
    }
</style>