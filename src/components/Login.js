import React, { useContext, useState, useEffect } from "react";
import { itemContext } from "../App";
import axios from "axios";
import { FaGoogle } from "react-icons/fa";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  Button,
  Center,
  HStack,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import useMounted from "../hooks/useMounted";
var store = require("store");
const orderedItems = store.get("orderedItems");

// function Login() {
//     const iL = useContext(itemContext);
//     const history=useHistory();
//     const loggedin = store.get('loggedIn');
//     const {loggedIn}=iL.state ?? (loggedin ?? false);
//     const [userLogin, setUserLogin]=useState({email:"", password:""})
//     const orderedItems = store.get('orderedItems');
//     let flag=false;
//     //console.log("login rendered");

//     useEffect(()=>{
//          //navigate to specific page after login
//     if(loggedIn===true){
//         if(orderedItems && orderedItems.length){
//         //got to checkout page
//         //flag=true;
//         setTimeout(()=>{ history.replace('/checkout')},1000);
//     }
//     else{
//         //go to menu page
//         history.replace('/');
//     }
//   }
//     },[loggedIn])

//        const checkCred=(e)=>{
//            flag=true;
//         e.preventDefault();
//         //api call to fetch users
//         axios.get("/api/login")
//          .then(response =>{
//              flag=false;
//         iL.method( {type:'checkUser', payload: response.data ,user:userLogin});
//       })
//     .catch((e)=>{
//         flag=false;
//      alert("Please enter valid credentials")
//     })

//     }
//     const loginMe =(e)=>{
//         const {name , value} = e.target ;
//         setUserLogin({
//             ...userLogin, [name]:value
//     })
// }

export default function Login() {
  const history = useHistory();
  const iL = useContext(itemContext);
  const { signInWithGoogle, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const loggedin = store.get("loggedIn");
  const { loggedIn } = iL.state ?? loggedin ?? false;
  const orderedItems = store.get("orderedItems");
  // const mounted = useRef(false)
  const location = useLocation();

  // useEffect(() => {
  //   mounted.current = true
  //   return () => {
  //     mounted.current = false
  //   }
  // }, [])

  const mounted = useMounted();

  function handleRedirectToOrBack() {
    // console.log(location?.state)
    if (loggedIn === true) {
      // if (orderedItems && orderedItems.length){
      history.replace("/register");
    }
    // if (location.state) {
    //   history.replace(location.state?.from)
    else {
      history.replace("/");
    }
  }

  return (
    <div>
      <chakra.form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!email || !password) {
            toast({
              description: "Credentials not valid.",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
            return;
          }
          // your login logic here
          setIsSubmitting(true);
          login(email, password)
            .then((user) => {
              //const userDetails = { firstName: "Mitali", lastName: "Yeware" };
              //const userDetails = {firstName : user.firstName, lastName: user.lastName};
              const userDetails = {};
              handleRedirectToOrBack();
              localStorage.setItem("isLoggedIn", true);

              localStorage.setItem("userDetails", JSON.stringify(userDetails));
              window.location.reload();
            })
            .catch((error) => {
              console.log(error.message);
              toast({
                description: error.message,
                status: "error",
                duration: 9000,
                isClosable: true,
              });
            })
            .finally(() => {
              // setTimeout(() => {
              //   mounted.current && setIsSubmitting(false)
              //   console.log(mounted.current)
              // }, 1000)
              mounted.current && setIsSubmitting(false);
            });
        }}
      >
        <Stack spacing="6">
          <Heading textAlign="center">Login</Heading>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              autoComplete="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          {/* <PasswordField /> */}
          <Button
            type="submit"
            colorScheme="pink"
            size="lg"
            fontSize="md"
            isLoading={isSubmitting}
          >
            Sign in
          </Button>
        </Stack>

        <HStack justifyContent="space-between" my={4}>
          <Button variant="link" onClick={() => history.push("/register")}>
            Register
          </Button>
        </HStack>
        {/* <DividerWithText my={6}>OR</DividerWithText> */}
        <Button
          my={4}
          variant="outline"
          isFullWidth
          colorScheme="white"
          leftIcon={<FaGoogle />}
          onClick={() =>
            signInWithGoogle()
              .then((user) => {
                handleRedirectToOrBack();
                console.log(user);
                localStorage.setItem("isLoggedIn", true);
                window.location.reload();
              })
              .catch((e) => console.log(e.message))
          }
        >
          Sign in with Google
        </Button>
      </chakra.form>
    </div>
  );
}
