<script>
    import Footer from '../assests/Footer.svelte'
    import Navigation from '../assests/Navigation.svelte'
    import TopOfPage from '../assests/TopOfPage.svelte';


    
</script>


<Navigation />

<div class="home-page-container">
    <h1>¡Welcome to My-Memories!</h1>

    <h2>How-to Instructions</h2>
    <ul class="instructions-list">
        <li>
            <span>Easily navigate with the below links:</span>
            <img src="/navigation.jpeg" alt="navigation-instruction" class="instruction-image">
        </li>
        <li>
            <span>When adding a Good or Bad memory please ensure you fill out the form</span>
            <div class="instruction-section">
                <h3>Memories:</h3>
                <img src="/submitForm.jpeg" alt="memory-submit-form" class="instruction-image">
            </div>
                <span>Same with the images, ensure you upload your files. You can submit multiples at a time!</span>
            <div class="instruction-section">
                <h3>Image:</h3>
                <img src="/imageForm.jpeg" alt="submit-form" class="instruction-image">
            </div>
                <span>Once submitted, you can then review details on the memory</span>
                <div class="instruction-section">
                    <h3>Example details</h3>
                    <img src="/Sample.jpeg" alt="sample-memory" class="instruction-image">
                </div>
            

            <li>
                <span>Easily delete images and memories with the button below</span>
            <div class="instruction-section">
                <h3>Delete:</h3>
                <img src="/Delete.jpeg" alt="delete-instructions" class="instruction-image">
            </div>
        </li>
        <li>
            <span>Once submitted, enjoy!</span>
        </li>
    </ul>
</div>

<TopOfPage />
<Footer />

<style>
.home-page-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
}

h1 {
    font-size: 50px;
    font-weight: 500;
    text-align: center;
    color: rgb(53, 65, 141);
}

h2 {
    font-size: 25px;
    font-style: italic;
    font-weight: 200;
    color: #20205b;
    background-color: #75de24;
    padding: 10px;
    border-radius: 5px;
    width: 220px;
}

h3 {
    font-size: 35px;
}

span { 
    font-size: 20px;
    color: rgb(53, 65, 141);
}

.instructions-list {
    list-style-type: none;
    padding-left: 0;
}

.instructions-list li {
    margin-bottom: 20px;
}

.instruction-image {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.instruction-section {
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.instruction-section h3 {
    margin-top: 0;
}

@media only screen and (max-width: 768px) {
    .home-page-container {
        padding: 10px;
    }
}
</style>