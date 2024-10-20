const grid = document.querySelector('.grid');

for (let i = 0; i < 25; i++) {
    const cell = document.createElement('div');
    cell.classList.add('box');
    cell.addEventListener('click', checkBomb)
    grid.appendChild(cell);
}
let box = Array.from(document.querySelectorAll('.box'));

// let input = document.getElementById('nbm');
// let n=parseInt(input.value);
for (let i = 0; i <5 ; i++) {
    let randomIndex = Math.floor(Math.random() * 25);
    while (box[randomIndex].value === 'bomb') {
        randomIndex = Math.floor(Math.random() * 25);
    }
    box[randomIndex].innerHTML = '<span id="bomb" class="bomb">💣</span>';
    box[randomIndex].value = 'bomb';
}


let bomb = Array.from(document.querySelectorAll('#bomb'));
let count = 0;
let bcount=0;
let diamond=0;
let audioPlayed = false;
let scoreDisplay = document.getElementById('score');
function checkBomb() {
    if (this.value === "bomb") {
        diamond=0;
        bcount++;
        // console.log('Game Over');
        if (!audioPlayed) {
            const audio2 = new Audio('16.mp3');
            audio2.play();
            audioPlayed = true;
        }
        for (let i = 0; i < bomb.length; i++) {
            bomb[i].style.display = "block";
            setTimeout(()=>{
                bomb[i].classList.add('rotate');
                setTimeout(()=>{
                    bomb[i].classList.add('active');

                },1600)
            },200)
        }
        for (let i = 0; i < box.length; i++) {
            if (box[i].value === 'bomb') {
                box[i].style.backgroundColor = "rgb(1, 17, 26)";
                setTimeout(() => {
                    document.querySelector('.body').classList.add('active')
                }, 1600)

            }
        }
        for (let i = 0; i < box.length; i++) {
            if (box[i].value != "bomb") {
                box[i].style.backgroundColor = "rgb(1, 17, 26)";
                box[i].innerHTML = "💎";
                box[i].style.opacity = "0.2";
                box[i].style.color = "green";
            }
        }

    } else {
        this.style.backgroundColor = 'rgb(1, 17, 26)';
        diamond++;
        this.innerHTML = "💎"
        const audio3 = new Audio('15.mp3');
        if(bcount<1){
            audio3.play();
        }
        this.value = 'safe'
        count++;
        this.style.color = "green";
        this.removeEventListener('click', checkBomb);
        if(bcount<1){
            updateScore();
        }
        checkWinner()
    }
}

function updateScore() {
    scoreDisplay.textContent = diamond; 
}

function checkWinner() {
    if (count === (box.length - bomb.length)) {
        setTimeout(() => {
            alert("Congratulations! You won!");
        }, 300)
    }
}

