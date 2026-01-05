import { useEffect, useState, useContext } from 'react';
import AuthContext from '../../provider/AuthContext';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import UseAxiosSecure from '../hooks/UseAxiosSecure';

const LikedArtifacts = () => {
    const { loading, setLoading, user } = useContext(AuthContext);
    const [liked, setLiked] = useState([]);
    const [error, setError] = useState(null);

    const axiosSecure = UseAxiosSecure();

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Liked Artifacts - Ancient Quest';

        if (!user?.email) return;
        setLoading(true);
        axiosSecure.get(`/liked-artifacts?userEmail=${(user.email)}`)
            .then(res => {
                setLiked(res.data);
                setError(null);
            })
            .catch(err => {
                setError('Failed to load liked artifacts', err);
                setLiked([]);
            })
            .finally(() => setLoading(false));
    }, [user?.email, axiosSecure, setLoading]);

    if (loading) {
        return <Loading></Loading>;
    }
    else if (!liked.length) {
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

    if (error) {
        return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
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