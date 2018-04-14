<?php
/**
 * Created by PhpStorm.
 * User: user
 * Date: 4/6/2018
 * Time: 1:39 PM
 */
require_once 'api.php';
    $id = $_POST['id'];
    $name = $_FILES['upl']['name'];
    $total = count($name);
    $data = array();
     $tmp = uniqid().".".$name;
    $folder = "./image/";
    $destination = $folder.$tmp;
    if (move_uploaded_file($_FILES['upl']['tmp_name'], $destination)){
        // $data['error'] = 1;
        // $data['msg'] = 'Account created successfully, try to login';
        $stmt = $db->prepare("UPDATE users SET upl =:upl WHERE id =:id");
        $stmt->execute(array('upl' => $tmp, 'id' => $id));
    }
    //echo json_encode($data);
    //exit;
?>