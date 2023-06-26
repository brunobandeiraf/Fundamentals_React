import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useState } from 'react';

import styles from './Post.module.css';
import { Comment } from './Comment';
import { Avatar } from './Avatar';

export function Post({ author, publishedAt, content }) {
  {/*
    useState contendo o array de comentários
  */}
  const [comments, setComments] = useState([
    'Post muito bacana, hein?!'
  ]);
  
  {/*
    useState para capturar o valor do campo do comentário
    useState('') - começa com um valor vazio
  */}
  const [newCommentText, setNewCommentText] = useState('');

  function handleCreateNewComment() {
    event.preventDefault()
  {/*
    ...comments -> pega TODOS os valores anteriores e 
    setComments adicionar o novo valor newCommentText
  */}
    setComments([...comments, newCommentText]);
    setNewCommentText('');
  }

  {/*
    Funções é acionada quando o usuário digita no textarea
    e pega o valor e insere no array, por meio do useState
  */}
  function handleNewCommentChange() {
    setNewCommentText(event.target.value);
  }

  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,
  });

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true
  });

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map(item => {
          if (item.type === 'paragraph') {
            return <p>{item.content}</p>;
          } else if (item.type === 'link') {
            return <p><a href="#">{item.content}</a></p>
          }
        })}
      </div>

       <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        {/*
          value={newCommentText} - após capturar o valor, 
          muda para o estado inicial - deixa sem texto o textarea
          
          onChange={handleNewCommentChange} - uma função que fica 
          esperando alterações no textarea e chama a função
        */}
        <textarea
          name="comment"
          placeholder="Deixe um comentário"
          value={newCommentText}
          onChange={handleNewCommentChange}
        />

        <footer>
          <button type="submit">Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {/* Percorre o array comments e cria o componente Comment*/}
        {comments.map(comment => {
          return <Comment content={comment} />
        })}
      </div>
    </article>
  )
}