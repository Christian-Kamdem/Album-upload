//On vérifie que le DOM est bien chargé
document.addEventListener("DOMContentLoaded",()=>{
	init();
}	
,false);

function init(){
	const cover = document.getElementById("cover_img");
	const add_songs = document.getElementById("add_songs");
	const list_songs = document.getElementById("list_songs");
	const submit = document.getElementById("submit").firstChild;
	const source_cover = document.createElement("input");
	source_cover.type = "file";
	source_cover.accept = "images/*";
	var album = [{cover:""}];
	var allowedExtensions = ["jpg", "jpeg", "png", "webp"];	

	function UploadCover(files){
	let reader = new FileReader();
    reader.addEventListener("load", function(){
    album[0].cover = this.result;   	
    cover.src = this.result;console.log(album);	
    },false);
    reader.readAsDataURL(files[0]);
    }
	//Events
	cover.addEventListener("click",()=>{
		source_cover.click();
	},false);
	source_cover.addEventListener("change",()=>{
		UploadCover(source_cover.files);
	});
}