
import {
  Box,
  Button,
  ButtonGroup,
  Table,
  TableContainer,
  Tbody,
  Tr,
  Th,
  Td,
  Thead,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";

import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import Navbar from "../components/navbar";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../utils/AuthContext";
import backend from "../api/backend";
import { useRouter } from "next/router";

export default function Home() {
  const [note, setNote] = useState([]);
  const [user, setUser] = useState(null);
  const { token, setToken } = useContext(AuthContext);
  const router = useRouter();

  const getAllNote = async () => {
    try {
      const res = await backend.get("/note");
      setNote(res.data.note);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserByToken = async () => {
    try {
      const res = await backend.get("/user", {
        headers: {
          token,
          validateStatus: false,
        },
      });

      if (res.status !== 200) {
        alert(res.data.message);
        return;
      }

      return setUser(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    getAllNote();
    getUserByToken();
  }, [token]);

  return (
    <Box
      justifyContent="center"
      alignItems="center"
      minH="100vh"
      bg={useColorModeValue("gray.50", "gray.800")}
      pt={5}
      pb={10}
      px={200}
    >
      <Navbar
        user={user}
        handleLogout={handleLogout}
        handleLogin={() => router.push("/login")}
      />
        <Box
        rounded="lg"
        bg={useColorModeValue("white", "gray.700")}
        p={8}
        boxShadow="lg">
    
  <Table>
    <Tr> 
        <th align="right"> 
        <Button
        size="sm"
        colorScheme="green"
        onClick={() => {
        router.push(`/users/${note.user_id}`);
        }} >
         Add Notes
        </Button>      
      </th>   
     </Tr>
  </Table><br/>
  <hr></hr>
  </Box>



        <Box
        rounded="lg"
        bg={useColorModeValue("white", "gray.700")}
        p={8}
        boxShadow="lg">

        <TableContainer>
             <Table>
            <Thead>
              <Tr>
                <Th>No</Th>
                {/* <Th>NIM</Th> */}
                <Th>Judul</Th>
                <Th>Content</Th>
                {/* <Th>Angkatan</Th>
                <Th>Prodi</Th> */}
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {note &&
                note.map((note, index) => (
                  <Tr key={note.id}>
                    <Td>{index + 1}</Td>
                    {/* <Td>{mahasiswa.nim}</Td> */}
                    <Td>{note.judul}</Td>
                    <Td>{note.content}</Td>
                    {/* <Td>{mahasiswa.nama}</Td> */}
                    {/* <Td>{mahasiswa.angkatan}</Td>
                    <Td>{mahasiswa.prodi.nama}</Td> */}
                    <Td>
                      <Button
                        size="sm"
                        colorScheme="green"
                        onClick={() => {
                          router.push(`/users/${note.user_id}`);
                        }}
                      >
                        Detail
                      </Button>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}









// import { useContext, useState } from "react";

// import {
//   Box,
//   Button,
//   Flex,
//   FormControl,
//   Heading,
//   Input,
//   InputGroup,
//   InputLeftElement,
//   InputRightElement,
//   Stack,
//   VStack,
//   useColorModeValue,
//   FormLabel,
//   Text,
//   Link,
//   Icon,
// } from "@chakra-ui/react";

// import { BiIdCard, BiLockAlt, BiShow, BiHide } from "react-icons/bi";
// import { useRouter } from "next/router";
// import { AuthContext } from "../utils/AuthContext";
// import backend from "../api/backend";

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { setToken } = useContext(AuthContext);

//   const router = useRouter();

//   const handleShowPassword = () => setShowPassword(!showPassword);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (email === "" || password === "") {
//       alert("Email dan Password tidak boleh kosong");
//       return;
//     }

//     const user = {
//       email,
//       password,
//     }

//     handleLogin(user);
//   };

//   const handleLogin = async (user) => {
//     try {
//       const res = await backend.post('auth/login', user, {
//         validateStatus: false,
//       });

//       if (res.status !== 200) {
//         alert(res.data.message);
//         return;
//       }

//       setToken(res.data.token);
//       router.push('/');
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <Flex
//       justify="center"
//       align="center"
//       minH="100vh"
//       bg={useColorModeValue("gray.50", "gray.800")}>

//       <Stack spacing={8} mx="auto" maxW="xl" py={12} px={6}>
//         <Heading textAlign="center" fontSize="4xl">
//           Sign i
//         </Heading>

//         <Box
//           rounded="lg"
//           bg={useColorModeValue("white", "gray.700")}
//           p={8}
//           boxShadow="lg"
//         >
//           <form onSubmit={handleSubmit}>
//             <Stack spacing={4}>
//               <FormControl>
//                 <InputGroup>
//                   <InputLeftElement
//                     children={
//                       <Icon as={BiIdCard} w="6" h="6" color="gray.300" />
//                     }
//                   />
//                   <Input
//                     type="text"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </InputGroup>
//               </FormControl>
//               <FormControl>
//                 <InputGroup>
//                   <InputLeftElement
//                     children={
//                       <Icon as={BiLockAlt} w="6" h="6" color="gray.300" />
//                     }
//                   />
//                   <Input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                   <InputRightElement h="full">
//                     <Button variant="ghost" onClick={handleShowPassword}>
//                       {showPassword ? (
//                         <Icon as={BiShow} />
//                       ) : (
//                         <Icon as={BiHide} />
//                       )}
//                     </Button>
//                   </InputRightElement>
//                 </InputGroup>
//               </FormControl>
//               <Stack spacing={10} pt={2}>
//                 <Button
//                   type="submit"
//                   value="submit" 
//                   size="lg"
//                   bg={"blue.400"}
//                   color={"white"}
//                   _hover={{
//                     bg: "blue.500",
//                   }}
//                 >
//                   Sign in
//                 </Button>
//               </Stack>
//               <Stack pt={6}>
//                 <Text align="center">
//                   Don't have an account?{" "}
//                   <Link color="blue.400" href="./register">
//                     register
//                   </Link>
//                 </Text>
//               </Stack>
//             </Stack>
//           </form>
//         </Box>
//       </Stack>
//     </Flex>
//   );
// };

// export default Login;
































// import {
//   Box,
//   Button,
//   ButtonGroup,
//   Table,
//   TableContainer,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   Thead,
//   useColorModeValue,
//   Link,
// } from "@chakra-ui/react";

// import Head from "next/head";
// import Image from "next/image";
// import styles from "../styles/Home.module.css";

// import Navbar from "../components/navbar";
// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../utils/AuthContext";
// import backend from "../api/backend";
// import { useRouter } from "next/router";

// export default function Home() {
//   const [user, setUser] = useState(null);
//   const { token, setToken } = useContext(AuthContext);
//   const router = useRouter();

//   // const getAllNote = async () => {
//   //   try {
//   //     const res = await backend.get("/note");
//   //     setnote(res.data.note);
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // };

//   // const getUserByToken = async () => {
//   //   try {
//   //     const res = await backend.get("/user", {
//   //       headers: {
//   //         token,
//   //         validateStatus: false,
//   //       },
//   //     });

//   //     if (res.status !== 200) {
//   //       alert(res.data.message);
//   //       return;
//   //     }

//   //     return setUser(res.data.note);
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // };

//   const handleLogout = () => {
//     setToken(null);
//     setUser(null);
//   };

//   // useEffect(() => {
//   //   getAllNote();
//   //   getUserByToken();
//   // }, [token]);

//   return (
//     <Box
//       justifyContent="center"
//       alignItems="center"
//       minH="100vh"
//       bg={useColorModeValue("gray.50", "gray.800")}
//       pt={5}
//       pb={10}
//       px={10}
//     >
//       <Navbar
//         user={user}
//         handleLogout={handleLogout}
//         handleLogin={() => router.push("/login")}
//       />
//       <Box
//         rounded="lg"
//         bg={useColorModeValue("white", "gray.700")}
//         p={8}
//         boxShadow="lg"
//       >
//         <TableContainer>
//           <Table>
//             <Thead>
//               <Tr>
//                 <Th>No</Th>
//                 <Th>NIM</Th>
//                 <Th>Nama</Th>
//                 <Th>Angkatan</Th>
//                 <Th>Prodi</Th>
//                 <Th>Action</Th>
//               </Tr>
//             </Thead>
//             <Tbody>
//               {user &&
//                 note.map((note, index) => (
//                   <Tr key={mahasiswa.nim}>
//                     <Td>{index + 1}</Td>
//                     <Td>{mahasiswa.nim}</Td>
//                     <Td>{mahasiswa.nama}</Td>
//                     <Td>{mahasiswa.angkatan}</Td>
//                     <Td>{mahasiswa.prodi.nama}</Td>
//                     <Td>
//                       <Button
//                         size="sm"
//                         colorScheme="green"
//                         onClick={() => {
//                           router.push(`/users/${mahasiswa.nim}`);
//                         }}
//                       >
//                         Detail
//                       </Button>
//                     </Td>
//                   </Tr>
//                 ))}
//             </Tbody>
//           </Table>
//         </TableContainer>
//       </Box>
//     </Box>
//   );
// }
