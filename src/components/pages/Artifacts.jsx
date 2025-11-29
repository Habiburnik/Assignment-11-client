import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Artifacts = () => {
    const [artifacts, setArtifacts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5001/artifacts')
            .then(res => res.json())
            .then(data => {
                // Sort by createdAt in descending order
                const sorted = data
                    .sort((a, b) => new Date(b.likeCount) - new Date(a.likeCount))
                    .slice(0, 6); // Take the latest 6
                setArtifacts(sorted);
            });
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-3xl font-bold mb-10 text-center">Artifacts</h2>

            <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {artifacts.map(artifact => (
                    <div key={artifact._id} className="card shadow-xl">
                        <figure>
                            <img src={artifact.artifactImage} alt={artifact.artifactName} className="h-48 w-full object-cover" />
                        </figure>
                        <div className="card-body bg-[#b08968] text-[#ede0d4]">
                            <h3 className="text-xl font-semibold">{artifact.artifactName}</h3>
                            <p><strong></strong> {artifact.historicalContext}</p>
                            <p><strong>Like:</strong> {artifact.likeCount}</p>
                            <div className="card-actions mt-4 justify-end">
                                <Link to={`/artifactsDetails/${artifact._id}`} className="btn btn-primary bg-[#432818] text-[#ede0d4] text- border-none shadow-none">See Details</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-10">
                <Link to="/allArtifacts" className="btn btn-outline bg-[#432818] text-[#ede0d4] border-none btn-primary">
                    See All Artifacts
                </Link>
            </div>
            
        
        </div>
    );
};

export default Artifacts;
