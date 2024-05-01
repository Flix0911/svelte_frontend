<div class="card">
    <div class="profile-sidebar">
        <!-- Use the imported profile image -->
        <img src="/Pippin.jpeg" alt="profile-view" class="profile-image">
          <ul class='social-list'>
            <li class='social-item'><a class='social-link' href="https://www.linkedin.com/in/erickvalenciadev/">LinkedIn</a></li>
            <li class='social-item'><a class='social-link' href="https://github.com/Flix0911">GitHub</a></li>
        </ul>
    </div>
</div>

<style>
    .card {
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        width: 100%;
        display: flex;
        flex-direction: column;
        background-color: #f8f9fa;
        text-align: center;
        padding: 2em;
    }

    .profile-image {
        border-radius: 50%;
        border: 2px solid gray;
        max-width: 5%;
        margin-bottom: 1em; 
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

    .social-item {
        margin-bottom: 0.5em; 
    }

    .social-link {
        color: #2f6bab;
        text-decoration: none;
        font-size: 1.125rem;
        transition: opacity 0.5s ease; 
    }

    .social-link:hover,
    .social-link:focus {
        color: #e30e23; 
    }
</style>