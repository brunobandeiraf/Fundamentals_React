import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import styles from './Post.module.css';

import { Comment } from './Comment';
import { Avatar } from './Avatar';

import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: 'paragraph' | 'link';
  content: string;
}

export interface PostType {
  id: number;
  author: Author;
  publishedAt: Date;
  content: Content[];
}

interface PostProps {
  post: PostType;
}

export function Post({ post }: PostProps) {
  {/*
    useState contendo o array de comentários
  */}
  const [comments, setComments] = useState([
    'Post muito bacana, hein?!'
  ]);
  
  {/*
    useState para capturar o valor do campo do comentário
    useState('') - começa com um valor vazio
    Armazena tudo que é comentado pelo usuário em tempo real
  */}
  const [newCommentText, setNewCommentText] = useState('');

  function handleCreateNewComment(event: FormEvent) {
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
  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    // setCustomValidity - não possibilita publicar com campo vazio
    event.target.setCustomValidity('');
    // 
    setNewCommentText(event.target.value);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório!');
  }

  const publishedDateFormatted = format(post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,
  });

  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBR,
    addSuffix: true
  });

  function deleteComment(commentToDelete: string) {
    // Imutabilidade - as variáveis não sofrem mutação, 
    // nós criamos um novo valor (espaço de memória)
    const commentsWithoutDeletedOne 
        = comments.filter(comment => {
          return comment !== commentToDelete;
          // filter = gera um nova lista, sem o item deletado
    })
    // React não alterado resultado, mas gera um novo resultado e substitui
    setComments(commentsWithoutDeletedOne);
  }

  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={post.author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>
        <time title={publishedDateFormatted} dateTime={post.publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {post.content.map(item => {
          if (item.type === 'paragraph') {
            return <p key={item.content}>{item.content}</p>;
          } else if (item.type === 'link') {
            return <p key={item.content}><a href="#">{item.content}</a></p>
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
          onInvalid={handleNewCommentInvalid}/*Identifica quando o submit está inválido*/
          required
        />
        {/* 
          disabled={newCommentText.length == 0} já desabilita o botão
        */}
        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {/* Percorre o array comments e cria o componente Comment*/}
        {comments.map(comment => {
          return (
            <Comment
              key={comment}
              content={comment}
              onDeleteComment={deleteComment}
              /*deleteComment - função local que deleta*/
            />
          )
        })}
      </div>
    </article>
  )
}