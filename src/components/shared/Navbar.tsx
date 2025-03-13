import Link from "next/link";


const Navbar = () => {
    return (
        <div>
            <nav className="w-11/12 mx-auto flex justify-between items-center">
                <div>
                    <h1>Carving</h1>
                </div>
                <div className="flex justify-center items-center gap-5">
                    <Link href="/">Home</Link>
                    <Link href="/about">About</Link>
                    <Link href="/blog">Blog</Link>
                    <Link href="/contact">Restaurants</Link>
                    <Link href="/contact">Contact Us</Link>
                </div>
                <div className="flex justify-center items-center gap-5">
                    <button>Login</button>
                    <button>Logout</button>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;