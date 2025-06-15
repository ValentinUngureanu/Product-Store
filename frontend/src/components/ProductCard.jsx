import {
  Box,
  Image,
  Heading,
  HStack,
  IconButton,
  Text,
  useColorModeValue,
  useToast,
  Modal,
  ModalOverlay,
  ModalFooter,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  Button,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useProductStore } from "../store/Product";
import { useState } from "react";
const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.500");
  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);

    if (!success) {
      toast({
        title: "Error deleting product.",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Product deleted.",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const handleUpdatedProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    onClose();
    if (!success) {
      toast({
        title: "Error updating product.",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Product updated.",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
    onClose();
  };
  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />
      <Box p={4}>
  <Heading as="h3" size="lg" mb={2}>
    {product.name}
  </Heading>
  <Text fontWeight="bold" fontSize="xl" color={textColor}>
    ${product.price}
  </Text>
  <Text color={textColor}>Description: {product.description}</Text>
  <Text color={textColor}>Stock: {product.stock}</Text>
  <Text color={textColor}>Category: {product.category}</Text>
  <Text color={textColor}>Brand: {product.brand}</Text>
  <Text color={textColor}>Weight: {product.weight} kg</Text>
  <Text color={textColor}>Color: {product.color}</Text>
  <Text color={textColor}>
    Release Date: {product.releaseDate?.slice(0, 10)}
  </Text>

  <HStack spacing={2} mt={4}>
    <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme="blue" />
    <IconButton
      icon={<DeleteIcon />}
      onClick={() => handleDeleteProduct(product._id)}
      colorScheme="red"
    />
  </HStack>
</Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
  <Input
    placeholder="Product Name"
    name="name"
    value={updatedProduct.name}
    onChange={(e) =>
      setUpdatedProduct({ ...updatedProduct, name: e.target.value })
    }
  />
  <Input
    placeholder="Product Price"
    name="price"
    type="number"
    value={updatedProduct.price}
    onChange={(e) =>
      setUpdatedProduct({ ...updatedProduct, price: e.target.value })
    }
  />
  <Input
    placeholder="Product Image URL"
    name="image"
    value={updatedProduct.image}
    onChange={(e) =>
      setUpdatedProduct({ ...updatedProduct, image: e.target.value })
    }
  />
  <Input
    placeholder="Description"
    name="description"
    value={updatedProduct.description}
    onChange={(e) =>
      setUpdatedProduct({ ...updatedProduct, description: e.target.value })
    }
  />
  <Input
    placeholder="Stock"
    name="stock"
    type="number"
    value={updatedProduct.stock}
    onChange={(e) =>
      setUpdatedProduct({ ...updatedProduct, stock: e.target.value })
    }
  />
  <Input
    placeholder="Category"
    name="category"
    value={updatedProduct.category}
    onChange={(e) =>
      setUpdatedProduct({ ...updatedProduct, category: e.target.value })
    }
  />
  <Input
    placeholder="Brand"
    name="brand"
    value={updatedProduct.brand}
    onChange={(e) =>
      setUpdatedProduct({ ...updatedProduct, brand: e.target.value })
    }
  />
  <Input
    placeholder="Weight (kg)"
    name="weight"
    type="number"
    value={updatedProduct.weight}
    onChange={(e) =>
      setUpdatedProduct({ ...updatedProduct, weight: e.target.value })
    }
  />
  <Input
    placeholder="Color"
    name="color"
    value={updatedProduct.color}
    onChange={(e) =>
      setUpdatedProduct({ ...updatedProduct, color: e.target.value })
    }
  />
  <Input
    placeholder="Release Date"
    name="releaseDate"
    type="date"
    value={updatedProduct.releaseDate?.slice(0, 10) || ""}
    onChange={(e) =>
      setUpdatedProduct({ ...updatedProduct, releaseDate: e.target.value })
    }
  />
</VStack>

          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdatedProduct(product._id, updatedProduct)}
            >
              Update
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
