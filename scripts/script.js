//On vérifie que le DOM est bien chargé
document.addEventListener("DOMContentLoaded",()=>{init();}
,false);

function init(){
	const cover = document.getElementById("cover_img");
	const add_songs = document.getElementById("add_songs");
	const list_songs = document.getElementById("list_songs");
	const source_songs = document.createElement("input");
	const nb_songs = document.getElementById("nb_songs");
	const artist = document.getElementById("artist");
	const album_title = document.getElementById("album_title");
	var cpt_songs = 0;
	source_songs.type = "file";
	source_songs.multiple = "true";
	source_songs.accept = "audio/*";
	const submit = document.getElementById("submitButton");
	const source_cover = document.createElement("input");
	source_cover.type = "file";
	source_cover.accept = "images/*";
	var album = new FormData();

	var cpt = 0;

	function UploadFiles(files){
	 	let elt = "";	
		let reader = new FileReader();
    	reader.addEventListener("load", function(){
    			album.append("cover",this.result);
    			cover.src = this.result;
    	},false);
    	reader.readAsDataURL(files);  		
    } 
    function pushSong(data){
    	album.append(data.name,data);
    	for(let x of album.values()){
		console.log(x);
	}
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
			pushSong(source_songs.files[i]);
			cpt_songs++;
			cpt++;
			i++;
		}
		nb_songs.innerHTML = cpt_songs;	
	});	
	//Ajax pour l'envoie des données
	submit.addEventListener("click",()=>{				
		if(artist.value !== "Artist" && album_title.value !== "Title"){
			/*On enregistre le nom de l'artiste et
				le titre de l'album dans le fromData
			*/ 
			album.append("artist",artist.value);
			album.append("album_title",album_title.value);
				var urlToSend = "php/index.php";
				let xhrSendAnnonce = new XMLHttpRequest();
			                  xhrSendAnnonce.addEventListener("loadstart", () =>
			                   {    
			                   });
			                  xhrSendAnnonce.addEventListener("load", () =>
			                   {
			                        let response = xhrSendAnnonce.responseText;
			                        console.log(response);
			                        //return new Toast("icons/done.svg",response.message, 3000);
			                   });
			                  xhrSendAnnonce.addEventListener("error",()=>{
			                    //console.log(e.error);
			                  })
			            xhrSendAnnonce.responseType = "text";
				        xhrSendAnnonce.open('POST',urlToSend, true);
				        xhrSendAnnonce.send(album);
					
	}else{
		alert("Please add artist name and album title!");
	}
	},false);
}