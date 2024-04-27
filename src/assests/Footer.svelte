<script>
    // return to this, unsure why static isn't loading
</script>

<div class="card">
    <div class="profile-sidebar">
        <!-- Use the imported profile image -->
        <link rel="image" href="%sveltekit.assets%/profile.jpeg" />
        <ul class='social-list'>
            <li class='social-item'><a class='social-link' href="https://www.linkedin.com/in/erickvalenciadev/">LinkedIn</a></li>
            <li class='social-item'><a class='social-link' href="https://github.com/Flix0911">GitHub</a></li>
        </ul>
    </div>
</div>

<style>
    .card {
    box-shadow: 0 0 20 px rgba(0, 0, 0, 0.2);
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #f8f9fa; 
    text-align: center;
    padding: 2em;
  }


  .social-list {
    display: flex;
    justify-content: space-around;
    list-style: none;
    margin: 0;
    padding: 0;
    width: 130px;
    margin: 0 auto;
  }
  
  .social-link {
    color: gray;
    opacity: 0.5;
    font-size: 1.125rem;
  }
  
  .social-link:hover,
  .social-link:focus {
    opacity: 1;
  }
</style>