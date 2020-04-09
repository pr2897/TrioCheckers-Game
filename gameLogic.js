// Stores the state of checkers
var checkers = [
    [-1,-1,-1,-1,1,-1,-1,-1,-1],
    [-1,-1,-1,1,-1,1,-1,-1,-1],
    [-1,-1,1,-1,1,-1,1,-1,-1],
    [-1,1,-1,1,-1,1,-1,1,-1],
    [1,-1,1,-1,1,-1,1,-1,1]
];

var firstMoveDone = false;
var first_move,second_move,first,second;


// counting current number of checkers available
var counter = 15;

// Maps the checkers element_id with the index in the checkers Array for easier access
var map = {
    '1_1': [0,4],
    '2_1': [1,3], '2_2': [1,5],
    '3_1': [2,2], '3_2': [2,4], '3_3': [2,6],
    '4_1':[3,1], '4_2': [3,3],'4_3':[3,5], '4_4':[3,7],
    '5_1':[4,0], '5_2': [4,2],'5_3':[4,4], '5_4':[4,6],'5_5':[4,8]
};

// for setting the checker board
function setXY(x,y){
    checkers[x][y]=1;
}

// for unsetting the checker board
function unsetXY(x,y){
    checkers[x][y]=0;
}

// for making the first move
function firstMove(x,y){
    unsetXY(x,y);
    counter--;
    renderImage();
    firstMoveDone = true;
}




function renderImage(){
    var keyList = Object.keys(map);
    for(var i=0 ;i<keyList.length;i++){
        var data = map[keyList[i]];
        if(checkers[data[0]][data[1]] == 0){
            document.getElementById(keyList[i]).style.backgroundImage = "url('images/blank.jpg')";
        }
        else if(checkers[data[0]][data[1]] == 1){
            document.getElementById(keyList[i]).style.backgroundImage = "url('images/checker.jpg')";
        }
    }
}




// //Returns the id of the element and its mapping in the checkers Array[][]
//$(".v").click(function(){
//    var c = $(this).attr('id');
//     var output = c+"=>" +map[c] + "\nValue in the checkers table is: ";
//     output += checkers[map[c][0]][map[c][1]];
//    alert(output);
//    
//});




var movableKey = Object.keys(map);
$(".v").click(function(){
    var c = $(this).attr('id');
    
    if(first == undefined)
        first = c;
    else{
        second = c;
        
        if(movableKey.indexOf(first) != -1 && movableKey.indexOf(second) != -1){
            first_move = map[first];
            second_move = map[second];
        
            if(!firstMoveDone){
                if(first === second){
                    firstMove(first_move[0],first_move[1]);
                    first = second = undefined;
                }
            }
            else{
                move(first_move[0],first_move[1],second_move[0],second_move[1]);
                
                first=second = undefined;
            }
        }
        else{
            alert('Illigal Move');
            first = second = undefined;
        }
            
    }
    
//        
//            if(!firstMoveDone){
//                move(first_move[0],first_move[1],second_move[0],second_move[1]);
//                first = second = undefined;
//            }
//            else{
//                firstMove(first_move[0],first_move[1]);
//                first = second = undefined;
//            }
//        }
//        else{
//            first = second = undefined;
//        }
    }
);


// to make interaction

function play(){
    
} 









// Return whether the checkers could be moved in L direction.
function L(x,y){
    if(y>=4 && checkers[x][y]==1 && checkers[x][y-2]==1 && checkers[x][y-4]==0)
        return true;
    return false;
}

// Return whether the checkers could be moved in R direction.
function R(x,y){
    if(y<=4 && checkers[x][y]==1 && checkers[x][y+2]==1 && checkers[x][y+4]==0)
        return true;
    return false;
}

// Return whether the checkers could be moved in TL direction.
function TL(x,y){
    if(x>=2 && y>=3 && checkers[x][y]==1 && checkers[x-1][y-1]==1 && checkers[x-2][y-2]==0)
        return true;
    return false;
}

// Return whether the checkers could be moved in TR direction.
function TR(x,y){
    if(x>=2 && y<=6 && checkers[x][y]==1 && checkers[x-1][y+1]==1 && checkers[x-2][y+2]==0)
        return true;
    return false;
}

// Return whether the checkers could be moved in BL direction.
function BL(x,y){
    if(x<=2 && y<=6 && checkers[x][y]==1 && checkers[x+1][y-1]==1 && checkers[x+2][y-2]==0)
        return true;
    return false;
}

// Return whether the checkers could be moved in BR direction.
function BR(x,y){
    if(x<=2 && y<=6 && checkers[x][y]==1 && checkers[x+1][y+1]==1 && checkers[x+2][y+2]==0)
        return true;
    return false;
}




// Returns all possible movement of the selected checkers towards a specific direction
function allPossibleMove(f_x,f_y){
    console.log("For the point ( "+ f_x + "," + f_y+" )");
    console.log("L: "+ L(f_x,f_y));
    console.log("R: "+ R(f_x,f_y));
    console.log("TL: "+ TL(f_x,f_y));
    console.log("TR: "+ TR(f_x,f_y));
    console.log("BL: "+ BL(f_x,f_y));
    console.log("BR: "+ BR(f_x,f_y));
}

// move left
function moveL(x,y){
    checkers[x][y]=0;
    checkers[x][y-2]=0;
    checkers[x][y-4]=1;
}

//move right
function moveR(x,y){
    checkers[x][y]=0;
    checkers[x][y+2]=0;
    checkers[x][y+4]=1;
}

//move top-left
function moveTL(x,y){
    checkers[x][y]=0;
    checkers[x-1][y-1]=0;
    checkers[x-2][y-2]=1;
}

//move top-right
function moveTR(x,y){
    checkers[x][y]=0;
    checkers[x-1][y+1]=0;
    checkers[x-2][y+2]=1;
}

//move bottom-left
function moveBL(x,y){
    checkers[x][y]=0;
    checkers[x+1][y-1]=0;
    checkers[x+2][y-2]=1;
}

//move bottom-right
function moveBR(x,y){
    checkers[x][y]=0;
    checkers[x+1][y+1]=0;
    checkers[x+2][y+2]=1;
}

//Checks Whether game ended or not 
function gameEnded(){
    var res;
    for(var i=0;i<5;i++){
        for(var j=0;j<9;j++){
            var res = L(i,j) || R (i, j) || TL(i,j) || TR(i,j) || BR(i,j) || BL(i,j);
            if(res==true)
                return false;
        }
    }
    return true;
}

//make a movement as per the user's input
function move(x,y,t_x,t_y){
    if(L(x,y) && x== t_x && t_y == y-4 ){
        moveL(x,y);
    }
    else if(R(x,y) && x== t_x && y == t_y - 4 ){
        moveR(x,y);
    }
    else if(TL(x,y) && x-2 == t_x && t_y == y-2 ){
        moveTL(x,y);
    }
    else if(TR(x,y) && x == t_x+2 && t_y-2 == y ){
        moveTR(x,y);
    }
    else if(BL(x,y) && x+2 == t_x && t_y == y-2 ){
        moveBL(x,y);
    }
    else if(BR(x,y) && x+2 == t_x && y+2 == t_y ){
        moveBR(x,y);
    }
    else{
        alert('Sorry, Illegal Move !!! ');
        return false;
    }
    counter--;
    renderImage();
    if(gameEnded()){
        if(counter == 1 ){
            location.replace("winner.html");
        }
        else
            location.replace("looser.html");
    }
}





// Final result


/* debugger     ====>        RUN TEST HERE                 */  


