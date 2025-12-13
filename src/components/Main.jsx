import { useEffect } from 'react';
import 'aos/dist/aos.css';
import Artifacts from './pages/Artifacts';

const Main = () => {
    useEffect(() => {
        document.title = 'Home - Ancient Quest';
    }, []);
    const facts = [
        "The oldest known artifact is a 2.6-million-year-old stone tool.",
        "The Rosetta Stone helped decode ancient Egyptian hieroglyphs.",
        "Ancient Greeks invented one of the earliest vending machines.",
        "The Indus Valley civilization had advanced drainage systems.",
    ];

    return (
        <>
            <div className='pt-[40px]'>

                <div className="carousel max-h-[500px] w-ful">
                    <div id="slide1" className="carousel-item relative  w-full">
                        <img
                            src="https://i.ibb.co.com/RTn6sRnF/Slider1.jpg"
                            className="w-full" />
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide3" className="btn btn-circle">❮</a>
                            <a href="#slide2" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                    <div id="slide2" className="carousel-item relative w-full">
                        <img
                            src="https://i.ibb.co.com/WNmL5Cz7/slider3.jpg"
                            className="w-full" />
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide1" className="btn btn-circle">❮</a>
                            <a href="#slide3" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                    <div id="slide3" className="carousel-item relative w-full">
                        <img
                            src="https://i.ibb.co.com/Q7TyPWdL/slider4.jpg"
                            className="w-full" />
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide2" className="btn btn-circle">❮</a>
                            <a href="#slide1" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                </div>
                <section>
                    <Artifacts></Artifacts>
                </section>

                <section className="max-w-5xl mx-auto px-4 pt-5 pb-10">
                    <h2 className="text-3xl font-bold mb-6 text-center">
                        Featured Artifact of the Week
                    </h2>

                    <div className="bg-[#b08968] text-[#ede0d4] rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
                        <img
                            src="https://i.ibb.co.com/Fk8dWRjx/rosetta-Stone.jpg"
                            alt="Featured Artifact"
                            className="w-full md:w-1/2 object-cover"
                        />

                        <div className="p-6 text-[#ede0d4] md:w-1/2 flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl font-semibold mb-3">
                                    The Rosetta Stone
                                </h3>
                                <p className="">
                                    A granodiorite stele inscribed with a decree issued in Egypt in 196 BC,
                                    key to deciphering ancient hieroglyphs.
                                </p>
                            </div>

                            <button className="mt-6 bg-[#432818] text-[#ede0d4] px-5 py-2 rounded-lg cursor-pointer">
                                Learn More
                            </button>
                        </div>
                    </div>
                </section>
                <section className="py-12">
                    <h2 className="text-3xl font-bold text-center mb-8">Did You Know?</h2>

                    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
                        {facts.map((fact, index) => (
                            <div
                                key={index}
                                className="bg-[#b08968] text-[#ede0d4] shadow-md rounded-xl p-6 text-center hover:shadow-xl transition"
                            >
                                <p className="">{fact}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div >
        </>
    );
};

export default Main;