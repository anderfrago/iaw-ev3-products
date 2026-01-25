<?php

namespace App\Controller;

use App\Entity\Product;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\Response;

#[Route('/api/products', name: 'app_product_')]
final class ProductController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private SerializerInterface $serializer
    ) {
    }

    #[Route('/', name: 'index', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $products = $this->entityManager->getRepository(Product::class)->findAll();
        return $this->json($products, Response::HTTP_OK, [], ['groups' => 'product:read']);
    }
    #[Route('/{id}', name: 'show', methods: ['GET'])]
    public function show(Product $product): JsonResponse
    {
        return $this->json($product, Response::HTTP_OK, [], ['groups' => 'product:read']);
    }

    #[Route('/', name: 'new', methods: ['POST'])]
    public function new(Request $request): JsonResponse
    {
        $product = $this->serializer->deserialize($request->getContent(), Product::class, 'json');

        $this->entityManager->persist($product);
        $this->entityManager->flush();

        return $this->json($product, Response::HTTP_CREATED, [], ['groups' => 'product:read']);
    }

    #[Route('/{id}', name: 'edit', methods: ['PUT'])]
    public function edit(Request $request, Product $product): JsonResponse
    {
        $this->serializer->deserialize($request->getContent(), Product::class, 'json', ['object_to_populate' => $product]);

        $this->entityManager->flush();

        return $this->json($product, Response::HTTP_OK, [], ['groups' => 'product:read']);
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(Product $product): JsonResponse
    {
        $this->entityManager->remove($product);
        $this->entityManager->flush();

        return $this->json(null, Response::HTTP_NO_CONTENT);
    }
}
