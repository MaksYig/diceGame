// import check from './modules/test';

window.addEventListener("DOMContentLoaded", () => {

  if (window.matchMedia("(min-width: 661px )").matches){

    const mainContent = document.querySelector('.content__box-wrapper');
    const fullHTML = `
    
    <div class="player player--0 ">
    <form  data-name="1" class="player__name-content">
      <input type="text" placeholder="Your Name" />
      <button class="name__btn btn">Submit</button>
    </form>
  
    <div class="player__name">Enter your Name</div>
    <div class="player__total-score-box">
      <span class="player__total-title">Your Total score</span>
       <span class="player__total-score">54</span>
    </div>
    <div class="player__current-score-box">
      <span class="player__current-score-title"> Your current score</span>
      <span class="player__current-score">67</span>
    </div>
    <div class="player__score-left-box">
      <span class="player__score-left-title">You need to win: </span>
      <span class="player__score-left">23</span>
    </div>
  </div>
  <div class="control__panel">
    <div class="control__panel-wrapper">
      <div class="dice__wrapper">
        <img src="images/dice/dice-3.png" alt="" class="dice__img">
      </div>
      <div class="control__panel-btn-wrapper">
        <button class="newGame__btn btn" disabled>New Game</button>
        <button class="rollDice__btn btn" disabled>Roll Dice</button>
        <button class="holdScore__btn btn" disabled >Hold Score</button>
      </div>
    </div>
  </div>
  <div class="player player--1">
    <form data-name="1" class="player__name-content">
      <input type="text" placeholder="Your Name" />
      <button class="name__btn btn">Submit</button>
    </form>
  
    <div class="player__name">Enter your Name</div>
    <div class="player__total-score-box">
      <span class="player__total-title">Your Total score</span>
       <span class="player__total-score">54</span>
    </div>
    <div class="player__current-score-box">
      <span class="player__current-score-title"> Your current score</span>
      <span class="player__current-score">67</span>
    </div>
    <div class="player__score-left-box">
      <span class="player__score-left-title">You need to win: </span>
      <span class="player__score-left">23</span>
    </div>
  </div>
  
    `;
    
    /* Incert all HTML */
    mainContent.insertAdjacentHTML('beforeend',fullHTML);
    const player0 = document.querySelector('.player--0');
    const player1 = document.querySelector('.player--1');
    const player0Score = player0.querySelector('.player__total-score');
    const player1Score = player1.querySelector('.player__total-score');
    const player0CurrScore = player0.querySelector('.player__current-score');
    const player1CurrScore = player1.querySelector('.player__current-score');
    const player0LeftToWinScore = player0.querySelector('.player__score-left');
    const player1LeftToWinScore = player1.querySelector('.player__score-left');
    const player =document.querySelectorAll('.player');

    const diceWrapper = document.querySelector('.dice__wrapper');
    const form = document.querySelectorAll('.player__name-content');
  
    const controlPanel=document.querySelector('.control__panel');
    const rollDicebtn = document.querySelector('.rollDice__btn');
    const holdBtn = document.querySelector('.holdScore__btn');
    const btnNew = document.querySelector('.newGame__btn');

    let activePlayer, playing, scores, currentScore;


    const init = function () {
      scores = [0, 0];
      activePlayer = 0;
      playing = true;
      currentScore = 0;
      player0Score.textContent = '0';
      player1Score.textContent = '0';
      player0CurrScore.textContent = '0';
      player1CurrScore.textContent = '0';
      player0LeftToWinScore.textContent = '100';
      player1LeftToWinScore.textContent = '100';
      player0.classList.remove('player--active');
      player1.classList.remove('player--active');
      
    };



      /* Fill Name forms */
 const fillName = function(){
  form.forEach((f,i) => {
    init();
    f.addEventListener('submit', function(e){
      e.preventDefault();
      if (f.firstElementChild.value !== ""){
        f.closest('.player').querySelector('.player__name').textContent = f.firstElementChild.value;
        f.firstElementChild.value='';
        f.style.display="none";
        f.setAttribute('data-name','0');
        activateGame();
      }
      else{
        f.firstElementChild.style.border="2px solid red";
      }
    });
  });
 };
  fillName();

 const activateGame = function (){
  if (form[0].dataset.name === '0' && form[1].dataset.name === '0') {
    player0.classList.add('player--active');
    player1.style.opacity ="0.6";
    rollDicebtn.removeAttribute('disabled');
    holdBtn.removeAttribute('disabled');
    btnNew.removeAttribute('disabled');
  } 
  
 };
/* Switch player function */
 const switchPlayer = function (){
      document.querySelector('.player--active').querySelector('.player__current-score').textContent = 0;
      currentScore = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      player0.classList.toggle('player--active');
      player1.classList.toggle('player--active');
      player.forEach(pl =>{
        if (!pl.classList.contains('player--active')){
          pl.style.opacity = "0.6";
        }else{
          pl.style.opacity = "1";
        }
        }); 
    

 };

 //   /* Roll Dice */
  
    rollDicebtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (playing) {
        /* generate random dice */
        const dice = Math.trunc(Math.random() * 6) + 1;
        /* display dice */
        diceWrapper.style.display = "";
        console.log(diceWrapper.firstElementChild);
        console.log(dice);
        diceWrapper.firstElementChild.src = `images/dice/dice-${dice}.png`;
        if (dice !== 1) {
          currentScore += dice;
          document.querySelector('.player--active').querySelector('.player__current-score').textContent = currentScore;
        } else {
          switchPlayer();
        }
      }
    });

/* Hold Score */

    holdBtn.addEventListener('click', () => {
      if (playing) {
        scores[activePlayer] += currentScore;
        document.querySelector('.player--active').querySelector('.player__total-score').textContent = scores[activePlayer];
        document.querySelector('.player--active').querySelector('.player__score-left').textContent = (100 - scores[activePlayer] );
        if (scores[activePlayer] >= 100) {
          /* finish the game */
          playing = false;
          diceWrapper.style.display = "none";
          document.querySelector('.player--active').querySelector('.player__score-left').textContent =0;
          document.querySelector('.player--active').style.backgroundColor = "green";
          document.querySelector('.player--active').style.color = "yellow";
          document.querySelector('.player--active').querySelector('.player__current-score-box').textContent = "You Win My Friend 🏆🏅!!";
        } else {
          switchPlayer();
        }
      }
    });

/* New game */

  btnNew.addEventListener('click', ()=>{
    init();
    player0.classList.add('player--active');
    player0.style.opacity ="1";
    player1.style.opacity ="0.6";
    document.querySelector('.player--active').style.backgroundColor = "";
    document.querySelector('.player--active').style.color = "";
    document.querySelector('.player--active').querySelector('.player__current-score-box').textContent = "";
    const renew = `
    <span class="player__current-score-title"> Your current score</span>
    <span class="player__current-score">0</span>
    `;
    document.querySelector('.player--active').querySelector('.player__current-score-box').insertAdjacentHTML('beforeend',renew);
    init();
    activateGame();
  });
  




}








 function  rollDice (){

   let timerID =  setInterval(() => {
    const random = Math.trunc(Math.random() * 6) + 1;
    diceWrapper.firstElementChild.src = `images/dice/dice-${random}.png`;
    }, 250);
    setTimeout(() => {
      clearInterval(timerID);
      const dice = Math.trunc(Math.random() * 6) + 1;

    }, 4000);
    
  }



  /* For mobile devices */

  if (window.matchMedia("(max-width: 660px )").matches){
    const mainContent = document.querySelector('.content__box-wrapper');

    const Player0HTML = `
    
    <div class="player player--0 ">
    <form  data-name="1" class="player__name-content">
      <input type="text" placeholder="Your Name Player 1" />
      <button class="name__btn btn">Submit</button>
    </form>

    <div class="player__name">Enter your Name</div>
    <div class="player__total-score-box">
      <span class="player__total-title">Your Total score</span>
       <span class="player__total-score">54</span>
    </div>
    <div class="player__current-score-box">
      <span class="player__current-score-title"> Your current score</span>
      <span class="player__current-score">67</span>
    </div>
    <div class="player__score-left-box">
      <span class="player__score-left-title">You need to win: </span>
      <span class="player__score-left">23</span>
    </div>
  </div>


  <div class="player player--1 ">
  <form  data-name="1" class="player__name-content">
    <input type="text" placeholder=" Your Name Player 2" />
    <button class="name__btn btn">Submit</button>
  </form>

  <div class="player__name">Enter your Name</div>
  <div class="player__total-score-box">
    <span class="player__total-title">Your Total score</span>
     <span class="player__total-score">54</span>
  </div>
  <div class="player__current-score-box">
    <span class="player__current-score-title"> Your current score</span>
    <span class="player__current-score">67</span>
  </div>
  <div class="player__score-left-box">
    <span class="player__score-left-title">You need to win: </span>
    <span class="player__score-left">23</span>
  </div>
</div>
    
  <div class="control__panel">
    <div class="control__panel-wrapper">
      <div class="dice__wrapper">
        <img src="images/dice/dice-3.png" alt="" class="dice__img">
      </div>
      <div class="control__panel-btn-wrapper">
        <button class="newGame__btn btn" disabled>New Game</button>
        <button class="rollDice__btn btn" disabled>Roll Dice</button>
        <button class="holdScore__btn btn" disabled >Hold Score</button>
      </div>
    </div>
</div>

    
    `;

    mainContent.insertAdjacentHTML('beforeend',Player0HTML);

    const player0 = document.querySelector('.player--0');
    const player1 = document.querySelector('.player--1');
    const player0Score = player0.querySelector('.player__total-score');
    const player1Score = player1.querySelector('.player__total-score');
    const player0CurrScore = player0.querySelector('.player__current-score');
    const player1CurrScore = player1.querySelector('.player__current-score');
    const player0LeftToWinScore = player0.querySelector('.player__score-left');
    const player1LeftToWinScore = player1.querySelector('.player__score-left');
    const player =document.querySelectorAll('.player');

    const diceWrapper = document.querySelector('.dice__wrapper');
    const form = document.querySelectorAll('.player__name-content');
  
    const controlPanel=document.querySelector('.control__panel');
    const rollDicebtn = document.querySelector('.rollDice__btn');
    const holdBtn = document.querySelector('.holdScore__btn');
    const btnNew = document.querySelector('.newGame__btn');



    let activePlayer, playing, scores, currentScore;

    const init = function () {
      scores = [0, 0];
      activePlayer = 0;
      playing = true;
      currentScore = 0;
      player0Score.textContent = '0';
      player1Score.textContent = '0';
      player0CurrScore.textContent = '0';
      player1CurrScore.textContent = '0';
      player0LeftToWinScore.textContent = '100';
      player1LeftToWinScore.textContent = '100';
      player1.style.display="none";
      player0.classList.remove('player--active');
      player1.classList.remove('player--active');
      
    };
              /* Fill Name forms */
    const fillName = function(){
      init();
      form[0].addEventListener('submit',function (e){
        e.preventDefault();
        if (form[0].firstElementChild.value !== ""){
          form[0].closest('.player').querySelector('.player__name').textContent = form[0].firstElementChild.value;
          form[0].firstElementChild.value='';
          form[0].setAttribute('data-name','0');
          form[0].style.display="none";
          player0.style.display="none";
          player1.style.display="";
          
          // activateGame();
        }
        else{
          form[0].firstElementChild.style.border="2px solid red";
        }

      });

      form[1].addEventListener('submit',function (e){
        e.preventDefault();
        if (form[1].firstElementChild.value !== ""){
          form[1].closest('.player').querySelector('.player__name').textContent = form[1].firstElementChild.value;
          form[1].firstElementChild.value='';
          form[1].setAttribute('data-name','0');
          form[1].style.display="none";
          // player0.style.display="none";
          // player1.style.display="";
          
          activateGame();
        }
        else{
          form[1].firstElementChild.style.border="2px solid red";
        }

      });

    };

    fillName();

    const activateGame = function (){
      if (form[0].dataset.name === '0' && form[1].dataset.name === '0') {
        player0.style.display="";
        player0.classList.add('player--active');
        player1.style.display='none';
        document.querySelector('.header__wrapper').style.display = "none";
        rollDicebtn.removeAttribute('disabled');
        holdBtn.removeAttribute('disabled');
        btnNew.removeAttribute('disabled');
      } 
      
     };

    /* Switch player function */
    const switchPlayer = function (){
      document.querySelector('.player--active').querySelector('.player__current-score').textContent = 0;
      currentScore = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      player0.classList.toggle('player--active');
      player1.classList.toggle('player--active');
      player.forEach(pl =>{
        if (!pl.classList.contains('player--active')){
          pl.style.display="none";
        }else{
          pl.style.display="";
        }
        }); 

    };


     //   /* Roll Dice */
  
     rollDicebtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (playing) {
        /* generate random dice */
        const dice = Math.trunc(Math.random() * 6) + 1;
        /* display dice */
        diceWrapper.style.display = "";
        console.log(diceWrapper.firstElementChild);
        console.log(dice);
        diceWrapper.firstElementChild.src = `images/dice/dice-${dice}.png`;
        if (dice !== 1) {
          currentScore += dice;
          document.querySelector('.player--active').querySelector('.player__current-score').textContent = currentScore;
        } else {
          switchPlayer();
        }
      }
    });

    /* Hold Score */

    holdBtn.addEventListener('click', () => {
      if (playing) {
        scores[activePlayer] += currentScore;
        document.querySelector('.player--active').querySelector('.player__total-score').textContent = scores[activePlayer];
        document.querySelector('.player--active').querySelector('.player__score-left').textContent = (100 - scores[activePlayer] );
        if (scores[activePlayer] >= 100) {
          /* finish the game */
          playing = false;
          diceWrapper.style.display = "none";
          document.querySelector('.player--active').querySelector('.player__score-left').textContent =0;
          document.querySelector('.player--active').style.backgroundColor = "green";
          document.querySelector('.player--active').style.color = "yellow";
          document.querySelector('.player--active').querySelector('.player__current-score-box').textContent = "You Win My Friend 🏆🏅!!";
        } else {
          switchPlayer();
        }
      }
    });


    btnNew.addEventListener('click', ()=>{
      init();
      player0.classList.add('player--active');
      player0.style.display ="";
      player1.style.display ="none";
      document.querySelector('.player--active').style.backgroundColor = "";
      document.querySelector('.player--active').style.color = "";
      document.querySelector('.player--active').querySelector('.player__current-score-box').textContent = "";
      const renew = `
      <span class="player__current-score-title"> Your current score</span>
      <span class="player__current-score">0</span>
      `;
      document.querySelector('.player--active').querySelector('.player__current-score-box').insertAdjacentHTML('beforeend',renew);
      playing = true;
      diceWrapper.style.display = "";
      init();
      activateGame();
    });

  }



  // if (window.matchMedia("(min-width: 661px )").matches){
  //   init();
  //   /* Type Names */
  //   for (let f = 0; f < form.length; f++) {
  //     form[f].addEventListener('submit', (e) => {
  //       e.preventDefault();
  //       const input = form[f].querySelector('input');
  //       if (input.value !== "") {
  //         form[f].closest('.player').querySelector('.player__name').textContent = input.value;
  //         form[f].style.display = 'none';
  //       } else {
  //         form[f].closest('.player').querySelector('.player__name').textContent = `Please type name`;
  //       }
  //     });
  //   }
  //   /* Switch player */
  
  //   const swithPlayer = function () {
  //     document.querySelector(`[data-player-currentScore="${activePlayer}"]`).textContent = 0;
  //     currentScore = 0;
  //     activePlayer = activePlayer === 0 ? 1 : 0;
  //     player0.classList.toggle('player--active');
  //     player1.classList.toggle('player--active');
  //   };
  
  //   /* Roll Dice */
  
  //   rollDicebtn.addEventListener('click', (e) => {
  //     e.preventDefault();
  //     if (playing) {
  //       /* generate random dice */
  //       const dice = Math.trunc(Math.random() * 6) + 1;
  //       /* display dice */
  //       diceWrapper.style.display = "flex";
  //       console.log(diceWrapper.firstElementChild);
  //       console.log(dice);
  //       diceWrapper.firstElementChild.src = `images/dice/dice-${dice}.png`;
  //       if (dice !== 1) {
  //         currentScore += dice;
  //         document.querySelector(`[data-player-currentScore="${activePlayer}"]`).textContent = currentScore;
  //       } else {
  //         swithPlayer();
  //       }
  //     }
  //   });
  
  //   holdBtn.addEventListener('click', () => {
  //     if (playing) {
  //       scores[activePlayer] += currentScore;
  //       document.querySelector(`[data-player-score="${activePlayer}"]`).textContent = scores[activePlayer];
  //       if (scores[activePlayer] >= 100) {
  //         /* finish the game */
  //         playing = false;
  //         diceWrapper.style.display = "none";
  //       } else {
  //         swithPlayer();
  //       }
  //     }
  //   });
  
  //   btnNew.addEventListener('click', init);
  

  

  // }

  // if (window.matchMedia("(max-width: 660px )").matches){
  //   const scoreMobPanel = document.querySelector('.scoreMobPanel');
  //   const player0NameM = document.querySelector('.player0__name');
  //   const player1NameM = document.querySelector('.player1__name');
  //   init();
  //   const textDissapier = () =>{
  //     const headerText = document.querySelector('.header__text');
  //     const headerTitle = document.querySelector('.header__title');
      
  //     headerText.style.display ='none';
  //     headerTitle.style.display ='none';
  //   };

  //   player1.classList.add ('none');
  //   setTimeout(textDissapier, 6000);
  //   const player0Form = player0.querySelector('.input__name');
  //   const player1Form = player1.querySelector('.input__name');
  //   controlPanel.classList.add('none');
  //   player0Form.addEventListener('submit', (e)=>{
  //     e.preventDefault();
  //     if (player0Form.firstElementChild.value !== "") {
  //       player0.querySelector('.player__name').textContent = player0Form.firstElementChild.value;
  //       player0NameM.textContent = player0Form.firstElementChild.value;
  //       player0Form.classList.add ('none');
  //       player0.classList.add ('none');
  //       player1.classList.remove ('none');
  //     } else {
  //       player0.querySelector('.player__name').textContent = `Please type name`;
  //     }
      
  //   });
  //   player1Form.addEventListener('submit', (e)=>{
  //     e.preventDefault();
  //     if (player1Form.firstElementChild.value !== "") {
  //        player1.querySelector('.player__name').textContent = player1Form.firstElementChild.value;
  //       player1NameM.textContent = player1Form.firstElementChild.value;
  //       player1Form.classList.add ('none');
  //       player1.classList.add ('none');
  //       player0.classList.remove ('none');
  //       controlPanel.classList.remove ('none');
  //       scoreMobPanel.style.display='';
         
  //     } else {
  //       player0.querySelector('.player__name').textContent = `Please type name`;
  //     }
      
  //   });

   
  //   init();




  //   const swithPlayerMob = function () {
  //     document.querySelector(`[data-player-currentScore="${activePlayer}"]`).textContent = 0;
  //     currentScore = 0;
  //     activePlayer = activePlayer === 0 ? 1 : 0;
  //     player0.classList.toggle('player--active');
  //     player1.classList.toggle('player--active');
  //     player0.classList.toggle('none');
  //     player1.classList.toggle('none');
  //     console.log(activePlayer);
  //   };
  //     /* Roll Dice */

  // rollDicebtn.addEventListener('click', (e) => {
  //   e.preventDefault();
  //   if (playing) {
  //     /* generate random dice */
  //     const dice = Math.trunc(Math.random() * 6) + 1;
  //     /* display dice */
  //     diceWrapper.style.display = "flex";
  //     console.log(diceWrapper.firstElementChild);
  //     console.log(dice);
  //     diceWrapper.firstElementChild.src = `images/dice/dice-${dice}.png`;
  //     if (dice !== 1) {
  //       currentScore += dice;
  //       document.querySelector(`[data-player-currentScore="${activePlayer}"]`).textContent = currentScore;
  //     } else {
  //       swithPlayerMob();
  //     }
  //   }
  // });

  // holdBtn.addEventListener('click', () => {
  //   if (playing) {
  //     scores[activePlayer] += currentScore;
  //     document.querySelector(`[data-player-score="${activePlayer}"]`).textContent = scores[activePlayer];
  //     player0ScoreM.textContent = scores[0];
  //     player1ScoreM.textContent = scores[1];
  //     if (scores[activePlayer] >= 100) {
  //       /* finish the game */
  //       playing = false;
  //       diceWrapper.style.display = "none";
  //       // document.querySelector(`[data-player-currentScore="${activePlayer}"]`).textContent = `player${activePlayer}NameM `;
  //     } else {
  //       swithPlayerMob();
  //     }
  //   }
  // });

  // btnNew.addEventListener('click', init);
  // }


});
