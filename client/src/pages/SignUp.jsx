import React from "react";
import { Link } from "react-router-dom";
import { Label, TextInput,Button } from "flowbite-react";

const SignUp = () => {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5" >
        <div className="flex-1">
        <Link to='/' className=' font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-[#265073] via-[#2D9596] to-[#9AD0C2] rounded-lg text-white '>Tech</span>
            Blog
        </Link>
        <p className="text-sm mt-5">A Blog for technical information!</p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div>
              <Label value='Your username'/>
              <TextInput type="text" placeholder="Username" id="username"/>
            </div>
            <div>
              <Label value='Your email'/>
              <TextInput type="text" placeholder="Email" id="email"/>
            </div>
            <div>
              <Label value='Your password'/>
              <TextInput type="text" placeholder="Password" id="password"/>
            </div>
            <Button className="px-2 py-1 bg-gradient-to-r from-[#265073] via-[#2D9596] to-[#9AD0C2] rounded-lg text-white " type="submit">Sign-Up</Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Already have an account ? </span>
            <Link to='/sign-in' className="text-blue-500">Sign-In here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
