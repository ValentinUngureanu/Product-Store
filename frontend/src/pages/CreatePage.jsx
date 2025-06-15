import {
  Button,
  Container,
  useColorModeValue,
  Heading,
  Box,
  Input,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useProductStore } from "../store/Product";
import { useToast } from "@chakra-ui/react";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    stock: "",
    category: "",
    brand: "",
    weight: "",
    color: "",
    releaseDate: "",
  });
  const toast = useToast();
  const { createProduct } = useProductStore();
  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setNewProduct({
        name: "",
        price: "",
        image: "",
        description: "",
        stock: "",
        category: "",
        brand: "",
        weight: "",
        color: "",
        releaseDate: "",
      });
    }
  };
  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" textAlign="center" mb={8}>
          Create New Product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("gray.100", "gray.900")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder={"Product Name"}
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder={"Product Price"}
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              placeholder={"Product Image URL"}
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <Input
              placeholder="Description"
              name="description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
            />
            <Input
              placeholder="Stock"
              name="stock"
              type="number"
              value={newProduct.stock}
              onChange={(e) =>
                setNewProduct({ ...newProduct, stock: e.target.value })
              }
            />
            <Input
              placeholder="Category"
              name="category"
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
            />
            <Input
              placeholder="Brand"
              name="brand"
              value={newProduct.brand}
              onChange={(e) =>
                setNewProduct({ ...newProduct, brand: e.target.value })
              }
            />
            <Input
              placeholder="Weight (kg)"
              name="weight"
              type="number"
              value={newProduct.weight}
              onChange={(e) =>
                setNewProduct({ ...newProduct, weight: e.target.value })
              }
            />
            <Input
              placeholder="Color"
              name="color"
              value={newProduct.color}
              onChange={(e) =>
                setNewProduct({ ...newProduct, color: e.target.value })
              }
            />
            <Input
              placeholder="Release Date"
              name="releaseDate"
              type="date"
              value={newProduct.releaseDate}
              onChange={(e) =>
                setNewProduct({ ...newProduct, releaseDate: e.target.value })
              }
            />

            <Button colorScheme="blue" onClick={handleAddProduct} w="full">
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
