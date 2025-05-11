import { Container, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import React, { use } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/Product";
import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("products", products);
  return (
    <div>
      <Container maxW="container.xl" py={12}>
        <VStack spacing={8}>
          <Text
            fontSize={"30"}
            fontWeight={"bold"}
            bgGradient={"linear(to-r, cyan.400, blue.500)"}
            bgClip={"text"}
            textAlign={"center"}
          >
            Current Products 🚀
          </Text>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={8}
            w="full"
            p={4}
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>
          {products.length === 0 && (
            <Text
              fontSize="xl"
              textAlign={"center"}
              fontWeight={"bold"}
              color="red.500"
            >
              No products found 😢{" "}
              <Link to={"/create"}>
                <Text as="span" color={"blue.500"} textDecoration={"underline"}>
                  Create one now!
                </Text>
              </Link>
            </Text>
          )}
        </VStack>
      </Container>
    </div>
  );
};

export default HomePage;
