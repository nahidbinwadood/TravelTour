 // Dashboard::Start
 const toggleButton=document.getElementById("theme-toggle")
 const nightBtn=document.getElementById("night-mode")
 const lightBtn=document.getElementById("light-mode")
 let theme="light"
 toggleButton?.addEventListener("click",()=>{
   if(theme==="light"){
     nightBtn.classList.add("hidden")
     lightBtn.classList.remove("hidden")
     theme="dark"
   }else if(theme==="dark"){
     nightBtn.classList.remove("hidden")
     lightBtn.classList.add("hidden")
     theme="light"
   }
 })
 // Dashboard::End