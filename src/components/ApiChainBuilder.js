// src/components/ApiChainBuilder.js
import React, { useState } from 'react';
import axios from 'axios';

const ApiChainBuilder = () => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [postData, setPostData] = useState({ title: '', body: '' });
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchUsers = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            setUsers(response.data);
        } catch (err) {
            setError('Error fetching users');
        } finally {
            setLoading(false);
        }
    };

    const createPost = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
                title: postData.title,
                body: postData.body,
                userId: selectedUserId,
            });
            fetchComments(response.data.id);
        } catch (err) {
            setError('Error creating post');
        } finally {
            setLoading(false);
        }
    };

    const fetchComments = async (postId) => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
            setComments(response.data);
        } catch (err) {
            setError('Error fetching comments');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
            <button onClick={fetchUsers} className="bg-blue-600 text-white p-2 rounded-md w-full mb-4 hover:bg-blue-500 transition">Fetch Users</button>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {users.length > 0 && (
                <div className="mb-4">
                    <h2 className="text-xl mb-2">Select a User:</h2>
                    <select
                        onChange={(e) => setSelectedUserId(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 w-full"
                    >
                        <option value="">Select User</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                    </select>
                </div>
            )}

            <h2 className="text-xl mb-2">Create a Post:</h2>
            <input
                type="text"
                placeholder="Post Title"
                value={postData.title}
                onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            />
            <textarea
                placeholder="Post Body"
                value={postData.body}
                onChange={(e) => setPostData({ ...postData, body: e.target.value })}
                className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                rows="4"
            />
            <button onClick={createPost} className="bg-green-600 text-white p-2 rounded-md w-full hover:bg-green-500 transition">Create Post</button>

            {comments.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-xl mb-2">Comments:</h3>
                    {comments.map(comment => (
                        <div key={comment.id} className="border border-gray-200 rounded-md p-2 mb-2">
                            <p><strong>{comment.name}</strong>: {comment.body}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ApiChainBuilder;
