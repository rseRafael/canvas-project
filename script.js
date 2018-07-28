var stack = [];
var stackGarbage = [];
var mode = true;
var color = "black";

function showObject(obj){
    if(typeof obj === "object"){
        for(var p in obj){
            var type = typeof obj[p];
            var content = "";
            if(type == "boolean" || type == "number" || type == "string"){
                content = " = " +  obj[p];
            }
            console.log(`(${type}) obj[${p}]` + content);
        }
    }
}

function createMarkUp(ctx, x, y, color = "black", width = 3,  size = 10, mode = true, push = true){
    if(width <= 0){
        width = 3;
    }
    if(size <= 0){
        size = 10;
    }
    if(ctx || typeof ctx == "object"){
        if(mode){
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.lineWidth = width;
            ctx.moveTo(x + size/2, y + size);
            ctx.lineTo(x, y + size);
            ctx.lineTo(x, y - size);
            ctx.lineTo(x + size/2, y - size);
            ctx.stroke();
            ctx.closePath();
        }
        else{
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.lineWidth = width;
            ctx.moveTo(x - size/2, y - size);
            ctx.lineTo(x, y - size);
            ctx.lineTo(x, y + size);
            ctx.lineTo(x - size/2, y + size);
            ctx.stroke();
            ctx.closePath();
        }
        if(push){
            stack.push({
                "x": x,
                "y": y,
                "mode":  mode,
                "color": color,
                "width": width,
                "size": size,
            });
            console.log(stack);
            stackGarbage = [];
        }
        
    }
}

function backward(){
    stackGarbage.push(stack.pop());
    reCall();
}
function forward(){
    stack.push(stackGarbage.pop());
    reCall();

}

function replace(){
    var canvas  = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,canvas.clientWidth, canvas.clientHeight);
}

function loadImage(){
    var img = document.getElementById("canvas-image");
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    context.drawImage(img, 0, 0);
    console.log("loadImage done");
 }

function reCall(){
    loadImage();
    var canvas  = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    for(var i = 0; i < stack.length; i++){
        createMarkUp(ctx, stack[i].x, stack[i].y, stack[i].color, stack[i].width, stack[i].size, stack[i].mode, false);
    }
}




$(document).ready(
    function(){
        var img = document.getElementById("canvas-image");
        var canvas = document.getElementById("myCanvas");
        canvas.setAttribute("height", img.height);
        canvas.setAttribute("width", img.width);
        console.log("set canvas size done"); 
        
        $("#BlueButton").click(
            function(){
                color = "blue";
            }
        );

        $("#GreenButton").click(
            function(){
                color = "green";
            }
        );

        $("#PinkButton").click(
            function(){
                color = "pink";
            }
        );
        $("#openB").click(
            ()=>{
                mode = true;
            }
        )
        $("#closeB").click(
            ()=>{
                mode = false;
            }
        )
        $("#eraseAll").click(
            ()=>{
                replace();
            }
        )

        $("#backward").click(
           ()=>{ backward(); }
        );
        $("#forward").click(
            ()=>{ forward();}
        );

        $("#imageButton").click(
            ()=>{
                loadImage();
            }
        )


        $("#myCanvas").click(
            function(Mouse, ...moreThing){
                var context = document.getElementById("myCanvas").getContext("2d");
                var x = Mouse.offsetX;
                var y = Mouse.offsetY;
                var width = Math.round(document.getElementById("lineWidth").value);
                var size = Math.round(document.getElementById("lineSize").value);
                createMarkUp(context,x, y, color, width, size, mode);
                console.log(stack);
                
            }
        )
    }
)