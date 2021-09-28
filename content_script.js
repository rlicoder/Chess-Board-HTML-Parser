//getting the board-board div of the HTML
var html = document.getElementById('board-layout-chessboard');
//converting the html to a string
var html_string = html.outerHTML;

var whiteturn;
//checking if the player is in a live match
var clock = document.getElementsByClassName('clock-player-turn');
if (clock.length == 1)
{
    var layout = document.getElementById('board-layout-main');
    var layout_string = layout.innerHTML;
	var loc = layout_string.indexOf("clock-player-turn");
	var turn = layout_string.substr(loc-57,10);
    if (turn.includes("white"))
    {
        whiteturn = true;
    }
    else
    {
        whiteturn = false;
    }
}
else
{
    //player if currently doing puzzles
    var sidebar = document.getElementById('board-layout-sidebar');
    var sidebar_string = sidebar.innerHTML;
    if (sidebar_string.indexOf("Black to Move") != -1)
    {
        whiteturn = false;
    }
    else
    {
        whiteturn = true;
    }
}

//trimming the html code so we're left with only the relevant code
var start = html_string.indexOf("<div class=\"p");
var end = html_string.indexOf("<!--/Pieces");
html_string = html_string.substring(start, end);

//array of pieces in string form "wk 12"
//there are some with "12 wk" though
var array = html_string.split("piece ");
//removing garbage
array.shift();

//trimming more for each piece
array.forEach(trim);

//trim function
function trim(cur, i)
{
    var st = cur.indexOf("\"");
    cur = cur.substring(0, st);
    cur = cur.replace("square-", "");
    array[i] =  cur;
};


//board representation of pieces.
var board = new Array(8);
for (var i = 0; i < board.length; i++)
{
    board[i] = new Array(8);
}
//pre initializing every array element to empty board spaces
for (var i = 0; i < 8; i++)
{
    for (var j = 0; j < 8; j++)
    {
        board[i][j] = ' ';
    }
}

//converting array
array.forEach(convert);

//converting string to board piece representation.
function convert(cur, i)
{
    //checking for the 12 wk case
    if (cur.charCodeAt(0) <= 56)
    {
        //i and j element are reverse on the site.
        var i = cur.charCodeAt(0) - 48 - 1;
        var j = cur.charCodeAt(1) - 48 - 1;
        var piece = cur.charAt(4);
        if (cur.charAt(3) == 'w')
        {
            piece = piece.toUpperCase();
        }
        board[j][i] = piece;
    }
    //checking for the wk 12 case
    else
    {
        var i = cur.charCodeAt(3) - 48 - 1;
        var j = cur.charCodeAt(4) - 48 - 1;
        var piece = cur.charAt(1);
        if (cur.charAt(0) == 'w')
        {
            piece = piece.toUpperCase();
        }
        board[j][i] = piece;
    }
};

var FEN = "";

//just read FEN notation
for (var i = 7; i >= 0; i--)
{
    var count = 0;
    for (var j = 0; j < 8; j++)
    {
        if (board[i][j] == ' ')
        {
            count++;
        }
        else
        {
            if (count > 0)
            {
                FEN += count.toString();
                count = 0;
            }
            FEN += board[i][j].toString();
        }
    }
    if (count > 0)
    {
        FEN += count.toString();
    }
    FEN += "/";
}
if (whiteturn == true)
{
    FEN += " w - - 0 0";
}
else
{
    FEN += " b - - 0 0";
}
alert(FEN);

