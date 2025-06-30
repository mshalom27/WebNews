import React from 'react'
import { Link } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";
import { Button } from '../ui/button';


const Header = () => {
  return (
    <header class="shadow-lg sticky">
      <div class="flex p-4 border-b-2 justify-between items-center max-w-6xl lg:max-w-7xl mx-auto " >
            <Link to = {"/"} class="self-center whitespace-nowrap text-sm sm:text-lg font-semibold" >
            <h1 class="font-bold text-xl sm:text-2xl flex flex-wrap">
              <span class="text-slate-500" >Morning</span>
              <span class="text-slate-900">Dispatch</span>
            </h1>
            </Link>

            <form action="" class=" p-3 bg-slate-100 flex items-center ">
              <input type="text" placeholder="Search" class=" bg-transparent focus:outline-none w-24 sm:w-64" />
              <button>
                <FaSearch class=" text-slate-500"/>
              </button>
            </form>

            <ul>
              <Link to={"/"}>
              <li class="hidden lg:inline text-slate-700 hover:underline">Home</li>
              </Link>

              <Link to={"/about"}>
              <li class="hidden lg:inline text-slate-700 hover:underline">About</li>
              </Link>

              <Link to={"/NewsArticles"}>
              <li class="hidden lg:inline text-slate-700 hover:underline">News Articles</li>
              </Link>
            </ul>

            <Link to={"/sign-in"}>
            <Button>Sign In</Button>            
            </Link>
      </div>
    </header>
  )
}

export default Header