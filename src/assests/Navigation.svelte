<div class="navigation-bar">
  <div class="navigation-container">
      <div class="title-div">My-Memories</div>
      <div class="navigation-link"><a href="/">Education page</a></div>
      <div class="navigation-link"><a href="/home">Home Page</a></div>
      <div class="navigation-link"><a href="/home/good-memory">Good Memories</a></div>
      <div class="navigation-link"><a href="/home/bad-memory">Bad Memories</a></div>
      <div class="navigation-link"><a href="/home/images">Images</a></div>
      <div class="navigation-link"><a href="/home/good-memory/add">Add Good Memory</a></div>
      <div class="navigation-link"><a href="/home/bad-memory/add">Add Bad Memory</a></div>
      <div class="navigation-link"><a href="/home/images/add">Add Image</a></div>
  </div>
</div>



<style>
  .navigation-bar {
    background-color: #f8f9fa; 
    box-shadow: 0 2px 4px rgba(0,0,0,0.15); 
    padding: 1rem 1rem; 
  }

  .navigation-container {
    display: flex;
    justify-content: space-between; 
    align-items: center; 
    flex-wrap: wrap; 
  }

  .title-div {
    color: #060000; 
    font-size: 45px; 
    font-weight: bold;
    text-decoration: none;
    font-style: italic;
    flex: 1; 
  }

  .navigation-link {
    margin-left: 20px; 
    padding: 10px 0; 
  }

  .navigation-link a {
    color: #2f6bab; 
    text-decoration: underline; 
    font-weight: normal; 
    transition: color 0.5s ease; 
  }

  .navigation-link a:hover {
    color: #e30e23; 
  }

  @media only screen and (max-width: 768px) {
  .navigation-container {
    flex-direction: column;
    align-items: center;
    padding: 10px;
  }

  .title-div {
    font-size: 30px;
    text-align: center;
    margin-bottom: 10px;
  }

  .navigation-link {
    margin: 10px 0;
    width: 100%;
    text-align: center;
  }

  .navigation-link a {
    display: block;
    padding: 10px;
    border-radius: 5px;
    color: #2f6bab;
    text-decoration: none;
    background-color: #f8f9fa;
    transition: all 0.3s ease; 
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
  }

  .navigation-link a:hover {
    background-color: #e9ecef; 
    color: #e30e23; 
    transform: translateY(-2px); 
  }

 
  .title-div:hover {
    color: #e30e23;
    transform: scale(1.1); 
  }
}

</style>