import { useEffect, useState, useContext } from 'react';
import AuthContext from '../../provider/AuthContext';
import Swal from 'sweetalert2';

const artifactTypes = ["Tools", "Weapons", "Documents", "Writings", "Pottery", "Jewelry", "Sculpture", "Religious"];

const MyArtifacts = () => {
	const { user } = useContext(AuthContext);
	const [artifacts, setArtifacts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [editId, setEditId] = useState(null);
	const [editData, setEditData] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);

	useEffect(() => {
		if (!user?.email) return;
		setLoading(true);
		fetch(`http://localhost:5001/my-artifacts?userEmail=${(user.email)}`)
			.then(res => res.json())
			.then(data => {
				setArtifacts(data);
				setError(null);
			})
			.catch(() => {
				setError('Failed to load your artifacts');
				setArtifacts([]);
			})
			.finally(() => setLoading(false));
	}, [user?.email]);

	const openEditModal = (artifact) => {
		setEditId(artifact._id);
		setEditData({ ...artifact });
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
		setEditId(null);
		setEditData(null);
	};

	const handleEditChange = (e) => {
		const { name, value } = e.target;
		setEditData(prev => ({ ...prev, [name]: value }));
	};

	const handleUpdate = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch(`http://localhost:5001/artifact/${editId}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					artifactName: editData.artifactName,
					artifactImage: editData.artifactImage,
					artifactType: editData.artifactType,
					historicalContext: editData.historicalContext,
					createdAt: editData.createdAt,
					discoveredAt: editData.discoveredAt,
					discoveredBy: editData.discoveredBy,
					presentLocation: editData.presentLocation
				})
			});
			if (!res.ok) throw new Error('Update failed');
			Swal.fire({ icon: 'success', title: 'Updated!', text: 'Artifact updated successfully.' });
			// update local state
			setArtifacts(arts => arts.map(a => a._id === editId ? { ...a, ...editData } : a));
			closeModal();
		} catch {
			Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to update artifact.' });
		}
	};

	const handleDelete = (id) => {
		Swal.fire({
			title: 'Are you sure?',
			text: 'This will permanently delete the artifact.',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it!'
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					const res = await fetch(`http://localhost:5001/artifact/${id}`, { method: 'DELETE' }

					);
					if (!res.ok) throw new Error('Delete failed');
					setArtifacts(arts => arts.filter(a => a._id !== id));
					Swal.fire({ icon: 'success', title: 'Deleted!', text: 'Artifact deleted.' });
				} catch {
					Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to delete artifact.' });
				}
			}
		});
	};

	if (!user?.email) {
		return <div className="min-h-screen flex items-center justify-center text-xl font-bold">Please login to view your artifacts.</div>;
	}

	if (loading) {
		return <div className="min-h-screen flex items-center justify-center text-lg">Loading...</div>;
	}

	if (error) {
		return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
	}

	if (!artifacts.length) {
		return <div className="min-h-screen flex items-center justify-center text-[#432818] font-bold text-2xl">You haven't added any artifacts yet!</div>;
	}

	return (
		<div className=" pt-25 max-w-2xl mx-auto py-12 px-4">
			<h2 className="text-3xl font-bold mb-8 text-center text-[#432818]">My Artifacts</h2>
			<div className="flex flex-col gap-6">
				{artifacts.map(item => (
					<div key={item._id} className="card flex flex-row items-center shadow-xl bg-[#e6ccb2] p-4 gap-6">
						<img src={item.artifactImage} alt={item.artifactName} className="w-32 h-32 object-cover rounded-lg border-2 border-[#9c6644]" />
						<div className="flex-1">
							<h3 className="text-xl font-semibold text-[#432818]">{item.artifactName}</h3>
							<div className="flex gap-2 mt-2">
								<button className="btn btn-sm bg-[#9c6644] text-[#ede0d4]" onClick={() => openEditModal(item)}>Update</button>
								<button className="btn btn-sm bg-[#9b3d12] text-white" onClick={() => handleDelete(item._id)}>Delete</button>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Modal for update */}
			{modalOpen && (
				<div className="fixed inset-0 bg-[#ddb892] bg-opacity-40 flex items-center justify-center z-50">
					<form onSubmit={handleUpdate} className="bg-[#e6ccb2] rounded-lg p-8 w-full max-w-lg shadow-2xl space-y-4">
						<h3 className="text-2xl font-bold mb-4 text-[#432818]">Update Artifact</h3>
						<input type="text" name="artifactName" value={editData.artifactName} onChange={handleEditChange} className="input w-full text-[#ede0d4] bg-[#9c6644]" placeholder="Artifact Name" required />
						<input type="text" name="artifactImage" value={editData.artifactImage} onChange={handleEditChange} className="input w-full text-[#ede0d4] bg-[#9c6644]" placeholder="Artifact Image URL" required />
						<select name="artifactType" value={editData.artifactType} onChange={handleEditChange} className="select w-full text-[#ede0d4] bg-[#9c6644]" required>
							<option value="">Select Type</option>
							{artifactTypes.map(type => <option key={type} value={type}>{type}</option>)}
						</select>
						<textarea name="historicalContext" value={editData.historicalContext} onChange={handleEditChange} className="textarea w-full text-[#ede0d4] bg-[#9c6644]" placeholder="Historical Context" required />
						<input type="text" name="createdAt" value={editData.createdAt} onChange={handleEditChange} className="input w-full text-[#ede0d4] bg-[#9c6644]" placeholder="Created At (e.g., 100 BC)" required />
						<input type="text" name="discoveredAt" value={editData.discoveredAt} onChange={handleEditChange} className="input w-full text-[#ede0d4] bg-[#9c6644]" placeholder="Discovered At (e.g., 1799)" required />
						<input type="text" name="discoveredBy" value={editData.discoveredBy} onChange={handleEditChange} className="input w-full text-[#ede0d4] bg-[#9c6644]" placeholder="Discovered By" required />
						<input type="text" name="presentLocation" value={editData.presentLocation} onChange={handleEditChange} className="input w-full text-[#ede0d4] bg-[#9c6644]" placeholder="Present Location" required />
						<div className="flex gap-4 mt-4">
							<button type="submit" className="btn bg-[#7f5539] border-none text-[#ede0d4]">Update Artifact</button>
							<button type="button" className="btn text-[#ede0d4] border-none bg-[#9b3d12]" onClick={closeModal}>Cancel</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};

export default MyArtifacts;
