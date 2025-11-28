import { Link } from "react-router";

const Hero = ({name = '[NAME]', text = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A impedit velit quam saepe consequatur. Reprehenderit earum consequatur qui expedita quam vitae. Aut, a minima. Reprehenderit nobis rem consequuntur praesentium labore?'}) => {
    return (
        <header className="text-center py-20 px-4 bg-gray-900 text-white transition-colors duration-300">
            <h2 className="text-4xl font-bold mb-4">Olá, eu sou a {name} 👋</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">
                {text}
            </p>
            <div className="flex justify-center gap-4">
                <Link to='/projects' className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">Ver Projetos</Link>
                <Link to='/contact' className="border border-blue-500 text-blue-400 px-6 py-2 rounded hover:bg-">Contato</Link>
            </div>
        </header>
    );
}

export default Hero;