import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  Text,
  MenuDivider,
} from "@chakra-ui/react";

const Navbar = ({ user, handleLogout, handleLogin, homepage }) => {
  return (
    <Box px={10}>
      <Flex my={5} h={16} alignItems="center" justifyContent="space-between">
        <Heading onClick={homepage} cursor="pointer" as="h2" size="md">
      NOTE TAKING
        </Heading>

        <Stack spacing={8} alignItems="center">
          <Heading as="h3" size="lg">
          
          </Heading>
        </Stack>

        <Flex gridColumnGap={4} alignItems="center">
          {user ? (
            <>
              <Text fontSize="lg">{user.nama}</Text>
              <Menu m={0}>
                <MenuButton minW={0} rounded="full">
                  <Avatar size="sm" />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            <Link onClick={handleLogin}>
              <Button>Login</Button>
            </Link>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
