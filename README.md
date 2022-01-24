<div id="top"></div>

## Narrative Project
A CRUD application for marketers to create orders for buyers

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
![Screenshot 2022-01-24 at 03 24 59](https://user-images.githubusercontent.com/16857803/150713367-572a8b53-7f78-40e1-809c-96da2353794e.png)


<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

This project was built with following packages and framework

* [Vue.js](https://vuejs.org/)
* [Buefy](https://buefy.org/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

In the Narrative Marketplace, a buy order describes the parameters for purchasing data. A buy order can have the following fields:

- Name: Name for the buy order.
- Max Bid Price: The maximum amount that a buyer is willing to pay for data.
- Data Package Type: The type of data being purchased. The possible values are "Device Location", "Device Behavior", and "ID Mapping".

The goal of this task is to implement a web app for working with buy orders. It should support the following use cases:

- Creating a new buy order
- Displaying an existing buy order
- Updating an existing buy order
- Deleting a buy order

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Clone the repo
   ```sh
   git clone https://github.com/despeauxz/narrativre
   ```
2. Switch to the `master` branch
3. Install NPM packages
   ```sh
   npm install
   ```
4. Run `npm run serve`, then you be able to preview the project on `http://localhost:8080`
<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage
Local Storage is used to persist products since there's no time to spin up a NODE server in a mono-repo structure(BE and FE)

- By the sidebar, there's a button to create products
- Products are displayed in 2 views(Grid and List)
- You can view more details by clicking the cards and then you have action items if you are switched as a Merchant(Update and Delete) for Buyers, they only have the Buy button enabled
- You can click the delete button and remove product and likewise update button to toggle the product form


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Creating a new buy order
- [x] ADisplaying an existing buy order (List and Grid)
- [x] Updating an existing buy order
- [x] Deleting a buy order
- [x] Tried to create a buyer and marketer design structure but had little time since I'm still working for my current employer

See the [open issues](https://github.com/despeauxz/narrativre/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>
