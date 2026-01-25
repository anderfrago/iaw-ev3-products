<?php

namespace App\Command;

use App\Entity\Product;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Faker\Generator;

#[AsCommand(
    name: 'app:generate-products',
    description: 'Generates fictitious product data',
)]
class GenerateProductsCommand extends Command
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private Generator $faker
    ) {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this
            ->setHelp('This command allows you to generate a specified number of fictitious products for testing purposes.')
            ->addArgument('count', null, 'Number of products to generate', 10)
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $count = $input->getArgument('count');

        if (!$count && $input->isInteractive()) {
            $count = $io->ask('How many products do you want to generate?', 10);
        }

        if (!is_numeric($count) || $count <= 0) {
            $io->error('Please enter a valid number greater than 0.');
            return Command::FAILURE;
        }

        $io->progressStart((int) $count);

        for ($i = 0; $i < $count; $i++) {
            $product = new Product();
            $product->setName($this->faker->words(2, true));
            $product->setDescription($this->faker->paragraph(2));
            $product->setImage($this->faker->imageUrl(640, 480, 'products', true));
            $product->setPrice($this->faker->randomFloat(2, 1, 1000));

            $this->entityManager->persist($product);
            $io->progressAdvance();
        }

        $this->entityManager->flush();
        $io->progressFinish();
        $io->success(sprintf('Successfully generated %d products.', $count));

        return Command::SUCCESS;
    }
}
