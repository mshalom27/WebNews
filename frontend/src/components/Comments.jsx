import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../hooks/AuthContext";

export default function Comments({ articleId }) {
  const { token, user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/comments/${articleId}`)
      .then(res => setComments(res.data))
      .catch(console.error);
  }, [articleId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    try {
      await axios.post(`http://localhost:5000/api/comments/${articleId}`, { content }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContent("");
      // Refresh comments
      const res = await axios.get(`http://localhost:5000/api/comments/${articleId}`);
      setComments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Comments</h3>
      {user && (
        <form onSubmit={handleSubmit} className="mb-4">
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={3}
            className="w-full border rounded p-2"
            placeholder="Write a comment..."
            required
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      )}
      <div>
        {comments.length === 0 && <p>No comments yet.</p>}
        {comments.map(c => (
          <div key={c._id} className="border-b py-2">
            <p><strong>{c.userId.name}</strong> says:</p>
            <p>{c.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
