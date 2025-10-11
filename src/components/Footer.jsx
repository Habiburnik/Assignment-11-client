import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#7f5539] text-[#e6ccb2] pt-8 pb-2">
            <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
                <div>
                    <h2 className="text-2xl font-bold text-[#ddb892]">AncientQuest</h2>
                    <p className="mt-2 text-sm text-[#e6ccb2]">
                        Explore, discover, and preserve the wonders of history.
                        A journey through time — one artifact at a time.
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-[#ddb892] mb-2">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><a href="/about" className="hover:text-[#ede0d4]">About</a></li>
                        <li><a href="/artifacts" className="hover:text-[#ede0d4]">Artifacts</a></li>
                        <li><a href="/contribute" className="hover:text-[#ede0d4]">Contribute</a></li>
                        <li><a href="/contact" className="hover:text-[#ede0d4]">Contact</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-[#ddb892] mb-2">Connect</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-[#ede0d4]">Facebook</a></li>
                        <li><a href="#" className="hover:text-[#ede0d4]">Instagram</a></li>
                        <li><a href="#" className="hover:text-[#ede0d4]">Twitter</a></li>
                        <li><a href="mailto:info@ancientquest.com" className="hover:text-[#ede0d4]">info@ancientquest.com</a></li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-[#e6ccb2] mt-8 pt-2 text-center text-sm text-[#e6ccb2]">
                © 2025 AncientQuest. All rights reserved.
            </div>
        </footer>

    );
};

export default Footer;
