//前台
exports.getIndexPage = (req, res) => {
    res.render('index');
}
exports.getDetailPage = (req, res) => {
    res.render('detail');
}
exports.getListPage = (req, res) => {
    res.render('list');
}
//后台
exports.getAdminIndexPage = (req, res) => {
    res.render('admin/index');
}
exports.getAdminLoginPage = (req, res) => {
    res.render('admin/login');
}
exports.getAdminCategoriesPage = (req, res) => {
    res.render('admin/categories');
}
exports.getAdminCommentsPage = (req, res) => {
    res.render('admin/comments');
}
exports.getAdminNavMenusPage = (req, res) => {
    res.render('admin/nav-menus');
}
exports.getAdminPasswordResetPage = (req, res) => {
    res.render('admin/password-reset');
}
exports.getAdminPostAddPage = (req, res) => {
    res.render('admin/post-add');
}
exports.getAdminPostsPage = (req, res) => {
    res.render('admin/posts');
}
exports.getAdminProfilePage = (req, res) => {
    res.render('admin/profile');
}
exports.getAdminSettingsPage = (req, res) => {
    res.render('admin/settings');
}
exports.getAdminSlidesPage = (req, res) => {
    res.render('admin/slides');
}
exports.getAdminUsersPage = (req, res) => {
    res.render('admin/users');
}