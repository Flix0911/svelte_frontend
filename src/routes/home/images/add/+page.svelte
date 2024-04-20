<script>
    import Header from '../../../../assests/Header.svelte'
    import Footer from '../../../../assests/Footer.svelte'
    import Navigation from '../../../../assests/Navigation.svelte'
    import { ImagesStore } from '../../../../stores/images-store';
    import { goto } from '$app/navigation';
    const apiUrl = import.meta.env.VITE_API_URL;

    // state 
    let files;

    // submit function
    let handleSubmit = () => {
        const call =  `${apiUrl}images/`
        console.log(call)
        let data = new FormData()
        console.log(data)
        data.append('image', files[0])
    
    fetch(call, {method: 'POST', body: data}).then(response => response.json()).then(data => {
        ImagesStore.update(prev => [...prev, data])
        goto('/home/images/')
    })
}


</script>

<Header />
<Navigation />

<div>
    <form on:submit|preventDefault={handleSubmit}>
        <input class="dummy-class" type="file" bind:files/>
        <button class="submit" type="submit">Submit</button>
    </form>
</div>
<h2>This is routes/home/images/add/page</h2>


<Footer />