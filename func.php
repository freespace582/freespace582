<?php
/**
 * Created by PhpStorm.
 * User: user
 * Date: 3/26/2018
 * Time: 10:53 PM
 */

define( 'TIMEBEFORE_NOW','Just now' );
define( 'TIMEBEFORE_MINUTE','{num} Minute ago' );
define( 'TIMEBEFORE_MINUTES','{num} Minutes ago' );
define( 'TIMEBEFORE_HOUR', '{num} Hour ago' );
define( 'TIMEBEFORE_HOURS', '{num} Hours ago' );
define( 'TIMEBEFORE_YESTERDAY', 'Yesterday' );
define( 'TIMEBEFORE_FORMAT',  '%e %b' );
define( 'TIMEBEFORE_FORMAT_YEAR', '%e %b, %Y' );

define( 'TIMEBEFORE_DAYS',    '{num} Days ago' );
define( 'TIMEBEFORE_WEEK',    '{num} Week ago' );
define( 'TIMEBEFORE_WEEKS',   '{num} Weeks ago' );
define( 'TIMEBEFORE_MONTH',   '{num} Month ago' );
define( 'TIMEBEFORE_MONTHS',  '{num} Months ago' );

date_default_timezone_set("Africa/Lagos");

function time_ago($time)
{
    $out    = ''; // what we will print out
    $now    = time(); // current time
    $diff   = $now - $time; // difference between the current and the provided dates

    if( $diff < 60 ) // it happened now
        return TIMEBEFORE_NOW;

    elseif( $diff < 3600 ) // it happened X minutes ago
        return str_replace( '{num}', ( $out = round( $diff / 60 ) ), $out == 1 ? TIMEBEFORE_MINUTE : TIMEBEFORE_MINUTES );

    elseif( $diff < 3600 * 24 ) // it happened X hours ago
        return str_replace( '{num}', ( $out = round( $diff / 3600 ) ), $out == 1 ? TIMEBEFORE_HOUR : TIMEBEFORE_HOURS );

    elseif( $diff < 3600 * 24 * 2 ) // it happened yesterday
        return TIMEBEFORE_YESTERDAY;

    elseif( $diff < 3600 * 24 * 7 )
        return str_replace( '{num}', round( $diff / ( 3600 * 24 ) ), TIMEBEFORE_DAYS );

    elseif( $diff < 3600 * 24 * 7 * 4 )
        return str_replace( '{num}', ( $out = round( $diff / ( 3600 * 24 * 7 ) ) ), $out == 1 ? TIMEBEFORE_WEEK : TIMEBEFORE_WEEKS );

    elseif( $diff < 3600 * 24 * 7 * 4 * 12 )
        return str_replace( '{num}', ( $out = round( $diff / ( 3600 * 24 * 7 * 4 ) ) ), $out == 1 ? TIMEBEFORE_MONTH : TIMEBEFORE_MONTHS );

    else // falling back on a usual date format as it happened later than yesterday
        return strftime( date( 'Y', $time ) == date( 'Y' ) ? TIMEBEFORE_FORMAT : TIMEBEFORE_FORMAT_YEAR, $time );
}

function user_online($on){
    if($on == 1){
        return "Online";
    }else{
        return "Offline";
    }
}

function admin_group($id){
    global $db;
    $stmt = $db->prepare("SELECT id,username FROM users WHERE id =:id");
    $stmt->execute(array('id' => $id));
    $rs = $stmt->fetch(PDO::FETCH_ASSOC);
    return $rs['username'];
}

function status_color($color){
    if($color == 1){
        return "#2196f3";
    }elseif($color == 2){
        return "#dd3333";
    }elseif($color == 3){
        return "#263238";
    }elseif($color == 4){
        return "#d67d00";
    }elseif ($color == 5){
        return "#ffffff";
    }else{
        return "#000";
    }
}