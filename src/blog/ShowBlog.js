import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';

const URI = 'http://localhost:8000/blogs';

const CompShowBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [blogsPerPage] = useState(4);

    useEffect(() => {
        getBlogs();
    }, []);

    const getBlogs = async () => {
        try {
            const res = await axios.get(URI);
            if (Array.isArray(res.data)) {
                setBlogs(res.data);
            } else {
                console.error("Data returned is not an array:", res.data);
            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    const deleteBlog = async (id) => {
        try {
            await axios.delete(`${URI}/${id}`);
            getBlogs(); // Recargar la lista después de eliminar
        } catch (error) {
            console.error("Error deleting blog:", error);
        }
    };

    // Obtener los blogs actuales en la página
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

    // Cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='container'>
            <div className="row">
                <div className="col">
                    <Link to="/create" className="btn btn-primary mt-2 mb-2"><i className="fa-solid fa-plus"></i></Link>
                    <table className="table">
                        <thead className='table-primary'>
                            <tr>
                                <th>Title</th>
                                <th>Content</th>
                                <th>Url_image</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentBlogs.map((blog) => (
                                <tr key={blog.id}>
                                    <td>{blog.title}</td>
                                    <td>{blog.content}</td>
                                    <td>
                                        <img src={blog.Url_image} alt={blog.title} style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                                    </td>
                                    <td>
                                        <Link to={`/edit/${blog.id}`} className="btn btn-info"><i className="fa-regular fa-pen-to-square"></i></Link>
                                        <button onClick={() => deleteBlog(blog.id)} className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Pagination>
                        {Array.from({ length: Math.ceil(blogs.length / blogsPerPage) }, (_, index) => (
                            <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                                {index + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </div>
            </div>
        </div>
    );
};

export default CompShowBlogs;

