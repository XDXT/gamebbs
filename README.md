# gamebbs



## Preview

[点击直达](39.96.91.155)



## Requirements

* **npm   6.0+**

* **node   v10.0+**

  

## Installation

### **front-end**

1. **[layui 2.5+](https://www.layui.com/)**

2. **[WeAdmin 2019.6](https://gitee.com/lovetime/WeAdmin)**
3. **[vue.js 2.x](https://cn.vuejs.org/)**



### back-end

> **npm install**

```npm
  "dependencies": {
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "ejs": "~2.6.1",
    "express": "~4.16.1",
    "express-session": "^1.17.1",
    "http-errors": "~1.6.3",
    "morgan": "~1.9.1",
    "multer": "^1.4.2",
    "mysql": "^2.18.1"
  }
```



### nginx & supervisor

> **nginx**

```
# 从nginx.conf的默认配置来看还支持两种外部的配置
# include /etc/nginx/conf.d/*.conf;
# include /etc/nginx/sites-enabled/*;
ln -s /var/www/gamebbs/gamebbs.nginx  /etc/nginx/sites-enabled/gamebbs
```

* **gamebbs.nginx **

```
server {
	# 可添加域名
    listen 80;
    location / {
        proxy_pass http://localhost:30000;
    }
}
```

> **supervisor(非npm的supervisor)**

```
# 格式需要*.conf
ln -s /var/www/gamebbs/gamebbs.conf /etc/supervisor/conf.d/gamebbs.conf
```

```
[program:gamebbs]
command=node bin/www
directory=/var/www/gamebbs
autostart=true
autorestart=true
redirect_stderr=true
```

* **有概率supervisorctl  start gamebbs 找不到gamebbs的情况**
* **service supervisor restart 一下**



### sql 表结构

```mysql
  DATABASE `gamebbs` CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_general_ci'
  |
  ├── TABLE `gamebbs`.`user`
  |   ├── `id` int(0) NOT NULL AUTO_INCREMENT,
  |   ├── `username` varchar(255) NOT NULL,
  |   ├── `nickname` varchar(255) NULL,
  |   ├── `password` varchar(255) NULL,
  |   ├── `email` varchar(255) NULL,
  |   ├── `phone` varchar(255) NULL,
  |   ├── `headimg` varchar(255) NULL,
  |   ├── `roleid` int(0) NOT NULL DEFAULT 0,
  |   ├── `level` int(0) NOT NULL DEFAULT 0,
  |   ├── `token` varchar(255) NULL,
  |   ├── `registerTime` datetime NULL,
  |   ├── `loginTime` datetime NULL,
  |   ├── `deleteFlag` int(0) NOT NULL DEFAULT 0,
  |   └── PRIMARY KEY (`id`, `username`)
  |
  ├── TABLE `gamebbs`.`score` 
  |   ├── `id` int(0) NOT NULL AUTO_INCREMENT,
  |   ├── `userid` int(0) NULL,
  |   ├── `escape` bigint(0) NOT NULL DEFAULT 0,
  |   ├── `flappyBird` bigint(0) NOT NULL DEFAULT 0,
  |   └── PRIMARY KEY (`id`)
  |   -- TODO: 这里记录 id,userid,gameid,gameScore
  |   -- 增加一张game表, 记录 id,gameName ...
  |   
  ├── TABLE `gamebbs`.`role` 
  |   ├── `id` int(0) NOT NULL AUTO_INCREMENT,
  |   ├── `rolename` varchar(255) NULL,
  |   ├── `brief` varchar(255) NULL,
  |   └── PRIMARY KEY (`id`)
  |   -- 初始化4个角色 超级管理员、用户管理员、权限管理员、普通成员
  |   
  ├── TABLE `gamebbs`.`auth` 
  |   ├── `id` int(0) NOT NULL AUTO_INCREMENT,
  |   ├── `authname` varchar(255) NULL,
  |   ├── `authurl` varchar(255) NULL,
  |   └── PRIMARY KEY (`id`)
  |   -- 初始化3条权限 (用户管理, /admin/users)、(权限管理, /admin/auths)、(无权限、null)
  |   
  └── TABLE `gamebbs`.`role_auth` 
      ├── `id` int(0) NOT NULL AUTO_INCREMENT,
      ├── `roleid` int(0) NULL,
      ├── `authid` int(0) NULL,
      └── PRIMARY KEY (`id`)
      -- 初始化4个角色对应的权限id 
```