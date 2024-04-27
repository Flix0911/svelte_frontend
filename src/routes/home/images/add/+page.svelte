<script>
    import Footer from '../../../../assests/Footer.svelte'
    import Navigation from '../../../../assests/Navigation.svelte'
    import { ImagesStore } from '../../../../stores/images-store';
    import { goto } from '$app/navigation';
    const apiUrl = import.meta.env.VITE_API_URL;

    // state 
    let files = [];
    let selectedFiles = [];

    // submit function
    let handleSubmit = async () => {
        const call =  `${apiUrl}images/`
        console.log(call)
        let data = new FormData()
        console.log(data)
        // will allow multiple files
        files.forEach(file => {
            data.append('image', file)
        })
    
    try {
        const response = await fetch(call, {method: 'POST', body: data});
        const responseData = await response.json();
        // convert
        ImagesStore.update(prev => [...prev, responseData])
        goto('/home/images/');
    // need error handling with this
    } catch (error) {
        console.error('Error', error)
    }
}

    // function for file selection
    let handleFileChange = (event) => {
        files = Array.from(event.target.files)

        // display
        selectedFiles = files.map(file => file.name)
    }


</script>

<Navigation />
<div>
    <form class="image-form" on:submit|preventDefault={handleSubmit}>
        <!-- Multiple files being accepted -->
        <input class="image-input-class" type="file" bind:files multiple on:change={handleFileChange}/>
        <div class="selected-files-container">
            {#if selectedFiles.length > 0}
                <div class="selected-files">
                    <h4>Selected Files:</h4>
                    {#each selectedFiles as file}
                        <div>{file}</div>
                    {/each}
                </div>
            {:else}
                <p>No files selected</p>
            {/if}
        </div>
        <button class="image-submit" type="submit">Submit</button>
    </form>
</div>


<Footer />

<style>
    .image-form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .image-input-class {
        margin-bottom: 10px;
    }

    .selected-files-container {
        margin-bottom: 20px;
    }

    .selected-files {
        border: 1px solid #ccc;
        padding: 10px;
        max-width: 300px;
        overflow: auto;
    }

    .image-submit {
        background-color: #007bff;
        color: white;
        border: none;
        padding: 10px 20px;
        cursor: pointer;
    }
</style>