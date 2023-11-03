import React, { useState, useEffect, useRef } from 'react'
import { FaGoogle } from 'react-icons/fa'
import validator from 'validator';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Button, Center, chakra, FormControl, FormLabel, Heading, Input, Stack, useRadioGroup, useToast } from '@chakra-ui/react'
import { useAuth } from '../contexts/AuthContext'
import DividerWithText from '../components/DividerWithText'
//axios.post('http://localhost:4000/api/user')
// function Register()
//   const [user, setUser] = useState({ firstname: "", lastname: "", phonenumber: "", email: "", password: "", repasswordd: "", address: "" })
//   const [msg, setMsg] = useState('');
//   const history = useHistory();
//   useEffect(() => {
//     //console.log("register rendered");
//     if (msg.includes("Success")) {
//       setTimeout(() => { history.push('/login'); setMsg(''); }, 1000);
//     }
//   }, [msg, history])

//   const changeMe = (e) => {
//     const { name, value } = e.target;
//     setUser({
//       ...user, [name]: value
//     })
//   }
//   const success = { padding: "10px 15px", border: "1px solid green", color: "green" }
//   const fail = { padding: "10px 15px", border: "1px solid red", color: "red" }
//   const App = () => {
//     const [emailError, setEmailError] = useState('')
//     const validateEmail = (e) => {
//       var email = e.target.value

//       if (validator.isEmail(email)) {
//         setEmailError('Valid Email :)')
//       } else {
//         setEmailError('Enter valid Email!')
//       }
//     }
//   }
  /* const registerMe = (e) => {
     e.preventDefault();
     //api post to server
     axios.post('/api/registration', user)
       .then(res => {
       setMsg("Registered Successfully");
       //redirect to login page
       })
     .catch((e) => {
       setMsg("Something went wrong. Please try again later");
      })
  }*/
export default function Register() {
  const history = useHistory()
  const { signInWithGoogle, register } = useAuth()
  const [user, setUser] = useState({ firstname: "", lastname: "", phonenumber: "", email: "", password: "", repassword: "", address: "" })
  /*const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [contact, setContact] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')*/
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toast = useToast()
  const mounted = useRef(false)


     const changeMe = (e) => {
    const { name, value } = e.target;
   setUser({
           ...user, [name]: value
    })
     }
  return (
    // <Layout>
    <div>
 
      {/* <Card maxW='md' mx='auto' mt={4}> */}
      <chakra.form
        onSubmit={async e => {
          e.preventDefault();
          axios.post('http://localhost:4000/api/user',user)
          .then(res => {
          // setMsg("Registered Successfully");
          //redirect to login page
          })
      
          
          if (!user.email || !user.password) {
            toast({
              description: 'Credentials not valid.',
              status: 'error',
              duration: 9000,
              isClosable: true,
            })
            return
          }
          // your register logic here
          setIsSubmitting(true)
          register(user.email, user.password)
            .then(res => console.log(res))
            .catch(error => {
              console.log(error.message)
              toast({
                description: error.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
            })
            .finally(() => setIsSubmitting(false))
        }}
      >

        <Stack>
          <Heading textAlign='center'>
            Register
          </Heading>
        
          <FormControl id='firstname'>
            <FormLabel>First Name</FormLabel>
            <Input
              name='firstname'
              type='firstname'
              autoComplete='firstname'
              required
              value={user.firstname}
              onChange={changeMe}
            />
          </FormControl>

          <FormControl id='lastname'>
            <FormLabel>Last Name</FormLabel>
            <Input
              name='lastname'
              type='lastname'
              autoComplete='lastname'
              required
              value={user.lastname}
              onChange={changeMe}
            />
          </FormControl>

          <FormControl id='phonenumber'>
            <FormLabel>Contact</FormLabel>
            <Input
              name='phonenumber'
              type='phonenumber'
              autoComplete='phonenumber'
              required
              value={user.phonenumber}
              onChange={changeMe}
            />
          </FormControl>

          <FormControl id='address'>
            <FormLabel>Address</FormLabel>
            <Input
              name='address'
              type='address'
              autoComplete='address'
              required
              value={user.address}
              onChange={changeMe}
            />
          </FormControl>

          <FormControl id='email'>
            <FormLabel>Email address</FormLabel>
            <Input
              name='email'
              type='email'
              autoComplete='email'
              required
              value={user.email}
              onChange={changeMe}
            />
          </FormControl>

          <FormControl id='password'>
            <FormLabel>Password</FormLabel>
            <Input
              name='password'
              type='password'
              autoComplete='password'
              required
              value={user.password}
              onChange={changeMe}
            />
          </FormControl>

          <FormControl id='repassword'>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              name='repassword'
              type='password'
              autoComplete='repassword'
              required
              value={user.repassword}
              onChange={changeMe}
            />
          </FormControl>

          <Button
            type='submit'
            colorScheme='pink'
            size='lg'
            fontSize='md'
            isLoading={isSubmitting}
          >
            Sign up
          </Button>
        </Stack>
      <Center my={4}>
      <p>Already have an account? | </p>
       { <Button variant='link' onClick={() => history.push('/login')}>
          Login
      </Button>
 } </Center>
      {/* <DividerWithText my={6}>OR</DividerWithText> */}
      
      {/* <Button
        variant='outline'
        isFullWidth
        colorScheme='red'
        leftIcon={<FaGoogle />}
        onClick={() =>
          signInWithGoogle()
            .then(user => console.log(user))
            .catch(e => console.log(e.message))
        }
      >
        Sign in with Google
      </Button> */}
      {/* </Card> */}
      </chakra.form>
    </div>
    // </Layout>
  )

  // return (
  //     <form className="form1" onSubmit={registerMe}>
  //                 <h2>Register Form</h2><br/>
  //                 <div className="d-flex flex-column">
  //                 <div className="form-group">


  //                 <div className="form-group">
  //          <label htmlFor="firstname" className="form-label m-2 h5">First Name</label>
  //         <input type="firstname" name="firstname" placeholder="First Name" className="form-control" value={user.firstname} onChange={changeMe} required/></div>
  //         <div className="form-group">
  //          <label htmlFor="lastname" className="form-label m-2 h5">Last Name</label>
  //         <input type="lastname" name="lastname" placeholder="Last Name" className="form-control" value={user.lastname} onChange={changeMe} required/></div>
  //         <div className="form-group">
  //          <label htmlFor="contact" className="form-label m-2 h5">Contact Number</label>
  //         <input type="contact" name="phonenumber" placeholder="Contact Number" className="form-control" value={user.phonenumber} onChange={changeMe} required/></div>
  //          <div className="form-group">
  //          <label htmlFor="email" className="form-label m-2 h5">Email</label>
  //         <input type="email" name="email" placeholder="Email" className="form-control" value={user.email} onChange={changeMe} required/></div>
  //          <div className="form-group">
  //          <label htmlFor="password" className="form-label m-2 h5">Password</label>
  //         <input type="password" name="password" placeholder="Password" className="form-control" value={user.passwordd} onChange={changeMe} required/></div>
  //         <div className="form-group">
  //          <label htmlFor="repassword" className="form-label m-2 h5">ReEnter Password</label>
  //         <input type="password" name="repasswordd" placeholder="Re-enter Password" className="form-control" value={user.repassword} onChange={changeMe} required/></div>

  //         <label htmlFor="address" className="form-label m-2 h5">Address</label>
  //              <textarea type="text" name="address" placeholder="Address" className="form-control" value={user.address} onChange={changeMe} required/></div>
  //             <button className="btn btn-primary my-3 h4">Sign Up</button>
  //             <div className="h5 text-center" style={msg==='' ? {} : (msg.includes("Success") ? success :fail)}>{msg}</div>
  //             <hr/>
  //              <span>Already have an account?  |  <Link to="/login">Sign in</Link></span>              
  //              </div>

  //        </form>

  // )

}

//{ (e) => this.App.validateEmail(e) }
// export default React.memo(Register)
