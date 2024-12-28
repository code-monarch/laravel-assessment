FROM php:8.2-fpm
# --- Enable the following if using Laravel Vite ---
EXPOSE 5173
COPY php.ini /usr/local/etc/php/

#Composer install
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php composer-setup.php
RUN php -r "unlink('composer-setup.php');"
RUN mv composer.phar /usr/local/bin/composer

# Instaill Node.js and npm
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get install -y nodejs
RUN npm install -g npm@latest

WORKDIR /project