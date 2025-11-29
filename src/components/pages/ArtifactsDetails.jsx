import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import AuthContext from '../../provider/AuthContext';
import Swal from 'sweetalert2';

const ArtifactsDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [artifact, setArtifact] = useState(null);
    const [loading, setLoading] = useState(true);
    const [liking, setLiking] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchArtifact = async () => {
            try {
                const response = await fetch(`http://localhost:5001/artifact/${id}`);
                if (!response.ok) throw new Error('Artifact not found');
                const data = await response.json();
                setArtifact(data);
            } catch (error) {
                console.error('Error fetching artifact:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'Failed to load artifact details',
                    icon: 'error'
                });
            } finally {
                setLoading(false);
            }
        };

        fetchArtifact();
    }, [id]);

    const handleLike = async () => {
        if (!user) {
            Swal.fire({
                title: 'Please Login',
                text: 'You need to login to like artifacts',
                icon: 'warning'
            }).then(() => navigate('/auth/login'));
            return;
        }

        setLiking(true);
        try {
            const response = await fetch(`http://localhost:5001/artifact/${id}/like`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) throw new Error('Failed to update like');

            const updatedData = await response.json();
            setArtifact(prevArtifact => ({
                ...prevArtifact,
                ...updatedData,
                likeCount: updatedData.likeCount || (prevArtifact.likeCount + 1)
            }));

            Swal.fire({
                title: 'Success!',
                text: 'Artifact liked successfully!',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            });
        } catch (error) {
            console.error('Error updating like:', error);
            Swal.fire({
                title: 'Error',
                text: 'Failed to like artifact',
                icon: 'error'
            });
        } finally {
            setLiking(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="spinner"></div>
                <p className="ml-4 text-lg font-semibold">Loading artifact details...</p>
            </div>
        );
    }

    if (!artifact) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-red-500 mb-4">Artifact Not Found</h1>
                    <p className="text-gray-600 mb-6">The artifact you're looking for doesn't exist.</p>
                    <button onClick={() => navigate('/allArtifacts')} className="btn bg-[#432818] text-[#ede0d4] border-none">
                        Back to All Artifacts
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-25 bg-gradient-to-br from-[#d4a574] to-[#c19a6b] py-12 px-4">
            <div className="max-w-5xl mx-auto">
                <button 
                    onClick={() => navigate(-1)}
                    className="mb-6 btn btn-sm bg-[#432818] text-[#ede0d4] border-none hover:bg-[#5a3a24]"
                >
                    ← Back
                </button>

                <div className="card bg-[#e6ccb2] shadow-2xl overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-8 p-8">
                        <div className="flex flex-col justify-center">
                            <div className="rounded-lg overflow-hidden shadow-lg mb-6 h-96">
                                <img 
                                    src={artifact.artifactImage} 
                                    alt={artifact.artifactName}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <button
                                onClick={handleLike}
                                disabled={liking}
                                className="btn w-full font-bold text-lg py-3 transition-all duration-300 bg-[#9c6644] text-[#ede0d4] hover:bg-[#432818] hover:text-[#ede0d4]"
                            >
                                <Heart size={24} fill="none" />
                                Like ({artifact.likeCount || 0})
                            </button>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-4xl font-bold text-[#432818] mb-2">
                                    {artifact.artifactName}
                                </h1>
                                <div className="h-1 w-24 bg-[#9c6644] rounded"></div>
                            </div>
                            <div>
                                <span className="inline-block bg-[#9c6644] text-[#ede0d4] px-4 py-2 rounded-full font-bold text-sm">
                                    Type: {artifact.artifactType}
                                </span>
                            </div>
                            <div className="bg-[#f5e6d3] p-4 rounded-lg border-l-4 border-[#9c6644]">
                                <h3 className="font-bold text-[#432818] mb-2 text-lg">Historical Context</h3>
                                <p className="text-[#7f5539] leading-relaxed">
                                    {artifact.historicalContext}
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-[#f5e6d3] p-4 rounded-lg">
                                    <p className="text-sm font-bold text-[#7f5539] mb-1">Created At</p>
                                    <p className="text-lg font-bold text-[#432818]">{artifact.createdAt}</p>
                                </div>
                                <div className="bg-[#f5e6d3] p-4 rounded-lg">
                                    <p className="text-sm font-bold text-[#7f5539] mb-1">Discovered At</p>
                                    <p className="text-lg font-bold text-[#432818]">{artifact.discoveredAt}</p>
                                </div>
                            </div>
                            <div className="bg-[#f5e6d3] p-4 rounded-lg">
                                <p className="text-sm font-bold text-[#7f5539] mb-1">Discovered By</p>
                                <p className="text-lg font-bold text-[#432818]">{artifact.discoveredBy}</p>
                            </div>
                            <div className="bg-[#f5e6d3] p-4 rounded-lg">
                                <p className="text-sm font-bold text-[#7f5539] mb-1">Present Location</p>
                                <p className="text-lg font-bold text-[#432818]">{artifact.presentLocation}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#9c6644] text-[#ede0d4] px-8 py-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm opacity-75">Added By</p>
                                <p className="text-lg font-bold">{artifact.addedBy}</p>
                            </div>
                            <div>
                                <p className="text-sm opacity-75">Email</p>
                                <p className="text-lg font-bold">{artifact.addedByEmail}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between mt-8 gap-4">
                    <button 
                        onClick={() => navigate('/allArtifacts')}
                        className="btn bg-[#7f5539] text-[#ede0d4] border-none hover:bg-[#5a3a24] flex-1"
                    >
                        View All Artifacts
                    </button>
                    <button 
                        onClick={() => navigate('/')}
                        className="btn bg-[#7f5539] text-[#ede0d4] border-none hover:bg-[#5a3a24] flex-1"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ArtifactsDetails;