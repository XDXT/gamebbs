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

### Nginx & supervisor

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