//On vérifie que le DOM est bien chargé
document.addEventListener("DOMContentLoaded",()=>{init();}
,false);

function init(){
	var what = "image";
	const cover = document.getElementById("cover_img");
	const add_songs = document.getElementById("add_songs");
	const list_songs = document.getElementById("list_songs");
	const source_songs = document.createElement("input");
	source_songs.type = "file";
	source_songs.multiple = "true";
	source_songs.accept = "audio/*"
	const submit = document.getElementById("submit").firstChild;
	const source_cover = document.createElement("input");
	source_cover.type = "file";
	source_cover.accept = "images/*";
	var coverAlbum = "";
	var album = [];	

	function UploadFiles(files){
	 	let elt = "";	
		let reader = new FileReader();
    	reader.addEventListener("load", function(){
    		if(what === "image"){
    			coverAlbum = this.result;   	
    			cover.src = this.result;
    		}else if(what === "song"){
    			if(album.indexOf(this.result) === -1){
    				album.push(this.result);
    				elt = `<p>${this.result.name}</p>`;
    				list_songs.insertAdjacentHTML("beforeend",elt);
    			}    			
    		}   		
    	},false);
    	reader.readAsDataURL(files);
    }   
		//Event sur la cover
	cover.addEventListener("click",()=>{		
		source_cover.click();		
	},false);
	source_cover.addEventListener("change",()=>{
		what = "image";
		UploadFiles(source_cover.files[0]);
	});
		//Event sur Add song
	add_songs.addEventListener("click",()=>{		
		source_songs.click();		
	},false);
	source_songs.addEventListener("change",()=>{
		what = "song";
		let i = 0;
		while(i<source_songs.files.length){
			UploadFiles(source_songs.files[i]);
			i++;
		}	
	});	
}