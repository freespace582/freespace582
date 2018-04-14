<?php 
	require_once 'api.php';
	$name = $_FILES['img']['name'];
	$id = $_POST['user_id'];
	$status_title_id = $_POST['status_title_id'];
	$total = count($name);
	$data = array();
	for($ii =0; $i < $total; $ii++){
		$folder = './image/';
		$tmp = time().".".$name;
		$destination = $folder.$tmp;
		if (move_uploaded_file($_FILES['img']['tmp_name'], $destination)){
			$upl = $db->prepare("INSERT INTO status_upl(status_img,user_id,status_title_id)VALUES(:status_img,:user_id,:status_title_id)");
			$upl->execute(array('status_img' => $tmp, 'user_id' => $id, 'status_title_id' => $status_title_id));
			//$data['msg'] = 'Status update successfully';
		}
		// echo json_encode($data);
		// exit();
	}
 ?>