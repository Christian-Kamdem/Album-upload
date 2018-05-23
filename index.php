<html>
	<head>
		<title>
			Album (cover + songs) upload
		</title>
		<link rel="stylesheet" href="css/style.css" media="all" onload="if(media!='all')media='all'">
	</head>
	<body>
		<div id="container">
			<section title="Upload a cover" id="cover">
				<img id="cover_img" src="icones/add-image.svg"/>
			</section>
			<center id="add_songs">+ Add songs</center>
			<section id="album_informations">
				<input title="Artist name" id="artist" value="Artist" type="texte"  placeholder="Artist name"/>
				<input title="Album title" id="album_title" value="Title" type="texte"  placeholder="Album title"/>
				<span>Nombre de fichiers audios : </span><span id="nb_songs">0</span>			
				<br/><br/><br/><center id="etat"></center>	
			</section>
			<section id="send">
				<span id="submit">
					<center id="submitButton">Send</center>
				</span>
			</section>
		</div>
		<script src="scripts/script.js"></script>
	</body>
</html>