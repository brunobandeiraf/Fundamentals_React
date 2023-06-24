import { Header } from './components/Header';
import { Post } from './Post'

import './styles.css'

export function App() {
  return (
    <div>
      <Header />

      <Post
        author = "Bruno Fernandes"
        content = "Bla la La bal ra real dae der"
      />
      <Post
        author = "Bruno Fernandes"
        content = "Bla la La bal ra real dae der"
      />
    </div>
  )
}