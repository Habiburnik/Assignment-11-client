import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';

const AllArtifacts = () => {
    const [artifacts, setArtifacts] = useState([]);
    const [filteredArtifacts, setFilteredArtifacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        document.title = 'All Artifacts - Ancient Quest';
    }, []);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const res = await fetch('http://localhost:5001/allArtifacts');
                if (!res.ok) throw new Error('Failed to fetch artifacts');
                const data = await res.json();
                setArtifacts(data);
                setFilteredArtifacts(data);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAll();

    }, []);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        
        if (query === '') {
            setFilteredArtifacts(artifacts);
        } else {
            const filtered = artifacts.filter(artifact =>
                artifact.artifactName.toLowerCase().includes(query)
            );
            setFilteredArtifacts(filtered);
        }
    };

    if (loading) return (
        <Loading></Loading>
    );

    if (error) return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-red-500">{error}</p>
        </div>
    );

    if (!artifacts || artifacts.length === 0) return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-[#432818] font-bold">No artifacts found.</p>
        </div>
    );

    return (
        <div className="pt-25 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-8 text-center text-[#432818]">All Artifacts</h2>

            {/* Search Bar */}
            <div className="mb-8">
                <input
                    type="text"
                    placeholder="Search artifacts by name..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="input w-full bg-[#e6ccb2] text-[#7f5539] font-bold placeholder-[#9c6644] border-2 border-[#9c6644] focus:outline-none focus:border-[#432818]"
                />
                <p className="text-sm text-[#7f5539] mt-2">Found {filteredArtifacts.length} artifact(s)</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArtifacts.map(artifact => (
                    <div key={artifact._id} className="card shadow-xl overflow-hidden">
                        <figure className="h-56 overflow-hidden">
                            <img src={artifact.artifactImage} alt={artifact.artifactName} className="w-full h-full object-cover" />
                        </figure>
                        <div className="card-body bg-[#b08968] text-[#ede0d4]">
                            <h3 className="text-xl font-semibold">{artifact.artifactName}</h3>
                            <p className="text-sm mt-2 text-[#f7efe6]">
                                {artifact.historicalContext?.length > 120 ? artifact.historicalContext.slice(0, 120) + '...' : artifact.historicalContext}
                            </p>
                            <div className="flex items-center justify-between mt-4">
                                <div className="text-sm">
                                    <span className="font-bold">Likes:</span> <span>{artifact.likeCount || artifact.likes || 0}</span>
                                </div>

                                <Link to={`/artifactsDetails/${artifact._id}`} className="btn btn-sm bg-[#432818] text-[#ede0d4] border-none">
                                    View Detail
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllArtifacts;