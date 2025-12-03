import { useEffect, useState, useContext } from 'react';
import AuthContext from '../../provider/AuthContext';
import { Link, Navigate } from 'react-router-dom';

const LikedArtifacts = () => {
    const { user } = useContext(AuthContext);
    const [liked, setLiked] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        
        if (!user?.email) return;
        setLoading(true);
        fetch(`http://localhost:5001/liked-artifacts?userEmail=${(user.email)}`)
            .then(res => res.json())
            .then(data => {
                setLiked(data);
                setError(null);
            })
            .catch(err => {
                setError('Failed to load liked artifacts', err);
                setLiked([]);
            })
            .finally(() => setLoading(false));
    }, [user?.email]);

    if (!user?.email) {
        return <div className="min-h-screen flex items-center justify-center text-xl font-bold">Please login to view your liked artifacts.</div>;
    }

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-lg">Loading...</div>;
    }

    if (error) {
        return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
    }

    if (!liked.length) {
        return <> 
        <div className="min-h-screen flex flex-col gap-8 items-center justify-center text-[#432818] font-bold text-2xl">
           <p> You haven't liked any artifacts yet!</p>
           <Link to='/allArtifacts'>
            <button className="btn bg-[#432818] text-[#ede0d4] border-none">
                Go to All Artifacts
            </button>
            </Link>
        </div>
        
        </>;
    }

    return (
        <div className="max-w-2xl mx-auto py-12 px-4 pt-25">
            <h2 className="text-3xl font-bold mb-8 text-center text-[#432818]">Liked Artifacts</h2>
            <div className="flex flex-col gap-6">
                {liked.map(item => (
                    <div key={item.artifactId} className="card flex flex-row items-center shadow-xl bg-[#e6ccb2] p-4 gap-6">
                        <img src={item.artifactImage} alt={item.artifactName} className="w-32 h-32 object-cover rounded-lg border-2 border-[#9c6644]" />
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold text-[#432818]">{item.artifactName}</h3>
                            <p className="text-sm text-[#7f5539] mt-2">Liked on: {new Date(item.likedAt).toLocaleString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LikedArtifacts;