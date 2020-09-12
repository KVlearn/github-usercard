// import axios from 'axios'
/*STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/

// 
/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/
//   STEP 4: Pass the data received from Github into your function,
//     and append the returned markup to the DOM as a child of .cards

//   STEP 5: Now that you have your own card getting added to the DOM, either
//     follow this link in your browser https://api.github.com/users/<Your github name>/followers,
//     manually find some other users' github handles, or use the list found at the
//     bottom of the page. Get at least 5 different Github usernames and add them as
//     Individual strings to the friendsArray below.

//     Using that array, iterate over it, requesting data for each user, creating a new card for each
//     user, and adding that card to the DOM.
// */

// // const followersArray = [];

//
 /*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

//
 /*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
// const followersArray = ['tetondan',
//   'dustinmyers',
//   'justsml',
//   'luishrd',
//   'bigknell'];

const mygit="kvlearn";
/*function creates/displays my Github info Card*/
getGitCard(mygit) 

/*function creates/display Github info card for each user in the Array*/
// followersArray.forEach(item=>{
//   getGitCard(item);
// })

function getGitCard(gitUser){
axios.get(`https://api.github.com/users/${gitUser}`)
.then(response=>{
  console.log(response.data);
  let info=response.data;
  const cards=document.querySelector('.cards');
    cards.appendChild(cardCreator(info));
}) 
.catch(err=>{
  console.log('Oops api call to github has error',err);
  const errmsg=document.createElement('div');
  const cards=document.querySelector('.cards');
  cards.appendChild(errmsg);
  errmsg.textContent=`Oops Check error!!! ${err.message}`;
  errmsg.style.background="snow";
  errmsg.style.color="red";
  errmsg.style.fontSize="28px"
  const img=document.createElement('img');
  img.src="https://images.unsplash.com/photo-1594322436404-5a0526db4d13?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1915&q=80";
  errmsg.appendChild(img);
  img.style.width="50%";
  img.style.marginLeft="150px";
  img.style.paddingTop="20px";
})
}

/*Function to Get followers list*/

function cardCreator(objData){
const card=document.createElement('div')
card.classList.add('card');

const img=document.createElement('img');
img.src=objData.avatar_url;
card.appendChild(img);

const cardInfo=document.createElement('div')
cardInfo.classList.add('card-info');
card.appendChild(cardInfo);

const name=document.createElement('h3');
name.classList.add('name');
name.textContent=objData.name;
cardInfo.appendChild(name);

const username=document.createElement('p')
username.classList.add('username');
username.textContent=objData.login;
cardInfo.appendChild(username);

const location=document.createElement('p')
location.textContent=`Location: ${objData.location}`
cardInfo.appendChild(location);

const profile=document.createElement('p');
const aTag=document.createElement('a');
aTag.href=objData.html_url;
profile.textContent=`Profile: ${aTag}`
cardInfo.appendChild(profile);

const followers=document.createElement('p')
followers.textContent=`Followers: ${objData.followers}`;
cardInfo.appendChild(followers);

const following=document.createElement('p')
following.textContent=`Following: ${objData.following}`;
cardInfo.appendChild(following);

const bio=document.createElement('p')
bio.textContent=`Bio: ${objData.bio}`;
cardInfo.appendChild(bio);

/*create button to expand, append to each cardInfo*/
const button=document.createElement('button');
button.textContent="Expand";
button.classList.add('expbutton');
cardInfo.appendChild(button);

// // cardInfo.appendChild(createGraph(objData.login));
  
button.addEventListener('click',event=>{
    const maincontainer=document.querySelector('.container');
    maincontainer.style.maxWidth="1160";
    maincontainer.style.transition="all 1.2s,ease-in-out";
    event.target.style.display="none";
    const graphContainer=document.createElement('div');
    // graphContainer.classList.add('graphContainer');
    graphContainer.textContent= new GitHubCalendar(".calendar",`${objData.login}`); 
    graphContainer.classList.add('calendar');
    cardInfo.appendChild(graphContainer);
})
// const graphContainer=document.querySelector('.calendar');
// cardInfo.appendChild(graphContainer);

return card;
}


/*function creates/displays my followers!! Github info Card*/
getFollowersCard(mygit) ;

function getFollowersCard(mygit){
axios.get(`https://api.github.com/users/${mygit}/followers`)
.then(response=>{
console.log('followers',response.data);/*returns an array of obj*/
/*For each item in the array call the getGitCard function by passing the Git user login id */
const myfollowers=response.data;
myfollowers.forEach(item=>{
    console.log('follower obj',item)
    getGitCard(item.login); 
}) 

})
  
.catch(err=>{
    console.log('oops error in followersCard',err);
})

}
// /Look into adding more info as an expanding card. You will need to create some new CSS and a button that expands and contracts the card. 

// * Look into adding your GitHub contribution graph. There are a number of different ways of doing this, [this Stack Overflow discussion](https://stackoverflow.com/questions/34516592/embed-github-contributions-graph-in-website) will get you started.
 
// function createGraph(login){
//  /*create graphdiv and append to each button*/
//  const graphContainer=document.createElement('div');
//  const maincontainer=document.querySelector('.container');
//  const button=document.querySelector('button');
//  button.addEventListener('click',()=>{
//     const graphContainer=document.createElement('div');
//     maincontainer.style.maxWidth="1160";
//     graphContainer.classList.add('calendar');
//     graphContainer.textContent =new GitHubCalendar(".calendar",`${login}`); 
//   return graphContainer;
//  })
 
// }