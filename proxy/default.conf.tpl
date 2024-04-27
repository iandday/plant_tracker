# proxy/default.conf.tpl

server {
    listen ${LISTEN_PORT};
    client_max_body_size 20M;
    location /static {
        alias /static;
        client_max_body_size 20M;
    }

    location /assets {
        alias /static/assets;
        client_max_body_size 20M;
    }

    location /media {
        alias /media;
        client_max_body_size 20M;
    }

    location / {
        proxy_pass      http://${APP_HOST}:${APP_PORT};
        include         /etc/nginx/proxy_params;
        client_max_body_size 20M;
    }
}