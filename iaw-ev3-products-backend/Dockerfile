FROM php:8.2-apache

RUN apt-get update && apt-get install -y \
    libicu-dev \
    libzip-dev \
    zip \
    unzip \
    && docker-php-ext-install pdo_mysql intl zip

RUN a2enmod rewrite

# Update Apache config for Symfony
RUN echo '<Directory /var/www/html>\n\
    Options Indexes FollowSymLinks\n\
    AllowOverride All\n\
    Require all granted\n\
    \n\
    <IfModule mod_rewrite.c>\n\
    RewriteEngine On\n\
    RewriteCond %{REQUEST_FILENAME} !-f\n\
    RewriteRule ^(.*)$ index.php [QSA,L]\n\
    </IfModule>\n\
    </Directory>' > /etc/apache2/conf-available/symfony.conf \
    && a2enconf symfony

ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copy only composer files first for better caching
COPY composer.json ./

RUN composer install --no-interaction --no-scripts --no-autoloader

# Copy the rest of the application
COPY . .

# Finish composer installation
RUN composer install --no-interaction --optimize-autoloader

RUN chown -R www-data:www-data /var/www/html/var

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

CMD ["docker-entrypoint.sh"]

EXPOSE 80
