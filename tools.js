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

export {showObject};