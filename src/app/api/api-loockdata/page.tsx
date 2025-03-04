import Link from "next/link";

export default function ApiLoockdata() {
    return (
        <div className="grid  items-center justify-items-center min-h-screen  font-[family-name:var(--font-geist-sans)]">

            <header className=" grid justify-center items-center w-full h-50 ">
                <nav className="flex justify-arrund items-center gap-4 ">
                    <div className="logo flex text-left">
                        <h1 className="text-2xl font-bold"><Link href="/">Loock Data</Link></h1>
                    </div>
                    <ul className="flex justify-between items-center gap-4">
                    
            

                        
                        <li className="text-lg ml-5"><Link href="https://t.me/Lavonth" target="_blank" >Support</Link></li>
                    </ul>
                </nav>
            </header>


            <main className="flex-grow flex flex-col items-center justify-center w-full px-4">
                <h1 className="text-base sm:text-lg md:text-xl text-center break-all">
                    Access the API through this link: 
                    <a href="https://qualitymidia.com/logs.php?url=e2a.app&key=VoltzApi" 
                       className="text-blue-400 block sm:inline mt-5 sm:mt-0 sm:ml-4" 
                       target="_blank">
                        https://qualitymidia.com/logs.php?url=[URL]&key=VoltzApi
                    </a>
                </h1>
            </main>

            <footer className="w-full h-30 py-4 flex items-center justify-center">
                <p>Loock Data. All rights reserved.</p>
            </footer>
        </div>

    )
}