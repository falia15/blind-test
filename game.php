<?php

session_start();

// set score
if(!isset($_SESSION['score'])){
    $_SESSION['score'] = 0;
}

// incremente score
if(isset($_POST['status'])){
    $_SESSION['score'] += 1;
}

require('views/game.php');