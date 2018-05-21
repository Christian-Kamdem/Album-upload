<?php
	$dataReceive = json_decode(file_get_contents('php://input'));
	$Isimage = true;
	//On crèe le repertoire de l'album
	$date = new DateTime();
	$timestamp = $date->getTimeStamp();
	chdir("../albums");
	mkdir(''.$timestamp,0777);
			imageFromString($dataReceive->cover,$Isimage,$timestamp);
			$i = 0;
			foreach ($dataReceive->songs as $key => $value) {var_dump($value->name);
				songUpload($value,$i);
				$i++;
			}
		//imageFromString($dataReceive->cover);
	function imageFromString($data,$Isimage,$repertoire){		 
	     $repertoireUpload = ''.$repertoire;
	     list($type, $data) = explode(';base64,', $data, 2);
	     $data = str_replace(' ', '+', $data);	     
	     	chdir($repertoire);
	     	$source = imagecreatefromstring(base64_decode($data));
	     	$rotate = imagerotate($source,0,0);
	     	$salt = 'rgorl'.mt_rand().'g$thelifeStore'.date('s');
	     	$imageName = openssl_digest($salt,'sha512').'.jpeg';
	     	$imageSaved = imagejpeg($rotate,$repertoireUpload.$imageName,100);
	     	//file_put_contents($repertoireUpload.$imageName,$data);
	     	imagedestroy($source);	     	    
	     //																			  											  
	}
	function songUpload($file,$nb){
		$target_dir = "uploads/";
		move_uploaded_file($file,$target_dir.$nb);
		/*$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
		$uploadOk = 1;
		//$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));		
		/* Check if image file is a actual image or fake image
		if(isset($_POST["submit"])) {
    		$check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
   		 if($check !== false) {
        		echo "File is an image - " . $check["mime"] . ".";
       		 $uploadOk = 1;
    	} else {
      	  echo "File is not an image.";
       	 $uploadOk = 0;
   	 }
	}
	// Check file size
		if ($_FILES["fileToUpload"]["size"] > 500000) {
    		echo "Sorry, your file is too large.";
    		$uploadOk = 0;
		}
		// Allow certain file formats
		if($imageFileType != "mp3" && $imageFileType != "mp4" && $imageFileType != "wave"
			&& $imageFileType != "wav" ) {
    		echo "Format audio invalide";
    		$uploadOk = 0;
		}
		// Check if $uploadOk is set to 0 by an error
		if ($uploadOk == 0) {
  		  echo "Problème lors de l'upload des sons";
			// if everything is ok, try to upload file
		} else {
   		 if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
      		  echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
  		  } else {
      		  echo "Sorry, there was an error uploading your file.";
   		 }
		}*/
	}
?>