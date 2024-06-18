class Gameboard {
    constructor() {
        this.board = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
        
        this.reset = () => {
            this.board = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
        };

        this.play = (x, y, inp) => {
            if (x < 0 || x > 2 || y < 0 || y > 2) {
                console.log("Invalid Play\n");
                return 0;
            };
            console.log(this.board);
            this.board[x][y] = inp;
            let winDiag1 = true, winDiag2 = true;
            for (let i = 0; i < 3; i++) {
                let winx = true, winy = true;
                for (let j = 0; j < 3; j++) {
                    if (this.board[i][j] != inp) {
                        winx = false;
                    }
                    if (this.board[j][i] != inp) {
                        winy = false;
                    }
                }
                if (winx == true || winy == true) {
                    return true;
                }
                if (this.board[0][0] == inp && this.board[1][1] == inp && this.board[2][2] == inp) {
                    return true;
                }
                if (this.board[0][2] == inp && this.board[1][1] == inp && this.board[2][0] == inp) {
                    return true;
                }
            }
            return false;
        };
    }
}

class Player {
    constructor(inp, name, symbol) {
        this.name = name;
        this.inp = inp;
        this.symbol = this.inp==1 ? 'tttx.png' : 'ttto.png'
    }
}

class GameManager {
    constructor(gb, p1, p2) {
        this.turn = 1;
        this.reset = ()=>{
            gb.reset();
            this.turn=1;
        }
        this.isEmpty = (x,y)=>{
            if(gb.board[x][y]==-1){
                return true;
            }
            else{
                return false;
            }
        }

        this.showPlayer = ()=>{
            return(this.turn % 2 == 0 ? p2 : p1);
        }

        this.play = (x, y) => {
            let currentPlayer = this.turn % 2 == 0 ? p2 : p1;
            this.turn++;
            if (gb.play(x, y, currentPlayer.inp)) {
                console.log(currentPlayer.name);
                return currentPlayer;
            }
            else {
                return false;
            };
        };

    }
}

class DOMinter{
    constructor(gm){
        this.won = false
        
        this.init = ()=>{
            
            $("button")[0].addEventListener('click',this.reset);
            let arr = $(".cell");
            for (const element of arr){
                element.addEventListener("click", ()=>this.getResult(element));
            }
        }
        this.reset = ()=>{
            for (const image of $("img")){
                image.src = ""
            }
            $("h3")[0].innerHTML = " ";
            this.won=false;
            gm.reset();
        }
        this.getResult=(element)=>{
            let a=element.id;
            let x=a[a.length-2]
            let y=a[a.length -1];
            if(gm.isEmpty(x,y)==false || this.won == true){
                return;
            }
            let player = gm.showPlayer();
            let result = gm.play(parseInt(x),parseInt(y));
            element.childNodes[0].src = player.symbol;
            if(result==false){
                if(gm.turn>9){
                    $("h3")[0].innerHTML = "Tie";
                }
                return;
            }
            else{
                this.won=true;
                $("h3")[0].innerHTML = result.name + " Wins"
            }
            
        }
    }
}

function startGame(){
    let gb = new Gameboard();
let p1 = new Player(1, "X");
let p2 = new Player(0, "O");
let gm = new GameManager(gb,p1,p2);
let dm = new DOMinter(gm);
dm.init();
}

startGame();