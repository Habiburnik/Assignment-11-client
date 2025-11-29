import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../provider/AuthContext';
import Swal from 'sweetalert2';

const AddArtifacts = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const form = new FormData(e.target);
        const artifactName = form.get("artifactName");
        const artifactImage = form.get("artifactImage");
        const artifactType = form.get("artifactType");
        const historicalContext = form.get("historicalContext");
        const createdAt = form.get("createdAt");
        const discoveredAt = form.get("discoveredAt");
        const discoveredBy = form.get("discoveredBy");
        const presentLocation = form.get("presentLocation");

        try {
            new URL(artifactImage);
        } catch {
            setError("Please enter a valid URL for artifact image");
            setLoading(false);
            return;
        }

        const artifactData = {
            artifactName,
            artifactImage,
            artifactType,
            historicalContext,
            createdAt,
            discoveredAt,
            discoveredBy,
            presentLocation,
            addedBy: user?.displayName || "Unknown",
            addedByEmail: user?.email,
            likeCount: 0
        };

        try {
            const response = await fetch('http://localhost:5001/addArtifact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(artifactData)
            });

            if (!response.ok) {
                throw new Error('Failed to add artifact');
            }

            Swal.fire({
                title: 'Success!',
                text: 'Artifact added successfully',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate('/');
            });

            e.target.reset();
        } catch (err) {
            setError(err.message || "Failed to add artifact");
            Swal.fire({
                title: 'Error!',
                text: err.message || 'Failed to add artifact',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-25 flex items-center justify-center bg-gradient-to-br from-[#d4a574] to-[#9c6644] p-4">
            <div className="card bg-[#e6ccb2] text-[#7f5539] font-bold w-full max-w-2xl shrink-0 shadow-2xl">
                <div className="card-body">
                    <h2 className="card-title text-center text-2xl mb-6 text-[#432818]">Add New Artifact</h2>
                    <form onSubmit={handleSubmit} className="fieldset space-y-4">
                        {error && <p className="text-red-500 text-sm font-semibold bg-red-100 p-2 rounded">{error}</p>}
                        <div>
                            <label className="label">Artifact Name</label>
                            <input 
                                type="text" 
                                name='artifactName' 
                                className="input w-full text-[#ede0d4] font-bold bg-[#9c6644] focus:outline-none focus:ring-2 focus:ring-[#432818]" 
                                placeholder="e.g., Rosetta Stone" 
                                required 
                            />
                        </div>
                        <div>
                            <label className="label">Artifact Image (URL)</label>
                            <input 
                                type="text" 
                                name='artifactImage' 
                                className="input w-full text-[#ede0d4] font-bold bg-[#9c6644] focus:outline-none focus:ring-2 focus:ring-[#432818]" 
                                placeholder="https://example.com/image.jpg" 
                                required 
                            />
                        </div>
                        <div>
                            <label className="label">Artifact Type</label>
                            <select 
                                name='artifactType' 
                                className="select w-full text-[#ede0d4] font-bold bg-[#9c6644] focus:outline-none focus:ring-2 focus:ring-[#432818]" 
                                required
                            >
                                <option value="">Select Type</option>
                                <option value="Tools">Tools</option>
                                <option value="Weapons">Weapons</option>
                                <option value="Documents">Documents</option>
                                <option value="Writings">Writings</option>
                                <option value="Pottery">Pottery</option>
                                <option value="Jewelry">Jewelry</option>
                                <option value="Sculpture">Sculpture</option>
                                <option value="Religious">Religious</option>
                            </select>
                        </div>
                        <div>
                            <label className="label">Historical Context</label>
                            <textarea 
                                name='historicalContext' 
                                className="textarea w-full text-[#ede0d4] font-bold bg-[#9c6644] focus:outline-none focus:ring-2 focus:ring-[#432818]" 
                                placeholder="Describe the historical significance" 
                                rows="3"
                                required 
                            ></textarea>
                        </div>
                        <div>
                            <label className="label">Created At</label>
                            <input 
                                type="text" 
                                name='createdAt' 
                                className="input w-full text-[#ede0d4] font-bold bg-[#9c6644] focus:outline-none focus:ring-2 focus:ring-[#432818]" 
                                placeholder="e.g., 100 BC" 
                                required 
                            />
                        </div>
                        <div>
                            <label className="label">Discovered At</label>
                            <input 
                                type="text" 
                                name='discoveredAt' 
                                className="input w-full text-[#ede0d4] font-bold bg-[#9c6644] focus:outline-none focus:ring-2 focus:ring-[#432818]" 
                                placeholder="e.g., 1799" 
                                required 
                            />
                        </div>
                        <div>
                            <label className="label">Discovered By</label>
                            <input 
                                type="text" 
                                name='discoveredBy' 
                                className="input w-full text-[#ede0d4] font-bold bg-[#9c6644] focus:outline-none focus:ring-2 focus:ring-[#432818]" 
                                placeholder="Discoverer's name" 
                                required 
                            />
                        </div>
                        <div>
                            <label className="label">Present Location</label>
                            <input 
                                type="text" 
                                name='presentLocation' 
                                className="input w-full text-[#ede0d4] font-bold bg-[#9c6644] focus:outline-none focus:ring-2 focus:ring-[#432818]" 
                                placeholder="e.g., British Museum, London" 
                                required 
                            />
                        </div>
                        <div>
                            <label className="label">Added By Name</label>
                            <input 
                                type="text" 
                                value={user?.displayName || "Not Set"} 
                                className="input w-full text-[#ede0d4] font-bold bg-[#7f5539] cursor-not-allowed" 
                                readOnly 
                            />
                        </div>
                        <div>
                            <label className="label">Added By Email</label>
                            <input 
                                type="email" 
                                value={user?.email || "Not Set"} 
                                className="input w-full text-[#ede0d4] font-bold bg-[#7f5539] cursor-not-allowed" 
                                readOnly 
                            />
                        </div>

                        <button 
                            type="submit"
                            disabled={loading}
                            className="btn btn-neutral bg-[#432818] text-[#ede0d4] border-none mt-6 w-full hover:bg-[#5a3a24] disabled:opacity-50"
                        >
                            {loading ? 'Adding...' : 'Add Artifact'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddArtifacts;