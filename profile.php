<?php require __DIR__ . '/views/header.php';

if (validateUser()) {
    $user = fetchUser($pdo, $_SESSION['user']['id']);
} else {
    redirect('/login.php');
}

if (isset($_GET['username'])) {
    $profile = trim(filter_var($_GET['username'], FILTER_SANITIZE_STRING));
    $profile = fetchUserByUsername($pdo, $_GET['username']);
}

?>

<section class="profile">

    <article class="profile__header">
        <div>
            <img src="<?php echo ($profile['avatar'] !== null) ? "avatars/" . $profile['avatar'] : 'assets/images/avatar.png'; ?>" alt="Profile picture">
        </div>

        <div>
            <h2><?php echo $profile['username']; ?></h2>
            <p><?php echo $profile['first_name'] . ' ' . $profile['last_name']; ?></p>
            <p> <?php echo $profile['biography']; ?></p>
        </div>
    </article>

    <article class="profile__feed">
        <?php $posts = getImagePosts($pdo, $profile['id']); ?>

        <?php if (empty($posts)) : ?>
            <p>There are no posts yet.</p>
        <?php endif; ?>

        <?php foreach ($posts as $post) : ?>
            <div class="post">
                <img src="uploads/<?php echo $post['image']; ?>" alt="<?php echo $post['description']; ?>" loading="lazy">

                <div class="post__information">
                    <div class="post__details">
                        <p><?php echo $post['date']; ?></p>

                        <form method="post" class="like__form">
                            <input type="hidden" name="liked-post-id" value="<?php echo $post['id']; ?>">
                            <button type="submit" class="like__button <?php echo (isLiked($pdo, $user['id'], $post['id'])) ? 'like__button--liked' : 'like__button--unliked'; ?>"></button>
                            <p>
                                <?php
                                $likes = count(getAmountLikes($pdo, $post['id']));
                                echo $likes;
                                ?>
                            </p>
                        </form>
                    </div>

                    <div class="post__description">
                        <p><?php echo $post['description']; ?></p>

                        <?php if ($profile['id'] === $user['id']) : ?>
                            <button class="btn btn-primary">Edit post</button>
                        <?php endif; ?>
                    </div>
                    <!--/information-->

                    <?php if ($profile['id'] === $user['id']) : ?>
                        <div class="post__edit hidden">
                            <form method="post" class="edit__form">
                                <label for="description-edit">Edit your description</label>
                                <br>
                                <textarea name="description-edit" cols="30" rows="10"><?php echo $post['description'] ?></textarea>
                                <input type="hidden" name="id" value="<?php echo $post['id'] ?>">
                                <br>
                                <button type="submit" name="save" class="btn btn-primary">Save</button>
                            </form>

                            <form action="app/posts/delete.php?post_id=<?php echo $post['id']; ?>" method="post" class="delete__form">
                                <button type="submit" name="delete" class="delete__button btn btn-primary">Delete post</button>
                            </form>
                        </div>
                        <!--/post__edit-->
                    <?php endif; ?>
                </div>
                <!--/post__information-->
            </div>
            <!--/post-->
        <?php endforeach; ?>
    </article>

</section>

<?php require __DIR__ . '/views/footer.php'; ?>
