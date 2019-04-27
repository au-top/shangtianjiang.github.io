<?php
$Type=$_POST['Type'];
$db=new mysqli('localhost','root','qweasdzxc','game',3306);
switch ($Type){
    case 0:
        $Name=$_POST['Name'];
        $sql_show= /** @lang sql */
            "SELECT * FROM `gamedata` WHERE `name` ='$Name' AND `end` =0 LIMIT 1;";
        $data=mysqli_query($db,$sql_show);
        $data = mysqli_fetch_all($data, MYSQLI_ASSOC);
        if (empty($data[0]['id']) ){
            $sql_new= /** @lang sql */
                "INSERT INTO `gamedata` VALUES ('','$Name',15,0,0)";
            $data=mysqli_query($db,$sql_new);
            $data=mysqli_query($db,$sql_show);
            $data=mysqli_fetch_all($data,MYSQLI_ASSOC);
            print_r(json_encode($data));
        }else {
            print_r(json_encode($data));
        }
        break;
    case 1:
        $ID=$_POST['id'];

        break;
}
?>