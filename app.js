const PLAYER1 = 'fa-circle-o'
const PLAYER2 = 'fa-times'


let round = 1;


/* 2d array*/

const board = [
    [ "", "", "" ],
    [ "", "", "" ],
    [ "", "", "" ]
]

const combinations =[
    [ 0, 1, 2 ] ,[ 3, 4, 5 ] ,[ 2, 5, 8 ] ,
    [ 0, 3, 6 ] ,[ 1, 4, 7 ] ,[ 6, 7, 8 ] ,
    [ 0, 4, 8 ] ,[ 2, 4, 6 ] 

]

/* all boxes convert to array   */
const getAllBox = [ ...document.querySelectorAll( '.box' ) ]

getAllBox.forEach( box => box.addEventListener( "click", callbackClickBox ) )


function callbackClickBox( event ) {
    //i get value from data- in html 
    const { row, column } = event.target.dataset
    if ( board[ row ][ column ] != '' ) return;
    //i checking which round is even
    const turn = round % 2 === 0? PLAYER2 : PLAYER1;
    board[ row ][ column ] = turn;
    event.target.classList.add( turn );
    round++;
    check();
}

function check(){
    const result = board.reduce( ( total, row ) => total.concat( row ) );
    let winner = "Gra w toku";
    let move = {
        'fa-times' :    [],
        'fa-circle-o' : []  
    }
    result.forEach( ( field, index ) => move[ field ] ? move[ field ].push( index ) : null );
    
    combinations.forEach( combination => {
        if ( combination.every( index => move[ PLAYER1 ].indexOf( index ) > -1 )){
            winner = "Player 1 winner"
            let tagP = document.createElement( 'p' )
            let node = document.createTextNode( winner );
            tagP.appendChild(node);
            let header = document.getElementById( 'header' )
            header.appendChild(tagP)
          
            
        }
        if( combination.every( index => move[ PLAYER2 ].indexOf( index ) > -1 )){
            winner = "Player 2 winner"
            let tagP = document.createElement( 'p' )
            let node = document.createTextNode( winner );
            tagP.appendChild( node );
            let header = document.getElementById( 'header' )
            header.appendChild( tagP )
          
        }
    })
    return winner;
}

function newGame(){
    window.location.reload();
}
