<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Game</title>
    <link rel="stylesheet" href="app.css">
</head>
<body>
    <header class="header">
        <span class="header__score">Score : <?= $_SESSION['score']; ?></span>
        <span class="header__time">Time remaning : <span id='seconds_counter' class="header__seconde"></span></span>
    </header>
    <section id="music_block" class="blockMusic">
    </section>
    <iframe id="youtube" width="25" height="25"  frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</body>
<script src="js/app.js" ></script>
</html>