import styles from './Post.module.css';

export function Post() {
  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <img className={styles.avatar} src="https://github.com/brunobandeiraf.png" />
          <div className={styles.authorInfo}>
            <strong>Bruno Fernandes</strong>
            <span>Education</span>
          </div>
        </div>

        <time title="24 de Junho às 11:35h" dateTime="2023-06-23 11:35:00">Publicado há 1h</time>
      </header>

      <div className={styles.content}>
        <p>Fala galeraa 👋</p>
        <p>Conteúdo do Post que foi escrito sem sentido algum, apenas para ter alguma coisa aqui. 🚀</p>
        <p><a href="">jane.design/doctorcare</a></p>
        <p>
          <a href="">#novoprojeto</a>{' '}
          <a href="">#react</a>{' '}
          <a href="">#fogueteNaoTemRe</a>
        </p>
      </div>

      <form className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          placeholder="Deixe um comentário"
        />

        <footer>
          <button type="submit">Publicar</button>
        </footer>
      </form>
    </article>
  )
}