#!/bin/sh
# Wait for DB (simple version)
until php bin/console doctrine:query:sql "SELECT 1" > /dev/null 2>&1; do
  echo "Waiting for database..."
  sleep 2
done

php bin/console doctrine:migrations:migrate --no-interaction --allow-no-migration
php bin/console app:generate-products 10 --no-interaction

apache2-foreground
