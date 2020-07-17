var menu = {
	"status": 0,
	"msg": "ok",
	"data": []
}

var userMenu = {
	"id": 1,
	"name": "用户管理",
	"icon": "&#xe6b8;",
	"url": "",
	"children": [
		{
			"id": 2,
			"name": "用户列表",
			"icon": "",
			"url": "/admin/users/list"
		}
	]
};

var topicMenu = {
	"id": 3,
	"name": "帖子管理",
	"icon": "&#xe705;",
	"url": "",
	"children": [
		{
			"id": 4,
			"name": "帖子列表",
			"icon": "",
			"url": "./pages/article/list.html"
		}, 
		{
			"id": 5,
			"name": "分类管理",
			"icon": "",
			"url": "./pages/article/category.html"
		}
	]
};

var adminMenu = {
	"id": 13,
	"name": "管理员权限",
	"icon": "&#xe726;",
	"url": "",
	"children": [
		{
			"id": 14,
			"name": "管理员列表",
			"icon": "",
			"url": "/admin/auths/list"
		},
		{
			"id": 15,
			"name": "角色管理",
			"icon": "",
			"url": "/admin/auths/role"
		},
		{
			"id": 16,
			"name": "权限管理",
			"icon": "",
			"url": "/admin/auths/auth"
		}
	]
};

function getMenuByName(menuName) {
	switch (menuName) {
		case "user":
			return userMenu;
		case "topic":
			return topicMenu;
		case "admin":
			return adminMenu;
		default:
			return {};
	}
}

/**
 * menuNames ['all', 'user', 'topic', 'admin']
 * @param {Array} menuNames 
 */
function getMenu(menuNames) {
	let newmenu = menu;
	if (menuNames[0] == 'all') {
		newmenu.data = [userMenu, topicMenu, adminMenu];
		return newmenu;
	}

	for (let i = 0; i < menuNames.length; i++) {
		let menuName = menuNames[i];
		newmenu.data.push(getMenuByName(menuName));
	}
	return newmenu;
}

module.exports = getMenu;