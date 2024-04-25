<div class="navigation-bar">
    <div class="navigation-container">
        <div class="title-div">
            My-Memories
        </div>
        <div class="navigation-link">
            <a href="/">Education page</a>
        </div>
        <div class="navigation-link">
            <a href="/home">Home Page</a>
        </div>
        <div class="navigation-link">
            <a href="/home/good-memory">Good Memories</a>
        </div>
        <div class="navigation-link">
            <a href="/home/bad-memory">Bad Memories</a>
        </div>
        <div class="navigation-link">
            <a href="/home/images">Images</a>
        </div>
        <div class="navigation-link">
            <a href="/home/good-memory/add">Add Good Memory</a>
        </div>
        <div class="navigation-link">
            <a href="/home/bad-memory/add">Add Bad Memory</a>
        </div>
        <div class="navigation-link">
            <a href="/home/images/add">Add Image</a>
        </div>
    </div>
</div>



<style>

.navigation-bar {
    opacity: 2;
    background-color: rgb(241, 242, 238)
}

.navigation-container {
  display: flex;
  justify-content: space-between;
  padding: 10px 10px; 
  align-items: center;
}

.title-div {
  color: rgb(124, 132, 129);
  font-weight: bold;
  font-size: 50px;
  text-decoration: underline;
}

.navigation-link {
  margin-left: 20px; 
}

.navigation-link a {
  color: rgb(2, 0, 0);
  text-decoration: none;
  transition: color 0.3s ease; 
  font-weight: bold;
}

.navigation-link a:hover {
  color: #ec4019; 
}

@media only screen and (max-width: 768px) {
  .navigation-container {
    flex-direction: column;
    padding: 10px;
  }

  .navigation-link {
    margin-left: 0;
    margin-top: 10px;
  }

  .title-div {
    font-size: 30px;
  }
}

</style>