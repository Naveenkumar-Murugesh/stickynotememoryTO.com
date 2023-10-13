 const containersticky = document.getElementById("container");
 const btnadd = document.getElementById("btn");
 
 function getItemfromLocalStorage(){
	 return JSON.parse(localStorage.getItem('addsticky') || "[]");
 }
 
 //const a = getItemfromLocalStorage();
 //console.table(a);
 
 getItemfromLocalStorage().forEach(element => {
	// console.log(Element);
	const newElement = createElementTextarea(element.id, element.content);
	containersticky.insertBefore(newElement,btnadd);	
 });
 
 function createElementTextarea(id,content){
	 const textElement = document.createElement('textarea');
+	 textElement.classList.add('sticky');
	 textElement.value = content;
	 textElement.placeholder = "Enter your message";
	 textElement.addEventListener("change", ()=> {
		 updateSticky(id,textElement.value);
	 });
	 
	 textElement.addEventListener("dblclick", ()=> {
		 const check = confirm("Sure to Delete this Sticky");
		 if(check){
			DeleteSticky(id,textElement);
		 }
	 });
	 
	 return textElement;
 }
 
 function addSticky01(){
	 const notes = getItemfromLocalStorage();
	 const noteObject = {
		 id: Math.floor(Math.random()*100000),
		 content:""		 
	 }
	 const newElement = createElementTextarea(noteObject.id, noteObject.content);
	 containersticky.insertBefore(newElement,btnadd);
	 notes.push(noteObject);
	 saveSticky(notes);
 }
 
 btnadd.addEventListener("click", ()=> addSticky01());
 
 function saveSticky(notes){
	 localStorage.setItem('addsticky', JSON.stringify(notes));
 }
 
 function updateSticky(id,content){
	 const notes = getItemfromLocalStorage();
	 const updateFilter = notes.filter((a) => a.id == id)[0];
	 updateFilter.content = content;
	 saveSticky(notes);
 }
 
 function DeleteSticky(id,textElement){
	 const notes = getItemfromLocalStorage().filter((a) => a.id != id);
	 saveSticky(notes);	 
	 containersticky.removeChild(textElement);	 
 }