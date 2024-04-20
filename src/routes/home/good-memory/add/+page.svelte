<script>
	import { goto } from '$app/navigation';
    import Header from '../../../../assests/Header.svelte'
    import Footer from '../../../../assests/Footer.svelte'
    import Navigation from '../../../../assests/Navigation.svelte'
    import { GoodMemoryStore } from '../../../../stores/good-memory-store';
    const apiUrl = import.meta.env.VITE_API_URL;

    // state
    let title = '';
    let weather = '';
    let comment = '';
    let attendents = '';
    let location = '';
    let season = '';
    let country = '';
    let date = '';
    let files;

    let handleSubmit = () => {
        const call = `${apiUrl}good-memory/`
        console.log(call)
        let data = new FormData()
        console.log(data)
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
        GoodMemoryStore.update(prev => [...prev, data])
        console.log("data in fetch", data)
        goto('/home/good-memory/')
    })
}
    
</script>

<Header />
<Navigation />

<div>
    <form on:submit|preventDefault={handleSubmit}>
        <input class="dummy" type="text" placeholder="title" bind:value={title}/>
        <input class="dummy" type="text" placeholder="weather" bind:value={weather}/>
        <input class="dummy" type="text" placeholder="comment" bind:value={comment}/>
        <input class="dummy" type="text" placeholder="attendents" bind:value={attendents}/>
        <input class="dummy" type="text" placeholder="location" bind:value={location}/>
        <input class="dummy" type="text" placeholder="season" bind:value={season}/>
        <input class="dummy" type="text" placeholder="country" bind:value={country}/>
        <input class="dummy" type="text" placeholder="YYYY-MM-DD" bind:value={date}/>
        <input class="dummy" type="file" bind:files/>
        <button class="submit" type="submit">Submit</button>

    </form>
</div>

<h2>This is routes/home/good-memory/add/page</h2>


<Footer />