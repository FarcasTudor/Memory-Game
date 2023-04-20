const cards = document.querySelectorAll(".card");
let imageNames = [
    "corn", 
    "donut",
    "hamburger",
    "healthy-food",
    "lobster",
    "meat",
    "pizza",
    "taco"
];
let foundPairs = 0;
let cardOne, cardTwo;
let disableClick = false;

function flipCard(e) {
    let clickedCard = e.target; // getting the clicked card
    if(clickedCard !== cardOne && !disableClick) {
        clickedCard.classList.add("flip");
        if(!cardOne) {
            return cardOne = clickedCard;
        } 
        cardTwo = clickedCard;
        disableClick = true;
        let cardOneimg = cardOne.querySelector("img").src;
        cardTwoImg = cardTwo.querySelector("img").src;
        matchCards(cardOneimg,cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if(img1 == img2) {
        //finishing the game and restarting it
        foundPairs++;
        if(foundPairs == 8) {
            setTimeout(() => {
                return shuffleCards();
            },1000);        
        }

        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableClick = false;
    }
    //two cards don't match
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400); //added shake after 400ms

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableClick = false;
    }, 1200); //removed shake and flip after 1.2s
}

cards.forEach(card => { //adding click event for each card
    //card.classList.add("flip");
    card.addEventListener("click", flipCard);
});

function shuffleCards() {
    foundPairs = 0;
    cardOne = cardTwo = "";
    //making the deck random
    let arr = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    //removing flip class and adding random image to each card
    cards.forEach((card,index) => { 
        card.classList.remove("flip");
        let imgTag = card.querySelector("img");
        imgTag.src = `images/${imageNames[arr[index] - 1]}.png`;
        card.addEventListener("click", flipCard);
    });
    
}

shuffleCards();