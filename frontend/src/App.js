import { Routes,Route } from "react-router-dom";

import Layout from "./components/Layout";
import About from './components/About';
import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";
import SinglePost from "./features/posts/SinglePost";
import EditPostForm from "./features/posts/EditPostForm";


function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout/>}>
        
          <Route index element={<PostsList/>}/>

          <Route path="about" element={<About/>}/>

          <Route path="post">
            <Route index element={<AddPostForm/>}/>
            <Route path="edit/:postId" element={<EditPostForm/>}/>
            <Route path=":postId" element={<SinglePost/>}/>
          </Route>


        </Route>
      </Routes>
  );
}

export default App;
