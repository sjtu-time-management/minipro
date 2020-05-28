<?php
$servername="localhost";
$username="root";
$password="12345678";
$dbname = "test";
$date=date('Y-m-d');
$time=date('H:i:s');
$time1=substr($time,0,5);
$openid="oh14r0r_Kp1YdM2zTgtWS-wGypus";
$templateid_2="-07c9sFfpCDrTiyDAqvBe1KjzH1uFOECX12cOYr9Wfw";
$appId='wxc82d658122a014d3';
$secret='cc8e6d0d25d3e085708b04a11be2c98a';
$templateid="cz-deSVV_v0weHKwSU0lCixBUqMHnfNYZwvgnJwXxY8";
$Url="https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=$appId&secret=$secret";

$conn = mysqli_connect($servername, $username, $password);
if(! $conn )
{
    die('连接失败: ' . mysqli_error($conn));
}
// 设置编码，防止中文乱码
mysqli_query($conn , "set names utf8");
 
$sql = "SELECT openid, itag, notitime, idate ,notiindex
        FROM notification
	
	WHERE notitime LIKE '$time1%' AND idate='$date'";

 
mysqli_select_db( $conn, 'test' );
$retval = mysqli_query( $conn, $sql );
if(! $retval )
{
    die('无法读取数据: ' . mysqli_error($conn));
}
//找数据库中与当前时间相同的记录，找到一个就根据其openid进行发送
while($row = mysqli_fetch_array($retval, MYSQLI_ASSOC))
{

    /*echo $row['openid'];
    echo $row['itag'];
    echo $row['itime'];
    echo $row['idate'];
    echo "          ";*/
    //$openid=$row['openid'];
    $itag=$row['itag'];
    $notitime=$row['notitime'];
    $idate=$row['idate'];
    $notiindex=$row['notiindex'];
    $timeset="$idate,$notitime";
switch($notiindex){
	case 0:
		$timeset=date('Y-m-d,H:i:s',strtotime("$timeset+30 minute"));
		break;
	case 1:
		$timeset=date('Y-m-d,H:i:s',strtotime("$timeset+10 minute"));
		break;

	case 2:
		$timeset=date('Y-m-d,H:i:s',strtotime("$timeset+5 minute"));
		break;

	case 3:
		$timeset=date('Y-m-d,H:i:s',strtotime("$timeset"));
		break;
	}

	$idate=substr($timeset,0,10);
	$itime=substr($timeset,11);
    	echo $idate;
	echo $itime;
	echo $itag;
    //获取微信accesstoken
    $accesstoken=file_get_contents($Url);
    $accesstoken=json_decode($accesstoken);
    $ACCESS_TOKEN=$accesstoken->access_token;
    $url="https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=$ACCESS_TOKEN";
    //封装数据
	$str_data=array
	(
		"touser"=>$openid,
		"template_id"=>$templateid_2,
		"topcolor"=>"#FF0000",
		"data"=>
			array(
				"text"=>
					array( 
						"value"=>$itag,
						"color"=>"#173177"
					),
				"time"=>
					array(
						"value"=>$itime,
						"color"=>"#173177"
					),
				"date"=>
					array(
						"value"=>$idate,
						"color"=>"#173177"
					)

				)
	);
	//发送公众号提醒
	$data=json_encode($str_data);
	file_put_contents('7.log',serialize($data),FILE_APPEND);
	$curl=curl_init($url);
	curl_setopt($curl, CURLOPT_HEADER, false);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($curl, CURLOPT_HTTPHEADER, array("Content-type: application/json"));
	curl_setopt($curl, CURLOPT_POST, true);
	curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
	$response=curl_exec($curl);
	curl_close($curl);
	file_put_contents('8.log',serialize($response),FILE_APPEND);

}


mysqli_close($conn);


?>