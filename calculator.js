let container = document.getElementById("container");
let resultbox = document.getElementById("resultbox");
let classes = document.getElementsByClassName("buttons");
let CE = document.getElementById("CE");
let C = document.getElementById("C");
let input = document.getElementById("input");
let memory =[]
let d= /\d/

//function to focus the input of the keyboard and eventlistener for it
function focusInput() { 
   input.focus()
}
setInterval(focusInput,100)
input.addEventListener("input",event=>{
    let keyel =String(event.target.value)
  
    if(!/[a-z]/.test(keyel)){
        if(memory.length>18){
        alert("too many inputs")
        return memory
    }
    memory.push(keyel)
    event.target.value = null;
     return resultbox.textContent = memory.join("")
    }
    event.target.value = null;
})
//onclick event for the mouse it adds the input to the memory array as string
for(let i =0;i<classes.length;i++){
    

    classes[i].onclick = function (){
        if(memory.length>18){
            alert("too many inputs")
            return memory
        }
    //the equal first splices for the "." 
        if(classes[i].textContent == "="){  
            
            memory.map((each,index)=>{
                if(/\./.test(each) && d.test(memory[index-1]) && d.test(memory[index+1])){
                    
                    var memres= memory[index-1]+"."+memory[index+1]
                    memory.splice(index,1)
                    memory.splice(index-1,2,memres)
                }
            })
    //then splices for putting numbers together   
            function numbers (){
                memory.map((each,index)=>{
                    
                     if(d.test(each) && d.test(memory[index+1])){
                        memory.splice(index,1)
                         memory[index]= each+memory[index];
                         numbers()
                    }
                })
            }

            numbers()  
      //changes string to number
            memory.map((num,index)=>{
                if(d.test(num)){ 
                    return memory[index] =parseFloat(num)
                    
                }
            })
     //multiplication and division first then sum and substraction
            function muldiv(){
                memory.map((each, index)=>{
                    switch(each){
                        
                        case "*":
                            var memres = memory[index-1] * memory[index+1]
                            return memory.splice(index-1,3,memres)
                            break;
                        case "/":
                            var memres = memory[index-1] / memory[index+1]
                            return memory.splice(index-1,3,memres)
                            break;
                        default:

                    }
                })
            }
            muldiv();

            function sumres(){
                memory.map((each, index)=>{
                    switch(each){
                        case "+":
                            var memres = memory[index-1] + memory[index+1]
                            return memory.splice(index-1,3,memres)
                            break;
                        case "-":
                            var memres = memory[index-1] - memory[index+1]
                            
                            return memory.splice(index-1,3,memres)
                            break;
                        default:
                    }
                })
            }
       //checks if it need to keep going splicing the array multiplication and division
            function checkpd(){
                if(/\*|\//.test(memory.join())){
                    muldiv();
                
                    checkpd();
                }
                
            }
            checkpd();
            sumres();
     //checks the same for sum and substraction, the more than 1 lenth is for negative numbers 
            function checkss(){
                if (memory.length>1){
                if(/\+|\-/.test(memory.join())){
                    sumres();
                    checkss();
                }
                }
            }
            checkss();
    //finally it gives result with or without decimals
            if(/\./.test(memory[0])){
                return resultbox.textContent = memory[0].toFixed(2);
            }
            else{return resultbox.textContent = memory[0]}
            memory= [];
            
        }
        else if(classes[i].textContent == "CE"){
             memory.pop()
        }

        else if(classes[i].textContent == "C"){
            memory = []

        }

        else {memory.push(classes[i].textContent)}

        


    
     return resultbox.textContent =memory.join("");
    }
}
