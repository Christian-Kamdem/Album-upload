//On vérifie que le DOM est bien chargé
document.addEventListener("DOMContentLoaded",()=>{init();}
,false);

function init(){
	const cover = document.getElementById("cover_img");
	const add_songs = document.getElementById("add_songs");
	const list_songs = document.getElementById("list_songs");
	const source_songs = document.createElement("input");
	source_songs.type = "file";
	source_songs.multiple = "true";
	source_songs.accept = "audio/*"
	const submit = document.getElementById("submitButton");
	const source_cover = document.createElement("input");
	source_cover.type = "file";
	source_cover.accept = "images/*";
	var album = {cover:"",songs:[]};	

	function UploadFiles(files){
	 	let elt = "";	
		let reader = new FileReader();
    	reader.addEventListener("load", function(){
    			album.cover = this.result;   	
    			cover.src = this.result;	
    	},false);
    	reader.readAsDataURL(files);
    } 
    function pushSong(data){
    	album.songs.push(window.URL.createObjectURL(data));
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
			i++;
		}	
	});	
	//Ajax pour l'envoie des données
	submit.addEventListener("click",()=>{
		var DataToSend = album;
		console.log(DataToSend);
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
	        xhrSendAnnonce.send(JSON.stringify(DataToSend));
	},false);	
}